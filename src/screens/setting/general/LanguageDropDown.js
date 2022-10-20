import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars-2";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    width: "100%",
    marginTop: "14px",
    "& .MuiSvgIcon-root": {
      padding: 8,
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.lightGray,
      color: theme.palette.primary.blue,
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
  cancel: {
    margin: "5px 0px 15px 0px",
    fontSize: 16,
    lineHeight: 1.56,
    color: "#1c60ef",
    borderBottom: "1px solid #1c60ef",
    cursor: "pointer",
  },
  dropDownContainer: {
    width: "100%",
  },
  dropDownHeader: {
    padding: "4px 3px 4px 10px;",
    borderRadius: 30,
    background: theme.palette.white,
    display: "flex",
    alignItems: "center",
    border: "solid 1px #e6e6e6",
    justifyContent: "space-between",
  },
  header: {
    color: theme.palette.primary.blue,
    fontFamily: "Poppins",
    fontSize: 13,
    fontWeight: 500,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dropDownList: {
    padding: 0,
    margin: 0,
    background: theme.palette.white,
    borderRadius: 6,
    border: "solid 1px #e6e6e6",
    boxSizing: "border-box",
    color: theme.palette.primary.blue,
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: 500,
    height: 140,
    width: "100%",
    maxWidth: "100%",
  },
  type: {
    color: theme.palette.yellow,
    fontFamily: "Gilroy-Regular",
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 400,
  },
  typo: {
    color: "#d5da43 !important",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 13,
    textAlign: "left",
    lineHeight: 1.5,
    marginBottom: 15,
  },
  listItem: {
    display: "flex",
    listStyle: "none",
    padding: "0.8rem 1rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
  listItem1: {
    display: "flex",
    listStyle: "none",
    padding: "0.8rem 1rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
}));

const LanguageDropDown = () => {
  const classes = useStyles();
  const { t } = useTranslation(["common"]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = () => {
    setSelectedOption("English");
    i18next.changeLanguage("en");

    localStorage.setItem("i18nextLng", "en");

    setIsOpen(false);
  };
  const onOptionClicked001 = () => {
    setSelectedOption("Español");
    i18next.changeLanguage("es");

    localStorage.setItem("i18nextLng", "es");

    setIsOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  React.useEffect(() => {
    const lang = localStorage.getItem("i18nextLng");
    if (lang === "es") {
      setSelectedOption("Español");
    } else {
      setSelectedOption("English");
    }
  }, []);
  return (
    <div className={classes.root}>
      <Box className={classes.wrapper}>
        <Typography variant="subtitle1">{t("setting.title")}</Typography>
        <Typography className={classes.typo}>{selectedOption}</Typography>
      </Box>
      <Box
        className={classes.dropDownContainer}
        onClick={isOpen ? handleClose : null}
      >
        <Box className={classes.dropDownHeader} onClick={toggling}>
          <Box className={classes.header}>{selectedOption || "English"}</Box>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        {isOpen && (
          <Box>
            <Box className={classes.dropDownList}>
              <Scrollbars>
                <Box
                  className={classes.listItem}
                  onClick={onOptionClicked}
                  key={Math.random()}
                >
                  English
                </Box>
                <Box
                  className={classes.listItem1}
                  onClick={onOptionClicked001}
                  key={Math.random()}
                >
                  Español
                </Box>
              </Scrollbars>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default LanguageDropDown;
