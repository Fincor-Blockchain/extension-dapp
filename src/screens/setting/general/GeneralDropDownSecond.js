import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    listItem: {
        display: "flex",
        listStyle: "none",
        padding: "0.8rem 1rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
}));

const options = ["FNR", "FNR"];

const GeneralDropDownSecond = () => {
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
            <Box className={classes.dropDownContainer} onClick={isOpen ? handleClose : null}>
                <Box className={classes.dropDownHeader} onClick={toggling}>
                    <Box className={classes.header}>
                        {selectedOption || "USD - United States of  Dollars"}
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
                                        key={Math.random()}>
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

export default GeneralDropDownSecond;
