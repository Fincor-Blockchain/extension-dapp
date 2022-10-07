import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { arrowUp, back, buyIcon, FNR } from "../../assets/images";
import { useHistory } from "react-router-dom";

import {
  CircularProgress,
  Box,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import copy from "copy-to-clipboard";
import { Account, ConnectedSites, NoData } from "../../components";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import { SCALE } from "../../vars/scale";
import { denomToSymbol, NumberFormat } from "../../utils/utils";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
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
  img: {
    width: 133,
    height: 138.8,
    objectFit: "contain",
  },

  logo: {
    margin: "20px 0px 12px 0px",
  },
  headingWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  createWallet: {
    width: "100%",
    maxWidth: 370,
    border: "solid 0.8px #d5d5d5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: 12,
    minHeight: "470px",
  },
  titleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  account: {
    width: "100%",
    maxWidth: 287,
    fontFamily: "Gilroy-Regular",
    fontSize: 15,
    fontWeight: 500,
    lineHheight: 2,
    color: theme.palette.primary.darkGray,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
  transaction: {
    width: "90%",
    fontFamily: "Gilroy-Regular",
    padding: "10px 18px ",
    fontSize: 15,
    fontWeight: 500,
    lineHheight: 2,
    color: "#fff",
    backgroundColor: "#23224e",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
    textAlign: "left",
  },
  fnrWrapper: {
    display: "flex",
    width: "96%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 15px 0 15px",
  },
  btc: {
    display: "flex",
    alignItems: "center",
  },
  btcValue: {
    fontFamily: "Gilroy-Regular",
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: "left",
    color: theme.palette.darkBlack,
    fontWeight: 500,
  },
  imgFNR: {
    width: "22px",
    objectFit: "contain",
    marginRight: 6,
  },
  secondLine: {
    width: "40%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconsWrap: {
    display: "flex",
    cursor: "pointer",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    cursor: "pointer",
  },
  iconImage: {
    marginTop: 8,
    height: 23,
  },
  coinType: {
    fontFamily: "Gilroy-Regular",
    fontSize: 12,
    lineHeight: 0.42,
    fontWeight: 600,
    cursor: "pointer",
    color: theme.palette.primary.blue,
  },
  tab: {
    width: "100%",
    "& .MuiTab-wrapper": {
      zIndex: 1,
      marginTop: -6,
    },
    "& .MuiTab-textColorPrimary.Mui-selected": {
      color: theme.palette.white,
      fontFamily: "Gilroy-Regular",
      fontSize: 12,
      fontWeight: 500,
    },
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: theme.palette.white,
      margin: "15px 0px 15px 0px",
    },
    "& .MuiTab-textColorPrimary": {
      color: theme.palette.gray,
      fontFamily: "Gilroy-Regular",
      fontSize: 12,
      fontWeight: 500,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.primary.blue,
      color: theme.palette.gray,
      width: "397",
      bottom: 7,
      height: 40,
    },
    "& .MuiTabs-flexContainer": {
      borderTop: "solid 1px #f3f3f3",
      borderBottom: "solid 1px #f3f3f3",
      height: 40,
    },
  },
  menuItem: {
    color: theme.palette.darkBlack,
    fontFamily: "Gilroy-Regular",
    fontSize: 12,
    fontWeight: 400,
    borderBottom: "1px solid #efecec",
    "& .MuiTypography-displayBlock": {
      display: "block",
      textAlign: "left",
    },
  },
  textDecoration: {
    textDecoration: "none",
  },
  width: {
    width: "100%",
    maxWidth: 378,
  },
  sendBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    width: "100%",
  },
  sendBody: {
    display: "flex",
    justifyContent: "space-between",
  },
  mainBox: {
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgSend: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  linkStyle: {
    textDecoration: "none",
  },
  root1: {
    height: 350,
  },
  txBox: {
    width: "100%",
    padding: "0px 10px 10px 10px",
  },
  sendBox1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    width: "100%",
  },
  sendBody1: {
    display: "flex",
    justifyContent: "space-between",
  },
  mainBox1: {
    padding: "11px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #eeeeee",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  imgSend1: {
    width: 22,
    objectFit: "contain",
    marginRight: 8,
  },
  address: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: "10px",
  },
  date: {
    fontSize: "10px",
  },
  hashText: {
    fontSize: "10px",
    maxWidth: 150,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  txsDetails: {
    display: "flex",
    justifyContent: "flex-end",
  },
  linkColor: {
    textDecoration: "none",
  },
  horizontalLine: {
    width: "100%",
    height: "1px",
    backgroundColor: "#eeeeee",
    marginTop: "16px",
  },
  iconback: {
    cursor: "pointer",
    padding: "4px 10px",
    objectFit: "contain",
  },
  backWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
}));

