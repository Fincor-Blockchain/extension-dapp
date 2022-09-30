import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/header/Header";
import { Box, Grid, Container, Typography, Button, TextField } from "@material-ui/core";
import ExtensionStore from "../../utils/local-store";
import { useHistory } from "react-router-dom";
import { back } from "../../assets/images";
import { validate } from "validate.js";
import { useDispatch, useSelector } from "react-redux";
import FileEncryptionService from "../../services/fileEncryptionService";
import { encryptionConst } from "../../utils/contant";
import { setAddress, setEncryptedData, setPrivateKeys } from "../../redux/encryption/actions";
import { activeAccount, activeIndex } from "../../redux/wallet/actions";
import fincor from "../../services/fincor";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 14px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            margin: "0 auto",
            width: "100%",
            height: "42px",
            display: "flex",
            fontSize: 12,
            color: "#23224e",
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #e6e6e6",
            marginTop: 10,
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none ",
            },
            "& .Mui-focused fieldset": {
                border: "none ",
            },
        },
    },
    bRed: {
        "& .MuiOutlinedInput-root": {
            border: " solid 1px red",
        },
    },
    bGray: {
        "& .MuiOutlinedInput-root": {
            border: " solid 1px #e6e6e6",
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
        margin: "20px 0px 12px 0px",
    },
    headingWrapper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    createWallet: {
        width: "100%",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
        marginTop: 12,
    },
    title: {
        position: "relative",
        left: 66,
        [theme.breakpoints.down("xs")]: {
            left: 8,
        },
    },

    key: {
        display: "flex",
        width: "100%",
        fontFamily: "Gilroy-Regular",
        fontSize: 15,
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        textAlign: "left",
        color: "#23224e",
    },
    iconback: {
        position: "relative",
        top: 29,
        cursor: "pointer",
    },
    heading: {
        fontFamily: "Gilroy-Regular",
        fontSize: 16,
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        textAlign: "left",
        color: "#000000",
    },
    mainBox: {
        width: "100%",
        marginBottom: "12px",
    },
}));

const schema = {
    accountName: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 15,
        },
    },
    password: {
        length: {
            maximum: 20,
            minimum: 8,
            tooShort: "needs to have %{count} words or more",
        },
        format: {
            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#~`/|=)(?!@$%^&*-]).{8,}$/,
            message:
                "^ Password should be at least 8 characters and should contain lower case letter, upper case letter, number, special symbol.",
        },
    },
};

const CreateAccount = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [hasPasswordError, setPasswordError] = useState(false);
    const { accounts } = useSelector((state) => state.wallet);
    const { encryptedData } = useSelector((state) => state.encrypt);

    const [state, setState] = React.useState({
        accountName: "",
        password: "",
        touched: {
            accountName: false,
        },
    });

    const handleChange = (e) => {
        e.persist();
        setPasswordError(false);
        setState({
            ...state,
            touched: { ...state.touched, [e.target.name]: true },
            [e.target.name]: e.target.value,
        });
    };
    let errors = validate(
        {
            accountName: state.accountName,
        },
        schema,
    );
    errors = errors || {};

    const createAccount = async (mnemonic, privArr) => {
        try {
            const key = FileEncryptionService.createEncryptionKey(state.password);
            let tempArray = accounts;
            fincor.setPath(`m/44'/118'/${accounts.length}'/0/0`);
            const walletAddress = fincor.getAddress(mnemonic);
            const privateKey = fincor.getECPairPriv(mnemonic).toString("hex");

            tempArray.push({
                displayName: `${state.accountName} `,
                path: `0/0/${accounts.length}`,
                address: walletAddress,
                privateKey: {},
                secretKey: {},
            });
            privArr.push({
                privateKey: privateKey,
            });

            const timestamp = new Date().toISOString().replace(/:/g, "-");
            const dataToEncrypt = {
                mnemonic: mnemonic,
                accounts: accounts,
                contacts: [],
                privArr: privArr,
            };
            const meta = {
                displayName: "Main Account",
                created: timestamp,
                netId: 0,
                meta: { salt: encryptionConst.DEFAULT_SALT },
            };

            const encryptedAccountsData = FileEncryptionService.encryptData({
                data: JSON.stringify(dataToEncrypt),
                key,
            });
            if (ExtensionStore.isSupported) {
                ExtensionStore.set({ encryptedData: encryptedAccountsData });
                ExtensionStore.set({ accounts });
                ExtensionStore.set({ address: walletAddress });
            } else {
                dispatch(setEncryptedData(encryptedAccountsData));
                dispatch(setPrivateKeys(privArr));
            }

            const newAccount = tempArray[tempArray.length - 1];
            const newIndex = [tempArray.length - 1];

            const data = [
                {
                    displayName: newAccount.displayName,
                    index: newIndex,
                    address: newAccount.address,
                },
            ];
            dispatch(activeAccount(data));
            dispatch(setAddress(newAccount.address));
            dispatch(activeIndex(newIndex[0]));
            ExtensionStore.set({ activeAccounts: data });
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

    const unlockWalletwithPassword = async (e) => {
        e.preventDefault();
        try {
            const key = FileEncryptionService.createEncryptionKey(state.password);
            const decryptedDataJSON = FileEncryptionService.decryptData(encryptedData, key);
            const { mnemonic, privArr } = JSON.parse(decryptedDataJSON);
            createAccount(mnemonic, privArr);

            history.push("/dashboard");
            return { error: null, mnemonic };
        } catch (error) {
            setPasswordError(true);
            return {
                error,
                mnemonic: null,
            };
        }
    };

    const cancelProcess = (e) => {
        history.push("/dashboard");
    };
    const goBack = (e) => {
        history.push("/dashboard");
    };

    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <img src={back} alt="left-arrow" className={classes.iconback} onClick={goBack} />
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.main}>
                            <Typography variant="h1" className={classes.heading}>
                                Create account
                            </Typography>
                            <Box className={classes.createWallet}>
                                <Box className={classes.mainBox}>
                                    <Typography className={classes.key}>Account name</Typography>
                                    <TextField
                                        variant="outlined"
                                        name="accountName"
                                        placeholder="Type your account name"
                                        fullWidth
                                        value={state.accountName || ""}
                                        error={state.touched.accountName && errors.accountName}
                                        onChange={handleChange}
                                    />
                                    {state.touched.accountName && errors.accountName ? (
                                        <Typography
                                            style={{
                                                color: "red",
                                                fontSize: 12,
                                                padding: "4px  0px",
                                                lineHeight: 1.4,
                                                textAlign: "left",
                                                width: "92%",
                                            }}>
                                            {errors.accountName && errors.accountName[0]}
                                        </Typography>
                                    ) : null}
                                </Box>
                                <Box className={classes.mainBox}>
                                    <Typography className={classes.key}>
                                        Enter your password
                                    </Typography>
                                    <TextField
                                        type="password"
                                        variant="outlined"
                                        name="password"
                                        placeholder="Type your password"
                                        fullWidth
                                        value={state.password || ""}
                                        error={hasPasswordError}
                                        helperText={hasPasswordError ? "Invalid Password" : null}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Button onClick={unlockWalletwithPassword}>Create account</Button>
                                <Typography variant="body2" onClick={cancelProcess}>
                                    Cancel Process
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default CreateAccount;
