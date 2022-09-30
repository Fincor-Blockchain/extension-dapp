import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Container, Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { logo } from "../../../assets/images";
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
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
            fontFamily: "Gilroy-Light",
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
            border: " solid 1px #e6e6e6",
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
}));

const words = [
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
];
const Word12Mnemonics = () => {
    const history = useHistory();
    const classes = useStyles();
    const Next = () => {
        history.push("/restorePassword");
    };
    const cancelProcess = () => {
        history.push("/restoreWallet");
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
                                    multiple piece of papers and sore each In 2 -3 locations
                                </Typography>
                            </Box>

                            <Typography variant="h3">
                                Your secret backup phrase will help to backup and restore your
                                wallet
                            </Typography>
                            <Box className={classes.InputBox}>
                                <Grid container spacing={2}>
                                    {words &&
                                        words.map((item, i) => (
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
                                <Button onClick={Next}>Proceed</Button>
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
export default Word12Mnemonics;
