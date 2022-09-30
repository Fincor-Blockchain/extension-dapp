import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, CircularProgress, TextField, Typography } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SYMBOL_REGEX } from "../../vars/regex";
import { denomToSymbol } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
    modalCentered: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: " 1rem;",
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
    },

    Wrapper: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.white,
    },
    dropDownContainer: {
        width: "100%",
        marginBottom: 16,
        position: "relative",
    },
    dropDownHeader: {
        padding: "4px 14px 4px 14px;",
        borderRadius: 30,
        background: " #fff",
        display: "flex",
        alignItems: "center",
        border: "solid 1px #e6e6e6",
        justifyContent: "space-between",
        height: 34,
        cursor: "pointer",
    },
    header: {
        color: theme.palette.primary.blue,
        fontFamily: "Poppins",
        fontSize: 13,
        fontWeight: 500,
        textOverflow: "ellipsis",
        overflow: "hidden",
        textTransform: "uppercase",
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
        position: "absolute",
        zIndex: "5",
    },
    listItem: {
        display: "flex",
        listStyle: "none",
        padding: "0.8rem 1rem",
        overflow: "hidden",
        textOverflow: "ellipsis",

        cursor: "pointer",
        "&:hover": {
            background: "#f6f6f6",
        },
    },
    inputText: {
        width: "100%",
        marginBottom: 20,
        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            margin: "0 auto",
            width: "100%",
            height: "42px",
            display: "flex",
            fontSize: 12,
            color: theme.palette.primary.blue,
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #e6e6e6",
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none ",
            },
            "& .Mui-focused fieldset": {
                border: "none ",
            },
        },
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center",
        border: " solid 1px #e6e6e6",
        borderRadius: "30px",
    },
    bRed: {
        display: "flex",
        alignItems: "center",
        border: " solid 1px red",
        borderRadius: "30px",
    },
    btn: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
    },
    btn1: {
        padding: "16px 42px !important",
        marginBottom: "0px !important",
        color: "#d5da43",
        borderColor: "#d5da43",
        maxHeight: "40px",
        maxWidth: "180px !important",
        minWidth: "180px !important",
        width: "100% !important",
        [theme.breakpoints.down("xs")]: {
            maxWidth: "105px !important",
            minWidth: "105px !important",
            width: "100% !important",
            padding: "15px 0px  !important",
        },
    },
    btn2: {
        margin: "0 !important",
        maxHeight: "40px",
        maxWidth: "180px !important",
        minWidth: "180px !important",
        width: "100% !important",
        [theme.breakpoints.down("xs")]: {
            maxWidth: "105px !important",
            minWidth: "105px !important",
            width: "100% !important",
            padding: "16px 10px  !important",
        },
    },
    feeBox: {
        fontSize: 12,
        textAlign: "left",
        lineHeight: 1.6,
        padding: "0px 6px",
    },
    feeStructure: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    spanFee: {
        textTransform: "uppercase",
    },
}));

const SendToken = (props) => {
    const {
        state,
        errors,
        isOpen,
        handleClose,
        toggling,
        selectedOption,
        onOptionClicked,
        coins,
        selectCoin,
        isSending,
        inputChangeNumberHandler,
        handleChangeInput,
        goBack,
        hanldeSendCoin,
        hasAmountError,
        hasAmountZeroError,
    } = props;
    const classes = useStyles();

    return (
        <Box className={classes.Wrapper}>
            <Box className={classes.modalCentered}>
                <Box className={classes.dropDownContainer} onClick={isOpen ? handleClose : null}>
                    <Box className={classes.dropDownHeader} onClick={toggling}>
                        <Box className={classes.header}>
                            {(selectedOption && selectedOption.replace("f", "")) || "Select Token"}
                        </Box>
                        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Box>
                    {isOpen && (
                        <Box>
                            <Box className={classes.dropDownList}>
                                <Scrollbars>
                                    {coins.map((item) => (
                                        <Box
                                            className={classes.listItem}
                                            onClick={onOptionClicked(item.denom)}
                                            key={Math.random()}>
                                            {denomToSymbol(item.denom)}
                                        </Box>
                                    ))}
                                </Scrollbars>
                            </Box>
                        </Box>
                    )}
                </Box>
                <Box className={classes.inputText}>
                    <TextField
                        className={
                            state.touched.amount && errors.amount ? classes.bRed : classes.bGray
                        }
                        variant="outlined"
                        name="amount"
                        placeholder="Enter Amount"
                        fullWidth
                        onChange={inputChangeNumberHandler}
                        autoComplete="off"
                        value={state.amount}
                        type="number"
                        inputProps={{
                            min: 0,
                            step: "0.001",
                        }}
                        error={hasAmountError || hasAmountZeroError}
                        helperText={
                            hasAmountError
                                ? `You don't have enough ${
                                      selectCoin &&
                                      selectCoin.denom.replace(
                                          SYMBOL_REGEX,

                                          "",
                                      )
                                  } in your wallet.`
                                : hasAmountZeroError
                                ? `Please enter a correct amount
                          `
                                : null
                        }
                    />
                </Box>

                <Box className={classes.inputText}>
                    <TextField
                        className={classes.bGray}
                        variant="outlined"
                        name="memo"
                        placeholder="Enter Memo"
                        fullWidth
                        onChange={handleChangeInput}
                        autoComplete="off"
                        value={state.memo}
                        type="text"
                    />
                </Box>
                <Box className={classes.feeStructure}>
                    <Typography className={classes.feeBox}>Transaction Fee: 0.001 FNR</Typography>
                </Box>

                <Box className={classes.btn}>
                    <Button className={classes.btn1} variant="outlined" onClick={goBack}>
                        Cancel
                    </Button>
                    <Button
                        className={classes.btn2}
                        onClick={hanldeSendCoin}
                        disabled={!selectedOption}>
                        {isSending ? (
                            <CircularProgress
                                variant="indeterminate"
                                disableShrink
                                className={classes.top}
                                classes={{
                                    circle: classes.circle,
                                }}
                                size={20}
                                thickness={4}
                            />
                        ) : (
                            "Send"
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
export default SendToken;
