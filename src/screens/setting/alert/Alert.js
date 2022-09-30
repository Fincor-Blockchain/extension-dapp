//------Alert-------
// This is just a UI Design
// Work in progress
// It will be used in future

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Header from "../../../components/header/Header";
import { back } from "../../../assets/images";
import { MySwitch } from "../../../components/common";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    padding: "0 20px 0px 20px",
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
  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },
  main: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  typo: {
    marginBottom: 12,
    color: "#23224e !important",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "18px !important",
    textAlign: "left",
    lineHeight: 1.5,
  },
  wrapperSwitch: {
    width: "100%",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
}));

const Alert = () => {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked: false,
    checkedA: false,
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

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
        <Box className={classes.main}>
          <Typography variant="h1">Alerts</Typography>
          <Box className={classes.wrapperSwitch}>
            <Typography className={classes.typo}>
              Browsing a website with an unconnected <br /> account selected
            </Typography>
            <MySwitch
              value={state.checked}
              name="checked"
              onChange={handleChange}
            />
          </Box>
          <Divider light={true} />
          <Box className={classes.wrapperSwitch}>
            <Typography className={classes.typo}>
              When a website tries to use the removed
              <br /> window.web3 APIs
            </Typography>
            <MySwitch
              value={state.checkedA}
              name="checkedA"
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Alert;
