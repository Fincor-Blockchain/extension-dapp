import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography, Button, TextField, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { DropDown } from "./dropDown";
import Header from "../../components/header/Header";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            margin: "0 auto",
            width: "100%",
            height: "48px",
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

    main: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
    bodyWrapper: {
        margin: "19px 0px 5px 0px",
        borderTop: "2.8px solid #23224e",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: theme.palette.smokeWhite,
        padding: "6px 12px 6px 12px",
        [theme.breakpoints.down("xs")]: {
            maxHeight: "110px",
        },
    },
    createWallet: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
        marginTop: 12,
    },
    iconback: {
        position: "relative",
        top: 29,
        cursor: "pointer",
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    btn1: {
        backgroundColor: "#23224e !important",
        color: "#fff !important",
        borderRadius: "0px !important",
        padding: "15px 35px !important",
        lineHeight: "1 !important",
    },
    btn2: {
        backgroundColor: "#fff !important",
        color: "#23224e !important",
        borderRadius: "0px !important",
        border: "1px solid  rgba(0, 0, 0, 0.16)",
        padding: "14px 35px !important",
        lineHeight: "1 !important",
    },
    cancel: {
        color: theme.palette.yellow,
        borderColor: theme.palette.yellow,
    },
}));

const ImportAccount = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = useState({
        name: "",
    });
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const cancelProcess = (e) => {
        history.push("/account");
    };

    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.main}>
                            <Typography variant="h1">Import account</Typography>
                            <Box className={classes.btn}>
                                <Button
                                    className={classes.btn2}
                                    onClick={() => history.push("/createaccount")}>
                                    Create account
                                </Button>
                                <Button
                                    className={classes.btn1}
                                    onClick={() => history.push("/importAccount")}>
                                    Create account
                                </Button>
                            </Box>
                            <Box className={classes.createWallet}>
                                <Box className={classes.bodyWrapper}>
                                    <Typography variant="body1">
                                        Imported accounts will not be associated with your
                                        originally created MetaMask account seedphrase. Learn more
                                        about imported accounts here
                                    </Typography>
                                </Box>
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    value={state.address}
                                    placeholder="Type your account name"
                                    fullWidth
                                    onChange={handleChange}
                                />
                                <DropDown />
                                <Button onClick={handleSubmit}>Import account</Button>
                                <Typography
                                    className={classes.cancel}
                                    variant="body2"
                                    onClick={cancelProcess}>
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

export default ImportAccount;
