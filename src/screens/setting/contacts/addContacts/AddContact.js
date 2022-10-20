import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField } from "@material-ui/core";
import Header from "../../../../components/header/Header";
import { back } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import { isEmpty, validate } from "validate.js";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { allContacts } from "../../../../redux/contacts/actions";
import ExtensionStore from "../../../../utils/local-store";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    padding: "0 20px 0px 20px",
    "& .MuiContainer-root": {
      maxWidth: 560,
    },
    "& .MuiFormHelperText-root.Mui-error": {
      position: "absolute",
      top: 50,
      [theme.breakpoints.down("xs")]: {
        top: 40,
      },
    },
    "& .MuiOutlinedInput-root": {
      width: "100%",
      height: "42px",
      fontSize: 12,
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
    "& .input.MuiInputBase-input.MuiOutlinedInput-input": {
      color: theme.palette.primary.blue,
    },
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    position: "relative",
  },
  icon: {
    padding: 12,
    marginRight: 4,
    backgroundColor: theme.palette.primary.lightGray,
    color: theme.palette.primary.blue,
    borderRadius: "50%",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      padding: 7,
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
  qrWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 20,
    marginLeft: 30,
    cursor: "pointer",
  },
  scan: {
    fontFamily: "Poppins",
    fontSize: 15,
    lineHeight: 1.5,
    color: theme.palette.primary.blue,
    fontWeight: 400,
    marginLeft: 10,
  },
  help: {
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
  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: " solid 1px #e6e6e6",
    borderRadius: "30px",
    marginTop: 9,
  },
  bRed: {
    display: "flex",
    alignItems: "center",
    border: " solid 1px red",
    borderRadius: "30px",
    marginTop: 9,
  },
  linkColor: {
    textDecoration: "none",
    color: "#1f4bb1",
  },

  btn: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    maxWidth: "400px",
  },
  btn1: {
    padding: "16px 42px !important",
    marginBottom: "0px !important",
    color: "#d5da43",
    borderColor: "#d5da43",
    maxHeight: "40px",
    maxWidth: "180px !important",
    minWidth: "180px !important",
    width: "100% !important",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "105px !important",
      minWidth: "105px !important",
      width: "100% !important",
      padding: "15px 0px  !important",
    },
  },
  btn2: {
    margin: "0 !important",
    maxHeight: "40px",
    maxWidth: "180px !important",
    minWidth: "180px !important",
    width: "100% !important",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "105px !important",
      minWidth: "105px !important",
      width: "100% !important",
      padding: "16px 10px  !important",
    },
  },
  inputText: {
    width: "100%",
    marginBottom: 30,
    marginTop: 30,
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      margin: "0 auto",
      width: "100%",
      height: "42px",
      display: "flex",
      fontSize: 12,
      color: theme.palette.primary.blue,
      justifyContent: "center",
      alignItems: "center",
      border: " solid 1px #e6e6e6",
      // marginTop: 10,
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
}));

const schema = (t) => {
  return {
    address: {
      presence: { allowEmpty: false, message: t("contact.required") },
    },
    userName: {
      presence: { allowEmpty: false, message: t("contact.required") },
    },
  };
};

const AddContact = () => {
  const { t } = useTranslation(["common"]);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    address: "",
    userName: "",

    touched: {
      address: false,
      userName: false,
    },
    isValid: false,
  });
  const [hasAddressError, setAddressError] = useState(false);
  const contacts = useSelector((state) => state.wallet.contacts);

  const handleChangeInput = (evt) => {
    evt.persist();
    setAddressError(false);
    const value = evt.target.value;
    setState({
      ...state,
      touched: { ...state.touched, [evt.target.name]: true },
      [evt.target.name]: value,
    });
  };

  let errors = validate(
    {
      address: state.address,
      userName: state.userName,
    },
    schema(t)
  );
  errors = errors ? errors : {};

  // const validateAddress = () => {
  //   const { address } = state;
  //   const trimmedValue = address ? address.trim() : "";
  //   return FINCOR?.validateAddress(trimmedValue).bech32;
  // };

  const enabledTouchedValues = () => {
    const newState = {};
    Object.keys(errors).forEach((item) => {
      newState[item] = true;
    });
    setState({ ...state, touched: newState });
  };

  const data = {
    address: state.address,
    userName: state.userName,
    memo: "",
    id: new Date().valueOf(),
  };

  const onAddingContacts = () => {
    let objectContact;
    const check = contacts?.fincorContacts?.filter(
      (item) => data.address === item.address
    );
    let update = contacts?.fincorContacts?.map((item) => {
      if (data.address === item.address) {
        item.userName = state.userName;
      }
      return item;
    });
    if (check?.length === 0) {
      objectContact = {
        fincorContacts: [...contacts.fincorContacts, data],
      };
    } else {
      objectContact = {
        fincorContacts: update,
      };
    }
    return objectContact;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    enabledTouchedValues();
    if (!isEmpty(errors)) {
      return;
    }
    let fincorAddress = !state.address.includes("fincor");
    if (fincorAddress === true) {
      setAddressError(true);
      setState({
        ...state,
        touched: {
          address: true,
        },
      });
    } else {
      setState({
        ...state,
        isValid: true,
      });

      let updatedContacts = onAddingContacts();
      if (ExtensionStore.isSupported) {
        ExtensionStore.set({ contacts: updatedContacts });
      }
      dispatch(allContacts(updatedContacts));
      history.push("/contacts");
    }
  };

  const goBack = () => {
    history.goBack();
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
        <Box className={classes.main}>
          <Typography variant="h1">{t("contact.add")}</Typography>

          <Box className={classes.form}>
            <Box
              className={hasAddressError ? classes.bRed : classes.inputWrapper}
            >
              <TextField
                variant="outlined"
                name="address"
                value={state.address || ""}
                placeholder={t("contact.enter_address")}
                fullWidth
                onChange={handleChangeInput}
                error={
                  (hasAddressError && hasAddressError) ||
                  (state.touched.address && errors.address)
                }
                helperText={
                  hasAddressError
                    ? t("contact.invalidAddress")
                    : state.touched.address &&
                      errors.address &&
                      errors.address[0]
                    ? t("contact.addres_required")
                    : null
                }
                disabled={state.isValid}
              />
            </Box>
            <Box className={classes.inputText}>
              <TextField
                className={classes.bGray}
                variant="outlined"
                name="userName"
                error={state.touched.userName && errors.userName}
                helperText={
                  state.touched.userName &&
                  errors.userName &&
                  errors.userName[0]
                    ? t("contact.User_required")
                    : null
                }
                placeholder={t("contact.enterName")}
                fullWidth
                onChange={handleChangeInput}
                autoComplete="off"
                value={state.userName}
                type="text"
              />
            </Box>
          </Box>
          {/* <Box className={classes.btn}>
            <Button
              className={classes.btn1}
              // variant="outlined"
              onClick={goBack}
            >
              Cancel
            </Button>
            <Button className={classes.btn2} onClick={handleSubmit}>
              Save
            </Button>
          </Box> */}
          <Box className={classes.btn}>
            <Button
              className={classes.btn1}
              variant="outlined"
              onClick={goBack}
            >
              {t("contact.Cancel")}
            </Button>
            <Button
              className={classes.btn2}
              onClick={handleSubmit}
              // disabled={!selectedOption}
            >
              {t("contact.Save")}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AddContact;
