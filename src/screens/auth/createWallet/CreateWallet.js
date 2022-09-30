import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { createWallet, logo } from "../../../assets/images";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        "& .MuiContainer-root": {
            maxWidth: 500,
            padding: "0  50px",
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
}));
const CreateWallet = () => {
    const history = useHistory();
    const classes = useStyles();
    const routChange = () => {
        history.push("/createNewWallet");
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

                <Box className={classes.createWallet} onClick={routChange}>
                  <img
                    src={createWallet}
                    alt="createWallet"
                    className={classes.img}
                  />
                  <Typography variant="h2">Create New Wallet</Typography>
                  <Typography variant="h6">
                    Create a new wallet from 12 to 24 word seed phrase
                  </Typography>
                </Box>

                <Box
                  className={classes.createWallet}
                  marginTop="20px"
                  onClick={() => history.push("/restoreWallet")}
                >
                  <img
                    src={createWallet}
                    alt="createWallet"
                    className={classes.img}
                  />
                  <Typography variant="h2">Restore Wallet</Typography>
                  <Typography variant="h6">
                    Create a new wallet from 12 to 24 word seed phrase
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
};

export default CreateWallet;
