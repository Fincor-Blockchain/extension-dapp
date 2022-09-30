//------Contact-------
// This is just a UI Design
// Work in progress
// It will be used in future

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Header from "../../../components/header/Header";
import { back } from "../../../assets/images";
import { NoData } from "../../../components";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
    },
    iconback: {
        position: "relative",
        top: 40,
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

    help: {
        fontFamily: "Poppins",
        fontSize: 18,
        lineHeight: 2,
        color: theme.palette.yellow,
        fontWeight: 500,
    },
}));

const Contacts = () => {
    const history = useHistory();
    const classes = useStyles();

    const goBack = () => {
        history.push("/setting");
    };
    const addCCount = () => {
        history.push("/addAccount");
    };

    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <img src={back} alt="left-arrow" className={classes.iconback} onClick={goBack} />
                <Box className={classes.main}>
                    <Typography variant="h1">Conatcts</Typography>
                    <Typography className={classes.help}>Build your own contact</Typography>
                    <NoData description="No contact list found" />
                    <Button onClick={addCCount}>Add contact</Button>
                </Box>
            </Container>
        </div>
    );
};

export default Contacts;
