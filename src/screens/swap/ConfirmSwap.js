//------Confirm Swap-------
// This is just a UI Design
// Work in progress
// It will be used in future
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/header/Header";
import { Box, Grid, Container, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ErrorIcon from "@material-ui/icons/Error";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { back } from "../../assets/images";
import { SwapList } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    padding: "0 20px 0px 14px",
    "& .MuiContainer-root": {
      maxWidth: 560,
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
  },

  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },
  iconCaution: {
    color: theme.palette.primary.lightSmokeGray,
    marginRight: 10,
  },
  checkBoxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  caution: {
    color: theme.palette.primary.darkGray,
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
  break: {
    fontSize: 12,
    color: theme.palette.primary.blue,
    fontWeight: 400,
  },
  break1: {
    fontSize: 15,
    color: theme.palette.primary.blue,
    fontWeight: 500,
  },
  quotes: {
    display: "flex",
    cursor: "pointer",
    marginTop: 15,
  },
  typo: {
    color: theme.palette.primary.blue,
    fontSize: 15,
    fontWeight: 600,
  },
  border: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid #f5f5f5",
    margin: "20px 0px",
  },
  listWrapper: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  estimate: {
    fontSize: 10,
    color: theme.palette.darkBlack,
    fontWeight: 500,
    lineHeight: 2,
  },
  center: {
    fontSize: 10,
    color: theme.palette.primary.darkGray,
    fontWeight: 300,
    lineHeight: 2,
  },
  last: {
    fontSize: 10,
    color: theme.palette.primary.blue,
    fontWeight: 500,
    lineHeight: 2,
  },
}));

const listData = [
  {
    networkname: "Estimated network fee",
    ETHPRICE: "0.0221542 ETH",
    amount: "$2545",
  },
  {
    networkname: "Estimated network fee",
    ETHPRICE: "0.0221542 ETH",
    amount: "$2545",
  },
  {
    networkname: "Estimated network fee",
    ETHPRICE: "0.0221542 ETH",
    amount: "$2545",
  },
  {
    networkname: "Estimated network fee",
    ETHPRICE: "0.0221542 ETH",
    amount: "$2545",
  },
];

const ConfirmSwap = (props) => {
  const history = useHistory();
  const [show, setShow] = useState({
    open: false,
  });
  const showModel = () => {
    setShow({ ...show, open: !show.open });
  };
  const classes = useStyles();
  const goBack = () => {
    history.push("/account");
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
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Typography variant="h1" style={{ marginTop: 20 }}>
                Swap
              </Typography>
              <Box className={classes.createWallet}>
                <Box className={classes.checkBoxContainer}>
                  <ErrorIcon className={classes.iconCaution} />
                  <Typography className={classes.caution}>
                    New Quotes in{" "}
                    <span style={{ color: "#23224e", fontWeight: 600 }}>
                      0:50
                    </span>
                  </Typography>
                </Box>
                <Box className={classes.bodyWrapper}>
                  <Typography variant="body1" className={classes.break}>
                    Convert 0.55 ETH to about
                  </Typography>
                  <Typography variant="body1" className={classes.break1}>
                    22.2154584558554 FNR
                  </Typography>
                  <Typography variant="body1" className={classes.break}>
                    1 ETH = 4452.2215485 FNR
                  </Typography>
                </Box>

                <Box className={classes.quotes}>
                  <Typography className={classes.typo} onClick={showModel}>
                    8 quotes available
                  </Typography>
                  <ChevronRightIcon style={{ color: "#1f4bb1" }} />
                </Box>
                <Box className={classes.border}>
                  {listData.map((item, index) => (
                    <Box className={classes.listWrapper} key={index}>
                      <Typography className={classes.estimate}>
                        {item.networkname}
                      </Typography>
                      <Typography className={classes.center}>
                        {item.ETHPRICE}
                      </Typography>
                      <Typography className={classes.last}>
                        {item.amount}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box className={classes.checkBoxContainer}>
                  <ErrorIcon className={classes.iconCaution} />
                  <Typography className={classes.caution}>
                    Quote includes 0.55% of Fincor fee
                  </Typography>
                </Box>
                <Button>Swap</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <SwapList showModel={showModel} open={show.open} />
    </div>
  );
};

export default ConfirmSwap;
