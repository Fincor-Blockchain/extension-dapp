import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Header from "../../components/header/Header";
import SendToken from "./SendToken";
import { back } from "../../assets/images";
import { useHistory } from "react-router-dom";
import { validate } from "validate.js";
import { NoData } from "../../components";
import fincor from "../../services/fincor";
import { useDispatch, useSelector } from "react-redux";
import { SCALE } from "../../vars/scale";
import {
    sendTransaction,
    sendTransactionLoading,
    socketTerminateClient,
} from "../../redux/wallet/actions";
import { SuccessfullTxs, Password } from "../../components/modal";
import fileEncryptionService from "../../services/fileEncryptionService";
import { chainId } from "../../utils/contant";
const cuspstakejs = require("@libonomy/cuspstakejs");

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiFormHelperText-root.Mui-error": {
            position: "absolute",
            top: 50,
            [theme.breakpoints.down("xs")]: {
                top: 40,
            },
        },
        "& .MuiOutlinedInput-root": {
            width: "100%",
            height: "50px",
            fontSize: 14,
            color: theme.palette.primary.blue,
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none ",
            },
            "& .Mui-focused fieldset": {
                border: "none ",
            },
            [theme.breakpoints.down("xs")]: {
                height: 42,
            },
        },
        "& .input.MuiInputBase-input.MuiOutlinedInput-input": {
            color: theme.palette.primary.blue,
        },
    },
    form: {
        width: "90%",
        position: "relative",
    },
    icon: {
        padding: 12,
        marginRight: 4,
        backgroundColor: theme.palette.primary.lightGray,
        color: theme.palette.primary.blue,
        borderRadius: "50%",
        cursor: "pointer",
        [theme.breakpoints.down("xs")]: {
            padding: 7,
        },
    },
    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
    },
    qrWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: 20,
        marginLeft: 30,
        cursor: "pointer",
    },
    scan: {
        fontFamily: "Poppins",
        fontSize: 15,
        lineHeight: 1.5,
        color: theme.palette.primary.blue,
        fontWeight: 400,
        marginLeft: 10,
    },
    help: {
        fontSize: 12,
        lineHeight: 1.56,
        color: theme.palette.primary.darkGray,
        marginBottom: 16,
        fontStyle: "normal",
    },
    span: {
        color: theme.palette.yellow,
        cursor: "pointer",
    },
    iconback: {
        position: "relative",
        top: 40,
        cursor: "pointer",
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center",
        border: " solid 1px #e6e6e6",
        borderRadius: "30px",
        marginTop: 9,
    },
    bRed: {
        display: "flex",
        alignItems: "center",
        border: " solid 1px red",
        borderRadius: "30px",
        marginTop: 9,
    },
}));

const schema = {
    address: {
        presence: { allowEmpty: false, message: "is required" },
    },
};

