import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Box, Typography, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { check } from "../../../assets/images";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 14px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiDialog-paper": {
            overflow: "hidden",
            margin: "0px",
            width: "100vw",
            maxWidth: "415px",
            border: "solid 1px #d5d5d5",
            boxShadow: "none",
            height: "600px",
            display: "flex",
            justifyContent: "center",
            [theme.breakpoints.down("xs")]: {
                height: "auto",
            },
        },
        "& .MuiBackdrop-root": {
            backgroundColor: theme.palette.white,
        },

        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            margin: "0 auto",
            width: "90%",
            height: "42px",
            display: "flex",
            fontSize: 12,
            color: theme.palette.primary.blue,
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #23224e",
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

    close: {
        color: "#fff",
        padding: "7px",
        backgroundColor: theme.palette.primary.blue,
        borderRadius: 7,
        cursor: "pointer",
    },
    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "64px 0px",
    },
    img: {
        width: 155,
        height: 150,
        margin: "30px 0",
        objectFit: "contain",
    },

    address: {
        color: "#000",
        fontSize: 36,
        fontFamily: "Gilroy-Bold",
        fontWeight: 600,
    },
    key: {
        color: "#000",
        lineHeight: 1.5,
        fontSize: 16,
        fontFamily: "Gilroy-Medium",
        fontWeight: 500,
    },
    btn: {
        display: "flex",
        padding: " 0px !important",
        maxWidth: "240px",
        width: "100%",
        marginTop: 30,
        height: 49,
        fontFamily: "Gilroy-Medium",
        border: "1px solid #23224e !important",
        backgroundColor: "#fff !important",
        marginBottom: "0px !important",
        color: "#23224e ",
    },
    goBack: {
        color: "#000",
        lineHeight: 1.5,
        fontSize: 12,
        fontFamily: "Gilroy-Medium",
        fontWeight: 500,
        marginTop: "2rem",
    },
    label: {
        color: "#d5da43",
        cursor: "pointer",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const RestoreModal = (props) => {
    const { isOpen, toggle } = props;
    const history = useHistory();
    const classes = useStyles();

    const Continue = () => {
        history.push("/unlock-wallet");
    };
    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Dialog
                            className={classes.root}
                            open={isOpen}
                            onClose={toggle}
                            TransitionComponent={Transition}>
                            <Box className={classes.main}>
                                <Typography className={classes.address}>
                                    Congratulations!
                                </Typography>
                                <img src={check} alt="victory" className={classes.img} />

                                <Typography className={classes.key}>
                                    Your wallet has been restore successfully
                                </Typography>

                                <Button onClick={Continue} className={classes.btn}>
                                    Continue to wallet
                                </Button>
                            </Box>
                        </Dialog>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default RestoreModal;
