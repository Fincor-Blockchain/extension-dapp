import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Container, Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { back, copyIcon } from "../../../assets/images";
import { Header } from "../../../components";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    "& .MuiContainer-root": {
      maxWidth: 500,
    },
    "& .MuiFormHelperText-root": {
      color: "red",
    },
  },

  main: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  headingWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0px 30px 0px",
  },
  logo: {
    margin: "21px 0px 21px 0px",
  },
  bodyWrapper: {
    width: "100%",
    borderTop: "2.8px solid #23224e",
    boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: theme.palette.smokeWhite,
    padding: "6px 12px 10px 12px",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "110px",
    },
  },

  numberBox: {
    width: 22,
    height: 42,
    backgroundColor: theme.palette.primary.blue,
    position: "absolute",
    marginTop: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 18,
    lineHeight: 1.27,
    textAlign: "center",
    color: theme.palette.white,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    zIndex: 1,
    transition: ".5s ease-out",
  },
  copy: {
    display: "flex",
    margin: "15px 0px 10px 0px",
    cursor: "pointer",
  },
  img: {
    marginRight: 10,
  },
  CloseIcon: {
    color: theme.palette.white,
    padding: "7px",
    backgroundColor: theme.palette.primary.blue,
    borderRadius: 7,
    cursor: "pointer",
  },
  InputBox: {
    width: "100%",
    "&.Mui-focused": {
      border: "none",
    },

    "& .MuiOutlinedInput-input": {
      fontFamily: "Gilroy-Light",
      fontSize: "14px",
      fontWeight: "300",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.5",
      letterSpacing: "normal",
      textAlign: "left",
      color: theme.palette.primary.blue,
      paddingLeft: 30,
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      marginRight: 12,
      width: "120px",
      height: "42px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: " solid 1px #e6e6e6",
      marginTop: 10,
      [theme.breakpoints.down("xs")]: {
        width: "84px",
      },
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none ",
      },
      "&.Mui-focused fieldset": {
        border: "none ",
      },
    },
  },
  copyText: {
    display: "flex",
    padding: "7.5px 0px !important",
    maxWidth: "165px",
    width: "100%",
    marginTop: 30,
    border: "1px solid #d5da43 !important",
    backgroundColor: "#fff !important",
    marginBottom: "0px !important",
  },
  copyImg: {
    objectFit: "contain",
    cursor: "pointer",
    height: 20,
  },
  copied: {
    maxWidth: "70px !important",
    width: "100% !important",
  },
}));

const ConfirmSeedPhrase = (props) => {
  const { t } = useTranslation(["common"]);
  const history = useHistory();
  const classes = useStyles();
  const mnemonic = (props.location && props.location.state.mnemonic) || {};
  const nemonics = mnemonic && mnemonic.split(" ");
  const [wasCopied, setWasCopied] = useState(false);
  const copyMnemonics = () => {
    const arr = [];
    nemonics.map((item, i) =>
      arr.push({
        mnemonicsName: item,
        index: i,
      })
    );
    copy(
      arr.map((mnmonics) => mnmonics.index + 1 + ": " + mnmonics.mnemonicsName)
    );
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 3000);
  };
  const goBack = () => {
    history.push("/backupPassword");
  };
  const Cancel = () => {
    history.push("/setting");
  };
  return (
    <div className={classes.root}>
      <Container>
        <Header />
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Box className={classes.headingWrapper}>
                <img
                  src={back}
                  alt="back"
                  style={{ cursor: "pointer" }}
                  onClick={goBack}
                />
                <Typography variant="h1" style={{ margin: "unset" }}>
                  {t("security.SecretRecoveryPhrase")}
                </Typography>
                <Box></Box>
              </Box>
              <Box className={classes.bodyWrapper}>
                <Typography variant="body1">
                  {t("security.paragraph")}
                </Typography>
              </Box>

              <Typography variant="h3">
                {t("security.privateSecret")}
              </Typography>

              <Grid container spacing={2} className={classes.InputBox}>
                {nemonics &&
                  nemonics.map((item, i) => (
                    <Grid item xs={4} key={i}>
                      <Box>
                        <Box className={classes.numberBox}>{i + 1}</Box>
                        <TextField variant="outlined" value={item} />
                      </Box>
                    </Grid>
                  ))}
              </Grid>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Button className={classes.copyText} onClick={copyMnemonics}>
                  <img src={copyIcon} alt="img" className={classes.copyImg} />
                  {wasCopied ? (
                    <Typography variant="body1" className={classes.copied}>
                      {t("security.Copied")}
                    </Typography>
                  ) : (
                    <Typography variant="body1" className={classes.copied}>
                      {t("security.Copy")}
                    </Typography>
                  )}
                </Button>
              </Box>

              <Button onClick={Cancel}>{t("security.Close")}</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default ConfirmSeedPhrase;
