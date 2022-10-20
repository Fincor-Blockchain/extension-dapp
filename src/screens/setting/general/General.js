//------General-------
// This is just a UI Design
// Work in progress
// It will be used in future
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Divider from "@material-ui/core/Divider";
import { Grid, Container, Typography } from "@material-ui/core";
import Header from "../../../components/header/Header";
// import GeneralDropDownFirst from "./GeneralDropDownFirst";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
import LanguageDropDown from "./LanguageDropDown";
import { back } from "../../../assets/images";
import { useHistory } from "react-router-dom";
// import { MySwitch } from "../../../components/common";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    padding: "0 20px 0px 14px",
    "& .MuiContainer-root": {
      maxWidth: 560,
    },
    "& .MuiFormGroup-root": {
      flexDirection: "row",
    },
    "& .MuiDivider-light": {
      width: "100%",
      backgroundColor: "#707070",
      opacity: "25%",
      marginTop: 20,
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
    alignItems: "center",
  },
  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },
  radioButton: {
    "& .MuiIconButton-label": {
      color: theme.palette.yellow,
    },
    "& span.MuiIconButton-label": {
      color: theme.palette.yellow,
    },
  },
  sub1: {
    color: "#d5da43 !important",
  },
}));
const General = () => {
  const classes = useStyles();
  const history = useHistory();
  // const [state, setState] = React.useState({
  //   checked: false,
  //   checkedA: false,
  // });
  // const handleChange = (e) => {
  //   setState({
  //     ...state,
  //     [e.target.name]:
  //       e.target.type === "checkbox" ? e.target.checked : e.target.value,
  //   });
  // };

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
            <Typography variant="h1">General</Typography>
            {/* <Box className={classes.wrapper}>
              <Typography variant="subtitle1">Currency Conversion</Typography>
              <Typography className={classes.typo}>
                Updated Thu May 27 2021 14:16:07 GMT+0500
                <br /> (Pakistan Standard Time)
              </Typography>
            </Box>
            <GeneralDropDownFirst />
            <Divider light={true} /> */}
            {/* <Box className={classes.wrapper}>
              <Typography variant="subtitle1">Primary Currency</Typography>
              <Typography className={classes.typo}>
                Select native to prioritize displaying values in the native
                currency of the chain (e.g. ETH). Select Fiat to prioritize
                displaying values in your selected fiat currency.
              </Typography>
              <RadioGroup
                className={classes.radio}
                aria-label="gender"
                name="controlled-radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel
                  className={classes.radioButton}
                  value="ETH"
                  control={<Radio size="small" />}
                  label="ETH"
                />
                <FormControlLabel
                  className={classes.radioButton}
                  value="Fiats"
                  control={<Radio size="small" />}
                  label="Fiats"
                />
              </RadioGroup>
            </Box> */}

            {/* <Divider light={true} /> */}
            {/* <Box className={classes.wrapper}>
              <Typography variant="subtitle1">Current Language</Typography>
              <Typography className={classes.typo}>English</Typography>
            </Box> */}
            <LanguageDropDown />
            {/* <Divider light={true} /> */}
            {/* <Box className={classes.wrapperSwitch}>
              <Typography className={classes.sub1} variant="subtitle1">
                Use Blockies Identicon
              </Typography>
              <MySwitch
                value={state.checked}
                name="checked"
                onChange={handleChange}
              />
            </Box>
            <Divider light={true} /> */}
            {/* <Box className={classes.wrapperSwitch}>
              <Typography className={classes.sub1} variant="subtitle1">
                Hide token without balance
              </Typography>
              <MySwitch
                value={state.checkedA}
                name="checkedA"
                onChange={handleChange}
              />
            </Box> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default General;
