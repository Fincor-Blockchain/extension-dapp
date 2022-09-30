import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Container, Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import { useHistory } from "react-router-dom";
import { logo } from "../../assets/images";
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        "& .MuiContainer-root": {
            maxWidth: 500,
            padding: "0 20px 0px 20px",
        },
        "& .MuiCheckbox-colorPrimary": {
            color: theme.palette.primary.blue,
            borderRadius: "50%",
        },
        "& .MuiSvgIcon-root": {
            width: 20,
            height: 20,
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
        borderTop: "2.8px solid #1f4bb1",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: theme.palette.primary.darkWhite,
        padding: "6px 12px 6px 12px",
        [theme.breakpoints.down("xs")]: {
            maxHeight: "110px",
        },
    },
    iconColor: {
        color: "blue",
    },
    iconColorRed: {
        color: "red",
    },
    iconCaution: {
        color: "#e6e6e6",
        marginRight: 10,
    },
    checkBoxContainer: {
        display: "flex",
        marginTop: 12,
    },
    btnWrapper: {
        display: "flex",
        flexDirection: " column",
        alignItems: "center",
        justifyContent: " center",
    },
    span: {
        color: "#1c60ef",
        borderBottom: "1px solid #1c60ef",
        marginLeft: 5,
        cursor: "pointer",
    },
    caution: {
        color: "#8a909a",
        fontFamily: "Gilroy-Regular",
        fontSize: 12,
        lineHeight: 1.5,
        textAlign: "left",
        marginBottom: 10,
    },
    break: {
        [theme.breakpoints.down("xs")]: {
            fontSize: 13,
        },
    },
}));

const TermsAnsCondition = () => {
    const history = useHistory();
    const classes = useStyles();
    const cancelProcess = () => {
        history.push("/createNewWallet");
    };
    const Continue = () => {
        history.push("/mnemonics");
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
                                    Fincor Wallet would like to gather usage data to use better
                                    understand how our user intract with extension. This data will
                                    be used continuously to improve the usability and ethereium
                                    ecosystem.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Fincor Wallet will</Typography>
                                <Box className={classes.checkBoxContainer}>
                                    <CheckCircleIcon className={classes.iconColor} />
                                    <Typography variant="h4">
                                        Allow you to opt-out via setting
                                    </Typography>
                                </Box>
                                <Box className={classes.checkBoxContainer}>
                                    <CheckCircleIcon className={classes.iconColor} />
                                    <Typography variant="h4">
                                        Send anonymized click and pageview events
                                    </Typography>
                                </Box>
                                <Box className={classes.checkBoxContainer}>
                                    <CancelIcon className={classes.iconColorRed} />
                                    <Typography variant="h4">
                                        Never collect keys, addresses, transaction, balances,
                                        hashes, or any other personl information
                                    </Typography>
                                </Box>
                                <Box className={classes.checkBoxContainer}>
                                    <CancelIcon className={classes.iconColorRed} />
                                    <Typography variant="h4">
                                        Will never collect your full IP address
                                    </Typography>
                                </Box>
                                <Box className={classes.checkBoxContainer}>
                                    <CancelIcon className={classes.iconColorRed} />
                                    <Typography variant="h4">
                                        Never set data for profit. EVER!
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={classes.btnWrapper}>
                                <Button onClick={Continue}>I agree</Button>
                                <Typography variant="body2" onClick={cancelProcess}>
                                    Cancel Process
                                </Typography>
                            </Box>
                            <Box className={classes.checkBoxContainer}>
                                <ErrorIcon className={classes.iconCaution} />
                                <Typography className={classes.caution}>
                                    This data is aggregated and there is therefore anonymous for the
                                    purpose of General Data Protection (EU) 20161679. For more
                                    information in relation to our privacy protection, please see
                                    our
                                    <span className={classes.span}>privacy policy</span>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default TermsAnsCondition;
