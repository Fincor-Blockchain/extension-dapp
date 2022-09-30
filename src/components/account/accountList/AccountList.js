import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Box, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FNR } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { SCALE } from "../../../vars/scale";
import { denomToSymbol, NumberFormat } from "../../../utils/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& .MuiListItemText-root": {
            flex: 0,
            whiteSpace: "nowrap",
        },
        "& .MuiList-padding": {
            width: "100%",
            paddingTop: "0px !important",
            paddingBottom: "0px !important",
        },
        "& .MuiListItem-secondaryAction": {
            margin: "7px 0px",
        },
        "& .MuiListItem-container": {
            marginTop: "-14px",
        },
    },
    btcValue: {
        fontFamily: "Gilroy-Regular",
        fontSize: 12,
        lineHeight: 1.5,
        textAlign: "left",
        color: theme.palette.darkBlack,
        fontWeight: 500,
        textTransform: "capatilize",
    },
    amountValue: {
        display: "flex",
        flexDirection: "column",
        color: theme.palette.darkBlack,
    },
    help: {
        margin: "10px 0px 10px 0px",
        fontSize: 12,
        lineHeight: 1.56,
        color: theme.palette.primary.darkGray,
        marginBottom: 16,
        fontStyle: "normal",
        // position: "absolute",
        // bottom: 0,
    },
    span: {
        color: theme.palette.yellow,
        cursor: "pointer",
    },
    avatar: {
        width: 22,
        objectFit: "contain",
        marginRight: 6,
    },
    iconBg: {
        backgroundColor: theme.palette.blue,
        borderRadius: "50%",
        height: 20,
        width: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.white,
    },
    list: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    },
    circle: {},
    listItem: {
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
    },
}));

const AccountList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { coins, detailsLoading } = useSelector((state) => state.wallet);

    const selectCoinHandler = (coin) => {
        dispatch({ type: "SET_SELECTED_COIN", payload: coin });
    };

    const coinImages = (value) => {
        var symbol = value;
        if (symbol === "FNR") {
            return FNR;
        } else {
            return FNR;
        }
    };

    useEffect(() => {}, [coins]);

    return (
        <div className={classes.root}>
            <Box className={classes.list}>
                {detailsLoading ? (
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "120px",
                        }}>
                        <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            className={classes.top}
                            classes={{
                                circle: classes.circle,
                            }}
                            size={30}
                            thickness={4}
                        />
                    </Box>
                ) : (
                    <>
                        {coins && coins.length > 0 ? (
                            <>
                                {coins.map((item, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => selectCoinHandler(item)}
                                        style={{ width: "100%" }}>
                                        <Link
                                            to={"/transaction"}
                                            style={{ textDecoration: "none" }}>
                                            <List>
                                                <ListItem divider className={classes.listItem}>
                                                    <img
                                                        src={coinImages(denomToSymbol(item.denom))}
                                                        alt="fnr"
                                                        className={classes.avatar}
                                                    />
                                                    <ListItemText>
                                                        <Box className={classes.amountValue}>
                                                            <Typography
                                                                className={classes.btcValue}>
                                                                {NumberFormat(item.amount / SCALE)}
                                                                &nbsp;
                                                                {denomToSymbol(item.denom)}
                                                            </Typography>
                                                        </Box>
                                                    </ListItemText>
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="delete">
                                                            <span className={classes.iconBg}>
                                                                <ChevronRightIcon />
                                                            </span>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </List>
                                        </Link>
                                    </Box>
                                ))}
                            </>
                        ) : (
                            <List>
                                <ListItem button divider>
                                    <img src={FNR} alt="fnr" className={classes.avatar} />
                                    <ListItemText>
                                        <Box className={classes.amountValue}>
                                            <Typography className={classes.btcValue}>
                                                0 FNR
                                            </Typography>
                                        </Box>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <span className={classes.iconBg}>
                                                <ChevronRightIcon />
                                            </span>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        )}
                    </>
                )}
            </Box>
            {detailsLoading ? (
                ""
            ) : (
                <Typography className={classes.help}>
                    Need help? Contact <span className={classes.span}>Fincor wallet Support</span>
                </Typography>
            )}
        </div>
    );
};

export default AccountList;
