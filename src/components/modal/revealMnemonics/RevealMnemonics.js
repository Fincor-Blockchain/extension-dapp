import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Container, Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { back, copyIcon } from "../../../assets/images";
import CloseIcon from "@material-ui/icons/Close";
import cryptoService from "../../../services/cryptoService";
import { setGeneratedMnemonics } from "../../../redux/auth/actions";
import copy from "copy-to-clipboard";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,

        "& .MuiDialog-paperWidthSm": {
            maxWidth: "600px !important",
        },
    },

    main: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
    },
    headingWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px ",
    },
    logo: {
        margin: "21px 0px 21px 0px",
    },
    bodyWrapper: {
        width: "100%",
        borderTop: "2.8px solid #23224e",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: theme.palette.smokeWhite,
        padding: "6px 12px 10px 12px",
        [theme.breakpoints.down("xs")]: {
            maxHeight: "110px",
        },
    },

    numberBox: {
        width: 22,
        height: 42,
        backgroundColor: theme.palette.primary.blue,
        position: "absolute",
        marginTop: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        fontSize: 18,
        lineHeight: 1.27,
        textAlign: "center",
        color: theme.palette.white,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        zIndex: 1,
        transition: ".5s ease-out",
    },
    copy: {
        display: "flex",
        margin: "15px 0px 10px 0px",
        cursor: "pointer",
    },
    img: {
        marginRight: 10,
    },
    CloseIcon: {
        color: theme.palette.white,
        padding: "7px",
        backgroundColor: theme.palette.primary.blue,
        borderRadius: 7,
        cursor: "pointer",
        marginRight: 16,
    },
    InputBox: {
        width: "68%",
        position: "relative",
        [theme.breakpoints.down("xs")]: {
            width: "80%",
        },
        "&.Mui-focused": {
            border: "none",
        },

        "& .MuiOutlinedInput-input": {
            fontFamily: "Gilroy-Light",
            fontSize: "14px",
            fontWeight: "300",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.5",
            letterSpacing: "normal",
            textAlign: "left",
            color: theme.palette.primary.blue,
            paddingLeft: 30,
        },

        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            marginRight: 12,
            width: "120px",
            height: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #e6e6e6",
            marginTop: 10,
            [theme.breakpoints.down("xs")]: {
                width: "auto",
                "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
                    padding: 0,
                },
            },
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none ",
            },
            "&.Mui-focused fieldset": {
                border: "none ",
            },
        },
    },
    copyText: {
        display: "flex",
        marginTop: 16,
    },
    copyImg: {
        marginRight: 6,
        objectFit: "contain",
        cursor: "pointer",
        height: 20,
    },
    copied: {
        fontWeight: "bold",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const RevealMnemonics = (props) => {
    const { isOpen } = props;
    const history = useHistory();
    const classes = useStyles();

    const dispatch = useDispatch();
    const [wasCopied, setWasCopied] = useState(false);
    const [mnemonics, setMnemonics] = useState([]);
    useEffect(() => {
        const nemonicWords = cryptoService.generateMnemonic();
        const nemonics = nemonicWords && nemonicWords.split(" ");
        setMnemonics(nemonics);
        dispatch(setGeneratedMnemonics(nemonicWords));
    }, [dispatch]);
    const copyMnemonics = () => {
        copy(mnemonics);
        setWasCopied(true);
        setTimeout(() => {
            setWasCopied(false);
        }, 3000);
    };
    const cancelProcess = () => {
        history.push("/setting");
    };
    const goBack = () => {
        history.push("/setting");
    };
    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Dialog
                            open={isOpen}
                            TransitionComponent={Transition}>
                            <Box className={classes.main}>
                                <Box className={classes.headingWrapper}>
                                    <img
                                        src={back}
                                        alt="back"
                                        style={{ cursor: "pointer", marginLeft: 16 }}
                                        onClick={goBack}
                                    />
                                    <Typography variant="h1">Seed phrase</Typography>
                                    <CloseIcon className={classes.CloseIcon} onClick={goBack} />
                                </Box>
                                <Box className={classes.bodyWrapper}>
                                    <Typography variant="body1">
                                        If you ever change browsers or move computers, you will need
                                        this seed phrase to access your accounts. Save them
                                        somewhere safe and secret.
                                    </Typography>
                                </Box>

                                <Typography variant="h3">
                                    Your secret backup phrase will help to backup and restore your
                                    wallet
                                </Typography>

                                <Grid container spacing={2} className={classes.InputBox}>
                                    {mnemonics &&
                                        mnemonics.map((item, i) => (
                                            <Grid item xs={4} key={i}>
                                                <Box>
                                                    <Box className={classes.numberBox}>{i + 1}</Box>
                                                    <TextField variant="outlined" value={item} />
                                                </Box>
                                            </Grid>
                                        ))}
                                </Grid>
                                <Box
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        width: "100%",
                                    }}>
                                    <Box className={classes.copyText}>
                                        <img
                                            src={copyIcon}
                                            onClick={copyMnemonics}
                                            alt="img"
                                            className={classes.copyImg}
                                        />
                                        {wasCopied ? (
                                            <Typography variant="body1" className={classes.copied}>
                                                Copied
                                            </Typography>
                                        ) : (
                                            <Typography variant="body1">Copy </Typography>
                                        )}
                                    </Box>
                                </Box>

                                <Button onClick={cancelProcess}>Close</Button>
                            </Box>
                        </Dialog>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default RevealMnemonics;
