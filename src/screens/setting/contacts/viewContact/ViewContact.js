/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box } from "@material-ui/core";
import Header from "../../../../components/header/Header";
import { back } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FINCOR } from "../../../../assets/images";
import Tooltip from "@material-ui/core/Tooltip";
import ExtensionStore from "../../../../utils/local-store";
import copy from "copy-to-clipboard";
import { activeContacts } from "../../../../redux/contacts/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    "& .MuiContainer-root": {
      maxWidth: 560,
    },
    "& .MuiFormHelperText-root.Mui-error": {
      position: "absolute",
      top: 50,
      [theme.breakpoints.down("xs")]: {
        top: 40,
      },
    },
    "& .MuiOutlinedInput-root": {
      width: "100%",
      height: "50px",
      fontSize: 14,
      color: theme.palette.primary.blue,
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none ",
      },
      "& .Mui-focused fieldset": {
        border: "none ",
      },
      [theme.breakpoints.down("xs")]: {
        height: 42,
      },
    },
    "& .input.MuiInputBase-input.MuiOutlinedInput-input": {
      color: theme.palette.primary.blue,
    },
    "& .MuiButtonBase-root": {
      display: "inline-block",
    },
  },

  icon: {
    padding: 12,
    marginRight: 4,
    backgroundColor: theme.palette.primary.lightGray,
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

  span: {
    color: theme.palette.yellow,
    cursor: "pointer",
  },
  iconback: {
    position: "relative",
    top: 40,
    cursor: "pointer",
  },

  bRed: {
    display: "flex",
    alignItems: "center",
    border: " solid 1px red",
    borderRadius: "30px",
    marginTop: 9,
  },
  linkColor: {
    textDecoration: "none",
    color: "#1f4bb1",
  },
  btn: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  btn2: {
    margin: "0 !important",
    maxHeight: "40px",
    [theme.breakpoints.down("xs")]: {
      padding: "16px 10px  !important",
    },
  },
  titleWrapper: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  mainBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "25px",
  },
  account: {
    width: "100%",
    maxWidth: 287,
    fontFamily: "Poppins",
    fontSize: 15,
    fontWeight: 500,
    lineHheight: 2,
    color: theme.palette.primary.darkGray,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
  memoText: {
    width: "100%",
    maxWidth: 295,
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: 500,
    wordBreak: "break-word",
    maxHeight: "76px",
    overflow: "auto",
    textAlign: "justify",
    lineHheight: 2,
    color: theme.palette.primary.darkGray,

    display: "flex",
    flexWrap: "wrap",
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
  widthchk: {
    // width: "90%",
    // padding: "2px 10px",
    padding: "2px 2px 2px 2px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.04)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "88%",
    },
  },
  imgSend: {
    height: "50px",
    width: "50px",
  },
  editBody: {
    maxWidth: "400px",
    minHeight: "320px",
    width: "100%",
  },
  memoDetail: {
    // width: "90%",
    // padding: "2px 10px",
    padding: "2px 10px 2px 2px",
    // margin: "0px 22px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      width: "88%",
    },
  },
}));

const ViewContact = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const moreRef = useRef(null);
  const [activeContact, setActiveContact] = useState({});
  const [wasCopied, setWasCopied] = useState(false);
  const active = useSelector((store) => store.wallet.activeContact);

  const copyAddress = (address) => {
    copy(address);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 3000);
  };

  const goBack = () => {
    history.goBack();
  };
  useEffect(() => {
    if (ExtensionStore.isSupported) {
      ExtensionStore.get().then((data) => {
        const Contacts = data?.activeContact;
        if (Contacts) {
          dispatch(activeContacts(Contacts));
          setActiveContact(Contacts);
        }
      });
    }
    setActiveContact(active);
  }, []);

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
          <Typography variant="h1">Contact Detail</Typography>
          <Box className={classes.editBody}>
            <Box className={classes.mainBox}>
              <img src={FINCOR} alt="fincor" className={classes.imgSend} />
              <Typography>{activeContact?.userName}</Typography>
            </Box>
            <Box className={classes.titleWrapper}>
              <Tooltip
                classes={{
                  tooltip: classes.customTooltip,
                }}
                placement="bottom"
                title={wasCopied ? "Copied" : "Copy"}
              >
                <Box
                  onClick={() => copyAddress(activeContact?.address)}
                  className={classes.widthchk}
                  size="small"
                  ref={moreRef}
                >
                  <Typography variant="subtitle2" className={classes.title}>
                    Address
                  </Typography>

                  <Typography
                    className={classes.account}
                    // onClick={copyAddress}
                  >
                    {activeContact?.address}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Box className={classes.memoDetail}>
              <Typography variant="subtitle2" className={classes.title}>
                Contact Description
              </Typography>
              <Typography
                className={classes.memoText}
                // onClick={copyAddress}
              >
                {activeContact?.memo}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.btn}>
            <Link to="/edit-contact">
              <Button className={classes.btn2}>Edit Contact</Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ViewContact;
