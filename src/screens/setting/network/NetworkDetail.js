//------Network Detail-------
// This is just a UI Design
// Work in progress
// It will be used in future

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Header from "../../../components/header/Header";
import { useHistory } from "react-router-dom";
import { back } from "../../../assets/images";

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
            height: "50px",
            display: "flex",
            color: theme.palette.primary.blue,
            fontFamily: "Poppins",
            fontSize: 14,
            fontWeight: 500,
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #e6e6e6",
            marginBottom: 15,
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
                height: "44px",
            },
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
    dropDownContainer: {
        width: "85%",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },

    label: {
        color: theme.palette.primary.blue,
        fontFamily: "Poppins",
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 2.55,
        marginLeft: 16,
    },
    headingWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 15,
    },
    crossIcon: {
        color: "#fff",
        padding: "7px",
        backgroundColor: theme.palette.primary.blue,
        borderRadius: 7,
        cursor: "pointer",
    },
    cursor: {
        cursor: "pointer",
    },
}));

const data = [
    { name: "Network Detail", number: "ABCD" },
    { name: "New RPC URl", number: "ABCD" },
    { name: "Chain ID", number: "ABCD" },
    { name: "Currency symbol", number: "ABCD" },
    { name: "Block explorer URL (optional)", number: "ABCD" },
];

const NetworkDetail = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const goBack = () => {
        history.push("/network");
    };
    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <Box className={classes.main}>
                    <Box className={classes.headingWrapper}>
                        <img src={back} alt="back" onClick={goBack} className={classes.cursor} />
                        <Typography variant="h1">Network Detail</Typography>
                        <CloseIcon onClick={goBack} className={classes.crossIcon} />
                    </Box>
                    {data.map((item, index) => (
                        <Box className={classes.dropDownContainer} key={index}>
                            <Box className={classes.label}>{item.name}</Box>
                            <TextField variant="outlined" fullWidth value={item.number} />
                        </Box>
                    ))}
                </Box>
            </Container>
        </div>
    );
};

export default NetworkDetail;
