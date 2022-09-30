import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField, Button } from "@material-ui/core";
import Header from "../../components/header/Header";
import { useHistory } from "react-router-dom";
import { validate } from "validate.js";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            paddingRight: 35,
            width: "100%",
            height: "52px",
            display: "flex",
            fontSize: 14,
            color: theme.palette.primary.blue,
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #e6e6e6",
            marginBottom: 10,
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
            [theme.breakpoints.down("xs")]: {
                height: 42,
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
    form: {
        width: "90%",
        position: "relative",
    },
    icon: {
        position: "absolute",
        right: 3,
        padding: 7,
        top: 11.9,
        backgroundColor: theme.palette.primary.lightSmokeGray,
        color: theme.palette.primary.blue,
        borderRadius: "50%",
        cursor: "pointer",
    },
    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
    },
    cancel: {
        color: theme.palette.yellow,
        borderColor: theme.palette.yellow,
    },
}));

const schema = {
    address: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 15,
        },
    },
    symbol: {
        presence: { allowEmpty: false, message: "is required" },
    },
    decision: {
        presence: { allowEmpty: false, message: "is required" },
    },
};

const AddCustomToken = () => {
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
    const cancelProcess = () => {
        history.push("/addToken");
    };
    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <Box className={classes.main}>
                    <Typography variant="h1">Add custom tokens</Typography>

                    <Box className={classes.form}>
                        <TextField
                            className={hasError("address") ? classes.bRed : classes.bGray}
                            variant="outlined"
                            name="address"
                            error={hasError("address")}
                            helperText={hasError("address") ? state.errors.address[0] : null}
                            value={state.values.address || ""}
                            placeholder="Enter token contract address"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            className={hasError("symbol") ? classes.bRed : classes.bGray}
                            variant="outlined"
                            name="symbol"
                            error={hasError("symbol")}
                            helperText={hasError("symbol") ? state.errors.symbol[0] : null}
                            value={state.values.symbol || ""}
                            placeholder="Enter token Symbol"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            className={hasError("decision") ? classes.bRed : classes.bGray}
                            variant="outlined"
                            name="decision"
                            error={hasError("decision")}
                            helperText={hasError("decision") ? state.errors.decision[0] : null}
                            value={state.values.decision || ""}
                            placeholder="Enter decision of precision"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Box>
                    <Button disabled={!state.isValid}>Next</Button>
                    <Typography className={classes.cancel} variant="body2" onClick={cancelProcess}>
                        Cancel Process
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default AddCustomToken;
