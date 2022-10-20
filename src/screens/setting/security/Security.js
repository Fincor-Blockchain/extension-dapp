import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Container, Typography, Button } from "@material-ui/core";
import Header from "../../../components/header/Header";
import { useHistory } from "react-router-dom";
import { back } from "../../../assets/images";
import { useTranslation } from "react-i18next";

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
    maxWidth: 400,
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
    color: "#707070",
    fontFamily: "Gilroy-Regular",
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
  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },
  btn: {
    marginTop: 15,
    borderColor: theme.palette.yellow,
    padding: "18px 20px !important",
    color: theme.palette.primary.blue,
    fontSize: "12px",
    fontWeight: "normal",
  },
}));
const Security = () => {
  const { t } = useTranslation(["common"]);
  const history = useHistory();
  const classes = useStyles();

  const goBack = (e) => {
    history.push("/setting");
  };

  const BackupPassword = (e) => {
    history.push("/backupPassword");
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
            <Typography variant="h1">{t("setting.security")}</Typography>
            <Box className={classes.wrapper}>
              <Typography variant="subtitle1">
                {t("security.revealPhrases")}
              </Typography>
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={BackupPassword}
              >
                {t("security.clickphrases")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Security;
