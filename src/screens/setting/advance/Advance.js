//------Advance-------
// This is just a UI Design
// Work in progress
// It will be used in future

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import Header from "../../../components/header/Header";
import { back } from "../../../assets/images";
import { useHistory } from "react-router-dom";
import { MySwitch } from "../../../components/common";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    padding: "0 20px 0px 14px",
    "& .MuiContainer-root": {
      maxWidth: 560,
    },
    "& .MuiDivider-light": {
      width: "100%",
      backgroundColor: "#707070",
      opacity: "25%",
      marginTop: 20,
    },
    "& .MuiFormGroup-root": {
      flexDirection: "row",
    },
    "& .MuiTypography-body1": {
      color: "gray",
      fontSize: 15,
      [theme.breakpoints.down("xs")]: {
        fontSize: 13,
      },
    },
    "& .MuiSwitch-root": {
      marginTop: 19,
    },
    "& .MuiOutlinedInput-root": {
      width: "80%",
      height: "50px",
      fontSize: 14,
      border: " solid 1px #e6e6e6",
      borderRadius: 30,
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
    "& span.MuiIconButton-label": {
      color: theme.palette.primary.blue,
    },
  },

  main: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },

  createWallet: {
    width: "100%",
    maxWidth: 430,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: 12,
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  typo: {
    marginBottom: 12,
    color: "#23224e !important",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 14,
    textAlign: "left",
    lineHeight: 1.5,
  },
  wrapperSwitch: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  wrapperSwitch1: {
    flexDirection: "column",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    height: 45,
    borderRadius: 30,
    width: "35%",
  },
  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },
  timer: {
    display: "flex",
    alignItems: "center",
  },
  btn1: {
    borderColor: theme.palette.yellow,
    color: theme.palette.primary.blue,
    padding: "18px 40px !important",
    width: "300px",
  },
}));

const Advance = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    checked: false,
    checkedA: false,
    checkedB: false,
    checkedC: false,
    number: "",
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const goBack = () => {
    history.push("/setting");
  };
  return (
    <div className={classes.root}>
      <Container>
        <Header />
        <img
          src={back}
          alt="left-arrow"
          className={classes.iconback}
          onClick={goBack}
        />
        <Grid container className={classes.main}>
          <Grid item xs={12} className={classes.createWallet}>
            <Typography variant="h1">Advance</Typography>
            <Box className={classes.wrapper}>
              <Typography variant="subtitle1">State logs</Typography>
              <Typography className={classes.typo}>
                State logs contain your public account addresses and sent
                transactions.
              </Typography>
              <Button variant="outlined" className={classes.btn1}>
                Download state logs
              </Button>
            </Box>

            <Divider light={true} />
            <Box className={classes.wrapper}>
              <Typography variant="subtitle1">Sync with mobile</Typography>
              <Button variant="outlined" className={classes.btn1}>
                Sync with mobile
              </Button>
            </Box>

            <Divider light={true} />
            <Box className={classes.wrapper}>
              <Typography variant="subtitle1">Reset Account</Typography>
              <Typography className={classes.typo}>
                Resetting your account will clear your transaction history. This
                will not change the balances in your accounts or require you to
                re-enter your seed phrase.
              </Typography>
              <Button variant="outlined" className={classes.btn1}>
                Reset Account
              </Button>
            </Box>
            <Divider light={true} />

            <Box className={classes.wrapperSwitch}>
              <Box>
                <Typography variant="subtitle1">Advance gas control</Typography>
                <Typography className={classes.typo}>
                  Select this to show gas price and limit controls directly on
                  the send and confirm screens.
                </Typography>
              </Box>
              <MySwitch
                onChange={handleChange}
                name="checked"
                value={state.checked}
              />
            </Box>
            <Divider light={true} />
            <Box className={classes.wrapperSwitch}>
              <Box>
                <Typography variant="subtitle1">Show Hexa data</Typography>
                <Typography className={classes.typo}>
                  Select this to show the hex data field on the send screen
                </Typography>
              </Box>
              <MySwitch
                value={state.checkedA}
                name="checkedA"
                onChange={handleChange}
              />
            </Box>
            <Divider light={true} />
            <Box className={classes.wrapperSwitch}>
              <Box>
                <Typography variant="subtitle1">
                  Show Conversion on Testnets
                </Typography>
                <Typography className={classes.typo}>
                  Select this to show fiat conversion on Testnets
                </Typography>
              </Box>

              <MySwitch
                value={state.checkedB}
                name="checkedB"
                onChange={handleChange}
              />
            </Box>
            <Divider light={true} />
            <Box className={classes.wrapperSwitch}>
              <Box>
                <Typography variant="subtitle1">
                  Customize transaction nonce
                </Typography>
                <Typography className={classes.typo}>
                  Turn this on to change the nonce (transaction number) on
                  confirmation screens. This is an advanced feature, use
                  cautiously.
                </Typography>
              </Box>

              <MySwitch
                value={state.checkedC}
                name="checkedC"
                onChange={handleChange}
              />
            </Box>
            <Divider light={true} />
            <Box className={classes.wrapperSwitch1}>
              <Typography variant="subtitle1">Auto lock timer</Typography>
              <Box className={classes.timer}>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  name="number"
                  type="number"
                  value={state.number}
                  fullWidth
                  onChange={handleChange}
                />
                <Button className={classes.btn}>save</Button>
              </Box>
            </Box>
            <Divider light={true} />
            <Box className={classes.wrapperSwitch}>
              <Box>
                <Typography variant="subtitle1">
                  Sync data with 3Box (experimental)
                </Typography>
                <Typography className={classes.typo}>
                  Turn on to have your settings backed up with 3Box. This
                  feature is currently experimental; use at your own risk.
                </Typography>
              </Box>

              <MySwitch
                value={state.checkedD}
                name="checkedD"
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Advance;
