import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars-2";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.light,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "flex-end",
    },
    "& .MuiSvgIcon-root": {
      padding: 2,
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.lightGray,
      color: theme.palette.primary.blue,
      height: 20,
      width: 20,
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
    width: 200,
    position: "relative",
  },
  dropDownHeader: {
    padding: "4px 3px 4px 10px;",
    borderRadius: 30,
    background: " #fff",
    display: "flex",
    alignItems: "center",
    border: "solid 1px #e6e6e6",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  header: {
    color: theme.palette.primary.blue,
    fontFamily: "Poppins",
    fontSize: 13,
    fontWeight: 500,
    textOverflow: "ellipsis",
    overflow: "hidden",
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
    height: 110,
    width: "100%",
    maxWidth: "100%",
    position: "absolute",
    zIndex: 1,
    cursor: "pointer",
  },
  listItem: {
    display: "flex",
    listStyle: "none",
    padding: "0.8rem 1rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
}));

const options = ["Fincor Mainnet", "Fincor Testnet"];

const HeaderDropDown = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className={classes.root}>
      <Box
        className={classes.dropDownContainer}
        onClick={isOpen ? handleClose : null}
      >
        <Box className={classes.dropDownHeader} onClick={toggling}>
          <Box className={classes.header}>
            {selectedOption || "Fincor Mainnet"}
          </Box>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        {isOpen && (
          <Box>
            <Box className={classes.dropDownList}>
              <Scrollbars>
                {options.map((option) => (
                  <Box
                    className={classes.listItem}
                    onClick={onOptionClicked(option)}
                    key={Math.random()}
                  >
                    {option}
                  </Box>
                ))}
              </Scrollbars>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default HeaderDropDown;
