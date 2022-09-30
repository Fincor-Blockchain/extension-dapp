import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Container, Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logo, copyIcon } from "../../../assets/images";
import cryptoService from "../../../services/cryptoService";
import { setGeneratedMnemonics } from "../../../redux/auth/actions";
import copy from "copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        // backgroundColor: theme.palette.primary.light,
        "& .MuiContainer-root": {
            maxWidth: 500,
            padding: "0 50px 0px 50px",
        },
    },

    main: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    headingWrapper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
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
    btnWrapper: {
        display: "flex",
        flexDirection: " column",
        alignItems: "center",
        justifyContent: " center",
    },

    numberBox: {
        width: 28,
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

        [theme.breakpoints.down("xs")]: {
            fontSize: 15,
        },
    },
    InputBox: {
        width: "100%",
        "&.Mui-focused": {
            border: "none",
        },

        "& .MuiOutlinedInput-input": {
            fontFamily: "Gilroy-Regular",
            fontSize: "14px",
            fontWeight: "300",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.5",
            letterSpacing: "normal",
            textAlign: "center",
            color: theme.palette.primary.darkWhite,
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
            border: " solid 1px #23224e",
            marginTop: 10,
            [theme.breakpoints.down("xs")]: {
                width: "94px",
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
    break: {
        [theme.breakpoints.down("xs")]: {
            fontSize: 13,
        },
    },
    copyText: {
        display: "flex",
        padding: "7.5px 0px !important",
        maxWidth: "188px",
        width: "100%",
        marginTop: 30,
        border: "1px solid #d5da43 !important",
        backgroundColor: "#fff !important",
        marginBottom: "0px !important",
    },
    copyImg: {
        objectFit: "contain",
        cursor: "pointer",
        height: 20,
    },
    copied: {
        maxWidth: "70px !important",
        width: "100% !important",
    },
}));

const Mnemonics = (props) => {
    const { setScreen } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [wasCopied, setWasCopied] = useState(false);
    const [mnemonics, setMnemonics] = useState([]);

    const Next = () => {
        setScreen(3);
    };


    useEffect(() => {
        const nemonicWords = cryptoService.generateMnemonic();
        const nemonics = nemonicWords && nemonicWords.split(" ");
        setMnemonics(nemonics);
        dispatch(setGeneratedMnemonics(nemonicWords));
    }, [dispatch]);

    const copyMnemonics = () => {
        const arr = [];
        mnemonics.map((item, i) =>
            arr.push({
                mnemonicsName: item,
                index: i,
            }),
        );
        copy(arr.map((mnmonics) => mnmonics.index + 1 + ": " + mnmonics.mnemonicsName));
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
                        <Box className={classes.main}>
                            <Box className={classes.headingWrapper}>
                                <img src={logo} alt="logo" className={classes.logo} />
                                <Typography variant="h1">
                                    Help us to improve your Fincor Wallet
                                </Typography>
                            </Box>
                            <Box className={classes.bodyWrapper}>
                                <Typography variant="body1" className={classes.break}>
                                    Write this phrase on the piece of paper and store in a secure
                                    location. If you want even more security, write it down on the
                                    multiple piece of papers and store each In 2 -3 locations
                                </Typography>
                            </Box>

                            <Typography variant="h3">
                                Your secret backup phrase will help to backup and restore your
                                wallet
                            </Typography>
                            <Box className={classes.InputBox}>
                                <Grid container spacing={2}>
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
                            </Box>
                            <Box className={classes.btnWrapper}>
                                <Button className={classes.copyText} onClick={copyMnemonics}>
                                    <img src={copyIcon} alt="img" className={classes.copyImg} />
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
                                <Button onClick={Next}>Proceed</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default Mnemonics;
