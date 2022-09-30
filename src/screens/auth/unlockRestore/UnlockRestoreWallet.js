/*global chrome*/

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {
    Container,
    Button,
    FormControl,
    Input,
    TextareaAutosize,
    FormHelperText,
    InputAdornment,
    IconButton,
    Checkbox,
} from "@material-ui/core";
import { logo, createWallet, eye, eyeOff, back } from "../../../assets/images";
import CryptoService from "../../../services/cryptoService";
import FileEncryptionService from "../../../services/fileEncryptionService";
import { encryptionConst, schema } from "../../../utils/contant";
import ExtensionStore from "../../../utils/local-store";
import { setEncryptedData } from "../../../redux/encryption/actions";
import { useDispatch } from "react-redux";
import { RestoreModal } from "../../../components/modal";
import { validate } from "validate.js";
import { activeAccount, activeIndex } from "../../../redux/wallet/actions";
import fincor from "../../../services/fincor";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiCheckbox-colorPrimary": {
            color: "#d5da43 ",
        },
        "& .MuiIconButton-colorPrimary:hover": {
            backgroundColor: "transparent",
        },
        "& .MuiSvgIcon-root": {
            width: "18px",
            height: "18px",
        },
        "& .MuiFormHelperText-root": {
            color: "red",
            fontSize: 12,
        },
    },

    main: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    img: {
        width: 133,
        height: 138.8,
        objectFit: "contain",
    },

    logo: {
        margin: "20px 0px 10px 0px",
    },
    headingWrapper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    createWallet: {
        padding: "20.2px 22px 20.6px 22px",
        width: "100%",
        maxWidth: 450,
        border: "solid 0.8px #d5d5d5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "20px",
    },
    input: {
        outline: "none",
        padding: "4px 11.5px 4px 20.7px",
        backgroundColor: theme.palette.white,
        borderRadius: "30px",
        border: "1px solid rgb(230, 230, 230)",
        "& input.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd": {
            color: theme.palette.primary.blue,
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 300,
            letterSpacing: 1.5,
        },
        "& .MuiInputBase-input": {
            letterSpacing: 1.5,
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 300,
        },
    },
    form: {
        width: "100%",
        marginBottom: "10px",
    },
    iconColor: {
        color: theme.palette.primary.blue,
        fontSize: "18px",
    },
    label: {
        fontFamily: "Poppins",
        color: theme.palette.darkBlack,
        fontSize: 14,
    },
    span: {
        color: "#93cec3",
        borderBottom: "1px solid #93cec3",
        marginLeft: 5,
    },
    checkboxWrapper: {
        width: "100%",
        justifyContent: "flex-start",
        display: "flex",
        alignItems: "center",
        marginLeft: -12,
    },
    formBox: {
        textAlign: "center",
    },
    textBox: {
        margin: "20px 0px",
        width: "100%",
        "& .MuiSvgIcon-root": {
            width: "24px",
            height: "24px",
        },
    },
    text: {
        display: "flex",
        textAlign: "left",
        width: "100%",
        marginBottom: 10,
    },
    errorBox: {
        color: "red",
    },
    imgBox: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
    },
    backImg: {
        height: 35,
        cursor: "pointer",
    },
    linkStyle: {
        textDecoration: "none",
        color: "#000000",
    },
    bodyWrapper: {
        width: "100%",
        borderTop: "2.8px solid #23224e",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: theme.palette.smokeWhite,
        padding: "6px 20px 10px 20px",
        marginTop: 20,
        [theme.breakpoints.down("xs")]: {
            maxHeight: "110px",
        },
    },
    break: {
        width: "100%",
        textAlign: "left",

        [theme.breakpoints.down("xs")]: {
            fontSize: 13,
        },
    },
    breakHeading: {
        width: "100%",
        textAlign: "left",
        marginLeft: -16,
        fontFamily: "Gilroy-Medium",
        fontSize: 16,
        fontWeight: 600,
        [theme.breakpoints.down("xs")]: {
            fontSize: 13,
        },
    },
}));

