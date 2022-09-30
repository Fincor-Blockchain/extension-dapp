import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

import { transactionBg } from "../../../assets/images";

const useStyles = makeStyles((theme) => ({
  modalCentered: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: " 1rem;",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  setBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circleHeading: {
    fontFamily: "Poppins",
    fontSize: 80,
    fontWeight: 300,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.28",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#fff",
    position: "absolute",
  },
  Wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  circleText: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: 400,
    fontStyle: "italic",
    lineHeight: 1.5,
    textAlign: "center",
    color: "#8a909a",
    marginTop: 10,
  },
  img: {
    width: "100%",
    maxWidth: 190,
  },
  help: {
    fontSize: 12,
    lineHeight: 1.56,
    color: "#1f4bb1",
    marginBottom: 16,
    fontStyle: "italic",
  },
  span: {
    color: "#8aa7e4",
    cursor: "pointer",
  },
}));

const AccountData = () => {
  const classes = useStyles();
  return (
    <Box className={classes.Wrapper}>
      <Box className={classes.modalCentered}>
        <Box className={classes.setBox}>
          <img src={transactionBg} alt="transaction" className={classes.img} />
          <Typography className={classes.circleHeading}>0</Typography>
        </Box>
        <Typography className={classes.circleText}>
          There are no transactions!
        </Typography>
      </Box>
      <Typography className={classes.help}>
        Need help? Contact{" "}
        <span className={classes.span}>Fincor wallet Support</span>
      </Typography>
    </Box>
  );
};
export default AccountData;
