import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  Button,
  FormHelperText,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { back, eye, eyeOff } from "../../../assets/images";
import Header from "../../../components/header/Header";
import ErrorIcon from "@material-ui/icons/Error";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import FileEncryptionService from "../../../services/fileEncryptionService";
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
  input: {
    outline: "none",
    padding: "10px 11.5px 10px 20.7px",
    backgroundColor: theme.palette.white,
    borderRadius: "30px",
    "& input.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd": {
      color: theme.palette.primary.blue,
      fontSize: "14px",
      fontFamily: "Gilroy-Regular",
      fontWeight: 300,
      letterSpacing: 1,
    },
  },
  form: {
    width: "100%",
    marginBottom: "10px",
  },
  headingWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0px 30px 0px",
  },
  icon: {
    padding: 12,
    marginRight: 1,
    backgroundColor: theme.palette.primary.lightSmokeGray,
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
  bodyWrapper: {
    width: "100%",
    borderTop: "2.8px solid #23224e",
    boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#f5f5f5",
    padding: "6px 12px 6px 12px",
  },
  CloseIcon: {
    color: theme.palette.white,
    padding: "7px",
    backgroundColor: theme.palette.primary.blue,
    borderRadius: 7,
    cursor: "pointer",
  },
  help: {
    margin: "20px 0px 18px 0px",
    fontFamily: "Gilroy-Regular",
    fontSize: 18,
    lineHeight: 2,
    color: theme.palette.primary.blue,
    fontWeight: 600,
  },
  checkBoxContainer: {
    width: "100%",
    display: "flex",
    marginTop: 12,
  },
  iconCaution: {
    color: theme.palette.primary.lightSmokeGray,
    marginRight: 10,
  },
  caution: {
    color: theme.palette.primary.darkGray,
    fontFamily: "Gilroy-Regular",
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: "left",
  },
  iconColor: {
    color: theme.palette.primary.blue,
  },
  cancel: {
    color: theme.palette.yellow,
    borderColor: theme.palette.yellow,
  },
  formSet: {
    width: "100%",
  },
}));

const SeedPhrase = (props) => {
  const { t } = useTranslation(["common"]);
  const history = useHistory();
  const classes = useStyles();
  const { encryptedData } = useSelector((state) => state.encrypt);
  const [password, setPassword] = useState("");
  const [hasPasswordError, setPasswordError] = useState(false);
  const [state, setState] = React.useState({
    showPassword: false,
  });

  const handleChange = (e) => {
    e.persist();
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
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

      history.push({
        pathname: "/backupReveal",
        state: { mnemonic: mnemonic },
      });
    } catch (error) {
      setPasswordError(true);
    }
  };
  const goBack = () => {
    history.push("/security&privacy");
  };
  const Cancel = () => {
    history.push("/setting");
  };

  return (
    <div className={classes.root}>
      <Container>
        <Header />
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
        <Box className={classes.main}>
          <Box className={classes.bodyWrapper}>
            <Typography variant="body1">{t("security.paragraph")}</Typography>
          </Box>
          <Typography className={classes.help}>
            {t("security.enterContinue")}
          </Typography>
          <form className={classes.formSet} onSubmit={passwordHandler}>
            <FormControl className={classes.form}>
              <Input
                type={state.showPassword ? "text" : "password"}
                value={password || ""}
                error={hasPasswordError}
                onChange={handleChange}
                name="password"
                disableUnderline={true}
                fullWidth={true}
                placeholder={t("security.enterPassowrd")}
                className={classes.input}
                style={
                  hasPasswordError
                    ? { border: "solid 1px red" }
                    : { border: "solid 1px #e6e6e6" }
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {state.showPassword ? (
                        <img src={eye} alt="eye" />
                      ) : (
                        <img src={eyeOff} alt="eye" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText style={{ color: "red", padding: "0px 16px" }}>
                {hasPasswordError ? t("security.Invalidpassword") : null}
              </FormHelperText>
            </FormControl>
          </form>
          <Box className={classes.checkBoxContainer}>
            <ErrorIcon className={classes.iconCaution} />
            <Typography className={classes.caution}>
              {t("security.text1")}
              <br /> {t("security.text2")}
            </Typography>
          </Box>
          <Button onClick={passwordHandler} type="submit">
            {t("security.Next")}
          </Button>

          <Typography
            className={classes.cancel}
            variant="body2"
            onClick={Cancel}
          >
            {t("security.CancelProcess")}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default SeedPhrase;