const Transaction = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const moreRef = useRef(null);
  const [wasCopied, setWasCopied] = useState(false);
  const [state, setState] = React.useState({
    open: false,
  });
  const [modal, setmodal] = React.useState({
    open: false,
  });

  const [filterData, setFilterData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { coins, allTxs, allTxsLoading, selectedCoin } = useSelector(
    (state) => state.wallet
  );
  const address = useSelector((store) => store.encrypt.address);

  const coinImages = (value) => {
    var symbol = value;
    if (symbol === "FNR") {
      return FNR;
    } else {
      return FNR;
    }
  };

  const toggleDrawer = () => {
    setState({ ...state, open: !state.open });
  };

  const toggleModal = () => {
    setmodal({ ...modal, open: !modal.open });
  };

  const reciept = () => {
    history.push("/send");
  };

  useEffect(() => {
    isLoading &&
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

    return () => {};
  }, [isLoading]);

  const getType = (to, from) => {
    const type =
      to === from
        ? "Self"
        : address === to
        ? "Recevied"
        : address === from
        ? "Send"
        : null;
    return type;
  };
  const copyAddress = () => {
    copy(address);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 3000);
  };
  const goBack = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    const filterCoin = allTxs?.filter((item) => {
      if (item.tx.value.msg[0].value.amount[0].denom === selectedCoin.denom) {
        return item;
      } else {
        return null;
      }
    });

    setFilterData(filterCoin);
  }, [allTxs, selectedCoin]);

  return (
    <div className={classes.root}>
      <Container>
        <Header />
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Box className={classes.backWrapper}>
                <img
                  src={back}
                  alt="left-arrow"
                  className={classes.iconback}
                  onClick={goBack}
                />
              </Box>
              <Box className={classes.width}>
                <Box
                  className={classes.titleWrapper}
                  size="small"
                  ref={moreRef}
                >
                  <Tooltip
                    placement="top-end"
                    title={wasCopied ? "Copied" : "Copy"}
                  >
                    <Typography
                      className={classes.account}
                      onClick={copyAddress}
                    >
                      {" "}
                      {address}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>

              <Box className={classes.createWallet}>
                <Box className={classes.fnrWrapper}>
                  {coins && coins.length > 0 ? (
                    <Box className={classes.btc}>
                      <img
                        src={coinImages(denomToSymbol(selectedCoin.denom))}
                        alt="FNR"
                        className={classes.imgFNR}
                      />
                      <Box>
                        <Typography className={classes.btcValue}>
                          {NumberFormat(selectedCoin.amount / SCALE)} &nbsp;
                          {denomToSymbol(selectedCoin.denom)}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box className={classes.btc}>
                      <img src={FNR} alt="fnr" className={classes.imgFNR} />
                      <Box>
                        <Typography className={classes.btcValue}>0</Typography>
                      </Box>
                    </Box>
                  )}

                  <Box className={classes.secondLine}>
                    <Box className={classes.iconsWrap} onClick={reciept}>
                      <Typography className={classes.coinType}>Send</Typography>
                      <img
                        src={arrowUp}
                        alt="arrowup"
                        className={classes.iconImage}
                      />
                    </Box>
                    <Box className={classes.iconsWrap} onClick={toggleDrawer}>
                      <Typography className={classes.coinType}>
                        Receive
                      </Typography>
                      <img
                        src={buyIcon}
                        alt="buy"
                        className={classes.iconImage}
                      />
                    </Box>
                  </Box>
                </Box>
                <span className={classes.horizontalLine} />
                <div className={classes.txBox}>
                  <Typography className={classes.transaction}>
                    Activity
                  </Typography>
                  {allTxsLoading ? (
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "120px",
                      }}
                    >
                      <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        className={classes.top}
                        classes={{
                          circle: classes.circle,
                        }}
                        size={30}
                        thickness={4}
                      />
                    </Box>
                  ) : filterData && filterData?.length > 0 ? (
                    <div className={classes.root1}>
                      <Scrollbars autoHide>
                        {filterData &&
                          filterData?.map((item, index) => (
                            <a
                              href={`${process.env.REACT_APP_EXPLORER_URL}/txs/${item.txhash}`}
                              target="_blank"
                              className={classes.linkColor}
                              rel="noreferrer"
                              key={index}
                            >
                              <Box className={classes.mainBox1}>
                                <img
                                  src={coinImages(
                                    denomToSymbol(
                                      item.tx.value.msg[0].value.amount[0].denom
                                    )
                                  )}
                                  alt="fnr"
                                  className={classes.imgSend1}
                                />
                                <Box className={classes.sendBox1}>
                                  <Box className={classes.sendBody1}>
                                    <Typography>
                                      {getType(
                                        item.tx.value.msg[0].value.to_address,
                                        item.tx.value.msg[0].value.from_address
                                      )}
                                    </Typography>
                                    <Typography>
                                      {item.tx.value.msg[0].value.amount[0]
                                        .amount / SCALE}
                                      &nbsp;
                                      {denomToSymbol(
                                        item.tx.value.msg[0].value.amount[0]
                                          .denom
                                      )}
                                    </Typography>
                                  </Box>
                                  <Box className={classes.sendBody1}>
                                    <Typography className={classes.date}>
                                      {moment(item.timestamp).format("MMM DD")}
                                    </Typography>

                                    <Typography className={classes.hashText}>
                                      {item.txhash}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </a>
                          ))}
                      </Scrollbars>
                    </div>
                  ) : (
                    <NoData description="There are no activity!" />
                  )}
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Account open={state.open} toggleDrawer={toggleDrawer} />
      <ConnectedSites open={modal.open} toggleModal={toggleModal} />
    </div>
  );
};

export default Transaction;