const Reciept = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        privateKey: "",
        address: "",
        amount: 0,
        denom: "",
        fee: 0,
        memo: "",
        mode: 3,
        txId: "",
        touched: {
            address: false,
            amount: false,
        },
        isValid: false,
    });
    const [hasAddressError, setAddressError] = useState(false);
    const [hasAmountError, setAmountError] = useState(false);
    const [hasAmountZeroError, setAmountZeroError] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [hasPasswordError, setPasswordError] = useState(false);
    const [isVerify, setIsVerification] = useState(false);

    const [selectCoin, setSelectedCoin] = useState({
        amount: 0,
        denom: "",
    });

    const { coins, isSending, selectedCoin, activeAccounts } = useSelector((state) => state.wallet);

    const { encryptedData } = useSelector((state) => state.encrypt);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value) => () => {
        setSelectedOption(value);
        setAmountError(false);
        setAmountZeroError(false);
        setIsOpen(false);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        e.persist();
        setPasswordError(false);
        setPassword(e.target.value);
    };

    const handleChangeInput = (evt) => {
        evt.persist();
        setAddressError(false);
        const value = evt.target.value;
        setState({
            ...state,
            touched: { ...state.touched, [evt.target.name]: true },
            [evt.target.name]: value,
        });
    };

    const inputChangeNumberHandler = (e) => {
        const { name, value } = e.target;
        var patt = /^[0-9]*(\.[0-9]{0,3})?$/.test(e.target.value);
        if (patt) {
            e.persist();
            setAmountError(false);
            setAmountZeroError(false);
            setState((state) => ({
                ...state,
                [name]: value,
                touched: {
                    ...state.touched,
                    [name]: true,
                },
            }));
        }
    };

    let errors = validate(
        {
            address: state.address,
        },
        schema,
    );
    errors = errors ? errors : {};

    const validateAddress = () => {
        const { address } = state;
        const trimmedValue = address ? address.trim() : "";
        return fincor.validateAddress(trimmedValue);
    };

    const validateAmount = () => {
        const balance = selectCoin.amount / SCALE;
        const { amount, fee } = state;
        const intAmount = parseFloat(amount);
        return !!intAmount && intAmount + fee <= balance;
    };

    const validateZeroAmount = () => {
        const { amount } = state;
        if (amount <= 0) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAddress()) {
            setAddressError(true);
            setState({
                ...state,
                touched: {
                    address: true,
                },
            });

        } else {
            setState({
                ...state,
                isValid: true,
            });
        }
    };

    const hanldeSendCoin = async (e) => {
        e.preventDefault();
        dispatch(socketTerminateClient());
        if (!validateAmount()) {
            if (!validateZeroAmount()) {
                setAmountError(true);
                setAmountZeroError(false);
            } else {
                setAmountZeroError(true);
                setAmountError(false);
            }
        } else {
            setIsVerification(true);
        }
    };

    const sendCoinHanlder = async (ecpairPriv) => {
        const { address, amount, memo, denom } = state;

        try {
            const txId = await dispatch(
                sendTransaction(
                    address,
                    amount,
                    0,
                    memo,
                    denom,
                    ecpairPriv,
                ),
            );
            setState({ mode: 3, txId });

            if (txId) {
                setPassword("");
                setModalOpen(true);
            }
        } catch (error) {
            dispatch(sendTransactionLoading(false));
        }
    };

    const passwordHandler = async (e) => {
        e.preventDefault();
        try {
            const key = fileEncryptionService.createEncryptionKey(password);
            const decryptedDataJSON = fileEncryptionService.decryptData(encryptedData, key);
            const { mnemonic } = JSON.parse(decryptedDataJSON);
            const fincor = cuspstakejs.network(process.env.REACT_APP_SERVER_URL, chainId);

            fincor.setPath(`m/44'/118'/${activeAccounts[0].index}'/0/0`); //hd path for fincor
            const ecpairPriv = fincor.getECPairPriv(mnemonic);

            setIsVerification(false);
            sendCoinHanlder(ecpairPriv);
        } catch (error) {
            setPasswordError(true);
        }
    };
    useEffect(() => {
        const sc = coins && coins.filter((item) => item.denom === selectedOption);

        if (sc?.length > 0) {
            setSelectedCoin((selectCoin) => ({
                ...selectCoin,
                amount: sc[0].amount,
                denom: sc[0].denom,
            }));
            setState((state) => ({
                ...state,
                amount: 0,
                denom: sc[0].denom,
                fee: 0,
                memo: "",
            }));
        } else {
            selectedCoin && setSelectedOption(selectedCoin.denom);
        }

        return () => {};
    }, [coins, selectedOption, selectedCoin]);

    const goBack = () => {
        history.goBack();
    };

    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <img src={back} alt="left-arrow" className={classes.iconback} onClick={goBack} />
                <Box className={classes.main}>
                    <Typography variant="h1">Add Recipient</Typography>

                    <Box className={classes.form}>
                        <form onSubmit={handleSubmit}>
                            <Box className={hasAddressError ? classes.bRed : classes.inputWrapper}>
                                <TextField
                                    variant="outlined"
                                    name="address"
                                    value={state.address || ""}
                                    placeholder="Search public address"
                                    fullWidth
                                    onChange={handleChangeInput}
                                    error={hasAddressError}
                                    helperText={hasAddressError ? "This address is invalid." : null}
                                    disabled={state.isValid}
                                />
                                <SearchIcon
                                    className={classes.icon}
                                    fontSize="small"
                                    type="submit"
                                    onClick={handleSubmit}
                                />
                            </Box>
                        </form>
                    </Box>
                </Box>
                {state.isValid ? (
                    <SendToken
                        state={state}
                        errors={errors}
                        goBack={goBack}
                        inputChangeNumberHandler={inputChangeNumberHandler}
                        handleChangeInput={handleChangeInput}
                        isOpen={isOpen}
                        handleClose={handleClose}
                        toggling={toggling}
                        selectedOption={selectedOption}
                        onOptionClicked={onOptionClicked}
                        coins={coins}
                        selectCoin={selectCoin}
                        isSending={isSending}
                        hanldeSendCoin={hanldeSendCoin}
                        hasAmountError={hasAmountError}
                        hasAddressError={hasAddressError}
                        hasAmountZeroError={hasAmountZeroError}
                    />
                ) : (
                    <NoData description="There are no recipient!" />
                )}
                <Typography className={classes.help}>
                    Need help? Contact <span className={classes.span}>Fincor wallet Support</span>
                </Typography>

                <Password
                    isOpen={isVerify}
                    password={password}
                    setIsVerification={setIsVerification}
                    hasPasswordError={hasPasswordError}
                    onChange={handleChange}
                    passwordHandler={passwordHandler}
                />

                <SuccessfullTxs isOpen={isModalOpen} />
            </Container>
        </div>
    );
};

export default Reciept;
