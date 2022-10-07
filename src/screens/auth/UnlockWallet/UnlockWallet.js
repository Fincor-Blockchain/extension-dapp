/*global chrome*/

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { validate } from "validate.js";
import { bgImg1, bgImg2, eye, eyeOff, logo } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { schema } from "../../../utils/contant";
import fileEncryptionService from "../../../services/fileEncryptionService";
import { login } from "../../../redux/auth/actions";
import ExtensionStore from "../../../utils/local-store";
import {
  setEncryptedData,
  setAddress,
} from "../../../redux/encryption/actions";
import {
  activeAccount,
  activeIndex,
  setAccounts,
} from "../../../redux/wallet/actions";
import Fincor from "../../../services/fincor";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: theme.palette.primary.light,
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    "& .MuiContainer-root": {
      maxWidth: 560,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      margin: "0 auto",
      width: "100%",
      height: "42px",
      display: "flex",
      fontSize: 14,
      color: theme.palette.primary.blue,
      justifyContent: "center",
      alignItems: "center",
      border: " solid 1px #e6e6e6",
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
  input: {
    "&::placeholder": {
      color: "#23224e",
      fontWeight: 300,
    },
  },
  bRed: {
    "& .MuiOutlinedInput-root": {
      border: " solid 1px red",
    },
  },
  bGray: {
    "& .MuiOutlinedInput-root": {
      border: " solid 1px #e6e6e6",
    },
  },
  main: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },

  createWallet: {
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: 12,
    position: "relative",
    zIndex: 5,
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
  heading1: {
    fontSize: 27,
    fontFamily: "Gilroy-Medium",
  },
  heading2: {
    fontSize: 14,
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#d5d5d5",
    borderColor: "transparent",
    marginTop: -8,
  },
  icon: {
    width: 170,
    objectFit: "contain",
    marginBottom: "3rem",
  },
  btn: {
    padding: "24px 120px !important",
    fontSize: "20px !important",
  },
  help: {
    margin: "10px 0px 10px 0px",
    fontSize: 12,
    lineHeight: 1.56,
    color: theme.palette.primary.darkGray,
    marginBottom: 16,
    fontStyle: "normal",
  },

  span: {
    color: theme.palette.yellow,
    cursor: "pointer",
  },
  text: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    zIndex: 5,
    [theme.breakpoints.down("xs")]: {
      bottom: -5,
    },
  },
  eyebox: {
    width: 26,
    height: 26,
    objectFit: "contain",
    position: "absolute",
    right: 10,
    top: 18,
    cursor: "pointer",
  },
  linkStyle: {
    textDecoration: "none",
    color: "#000000",
  },
  recoveryPhrase: {
    color: "#d5da43",
  },
  iconEye: {
    position: "absolute",
    right: 16,
    top: 20,
    cursor: "pointer",
  },
}));

const UnlockWallet = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    showPassword: false,
  });
  const [hasPasswordError, setPasswordError] = useState(false);
  // const [change, setChange] = useState(false);
  const { encryptedData } = useSelector((state) => state.encrypt);
  const { activeAccounts, activeItemIndex } = useSelector(
    (state) => state.wallet
  );
  const handleChange = (e) => {
    e.persist();
    setPasswordError(false);
    setState((state) => ({
      ...state,
      values: {
        ...state.values,
        [e.target.name]: e.target.value,
      },
      touched: {
        ...state.touched,
        [e.target.name]: true,
      },
    }));
  };
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const unlockWalletwithPassword = async (e) => {
    e.preventDefault();
    try {
      const key = fileEncryptionService.createEncryptionKey(
        state.values.password
      );
      const decryptedDataJSON = fileEncryptionService.decryptData(
        encryptedData,
        key
      );
      const { accounts, mnemonic, contacts } = JSON.parse(decryptedDataJSON);
      Fincor.setBech32MainPrefix("fincor");
      Fincor.setPath(`m/44'/118'/${activeAccounts[0].index}'/0/0`); //hd path for fincor
      const address = await Fincor.getAddress(mnemonic);
      if (ExtensionStore.isSupported) {
        ExtensionStore.set({
          address,
          accounts,
          activeAccounts,
          activeItemIndex,
        });
      } else {
        await dispatch(setAddress(address));
        await dispatch(setAccounts(accounts));
        await dispatch(activeAccount(activeAccounts));
        await dispatch(activeIndex(activeItemIndex));
      }

      dispatch(login());
      // setChange(true);
      history.push("/dashboard");

      return { error: null, accounts, mnemonic, contacts };
    } catch (error) {
      console.log(error, "error");
      setPasswordError(true);
      return {
        error,
        accounts: null,
        mnemonic: null,
        contacts: null,
      };
    }
  };

  useEffect(() => {
    const errors = validate(state.values, schema);
    setState((state) => ({
      ...state,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [state.values]);

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
      });
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (ExtensionStore.isSupported) {
  //     return chrome.storage.onChanged.addListener(function () {
  //       dispatch(login());
  //       history.push("/dashboard");
  //     });
  //   }
  // }, [change, history, dispatch]);

  return (
    <div className={classes.root}>
      <Box className={classes.bg1}>
        <img src={bgImg1} alt="splash" className={classes.iconBg} />
      </Box>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <img src={logo} alt="splash" className={classes.icon} />
              <Typography variant="h1" className={classes.heading1}>
                Welcome Back!
              </Typography>
              <Typography variant="h1" className={classes.heading2}>
                The decentralized web awaits
              </Typography>

              <form
                className={classes.createWallet}
                onSubmit={unlockWalletwithPassword}
              >
                <TextField
                  type={state.showPassword ? "text" : "password"}
                  className={hasPasswordError ? classes.bRed : classes.bGray}
                  variant="outlined"
                  name="password"
                  error={hasPasswordError}
                  helperText={hasPasswordError ? "Invalid Password" : null}
                  value={state.values.password || ""}
                  placeholder="Type your password"
                  fullWidth
                  onChange={handleChange}
                  InputProps={{
                    classes: { input: classes.input },
                  }}
                />
                <Box
                  className={classes.iconEye}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {state.showPassword ? (
                    <img src={eye} alt="eye" />
                  ) : (
                    <img src={eyeOff} alt="eye" />
                  )}
                </Box>
                <Button
                  className={classes.btn}
                  onClick={unlockWalletwithPassword}
                  type="submit"
                >
                  Unlock
                </Button>
                <a
                  href={`chrome-extension://${chrome?.runtime?.id}/index.html?type=Browser#/restore-phrase`}
                  target="_blank"
                  className={classes.linkStyle}
                  rel="noreferrer"
                >
                  or{" "}
                  <span className={classes.recoveryPhrase}>
                    import using seed phrase
                  </span>
                </a>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box className={classes.text}>
        <Typography className={classes.help}>
          Need help? Contact &nbsp;
          <span className={classes.span}> Fincor wallet Support</span>
        </Typography>
      </Box>

      <Box className={classes.bg2}>
        <img src={bgImg2} alt="splash" className={classes.iconBg} />
      </Box>
    </div>
  );
};

export default UnlockWallet;
