//------Swap-------
// This is just a UI Design
// Work in progress
// It will be used in future

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, TextField, Button } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Header from "../../components/header/Header";
import { useHistory } from "react-router-dom";
import { back } from "../../assets/images";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            width: "100%",
            height: "50px",
            display: "flex",
            color: theme.palette.primary.blue,
            fontFamily: "Poppins",
            fontSize: 14,
            fontWeight: 500,
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #e6e6e6",
            marginBottom: 15,
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
                height: "44px",
            },
        },

        "& .MuiAccordion-root:before": {
            height: 0,
        },
        "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: 0,
        },
        "& .MuiAccordion-root.Mui-expanded": {
            width: "90%",
            [theme.breakpoints.down("xs")]: {
                width: "100%",
            },
        },
        "& .MuiAccordionSummary-content": {
            display: "block",
            flexGrow: 0,
        },
    },
    moreIcon: {
        padding: 8,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.lightGray,
        color: theme.palette.primary.blue,
        [theme.breakpoints.down("xs")]: {
            padding: 5,
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
    dropDownContainer: {
        width: "90%",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
    dropDownHeader: {
        padding: "4px 3px 4px 10px;",
        borderRadius: 30,
        background: " #fff",
        display: "flex",
        alignItems: "center",
        border: "solid 1px #e6e6e6",
        justifyContent: "space-between",
        marginBottom: 15,
        cursor: "pointer",
    },
    header: {
        width: 185,
        color: theme.palette.primary.blue,
        fontFamily: "Poppins",
        fontSize: 13,
        fontWeight: 500,
        textOverflow: "ellipsis",
        overflow: "hidden",
        cursor: "pointer",
        [theme.breakpoints.down("xs")]: {
            width: "120px",
        },
    },
    dropDownList: {
        padding: 0,
        margin: "-11px 0px 10px 0px",
        background: theme.palette.white,
        borderRadius: 6,
        border: "solid 1px #e6e6e6",
        boxSizing: "border-box",
        color: theme.palette.primary.blue,
        fontFamily: "Poppins",
        fontSize: 14,
        fontWeight: 500,
        height: 85,
        width: "100%",
        maxWidth: "100%",
        cursor: "pointer",
    },
    listItem: {
        listStyle: "none",
        padding: "3px 30px 0px 13px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer",
    },
    label: {
        color: theme.palette.primary.blue,
        fontFamily: "Poppins",
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 2.55,
        marginLeft: 16,
        whiteSpace: "nowrap",
    },
    iconback: {
        position: "relative",
        top: 40,
        cursor: "pointer",
    },
}));

const options = ["FNR", "FNR"];
const tokens = ["first", "second"];

const Swap = () => {
    const history = useHistory();
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isToken, setIsToken] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [state, setstate] = useState({
        amount: "",
    });
    const valueChange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const toggling = () => setIsOpen(!isOpen);
    const onOptionClicked = (value) => () => {
        setSelectedOption(value);
        setIsOpen(false);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const togglingSecond = () => setIsToken(!isToken);
    const onOptionClickedSecond = (value) => () => {
        setSelectedCoin(value);
        setIsToken(false);
    };
    const handleCloseSecond = () => {
        setIsToken(false);
    };

    const cancelProcess = () => {
        history.push("/addToken");
    };
    const goBack = () => {
        history.goBack();
    };
    const confirmSwap = (e) => {
        e.preventDefault();
        // let data = {
        //     amount: state.amount,
        //     selectedCoin,
        //     selectedOption,
        // };
        history.push("/confirmSwap");
    };

    return (
        <div
            className={classes.root}
            onClick={isOpen ? handleClose : null || isToken ? handleCloseSecond : null}>
            <Container>
                <Header />
                <img src={back} alt="left-arrow" className={classes.iconback} onClick={goBack} />
                <Box className={classes.main}>
                    <Typography variant="h1">Swap</Typography>
                    <Box></Box>

                    <Box className={classes.dropDownContainer}>
                        <Box className={classes.label}>Swap from</Box>
                        <Box className={classes.dropDownHeader} onClick={toggling}>
                            <Box className={classes.header}>{selectedOption || "Select coin"}</Box>
                            {isOpen ? (
                                <ExpandLessIcon className={classes.moreIcon} />
                            ) : (
                                <ExpandMoreIcon className={classes.moreIcon} />
                            )}
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
                    <Box style={{ width: "90%" }}>
                        <Box className={classes.label}>Max amount</Box>
                        <TextField
                            variant="outlined"
                            name="amount"
                            onChange={valueChange}
                            type="number"
                            value={state.amount}
                            placeholder="0"
                            fullWidth
                        />
                    </Box>
                    <Box className={classes.dropDownContainer}>
                        <Box className={classes.label}>Swap to</Box>
                        <Box className={classes.dropDownHeader} onClick={togglingSecond}>
                            <Box className={classes.header}>{selectedCoin || "Select token"}</Box>
                            {isToken ? (
                                <ExpandLessIcon className={classes.moreIcon} />
                            ) : (
                                <ExpandMoreIcon className={classes.moreIcon} />
                            )}
                        </Box>
                        {isToken && (
                            <Box>
                                <Box className={classes.dropDownList}>
                                    <Scrollbars>
                                        {tokens.map((token) => (
                                            <Box
                                                className={classes.listItem}
                                                onClick={onOptionClickedSecond(token)}
                                                key={Math.random()}>
                                                {token}
                                            </Box>
                                        ))}
                                    </Scrollbars>
                                </Box>
                            </Box>
                        )}
                    </Box>
                    <Button onClick={confirmSwap} disabled={!selectedOption || !selectedCoin}>
                        Review swap
                    </Button>
                    <Typography variant="body2" onClick={cancelProcess}>
                        Cancel Process
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default Swap;
