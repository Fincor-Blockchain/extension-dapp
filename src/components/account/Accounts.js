/*global chrome*/
import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { arrowUp, buyIcon, FNR } from "../../assets/images";
import { useHistory } from "react-router-dom";

import {
  ListItemText,
  Menu,
  MenuItem,
  Box,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import copy from "copy-to-clipboard";
import { MoreVert } from "@material-ui/icons";
import { Account, ConnectedSites } from "../../components";
import Header from "../../components/header/Header";
import { AccountList } from "./accountList";
import { useDispatch, useSelector } from "react-redux";
import {
  listenBalance,
  listenTransactions,
  socketConnect,
  socketRegisterClient,
} from "../../redux/wallet/actions";
import Activity from "./activity/activity";
import { getEnvironmentType, NumberFormat } from "../../utils/utils";
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
    minHeight: "430px",
  },
  titleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "73%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  account: {
    width: "100%",
    maxWidth: 340,
    fontFamily: "Gilroy-Light",
    fontSize: 15,
    fontWeight: 500,
    lineHheight: 2,
    color: theme.palette.primary.darkGray,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
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
    fontFamily: "Gilroy-Medium",
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
    width: "30%",
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
    marginTop: "40px",
  },
  iconImage: {
    marginTop: 8,
    height: 23,
  },
  coinType: {
    fontFamily: "Gilroy-Regular",
    fontSize: 12,
    lineHeight: 0.42,
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
      fontFamily: "Gilroy-Medium",
      fontSize: 12,
      fontWeight: 500,
    },
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: theme.palette.white,
      margin: "15px 0px 15px 0px",
    },
    "& .MuiTab-textColorPrimary": {
      color: "#23224e",
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
      textAlign: "left",
    },
  },
  textDecoration: {
    textDecoration: "none",
  },
  widthchk: {
    width: "90%",
    padding: "2px 10px",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.04)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "88%",
    },
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
  customTooltip: {
    marginTop: 2,
    width: "100%",
    minWidth: 30,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    "& .MuiMenu-paper": {
      top: "120px !important",
      transition:
        "opacity 241ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0ms, transform 400ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0ms  !important",
      [theme.breakpoints.down("xs")]: {
        left: "224px !important",
      },
    },
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Accounts = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const moreRef = useRef(null);
  const [state, setState] = React.useState({
    open: false,
  });
  const [modal, setmodal] = React.useState({
    open: false,
  });
  const [wasCopied, setWasCopied] = useState(false);

  const { coins, activeAccounts } = useSelector((store) => store.wallet);
  const address = activeAccounts[0].address;
  const defaultCoin = coins.find((coin) => coin.symbol === "FNR");
  const toggleDrawer = () => {
    setState({ ...state, open: !state.open });
    setAnchorEl(null);
  };

  const toggleModal = () => {
    setmodal({ ...modal, open: !modal.open });
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const reciept = () => {
    history.push("/send");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const copyAddress = () => {
    copy(address);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 3000);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(socketConnect());
    if (address?.length > 0) {
      dispatch(socketRegisterClient(address));
      dispatch(listenBalance());
      dispatch(listenTransactions());
    }

    return () => {};
  }, [address, dispatch]);

  useEffect(() => {
    loading &&
      setTimeout(() => {
        setLoading(false);
      }, 500);
  }, [loading]);

  //   if (loading) {
  //     return (
  //       <div className={classes.root}>
  //         <FullPageLoader />
  //       </div>
  //     );
  //   }

  return (
    <div className={classes.root}>
      <Container>
        <Header />
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Box className={classes.titleWrapper}>
                <Tooltip
                  classes={{
                    tooltip: classes.customTooltip,
                  }}
                  placement="bottom"
                  title={wasCopied ? "Copied" : "Copy"}
                >
                  <Box
                    onClick={copyAddress}
                    className={classes.widthchk}
                    size="small"
                    ref={moreRef}
                  >
                    <Typography variant="subtitle2" className={classes.title}>
                      {activeAccounts[0].displayName}
                    </Typography>

                    <Typography className={classes.account}>
                      {address}
                    </Typography>
                  </Box>
                </Tooltip>
                <Box style={{ position: "relative" }}>
                  <MoreVert
                    className={classes.icon}
                    onClick={handleMobileMenuOpen}
                  />
                </Box>
              </Box>

              <Box className={classes.createWallet}>
                <Box className={classes.fnrWrapper}>
                  <Box className={classes.btc}>
                    <img src={FNR} alt="fnr" className={classes.imgFNR} />
                    <Box>
                      <Typography className={classes.btcValue}>
                        {NumberFormat(defaultCoin?.balance || 0)}{" "}
                        {defaultCoin?.symbol || "FNR"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={classes.secondLine}>
                    {defaultCoin?.balance ? (
                      <Box className={classes.iconsWrap} onClick={reciept}>
                        <Typography className={classes.coinType}>
                          Send
                        </Typography>
                        <img
                          src={arrowUp}
                          alt="arrowup"
                          className={classes.iconImage}
                        />
                      </Box>
                    ) : (
                      <Box className={classes.iconsWrap}>
                        <Typography className={classes.coinType}>
                          Send
                        </Typography>
                        <img
                          src={arrowUp}
                          alt="arrowup"
                          className={classes.iconImage}
                        />
                      </Box>
                    )}
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
                <Box className={classes.tab}>
                  <AppBar position="static" elevation={0}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      <Tab
                        label="Assets"
                        {...a11yProps(0)}
                        style={{ width: "50%" }}
                      />
                      <Tab
                        label="Activity"
                        {...a11yProps(1)}
                        style={{ width: "50%" }}
                      />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <AccountList />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Activity />
                  </TabPanel>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Menu
          anchorEl={moreRef.current}
          open={isMenuOpen}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className={classes.menu}
          onClose={handleMenuClose}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {getEnvironmentType() === "POPUP" && (
            <a
              href={`chrome-extension://${chrome?.runtime?.id}/index.html?type=Browser`}
              target="_blank"
              className={classes.linkStyle}
              rel="noreferrer"
            >
              <MenuItem className={classes.menuItem}>
                <ListItemText primary="Expand view" />
              </MenuItem>
            </a>
          )}

          <MenuItem onClick={toggleDrawer} className={classes.menuItem}>
            <ListItemText primary="Account Details" />
          </MenuItem>
          <a
            href={`${process.env.REACT_APP_EXPLORER_URL}/account-details/${address}`}
            target="_blank"
            className={classes.linkStyle}
            rel="noreferrer"
          >
            <MenuItem className={classes.menuItem}>
              <ListItemText primary="View on Fincor" />
            </MenuItem>
          </a>
        </Menu>
      </Container>
      <Account open={state.open} toggleDrawer={toggleDrawer} />
      <ConnectedSites open={modal.open} toggleModal={toggleModal} />
    </div>
  );
};

export default Accounts;
