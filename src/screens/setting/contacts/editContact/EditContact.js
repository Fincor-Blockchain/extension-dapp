import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField } from "@material-ui/core";
import Header from "../../../../components/header/Header";
import { back } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { allContacts } from "../../../../redux/contacts/actions";
import ExtensionStore from "../../../../utils/local-store";
import { FINCOR } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
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
      height: "50px",
      fontSize: 14,
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
  imgSend: {
    width: 35,
    height: 35,
    marginRight: 8,
  },
}));

// const schema = {
//   address: {
//     presence: { allowEmpty: false, message: "is required" },
//   },
// };

const EditContact = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.wallet.contacts);
  const active = useSelector((store) => store.wallet.activeContact);

  const [state, setState] = React.useState({
    address: active?.address,
    userName: active?.userName,
    memo: active?.memo,

    touched: {
      address: false,
    },
    isValid: false,
  });
  const [hasAddressError, setAddressError] = useState(false);
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

  // let errors = validate(
  //   {
  //     address: state.address,
  //   },
  //   schema
  // );
  // errors = errors ? errors : {};

  // For future use ////////////////////
  // const validateAddress = () => {
  //   const { address } = state;
  //   const trimmedValue = address ? address.trim() : "";
  //   return Fincor.validateAddress(trimmedValue);
  // };

  let list = contacts.fincorContacts;

  const onEditContact = () => {
    let editObj;
    let updated = list.map((item) => {
      if (item.id === active.id) {
        item.userName = state.userName;
        item.address = state.address;
        item.memo = state.memo;
      }
      return item;
    });

    editObj = {
      fincorContacts: updated,
    };

    return editObj;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      const updatedObject = onEditContact();
      if (ExtensionStore.isSupported) {
        ExtensionStore.set({ contacts: updatedObject });
      }
      dispatch(allContacts(updatedObject));
      history.push("/contacts");
    }
  };

  const goBack = () => {
    history.goBack();
  };
  const onDeleteContact = () => {
    let updated = list.filter((item) => item.id !== active.id);
    let deletedObj;
    deletedObj = {
      fincorContacts: updated,
    };
    return deletedObj;
  };
  const deleteContact = () => {
    const deleteContact = onDeleteContact();
    if (ExtensionStore.isSupported) {
      ExtensionStore.set({ contacts: deleteContact });
    }
    dispatch(allContacts(deleteContact));
    history.push("/contacts");
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
          <Typography variant="h1">Edit Contact</Typography>
          <Box className={classes.mainBox}>
            <img src={FINCOR} alt="fincor" className={classes.imgSend} />
          </Box>
          <Box className={classes.form}>
            <form>
              <Box className={classes.inputText}>
                <TextField
                  className={classes.bGray}
                  variant="outlined"
                  name="userName"
                  placeholder="Enter Username"
                  fullWidth
                  onChange={handleChangeInput}
                  autoComplete="off"
                  value={state.userName}
                  type="text"
                />
              </Box>
              <Box
                className={
                  hasAddressError ? classes.bRed : classes.inputWrapper
                }
              >
                <TextField
                  variant="outlined"
                  name="address"
                  value={state.address || ""}
                  placeholder="Enter public address"
                  fullWidth
                  onChange={handleChangeInput}
                  error={hasAddressError}
                  helperText={
                    hasAddressError ? "This address is invalid." : null
                  }
                  disabled={state.isValid}
                />
              </Box>
              <Box className={classes.inputText}>
                <TextField
                  className={classes.bGray}
                  variant="outlined"
                  name="memo"
                  placeholder="Enter Contact Description"
                  fullWidth
                  onChange={handleChangeInput}
                  autoComplete="off"
                  value={state.memo}
                  type="text"
                />
              </Box>
            </form>
          </Box>
          <Box className={classes.btn}>
            <Button
              className={classes.btn1}
              variant="outlined"
              onClick={deleteContact}
            >
              Delete
            </Button>
            <Button className={classes.btn2} onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default EditContact;
