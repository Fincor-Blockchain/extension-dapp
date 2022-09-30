import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Box, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { back } from "../../../assets/images";
import { NoData } from "../../common";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 14px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiDialog-paper": {
            margin: "0px",
            width: "100vw",
            maxWidth: "415px",
            border: "solid 1px #d5d5d5",
            boxShadow: "none",
        },
        "& .MuiBackdrop-root": {
            backgroundColor: theme.palette.white,
        },
        "& .MuiSvgIcon-root": {
            color: theme.palette.white,
            padding: "7px",
            backgroundColor: theme.palette.primary.blue,
            borderRadius: 7,
            cursor: "pointer",
        },
    },

    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    headingWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 15,
    },
    text: {
        fontFamily: "Poppins",
        fontSize: 12,
        fontWeight: 500,
        fontStretch: " normal",
        fontStyle: "normal",
        lineHeight: " normal",
        letterSpacing: " normal",
        textAlign: "center",
        color: theme.palette.yellow,
        marginTop: -20,
        marginBottom: 16,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ConnectedSites = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Dialog
                            className={classes.root}
                            open={props.open}
                            TransitionComponent={Transition}>
                            <Box className={classes.main}>
                                <Box className={classes.headingWrapper}>
                                    <img
                                        src={back}
                                        alt="back"
                                        onClick={props.toggleModal}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <Typography variant="h1">Connected sites</Typography>
                                    <CloseIcon onClick={props.toggleModal} />
                                </Box>
                                <NoData description="Account 1 is not connected to any  sites" />
                                <Typography variant="text" className={classes.text}>
                                    Manually connect to current sites
                                </Typography>
                            </Box>
                        </Dialog>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default ConnectedSites;
