/*global chrome*/
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Container, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { bgImg1, bgImg2, logo } from "../../assets/images";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ExtensionStore from "../../utils/local-store";
import { setEncryptedData, setAddress } from "../../redux/encryption/actions";
import { getEnvironmentType } from "../../utils/utils";
import { activeIndex, setAccounts } from "../../redux/wallet/actions";
import FullPageLoader from "../../components/FullPageLoader";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
    },

    main: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    splash: {
        width: 170,
        marginBottom: "2.5rem",
        objectFit: "contain",
    },
    logo: {
        margin: "36px 0px 21px 0px",
    },
    bg1: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    iconBg: {
        width: 350,
        zIndex: 1,
    },
    bg2: {
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 1,
    },
    btn: {
        zIndex: 5,
        marginTop: 20,
    },
}));

const SplashScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const routChange = () => {
        history.push("/access-wallet");
    };

    useEffect(() => {
        if (ExtensionStore.isSupported) {
            ExtensionStore.get().then((data) => {
                const encryptedData = data?.encryptedData;
                const address = data?.address;
                const accounts = data?.accounts;
                const activeItemIndex = data?.activeItemIndex;
                if (data) {
                    if (encryptedData) dispatch(setEncryptedData(encryptedData));
                    if (address) dispatch(setAddress(address));
                    if (accounts) dispatch(setAccounts(accounts));
                    if (activeItemIndex) dispatch(activeIndex(activeItemIndex));
                }
                if (encryptedData && address) {
                    history.push("/dashboard");
                    setLoading(false);
                } else if (encryptedData) {
                    history.push("/unlock-wallet");
                    setLoading(false);
                } else {
                    const envType = getEnvironmentType();
                    if (envType === "POPUP") {
                        window
                            .open(chrome.runtime.getURL("index.html?type=Browser"), "_blank")
                            .focus();
                    }
                    setLoading(false);
                }
            });
        } else if (!ExtensionStore.isSupported) {
            setLoading(false);
        }
    }, [dispatch, history]);
    if (loading) {
        return (
            <div className={classes.root}>
                <FullPageLoader />
            </div>
        );
    }
    return (
        <div className={classes.root}>
            <Box className={classes.bg1}>
                <img src={bgImg1} alt="splash" className={classes.iconBg} />
            </Box>

            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.main}>
                            <img src={logo} className={classes.splash} alt="splashss" />
                            <Typography variant="h5">
                                You are about to experience ultimate one secure
                                <br /> stop for your digital wallet.
                            </Typography>
                            <Button className={classes.btn} onClick={routChange}>
                                Let's Start
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Box className={classes.bg2}>
                <img src={bgImg2} alt="splash" className={classes.iconBg} />
            </Box>
        </div>
    );
};
export default SplashScreen;
