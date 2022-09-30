import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Box, Typography, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import QRCode from "qrcode.react";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { back, wcopy } from "../../../assets/images";
import { PrivateKeyQr } from "../privateKey";
import { useSelector } from "react-redux";
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
            margin: "0px",
            width: "100vw",
            maxWidth: "400px",
            height: "480px",
            border: "solid 1px #d5d5d5",
            boxShadow: "none",
        },
        "& .MuiBackdrop-root": {
            backgroundColor: theme.palette.white,
        },
        "& .MuiSvgIcon-root": {
            color: theme.palette.white,
            padding: "7px",
            backgroundColor: theme.palette.primary.blue,
            borderRadius: 7,
            cursor: "pointer",
        },
    },

    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
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
        color: theme.palette.primary.blue,
        fontSize: 14,
        fontFamily: "Poppins",
        letterSpacing: 0.5,
        textDecoration: "underline",
        fontWeight: 500,
        maxWidth: "340px",
        wordWrap: "break-word",
        margin: "auto",
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        },
    },
    iconsWrapper: {
        display: "flex",
        alignItems: "center",
        width: "40%",
        justifyContent: "space-evenly",
        margin: "10px 0px 21px 0px",
    },
    icon: {
        display: "flex",
        cursor: "pointer",
    },
    iconTitle: {
        color: theme.palette.primary.blue,
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: 500,
    },
    linkStyle: {
        textDecoration: "none",
    },
    copyText: {
        display: "flex",
        padding: "7px 0px !important",
        width: "100%",
        border: "1px solid #d5da43 !important",
        backgroundColor: "#d5da43 !important",
        marginBottom: "0px !important",
        minWidth: "246px",
        color: "#fff !important ",
    },
    copyImg: {
        objectFit: "contain",
        cursor: "pointer",
        height: 18,
    },
    copied: {
        maxWidth: "70px !important",
        width: "100% !important",
        color: "#fff !important ",
        fontSize: 18,
        fontFamily: "Gilroy-Regular",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Account = (props) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        open: false,
    });
    const [wasCopied, setWasCopied] = useState(false);
    const { activeAccounts } = useSelector((store) => store.wallet);
    const togglePrivateKeyQr = () => {
        setState({ ...state, open: !state.open });
    };
    const copyMnemonics = () => {
        const newAddress = activeAccounts[0].address;
        copy(newAddress);
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
                                        onClick={props.toggleDrawer}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <Typography variant="h1" style={{ margin: 0 }}>
                                        {activeAccounts[0].displayName}
                                    </Typography>
                                    <CloseIcon onClick={props.toggleDrawer} />
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
                                <Box className={classes.iconsWrapper}>
                                    <Button className={classes.copyText} onClick={copyMnemonics}>
                                        <img src={wcopy} alt="img" className={classes.copyImg} />
                                        {wasCopied ? (
                                            <Typography variant="body1" className={classes.copied}>
                                                Copied
                                            </Typography>
                                        ) : (
                                            <Typography variant="body1" className={classes.copied}>
                                                Copy{" "}
                                            </Typography>
                                        )}
                                    </Button>
                                </Box>

                                <Button
                                    className={classes.btn}
                                    variant="outlined"
                                    onClick={() => togglePrivateKeyQr()}>
                                    Export private key
                                </Button>
                            </Box>
                        </Dialog>
                    </Grid>
                </Grid>
            </Container>
            <PrivateKeyQr open={state.open} togglePrivateKeyQr={togglePrivateKeyQr} />
        </div>
    );
};
export default Account;