const UnlockRestoreWallet = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [tick, setTick] = useState({
        checked: false,
    });
    const [state, setState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
        showPassword: false,
    });

    useEffect(() => {
        const errors = validate(state.values, schema);
        setState((state) => ({
            ...state,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [state.values, setState]);

    const handleChange = (e) => {
        e.persist();
        setState((state) => ({
            ...state,
            values: {
                ...state.values,
                [e.target.name]: e.target.value,
            },
            touched: {
                ...state.touched,
                [e.target.name]: true,
            },
        }));
    };

    const hasError = (field) => (state.touched[field] && state.errors[field] ? true : false);

    const [invalidMnemonics, setInvalidMnemonics] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [word, setWords] = useState("");

    const handleMnemonics = (e) => {
        e.preventDefault();
        setInvalidMnemonics(false);
        setWords(e.target.value);
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
            const key = FileEncryptionService.createEncryptionKey(password);
            const encryptedAccountsData = FileEncryptionService.encryptData({
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
        const mnemonic = word.trim();
        const mnemonicPhrase = mnemonic;
        const isValidate = CryptoService.validateMnemonic(mnemonicPhrase);

        if (isValidate) {
            createWalletFile(mnemonicPhrase, state.values.password);
            setIsModalOpen(true);
        } else {
            setInvalidMnemonics(true);
        }
    };

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const showConfirmPassword = () => {
        setState({ ...state, showConfirmPassword: !state.showConfirmPassword });
    };
    const checkBoxHandler = (event) => {
        setTick({ ...tick, [event.target.name]: event.target.checked });
    };
    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.main}>
                            <Box className={classes.headingWrapper}>
                                <img src={logo} alt="logo" className={classes.logo} />
                                <Typography variant="h1">
                                    Restore your Account with Secret Recovery Phrase
                                </Typography>
                            </Box>
                            <Box className={classes.createWallet}>
                                <Box className={classes.imgBox}>
                                    <a
                                        href={`chrome-extension://${chrome?.runtime?.id}/index.html?type=Browser#/unlock-wallet`}
                                        className={classes.linkStyle}
                                        rel="noreferrer">
                                        <img src={back} alt="back" className={classes.backImg} />
                                    </a>
                                </Box>
                                <img
                                    src={createWallet}
                                    alt="createWallet"
                                    className={classes.img}
                                />
                                <Box className={classes.bodyWrapper}>
                                    <Typography variant="body1" className={classes.break}>
                                        <ul style={{ padding: "0px 0px 0px 14px" }}>
                                            <Typography className={classes.breakHeading}>
                                                Note :
                                            </Typography>
                                            <li>
                                                Each recovery phrase word must be separated with
                                                single space and should not include anything like
                                                numbers , comma etc.
                                            </li>
                                            <li>
                                                If you restore your account only main account will
                                                load.
                                            </li>
                                        </ul>
                                    </Typography>
                                </Box>
                                <Box className={classes.textBox}>
                                    <Typography className={classes.text}>
                                        Wallet Secret Recovery Phrase
                                    </Typography>
                                    {tick.checked ? (
                                        <TextareaAutosize
                                            className={classes.textArea}
                                            name="one"
                                            value={word || ""}
                                            placeholder="Separate each word with a single space"
                                            onChange={handleMnemonics}
                                            minRows={3}
                                            style={{
                                                width: "95%",
                                                height: 100,
                                                border: "1px solid rgb(230, 230, 230)",
                                                paddingLeft: "16px",
                                                paddingTop: "16px",
                                                outline: "none",
                                                borderRadius: 12,
                                            }}
                                        />
                                    ) : (
                                        <FormControl className={classes.form}>
                                            <Input
                                                type="password"
                                                value={word || ""}
                                                onChange={handleMnemonics}
                                                placeholder="Paste Secret Recovery Phrase from clipboard"
                                                disableUnderline={true}
                                                fullWidth={true}
                                                className={classes.input}
                                            />
                                        </FormControl>
                                    )}
                                    {invalidMnemonics && (
                                        <Box className={classes.errorBox}>
                                            Test failed please try again
                                        </Box>
                                    )}

                                    <Box className={classes.checkboxWrapper}>
                                        <Checkbox
                                            checked={tick.checked}
                                            onChange={checkBoxHandler}
                                            name="checked"
                                            color="primary"
                                        />
                                        <Typography className={classes.label}>
                                            {tick.checked
                                                ? "Hide Secret Recovery Phrase"
                                                : "Show Secret Recovery Phrase"}
                                        </Typography>
                                    </Box>
                                </Box>

                                <form
                                    onSubmit={submitMnemonicPhraseHandler}
                                    className={classes.formBox}>
                                    <FormControl className={classes.form}>
                                        <Input
                                            type={state.showPassword ? "text" : "password"}
                                            value={state.values.password || ""}
                                            error={hasError("password")}
                                            onChange={handleChange}
                                            name="password"
                                            disableUnderline={true}
                                            fullWidth={true}
                                            placeholder="Enter your password"
                                            style={
                                                hasError("password")
                                                    ? { border: "1px solid red" }
                                                    : { border: "solid 1px #e6e6e6" }
                                            }
                                            className={classes.input}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}>
                                                        {state.showPassword ? (
                                                            <img src={eye} alt="eye" />
                                                        ) : (
                                                            <img src={eyeOff} alt="eye" />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText>
                                            {hasError("password") ? state.errors.password[0] : null}
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl className={classes.form}>
                                        <Input
                                            type={state.showConfirmPassword ? "text" : "password"}
                                            value={state.values.confirmPassword || ""}
                                            error={hasError("confirmPassword")}
                                            onChange={handleChange}
                                            name="confirmPassword"
                                            disableUnderline={true}
                                            fullWidth={true}
                                            placeholder="Confirm password"
                                            style={
                                                hasError("confirmPassword")
                                                    ? { border: "1px solid red" }
                                                    : { border: "solid 1px #e6e6e6" }
                                            }
                                            className={classes.input}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={showConfirmPassword}>
                                                        {state.showConfirmPassword ? (
                                                            <img src={eye} alt="eye" />
                                                        ) : (
                                                            <img src={eyeOff} alt="eye" />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />

                                        <FormHelperText>
                                            {hasError("confirmPassword")
                                                ? state.errors.confirmPassword[0]
                                                : null}
                                        </FormHelperText>
                                    </FormControl>
                                </form>

                                <Button
                                    disabled={
                                        !state.isValid ||
                                        !state.values.password ||
                                        !state.values.confirmPassword
                                    }
                                    onClick={submitMnemonicPhraseHandler}>
                                    Restore
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <RestoreModal
                isOpen={isModalOpen}
            />
        </div>
    );
};

export default UnlockRestoreWallet;
