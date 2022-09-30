import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Container, Typography, Box, TextField, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { back } from "../../../assets/images";
import Header from "../../../components/header/Header";
import { useHistory } from "react-router-dom";
import validate from "validate.js";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiFormHelperText-root.Mui-error": {
            position: "absolute",
            top: 47,
        },
        "& .MuiOutlinedInput-root": {
            width: "100%",
            height: "50px",
            fontSize: 14,
            color: theme.palette.primary.blue,
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
    state: {
        width: "90%",
    },
    headingWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 0px 30px 0px",
    },
    icon: {
        padding: 12,
        marginRight: 4,
        backgroundColor: theme.palette.primary.lightGray,
        color: theme.palette.primary.blue,
        borderRadius: "50%",
        cursor: "pointer",
        [theme.breakpoints.down("xs")]: {
            padding: 7,
        },
    },
    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
    },

    CloseIcon: {
        color: theme.palette.white,
        padding: "7px",
        backgroundColor: theme.palette.primary.blue,
        borderRadius: 7,
        cursor: "pointer",
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center",
        border: " solid 1px red",
        borderRadius: "30px !important",
        marginTop: 25,
    },
    inputWrapper1: {
        display: "flex",
        alignItems: "center",
        border: " solid 1px #e6e6e6",
        borderRadius: "30px !important",
        marginTop: 25,
    },
    input: {
        border: " solid 1px red",
        borderRadius: 30,
    },
    input1: {
        border: " solid 1px #e6e6e6",
        borderRadius: 30,
    },
    cancel: {
        color: theme.palette.yellow,
        borderColor: theme.palette.yellow,
    },
}));

const schema = {
    name: {
        presence: { allowEmpty: false },
        length: {
            maximum: 28,
        },
    },
    address: {
        presence: { allowEmpty: false },
        equality: "address",
        length: {
            maximum: 28,
        },
    },
};

const AddAccount = () => {
    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });
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
    useEffect(() => {
        const errors = validate(state.values, schema);
        setState((state) => ({
            ...state,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [state.values]);

    const hasError = (field) => (state.touched[field] && state.errors[field] ? true : false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const goBack = () => [history.push("/contacts")];
    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <Box className={classes.headingWrapper}>
                    <img src={back} alt="back" style={{ cursor: "pointer" }} onClick={goBack} />
                    <Typography variant="h1">Add new Contact</Typography>
                    <CloseIcon className={classes.CloseIcon} onClick={goBack} />
                </Box>
                <Box className={classes.main}>
                    <Box className={classes.state}>
                        <TextField
                            className={hasError("name") ? classes.input : classes.input1}
                            variant="outlined"
                            name="name"
                            error={hasError("name")}
                            helperText={hasError("name") ? state.errors.name[0] : null}
                            value={state.values.name || ""}
                            placeholder="Enter username"
                            fullWidth
                            onChange={handleChange}
                        />
                        <Box
                            className={
                                hasError("address") ? classes.inputWrapper : classes.inputWrapper1
                            }>
                            <TextField
                                variant="outlined"
                                name="address"
                                error={hasError("address")}
                                helperText={hasError("address") ? state.errors.address[0] : null}
                                value={state.values.address || ""}
                                placeholder="Search public address"
                                fullWidth
                                onChange={handleChange}
                            />
                            <SearchIcon className={classes.icon} fontSize="small" />
                        </Box>
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        disabled={!state.isValid}
                        style={{ marginTop: 25 }}>
                        Add contact
                    </Button>
                    <Typography className={classes.cancel} variant="body2" onClick={goBack}>
                        Cancel Process
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default AddAccount;
