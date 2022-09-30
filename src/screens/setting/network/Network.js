//------Network-------
// This is just a UI Design
// Work in progress
// It will be used in future

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Container, Typography, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import { Link, useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Header from "../../../components/header/Header";
import { back } from "../../../assets/images";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    padding: "0 20px 0px 14px",
    "& .MuiContainer-root": {
      maxWidth: 560,
    },
    "& .MuiTypography-displayBlock": {
      display: "flex",
    },
    "& .MuiList-padding": {
      width: "100%",
    },
    "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected": {
      backgroundColor: "transparent",
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
    border: "solid 0.8px #8aa7e4",
  },
  lock: {
    color: theme.palette.yellow,
    fontSize: 30,
  },
  right: {
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.blue,
    color: "#fff",
  },
  textDecoration: {
    textDecoration: "none",
    width: "100%",
  },
  titleColor: {
    "&  span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock":
      {
        color: theme.palette.primary.blue,
        fontfamily: "Poppins",
        fontSize: 15,
        fontWeight: 600,
      },
  },
  title1Color: {
    "&  span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock":
      {
        color: "#23224ebf",
        fontfamily: "Poppins",
        fontSize: 15,
        fontWeight: 500,
      },
  },

  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },
}));

const listData = [
  {
    id: 1,
    title: "Fincor Mainnet",
    link: "/networkDetail",
  },
  {
    id: 2,
    title: "Ropsten Test Network",
    link: "/network",
  },
  {
    id: 3,
    title: "Ropsten Test Network",
    link: "/network",
  },
  {
    id: 4,
    title: "Fincor Mainnet",
    link: "/networkDetail",
  },
  {
    id: 5,
    title: "Ropsten Test Network",
    link: "/network",
  },
  {
    id: 6,
    title: "Ropsten Test Network",
    link: "/network",
  },
];
const Network = (props) => {
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const addNetwork = () => {
    history.push("/addNetwork");
  };
  const goBack = () => {
    history.push("/setting");
  };
  const classes = useStyles();
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
                Setting
              </Typography>
              <Box className={classes.createWallet}>
                {listData.map((item, index) => (
                  <Link
                    to={item.link}
                    key={index}
                    className={classes.textDecoration}
                  >
                    <List component="nav" aria-label="main mailbox folders">
                      <ListItem
                        button
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                      >
                        <ListItemIcon>
                          {selectedIndex === index ? (
                            <LockOpenOutlinedIcon className={classes.lock} />
                          ) : (
                            <LockOutlinedIcon className={classes.lock} />
                          )}
                        </ListItemIcon>
                        {selectedIndex === index ? (
                          <ListItemText
                            primary={item.title}
                            className={classes.titleColor}
                          />
                        ) : (
                          <ListItemText
                            primary={item.title}
                            className={classes.title1Color}
                          />
                        )}
                      </ListItem>
                      <ListItemSecondaryAction edge="end" aria-label="comments">
                        <ChevronRightIcon className={classes.right} />
                      </ListItemSecondaryAction>
                    </List>
                    <Divider />
                  </Link>
                ))}
              </Box>
              <Button onClick={addNetwork}>Add network</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Network;
