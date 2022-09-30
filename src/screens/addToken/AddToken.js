import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Header from "../../components/header/Header";
import { useState } from "react";
import { rightArrow } from "../../assets/images";
import { useHistory } from "react-router-dom";
import { NoData } from "../../components";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiContainer-root": {
            maxWidth: 560,
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
    form: {
        width: "90%",
        position: "relative",
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
    qrWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: 20,
        marginLeft: 30,
        cursor: "pointer",
    },
    scan: {
        fontFamily: "Poppins",
        fontSize: 15,
        lineHeight: 1.5,
        color: theme.palette.yellow,
        fontWeight: 400,
    },
    rightArrow: {
        marginLeft: 8,
    },
    help: {
        fontSize: 13,
        lineHeight: 1.56,
        color: theme.palette.primary.blue,
        fontWeight: 500,
        marginBottom: 16,
        fontStyle: "italic",
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center",
        border: " solid 1px #e6e6e6",
        borderRadius: "30px",
        marginTop: 9,
    },
    cancel: {
        color: theme.palette.yellow,
        borderBottom: "1px solid ",
        borderColor: theme.palette.yellow,
    },
}));

const AddToken = () => {
    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = useState({
        address: "",
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
    const customToken = (e) => {
        history.push("/addCustomToken");
    };
    const cancelProcess = () => {
        history.push("/account");
    };
    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <Box className={classes.main}>
                    <Typography variant="h1">Add Tokens</Typography>

                    <Box className={classes.form}>
                        <Box className={classes.inputWrapper}>
                            <TextField
                                variant="outlined"
                                name="address"
                                value={state.address}
                                placeholder="Search public address"
                                fullWidth
                                onChange={handleChange}
                            />
                            <SearchIcon
                                className={classes.icon}
                                fontSize="small"
                                onClick={handleSubmit}
                            />
                        </Box>
                        <Box className={classes.qrWrapper}>
                            <Typography className={classes.scan} onClick={customToken}>
                                Add custom token
                            </Typography>
                            <img src={rightArrow} alt="right" className={classes.rightArrow} />
                        </Box>
                    </Box>
                    <NoData description="Add the tokens you've acquired using Fincor" />
                    <Typography className={classes.help}>Learn More</Typography>
                    <Button>Next</Button>
                    <Typography className={classes.cancel} variant="body2" onClick={cancelProcess}>
                        Cancel Process
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default AddToken;
