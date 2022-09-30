import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../../components/header/Header";
import { Box, Grid, Container, Typography, Button, TextField } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { validate } from "validate.js";

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
        marginTop: 10,
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
        fontStyle: "normal",
        width: "100%",
        color: theme.palette.primary.blue,
        lineHeight: 1.5,
        fontSize: 15,
        fontFamily: "Poppins",
        fontWeight: 500,
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

const schema = {
    accountName: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 15,
        },
    },
};

const CreateAccount = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });
    useEffect(() => {
        const errors = validate(state.values, schema);
        setState((state) => ({
            ...state,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [state.values]);

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
    const hasError = (field) => (state && state.errors[field] ? true : false);
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
                            <Typography variant="h1">Create account</Typography>
                            <Box className={classes.btn}>
                                <Button
                                    className={classes.btn1}
                                    onClick={() => history.push("/createaccount")}>
                                    Create account
                                </Button>
                                <Button
                                    className={classes.btn2}
                                    onClick={() => history.push("/importAccount")}>
                                    Import account
                                </Button>
                            </Box>
                            <Box className={classes.createWallet}>
                                <Typography className={classes.key}>Account name</Typography>
                                <TextField
                                    className={
                                        hasError("accountName") ? classes.bRed : classes.bGray
                                    }
                                    variant="outlined"
                                    name="accountName"
                                    error={hasError("accountName")}
                                    helperText={
                                        hasError("accountName") ? state.errors.accountName[0] : null
                                    }
                                    value={state.values.accountName || ""}
                                    placeholder="Type your account name"
                                    fullWidth
                                    onChange={handleChange}
                                />
                                <Button onClick={handleSubmit} disabled={!state.isValid}>
                                    Create account
                                </Button>
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

export default CreateAccount;
