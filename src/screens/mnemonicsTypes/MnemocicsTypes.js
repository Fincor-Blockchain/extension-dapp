import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Container, Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { logo } from "../../assets/images";
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        "& .MuiContainer-root": {
            maxWidth: 500,
            padding: "0 30px 0px 30px",
        },
        "& .MuiButton-contained": {
            borderRadius: 10,
            margin: "20px 0px -4px 0px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.16) !important",
            backgroundColor: "#ffffff !important",
            fontFamily: "Gilroy-Regular",
            fontSize: 14,
            [theme.breakpoints.down("xs")]: {
                padding: "8px 40px !important",
            },
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
    btnWrapper: {
        display: "flex",
        flexDirection: " column",
        alignItems: "center",
        justifyContent: " center",
        marginTop: 10,
    },

    numberBox: {
        width: 22,
        height: 42,
        backgroundColor: "#8aa7e4",
        position: "absolute",
        marginTop: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        fontSize: 18,
        lineHeight: 1.27,
        textAlign: "center",
        color: "#ffffff",
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
        "&.Mui-focused": {
            border: "none",
        },
        "& .MuiOutlinedInput-input": {
            fontFamily: "Gilroy-Light",
            fontSize: "14px",
            fontWeight: "300",
            fontStretch: "normal",
            fontStyle: "italic",
            lineHeight: "1.5",
            letterSpacing: "normal",
            textAlign: "left",
            color: "#8aa7e4",
            paddingLeft: 30,
        },

        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            marginRight: 12,
            height: "42px",
            display: "flex",
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
            "&.Mui-focused fieldset": {
                border: "none ",
            },
        },
    },
}));

const buttonWords = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MnemonicsTypes = () => {
    const history = useHistory();
    const classes = useStyles();
    const cancelProcess = () => {
        history.push("/mnemonics");
    };
    const [state, setState] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        history.push("/account");
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
                                    Confirm your secret Backup phrase
                                </Typography>
                            </Box>
                            <Typography variant="h3">
                                Your secret backup phrase will help to backup and restore your
                                wallet
                            </Typography>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Box className={classes.InputBox}>
                                        <Box className={classes.numberBox}>1</Box>
                                        <TextField
                                            variant="outlined"
                                            name="first"
                                            value={state.first}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box className={classes.InputBox}>
                                        <Box className={classes.numberBox}>2</Box>
                                        <TextField
                                            variant="outlined"
                                            name="second"
                                            value={state.second}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box className={classes.InputBox}>
                                        <Box className={classes.numberBox}>3</Box>
                                        <TextField
                                            variant="outlined"
                                            name="third"
                                            value={state.third}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box className={classes.InputBox}>
                                        <Box className={classes.numberBox}>4</Box>
                                        <TextField
                                            variant="outlined"
                                            name="fourth"
                                            value={state.fourth}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box className={classes.InputBox}>
                                <Grid container>
                                    {buttonWords &&
                                        buttonWords.map((item, i) => (
                                            <Grid item xs={4} key={i}>
                                                <Box>
                                                    <Button variant="contained">{item}</Button>
                                                </Box>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Box>

                            <Box className={classes.btnWrapper}>
                                <Button onClick={handleSubmit}>Confirm</Button>
                                <Typography variant="body2" onClick={cancelProcess}>
                                    cancelProcess
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default MnemonicsTypes;
