import React, { useState } from "react";
import cryptoService from "../../../services/cryptoService";
import { Word12Mnemonics, ReWallet, RestorePassword } from "./components";
import fileEncryptionService from "../../../services/fileEncryptionService";
import { encryptionConst } from "../../../utils/contant";
import { setEncryptedData } from "../../../redux/encryption/actions";
import { useDispatch } from "react-redux";
import RestoreTermsAndCondition from "./components/RestoreTermsAndCondition";
import ExtensionStore from "../../../utils/local-store";
import { activeAccount, activeIndex } from "../../../redux/wallet/actions";
import fincor from "../../../services/fincor";

const RestoreWallet = () => {
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        isValid: false,
        values: {},
        touched: {
            policy: false,
            password: "",
            confirmPassword: "",
        },
        errors: {},
    });
    const [screen, setScreen] = useState(0);
    const [invalidMnemonics, setInvalidMnemonics] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [word, setWords] = useState({
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: "",
        eight: "",
        nine: "",
        ten: "",
        eleven: "",
        twelve: "",
    });

    const handleMnemonics = (e) => {
        const { name, value } = e.target;
        e.preventDefault();
        setInvalidMnemonics(false);
        setWords({ ...word, [name]: value });
    };

    const getNewAccountFromTemplate = ({ index, timestamp, publicKey, secretKey, address }) => ({
        displayName: index > 0 ? `Account ${index}` : "Main Account",
        created: timestamp,
        path: `0/0/${index}`,
        publicKey,
        secretKey,
        address,
    });
    const createWalletFile = async (mnemonicPhrase, password) => {
        try {
            const walletAddress = fincor.getAddress(mnemonicPhrase);
            const privateKey = fincor.getECPairPriv(mnemonicPhrase).toString("hex");
            const timestamp = new Date().toISOString().replace(/:/g, "-");
            const mnemonic = mnemonicPhrase;
            const privArr = [{ privateKey: privateKey }];
            const dataToEncrypt = {
                mnemonic: mnemonic,
                privArr: privArr,
                accounts: [
                    getNewAccountFromTemplate({
                        index: 0,
                        timestamp,
                        publicKey: {},
                        secretKey: {},
                        address: walletAddress,
                    }),
                ],
                contacts: [],
            };
            const meta = {
                displayName: "Main Account",
                created: timestamp,
                netId: 0,
                meta: { salt: encryptionConst.DEFAULT_SALT },
            };
            const data = [{ displayName: "Main Account", index: 0, address: walletAddress }];
            ExtensionStore.set({ activeAccounts: data });
            dispatch(activeAccount(data));
            dispatch(activeIndex(0));
            const key = fileEncryptionService.createEncryptionKey(password);
            const encryptedAccountsData = fileEncryptionService.encryptData({
                data: JSON.stringify(dataToEncrypt),
                key,
            });
            if (ExtensionStore.isSupported) {
                ExtensionStore.set({ encryptedData: encryptedAccountsData });
            } else {
                dispatch(setEncryptedData(encryptedAccountsData));
            }

            return {
                error: null,
                meta,
                accounts: dataToEncrypt.accounts,
                mnemonic: mnemonic,
            };
        } catch (error) {
            return { error, meta: null };
        }
    };

    const submitMnemonicPhraseHandler = async (e) => {
        e.preventDefault();
        const mnemonicPhrase = `${word.one} ${word.two} ${word.three} ${word.four} ${word.five} ${word.six} ${word.seven} ${word.eight} ${word.nine} ${word.ten} ${word.eleven} ${word.twelve}`;
        const isValidate = cryptoService.validateMnemonic(mnemonicPhrase);

        if (isValidate) {
            createWalletFile(mnemonicPhrase, state.values.password);
            setIsModalOpen(true);
        } else {
            setInvalidMnemonics(true);
        }
    };

    const cancelProcess = () => {
        setWords({
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
            eleven: "",
            twelve: "",
        });
        setInvalidMnemonics(false);
        setScreen(2);
    };

    return (
        <div>
            {screen === 0 ? (
                <ReWallet setScreen={setScreen} />
            ) : screen === 1 ? (
                <RestoreTermsAndCondition state={state} setState={setState} setScreen={setScreen} />
            ) : screen === 2 ? (
                <RestorePassword state={state} setState={setState} setScreen={setScreen} />
            ) : screen === 3 ? (
                <Word12Mnemonics
                    word={word}
                    isModalOpen={isModalOpen}
                    invalidMnemonics={invalidMnemonics}
                    handleMnemonics={handleMnemonics}
                    submitMnemonicPhraseHandler={submitMnemonicPhraseHandler}
                    cancelProcess={cancelProcess}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default RestoreWallet;
