import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/header/Header";
import { Box, Grid, Container, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { back } from "../../assets/images";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    // padding: "0 20px 0px 20px",
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
    border: "solid 0.8px #d5d5d5",
  },
  general: {
    color: theme.palette.darkBlack,
    fontFamily: "Gilroy-Regular",
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 8,
  },
  type: {
    color: theme.palette.yellow,
    fontFamily: "Gilroy-Regular",
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 400,
  },
  iconBg: {
    backgroundColor: theme.palette.primary.blue,
    borderRadius: "50%",
    height: 20,
    width: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  listWrapper: {
    padding: 20,
    paddingBottom: 7,
    borderBottom: "1px solid #ccc4c4",
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textDecoration: {
    textDecoration: "none",
    width: "100%",
  },
  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },
}));

const listData = [
  // {
  //     id: 1,
  //     title: "General",
  //     test1: "Currency Conversion",
  //     test2: "Primary Currency",
  //     test3: "Current Language",
  //     test4: "Use Blockies Identicon",
  //     test5: "Hide Tokens Without Balance",
  //     // link: "/general",
  // },
  // {
  //     id: 2,
  //     title: "Advance",
  //     test1: "State Logs",
  //     test2: "Sync with mobile",
  //     test3: "Reset Account",
  //     test4: "Advanced gas controls",
  //     test5: "Show Hex Data",
  //     // link: "/advance",
  // },
  {
    id: 3,
    title: "Contacts",
    // test1: "Add contact",
    // test2: "Edit",
    // test3: "Delete",
    test4: "Manage your conatct",
    link: "/contacts",
  },
  {
    id: 4,
    title: "Security and privacy",
    test1: "Security and privacy",
    link: "/security&privacy",
  },
  // {
  //     id: 5,
  //     title: "Alert",
  //     test1: "Enable and disable each alert",
  //     // link: "/alert",
  // },
  // {
  //     id: 6,
  //     title: "Network",
  //     test1: "Add and edit personal RPC network",
  //     // link: "/network",
  // },
];
const Setting = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const goBack = () => {
    history.push("/dashboard");
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
                Settings
              </Typography>
              <Box className={classes.createWallet}>
                {listData.map((item, index) => (
                  <Link
                    to={item.link}
                    key={index}
                    className={classes.textDecoration}
                  >
                    <Box
                      className={classes.listWrapper}
                      // style={
                      //     index === 3
                      //         ? { backgroundColor: "#fff" }
                      //         : {
                      //               opacity: 0.3,
                      //           }
                      // }
                    >
                      <Box className={classes.list}>
                        <Typography className={classes.general}>
                          {item.title}
                        </Typography>
                        <Typography className={classes.type}>
                          {item.test1}
                        </Typography>
                        <Typography className={classes.type}>
                          {item.test2}
                        </Typography>
                        <Typography className={classes.type}>
                          {item.test3}
                        </Typography>
                        <Typography className={classes.type}>
                          {item.test4}
                        </Typography>
                        <Typography className={classes.type}>
                          {item.test5}
                        </Typography>
                      </Box>
                      <ChevronRightIcon className={classes.iconBg} />
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Setting;
