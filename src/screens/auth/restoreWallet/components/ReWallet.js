import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { back, logo, transactionBg } from "../../../../assets/images";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        "& .MuiContainer-root": {
            maxWidth: 500,
        },
        padding: "0  50px",
        height: "100%",
    },

    main: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    img: {
        width: 133,
        height: 138.8,
        margin: "0px 40px",

        objectFit: "contain",
    },
    setBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    circleHeading: {
        fontFamily: "Poppins",
        fontSize: 50,
        fontWeight: 300,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.28",
        letterSpacing: "normal",
        textAlign: "left",
        color: "#fff",
        position: "absolute",
    },
    logo: {
        margin: "20px 0px 10px 0px",
    },
    headingWrapper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    createWallet: {
        padding: "20.2px 19.6px 20.6px 11.2px",
        width: 250,
        border: "solid 0.8px  #d5da43",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: 20,
        [theme.breakpoints.down("xs")]: {
            width: 230,
        },
    },
    backImg: {
        height: 35,
        cursor: "pointer",
    },
    imgBox: {
        display: "flex",
        justifyContent: "flex-start",
        width: "70%",
        margin: "20px  0px",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
}));
const ReWallet = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const { setScreen } = props;

    const routChange2 = () => {
        setScreen(1);
    };
    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.main}>
                            <Box className={classes.headingWrapper}>
                                <img src={logo} alt="logo" className={classes.logo} />
                                <Typography variant="h1">New to Fincor Wallet </Typography>
                            </Box>
                            <Box className={classes.imgBox}>
                                <img
                                    src={back}
                                    alt="back"
                                    className={classes.backImg}
                                    onClick={() => history.push("/access-wallet")}
                                />
                            </Box>
                            <Box
                                className={classes.createWallet}
                                marginTop="20px"
                                onClick={routChange2}>
                                <Box className={classes.setBox}>
                                    <img
                                        src={transactionBg}
                                        alt="transaction"
                                        className={classes.img}
                                    />
                                    <Typography className={classes.circleHeading}>12</Typography>
                                </Box>

                                <Typography variant="h2">Restore via 12 word seed</Typography>
                                <Typography variant="h6">
                                    Restore wallet from 12 word seed phrase
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default ReWallet;
