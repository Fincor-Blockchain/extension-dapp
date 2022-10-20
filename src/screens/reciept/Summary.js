/* eslint-disable no-useless-concat */
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Password } from "../../components/modal";
import FileEncryptionService from "../../services/fileEncryptionService";
import Fincor from "../../services/fincor";
import { denomToSymbol } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "90%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  container: {
    border: "solid 1px #e6e6e6",
    marginBottom: 10,
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #e6e6e6",
    padding: "20px 10px",
  },
  boxContainer1: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px 10px",
  },
  input: {
    borderRadius: "30px",
    border: "solid 1px #e6e6e6",
  },
  address: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "175px",
    [theme.breakpoints.down("xs")]: {
      width: "144px",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Summary = ({
  setIsVerification,
  sendCoinHanlder,
  state,
  selectedOption,
}) => {
  const classes = useStyles();
  const [hasPasswordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);

  const { encryptedData, address } = useSelector((state) => state.encrypt);
  const { activeAccounts } = useSelector((state) => state.wallet);

  const handleChange = (e) => {
    e.persist();
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const passwordHandler = async (e) => {
    e.preventDefault();
    try {
      const key = FileEncryptionService.createEncryptionKey(password);
      const decryptedDataJSON = FileEncryptionService.decryptData(
        encryptedData,
        key
      );
      const { mnemonic } = JSON.parse(decryptedDataJSON);
      Fincor.setPath(`m/44'/118'/${activeAccounts[0].index}'/0/0`); //hd path for fincor
      const ecpairPriv = Fincor.getECPairPriv(mnemonic);

      setIsVerification(false);
      sendCoinHanlder(ecpairPriv);
    } catch (error) {
      setPasswordError(true);
    }
  };

  return (
    <Box className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Box className={classes.boxContainer}>
            <Typography>From Address</Typography>
            <Typography className={classes.address}>{address}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.boxContainer}>
            <Typography>To Address</Typography>
            <Typography className={classes.address}>{state.address}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.boxContainer}>
            <Typography>Amount</Typography>
            <Typography>{state.amount + " " + "FNR"}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.boxContainer}>
            <Typography>Coin</Typography>
            <Typography>{denomToSymbol(selectedOption)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            className={
              state.memo ? classes.boxContainer : classes.boxContainer1
            }
          >
            <Typography>Fee</Typography>
            <Typography>0.001 FNR</Typography>
          </Box>
        </Grid>
        {state.memo && (
          <Grid item xs={12}>
            <Box className={classes.boxContainer1}>
              <Typography>Memo</Typography>
              <Typography
                className={classes.address}
                style={{ textAlign: "end" }}
              >
                {state.memo}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setVerify(true)}>Continue</Button>
      </Box>

      <Password
        isOpen={verify}
        password={password}
        setVerify={setVerify}
        hasPasswordError={hasPasswordError}
        setIsVerification={setIsVerification}
        onChange={handleChange}
        passwordHandler={passwordHandler}
      />
    </Box>
  );
};

export default Summary;
