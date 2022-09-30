//------Add Network-------
// This is just a UI Design
// Work in progress
// It will be used in future

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Header from "../../../components/header/Header";
import { useHistory } from "react-router-dom";
import { back } from "../../../assets/images";
import { validate } from "validate.js";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    padding: "0 20px 0px 20px",
    "& .MuiContainer-root": {
      maxWidth: 560,
    },
    "& .MuiFormHelperText-contained": {
      marginTop: -12,
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
  form: {
    width: "100%",
  },
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 15,
    },
  },
  RpcUrl: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },

  chainId: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 50,
    },
  },
  url: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 50,
    },
  },
  symbol: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 50,
    },
  },
};

const AddNetwork = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(state.values, schema);
    setState((state) => ({
      ...state,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [state.values]);

  const handleChange = (e) => {
    e.persist();
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
  const hasError = (field) => (state && state.errors[field] ? true : false);

  const goBack = () => {
    history.push("/network");
  };
  const handleSubmit = () => {
    // let data = {
    //     value: state.values,
    // };
  };
  return (
    <div className={classes.root}>
      <Container>
        <Header />
        <Box className={classes.main}>
          <Box className={classes.headingWrapper}>
            <img
              src={back}
              alt="back"
              onClick={goBack}
              className={classes.cursor}
            />
            <Typography variant="h1">Account 1</Typography>
            <CloseIcon onClick={goBack} className={classes.crossIcon} />
          </Box>
          <Box className={classes.dropDownContainer}>
            <Box className={classes.label}>Network name</Box>
            <TextField
              className={hasError("name") ? classes.bRed : classes.bGray}
              variant="outlined"
              name="name"
              error={hasError("name")}
              helperText={hasError("name") ? state.errors.name[0] : null}
              value={state.values.name || ""}
              fullWidth
              onChange={handleChange}
            />
          </Box>

          <Box className={classes.dropDownContainer}>
            <Box className={classes.label}>New RPC URl</Box>
            <TextField
              className={hasError("RpcUrl") ? classes.bRed : classes.bGray}
              variant="outlined"
              name="RpcUrl"
              error={hasError("RpcUrl")}
              helperText={hasError("RpcUrl") ? state.errors.RpcUrl[0] : null}
              value={state.values.RpcUrl || ""}
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.dropDownContainer}>
            <Box className={classes.label}>Chain ID</Box>
            <TextField
              className={hasError("chainId") ? classes.bRed : classes.bGray}
              variant="outlined"
              name="chainId"
              error={hasError("chainId")}
              helperText={hasError("chainId") ? state.errors.chainId[0] : null}
              value={state.values.chainId || ""}
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.dropDownContainer}>
            <Box className={classes.label}>Currency symbol</Box>
            <TextField
              className={hasError("symbol") ? classes.bRed : classes.bGray}
              variant="outlined"
              name="symbol"
              error={hasError("symbol")}
              helperText={hasError("symbol") ? state.errors.symbol[0] : null}
              value={state.values.symbol || ""}
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.dropDownContainer}>
            <Box className={classes.label}>Block explorer URL (optional</Box>
            <TextField
              className={hasError("url") ? classes.bRed : classes.bGray}
              variant="outlined"
              name="url"
              error={hasError("url")}
              helperText={hasError("url") ? state.errors.url[0] : null}
              value={state.values.url || ""}
              fullWidth
              onChange={handleChange}
            />
          </Box>

          <Button onClick={handleSubmit} disabled={!state.isValid}>
            Add
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AddNetwork;
