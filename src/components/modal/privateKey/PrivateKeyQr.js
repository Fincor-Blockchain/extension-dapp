/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Box, Typography, Button, TextField, Tooltip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import ErrorIcon from "@material-ui/icons/Error";
import QRCode from "qrcode.react";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { back } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import FileEncryptionService from "../../../services/fileEncryptionService";
import ExtensionStore from "../../../utils/local-store";
import { setEncryptedData } from "../../../redux/encryption/actions";
import copy from "copy-to-clipboard";
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 14px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiDialog-paper": {
            overflow: "hidden",
            margin: "0px",
            width: "100vw",
            maxWidth: "415px",
            border: "solid 1px #d5d5d5",
            boxShadow: "none",
            padding: "12px",
        },
        "& .MuiBackdrop-root": {
            backgroundColor: theme.palette.white,
        },

        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            margin: "0 auto",
            width: "90%",
            height: "42px",
            display: "flex",
            fontSize: 12,
            color: theme.palette.primary.blue,
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

    close: {
        color: "#fff",
        padding: "7px",
        backgroundColor: theme.palette.primary.blue,
        borderRadius: 7,
        cursor: "pointer",
    },
    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    img: {
        width: 17,
        marginRight: 5,
        objectFit: "contain",
    },

    logo: {
        margin: "20px 0px 12px 0px",
    },
    headingWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 15,
    },
    address: {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: theme.palette.primary.blue,
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: 500,
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        },
    },
    keyClass: {
        display: "flex",
        width: "100%",
        color: theme.palette.primary.blue,
        lineHeight: 1.5,
        fontSize: 15,
        fontFamily: "Poppins",
        fontWeight: 500,
        whiteSpace: "nowrap",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("xs")]: {
            // margin: "10px 0px 8px 28px",
            fontSize: 14,
        },
    },
    iconCaution: {
        color: "#e6e6e6 !important",
    },
    checkBoxContainer: {
        width: "100%",
        maxWidth: 345,
        display: "flex",
        marginTop: 12,
    },
    caution: {
        color: theme.palette.primary.darkGray,
        lineHeight: 1.5,
        fontSize: 12,
        fontFamily: "Poppins",
        fontWeight: 400,
        fontStyle: "normal",
    },
    privateBox: {
        border: "1px solid #e6e6e6",
        padding: 10,
        width: "100%",
        textAlign: "justify",
        wordBreak: "break-all",
        color: theme.palette.primary.blue,
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: 500,
        maxWidth: "330px",
        margin: "auto",
        "&:hover": {
            background: "rgba(0, 0, 0, 0.04)",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
            width: "80%",
        },
    },
    spaceBetween: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const PrivateKeyQr = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { activeAccounts, activeItemIndex } = useSelector((state) => state.wallet);
    const { encryptedData } = useSelector((state) => state.encrypt);

    const [hasPasswordError, setPasswordError] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState([]);
    const [wasCopied, setWasCopied] = useState(false);

    const [state, setState] = useState({
        password: "",
        touched: {
            password: false,
        },
    });

    useEffect(() => {
        if (ExtensionStore.isSupported) {
            ExtensionStore.get().then((data) => {
                const encryptedData = data?.encryptedData;
                if (data) {
                    if (encryptedData) dispatch(setEncryptedData(encryptedData));
                }
            });
        }
    }, [dispatch]);

    const handleChange = (e) => {
        e.persist();
        setPasswordError(false);
        setState({
            ...state,
            touched: { ...state.touched, [e.target.name]: true },
            [e.target.name]: e.target.value,
        });
    };

    const unlockWalletwithPassword = async (e) => {
        e.preventDefault();
        try {
            const key = FileEncryptionService.createEncryptionKey(state.password);
            const decryptedDataJSON = FileEncryptionService.decryptData(encryptedData, key);
            const { mnemonic, privArr } = JSON.parse(decryptedDataJSON);

            setShowPrivateKey(privArr);
            return { error: null, mnemonic };
        } catch (error) {
            setPasswordError(true);
            return {
                error,
                mnemonic: null,
            };
        }
    };

    const donePrivateKey = () => {
        props.togglePrivateKeyQr();
        setState({ ...state, password: "" });
        setShowPrivateKey([]);
    };

    const copyPrivateKey = (item) => {
        copy(item.privateKey);
        setWasCopied(true);
        setTimeout(() => {
            setWasCopied(false);
        }, 3000);
    };

    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Dialog
                            className={classes.root}
                            open={props.open}
                            TransitionComponent={Transition}>
                            <Box className={classes.main}>
                                <Box className={classes.headingWrapper}>
                                    <img
                                        src={back}
                                        alt="back"
                                        onClick={donePrivateKey}
                                        cursor="pointer"
                                    />
                                    <Typography variant="h1">
                                        {activeAccounts[0].displayName}
                                    </Typography>
                                    <CloseIcon onClick={donePrivateKey} className={classes.close} />
                                </Box>
                                <QRCode
                                    value={`${process.env.REACT_APP_EXPLORER_URL}/account-details/${activeAccounts[0].address}`}
                                    size={200}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="L"
                                    includeMargin
                                    renderAs="svg"
                                />
                                <Typography className={classes.address}>
                                    {activeAccounts[0].address}
                                </Typography>
                                <Box className={classes.spaceBetween}>
                                    <Typography className={classes.keyClass}>
                                        {showPrivateKey == ""
                                            ? " Show private key"
                                            : "This is your Private Key"}
                                    </Typography>
                                </Box>

                                {showPrivateKey == "" ? (
                                    <TextField
                                        variant="outlined"
                                        type="password"
                                        name="password"
                                        value={state.password || ""}
                                        error={hasPasswordError}
                                        helperText={hasPasswordError ? "Invalid Password" : null}
                                        placeholder="Type your fincor wallet password"
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Tooltip
                                        classes={{
                                            tooltip: classes.customTooltip,
                                        }}
                                        placement="bottom"
                                        title={wasCopied ? "Copied" : "Copy"}>
                                        <div className={classes.privateBox}>
                                            {showPrivateKey &&
                                                showPrivateKey?.map((item, index) => (
                                                    <Typography
                                                        key={index}
                                                        onClick={() => copyPrivateKey(item)}>
                                                        {activeItemIndex == index
                                                            ? item.privateKey
                                                            : null}
                                                    </Typography>
                                                ))}
                                        </div>
                                    </Tooltip>
                                )}

                                <Box className={classes.checkBoxContainer}>
                                    <ErrorIcon className={classes.iconCaution} />
                                    <Typography className={classes.caution}>
                                        Never disclose this key. Anyone with your private keys can
                                        steal any assets held in your account.
                                    </Typography>
                                </Box>
                                {showPrivateKey == "" ? (
                                    <Button onClick={unlockWalletwithPassword}>Confirm</Button>
                                ) : (
                                    <Button onClick={donePrivateKey}>Done</Button>
                                )}

                                <Typography variant="body2" onClick={donePrivateKey}>
                                    Cancel
                                </Typography>
                            </Box>
                        </Dialog>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default PrivateKeyQr;
