/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Header from "../../components/header/Header";
import { FINCOR } from "../../assets/images";
import SendToken from "./SendToken";
import { Scrollbars } from "react-custom-scrollbars-2";
import { back } from "../../assets/images";
import { useHistory } from "react-router-dom";
import { validate } from "validate.js";
import { NoData } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { SCALE } from "../../vars/scale";
import {
  sendTransaction,
  sendTransactionLoading,
  socketTerminateClient,
} from "../../redux/wallet/actions";
import { SuccessfullTxs } from "../../components/modal";

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
    width: "90%",
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
  mainBox: {
    // width: "270px",
    padding: "11px 16px",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    overflowX: "hidden",
    margin: "11px 7px 11px 10px",
    [theme.breakpoints.down("xs")]: {
      margin: "11px 7px 11px 0px",
    },
    borderBottom: "1px solid #eeeeee",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  linkColors: {
    textDecoration: "none",
  },
  // listing: {
  //   border: "solid 0.8px #8aa7e4",
  // },
  imgSend: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  account: {
    width: "100%",
    maxWidth: 200,
    fontFamily: "Poppins",
    fontSize: "0.725rem",
    fontWeight: 500,
    lineHheight: 2,
    color: "##8aa7e4",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
  userName: {
    textAlign: "left",
    color: "#464646",
  },
  displayContacts: {
    padding: "0px 5px",
    margin: "10px 0px 10px 0px",
  },
}));

const schema = {
  address: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const Reciept = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    privateKey: "",
    address: "",
    amount: 0,
    denom: "",
    fee: 0,
    memo: "",
    mode: 3,
    txId: "",
    touched: {
      address: false,
      amount: false,
    },
    isValid: false,
  });
  const [hasAddressError, setAddressError] = useState(false);
  const [hasAmountError, setAmountError] = useState(false);
  const [hasAmountZeroError, setAmountZeroError] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [hasPasswordError, setPasswordError] = useState(false);
  const [isVerify, setIsVerification] = useState(false);

  const [selectCoin, setSelectedCoin] = useState({
    amount: 0,
    denom: "",
  });

  const { coins, isSending, selectedCoin } = useSelector(
    (state) => state.wallet
  );
  const contacts = useSelector((state) => state.wallet.contacts);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setAmountError(false);
    setAmountZeroError(false);
    setIsOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    e.persist();
    setPasswordError(false);
    setPassword(e.target.value);
  };

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

  const inputChangeNumberHandler = (e) => {
    const { name, value } = e.target;
    var patt = /^[0-9]*(\.[0-9]{0,3})?$/.test(e.target.value);
    if (patt) {
      e.persist();
      setAmountError(false);
      setAmountZeroError(false);
      setState((state) => ({
        ...state,
        [name]: value,
        touched: {
          ...state.touched,
          [name]: true,
        },
      }));
    }
  };

  let errors = validate(
    {
      address: state.address,
    },
    schema
  );
  errors = errors ? errors : {};

  // const validateAddress = () => {
  //   const { address } = state;
  //   const trimmedValue = address.trim();

  //   return Fincor.validateAddress(trimmedValue).bech32;
  // };

  const validateAmount = () => {
    const balance = selectCoin.amount / SCALE;
    const { amount, fee } = state;
    const intAmount = parseFloat(amount);
    return !!intAmount && intAmount + fee <= balance;
  };

  const validateZeroAmount = () => {
    const { amount } = state;
    if (amount <= 0) {
      return true;
    } else {
      return false;
    }
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
    }
  };

  const hanldeSendCoin = async (e) => {
    e.preventDefault();
    dispatch(socketTerminateClient());
    if (!validateAmount()) {
      if (!validateZeroAmount()) {
        setAmountError(true);
        setAmountZeroError(false);
      } else {
        setAmountZeroError(true);
        setAmountError(false);
      }
    } else {
      setIsVerification(true);
    }
  };

  const sendCoinHanlder = async (ecpairPriv) => {
    const { address, amount, memo, denom } = state;

    try {
      const txId = await dispatch(
        sendTransaction(address, amount, 0, memo, denom, ecpairPriv)
      );
      setState({ mode: 3, txId });

      if (txId) {
        setPassword("");
        setModalOpen(true);
      }
    } catch (error) {
      dispatch(sendTransactionLoading(false));
    }
  };

  const getContactDetail = (item) => {
    setState((state) => ({
      ...state,
      address: item.address,
      isValid: true,
    }));
  };
  useEffect(() => {
    const sc = coins && coins.filter((item) => item.denom === selectedOption);

    if (sc?.length > 0) {
      setSelectedCoin((selectCoin) => ({
        ...selectCoin,
        amount: sc[0].amount,
        denom: sc[0].denom,
      }));
      setState((state) => ({
        ...state,
        amount: 0,
        denom: sc[0].denom,
        fee: 0,
        memo: "",
      }));
    } else {
      selectedCoin && setSelectedOption(selectedCoin.denom);
    }

    return () => {};
  }, [selectedOption, selectedCoin]);

  const goBack = () => {
    history.goBack();
  };

  let list = contacts?.fincorContacts;
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
          <Typography variant="h1">
            {isVerify ? "Transaction Summary" : "Add Recipient"}
          </Typography>
          {isVerify ? null : (
            <Box className={classes.form}>
              <form onSubmit={handleSubmit}>
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
                  <SearchIcon
                    className={classes.icon}
                    fontSize="small"
                    type="submit"
                    onClick={handleSubmit}
                  />
                </Box>
              </form>
              {/* <Box className={classes.qrWrapper}>
                            <img src={qrIcon} alt="qr" />
                            <Typography className={classes.scan}>Scan Qr</Typography>
                        </Box> */}
            </Box>
          )}
        </Box>
        {state.isValid ? (
          <SendToken
            state={state}
            errors={errors}
            goBack={goBack}
            inputChangeNumberHandler={inputChangeNumberHandler}
            handleChangeInput={handleChangeInput}
            isOpen={isOpen}
            handleClose={handleClose}
            toggling={toggling}
            selectedOption={selectedOption}
            onOptionClicked={onOptionClicked}
            coins={coins}
            selectCoin={selectCoin}
            isSending={isSending}
            hanldeSendCoin={hanldeSendCoin}
            hasAmountError={hasAmountError}
            hasAddressError={hasAddressError}
            hasAmountZeroError={hasAmountZeroError}
            isVerify={isVerify}
            password={password}
            setIsVerification={setIsVerification}
            hasPasswordError={hasPasswordError}
            onChange={handleChange}
            sendCoinHanlder={sendCoinHanlder}
          />
        ) : list?.length ? (
          <Scrollbars style={{ height: 300 }}>
            <Box className={classes.displayContacts}>
              {list &&
                list?.map((item, index) => (
                  <div
                    onClick={() => getContactDetail(item)}
                    // to="/view-contact"
                    className={classes.linkColors}
                    key={index}
                  >
                    <Box className={classes.mainBox}>
                      <img
                        src={FINCOR}
                        alt="fincor"
                        className={classes.imgSend}
                      />
                      <Box>
                        <Typography className={classes.userName}>
                          {item.userName}
                        </Typography>
                        <Typography className={classes.account}>
                          {item.address}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                ))}
            </Box>
          </Scrollbars>
        ) : (
          <NoData description="There are no recipient!" />
        )}
        <Typography className={classes.help}>
          Need help? Contact{" "}
          <span className={classes.span}>Fincor wallet Support</span>
        </Typography>

        <SuccessfullTxs isOpen={isModalOpen} txHash={state.txId} />
      </Container>
    </div>
  );
};

export default Reciept;
