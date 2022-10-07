import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Header from "../../../components/header/Header";
import { useSelector } from "react-redux";
import { back } from "../../../assets/images";
import { NoData } from "../../../screens/noData";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FINCOR } from "../../../assets/images";
import { useDispatch } from "react-redux";
import { activeContacts } from "../../../redux/contacts/actions";
import ExtensionStore from "../../../utils/local-store";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    //padding: "0 20px 0px 20px",
    "& .MuiContainer-root": {
      maxWidth: 560,
    },
    "& .MuiButtonBase-root": {
      display: "inline-block",
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

  help: {
    fontFamily: "Poppins",
    fontSize: 18,
    lineHeight: 2,
    color: "#23224e",
    fontWeight: 600,
  },
  mainBox: {
    padding: "11px 16px",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #eeeeee",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  linkColor: {
    textDecoration: "none",
  },
  listing: {
    border: "solid 0.8px #d5d5d5",
  },
  imgSend: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  addressText: {
    fontSize: "0.725rem",
    fontFamily: "Euclid, Roboto, Helvetica, Arial, sans-serif",
    lineHeight: "140%",
    fontStyle: "normal",
    fontWeight: "normal",
    color: "##8aa7e4",
  },
  userName: {
    textAlign: "left",
    color: "#464646",
  },
  btn2: {
    margin: "0 !important",
    maxHeight: "40px",
    [theme.breakpoints.down("xs")]: {
      width: "110px !important",
      padding: "16px 10px  !important",
    },
    btnStyle: {
      textDecoration: "underline",
    },
  },
  account: {
    width: "100%",
    maxWidth: 200,
    fontFamily: "Poppins",
    fontSize: "0.725rem",
    fontWeight: 500,
    lineHheight: 2,
    color: "##8aa7e4",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
}));

const Contacts = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [contactList, setContactList] = useState([]);

  // const contacts = useSelector((store) => store.wallet.contacts);
  // const { activeAccounts, activeItemIndex } = useSelector(
  //   (state) => state.wallet
  // );
  // const accounts = useSelector((state) => state.wallet.accounts);
  // const contacts = activeAccounts[0]?.contacts;
  const contacts = useSelector((state) => state.wallet.contacts);

  const goBack = () => {
    history.push("/setting");
  };
  const addCCount = () => {
    history.push("/add-contact");
  };

  const getContactDetail = (item) => {
    dispatch(activeContacts(item));
    if (ExtensionStore.isSupported) {
      ExtensionStore.set({ activeContact: item });
    }
    history.push("view-contact");
  };

  useEffect(() => {
    if (ExtensionStore.isSupported) {
      ExtensionStore.get().then((data) => {
        const Contacts = data?.contacts;
        // const findContacts = Contacts.filter(
        //   (item) => item.address === activeAccounts[0].address
        // );
        // const postingContacts = findContacts[0].contacts;
        setContactList(Contacts);
      });
    }
    setContactList(contacts);
  }, [contacts]);
  let list = contactList?.fincorContacts;

  return (
    <div className={classes.root}>
      <Container>
        <Header />

        {list?.length > 0 ? (
          <Box>
            <img
              src={back}
              alt="left-arrow"
              className={classes.iconback}
              onClick={goBack}
            />
            <Box className={classes.main}>
              <Typography variant="h1">Contacts</Typography>
              <div
                style={{ height: 350, width: "100%", maxWidth: "400px" }}
                className={classes.listing}
              >
                <Typography className={classes.help}>
                  Build your own contact
                </Typography>

                <Scrollbars style={{ height: 300 }}>
                  {list &&
                    list?.map((item, index) => (
                      <div
                        onClick={() => getContactDetail(item)}
                        className={classes.linkColor}
                        key={index}
                      >
                        <Box className={classes.mainBox}>
                          <img
                            src={FINCOR}
                            alt="fincor"
                            className={classes.imgSend}
                          />
                          <Box>
                            <Typography className={classes.userName}>
                              {item.userName}
                            </Typography>
                            <Typography className={classes.account}>
                              {item.address}
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    ))}
                </Scrollbars>
              </div>
              <Link to="/add-contact">
                <Button onClick={addCCount}>Add contact</Button>
              </Link>
            </Box>
          </Box>
        ) : (
          <Box>
            <img
              src={back}
              alt="left-arrow"
              className={classes.iconback}
              onClick={goBack}
            />
            <Box className={classes.main}>
              <Typography variant="h1">Contacts</Typography>
              <Typography className={classes.help}>
                Build your own contact
              </Typography>

              <NoData description="No contact list found" />
              <Link to="/add-contact" className={classes.btnStyle}>
                <Button onClick={addCCount} style={{ display: "inline-block" }}>
                  Add contact
                </Button>
              </Link>
            </Box>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Contacts;
