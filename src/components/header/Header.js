/* eslint-disable eqeqeq */
/*global chrome*/

import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { logout1, logo, userIcon } from "../../assets/images";
import Divider from "@material-ui/core/Divider";
import { ListItemIcon, ListItemText, Tooltip, Menu, MenuItem, Box } from "@material-ui/core";
import HeaderDropDown from "./HeaderDropDown";
import {
    AccountCircle,
    Add,
    Settings,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/actions";
import { activeAccount, activeIndex, socketDisconnect } from "../../redux/wallet/actions";
import { Scrollbars } from "react-custom-scrollbars";
import ExtensionStore from "../../utils/local-store";
import { setAddress } from "../../redux/encryption/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "& .MuiMenu-list": {
            padding: 0,
        },
        "& .MuiDivider-root": {
            width: "100%",
            marginTop: -13,
            marginBottom: 12,
            height: 1.5,
            opacity: "25%",
            backgroundColor: "#707070",
        },
    },
    textDecoration: {
        textDecoration: "none",
        borderTop: "1px solid #f5f5f5",
        borderBottom: "1px solid #f5f5f5",
        fontFamily: "Poppins",

        "& .MuiListItemText-primary": {
            color: "#707070",
        },
        "& .MuiListItemIcon-root": {
            minWidth: 45,
        },
        "& .MuiTypography-displayBlock": {
            textAlign: "left",
        },
    },
    textDecorationActive: {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        textDecoration: "none",
        borderTop: "1px solid #f5f5f5",
        borderBottom: "1px solid #f5f5f5",
        fontFamily: "Poppins",
        margin: "2px 0px",
        "& .MuiListItemText-primary": {
            color: "#707070",
        },
        "& .MuiListItemIcon-root": {
            minWidth: 45,
        },
        "& .MuiTypography-displayBlock": {
            textAlign: "left",
        },
    },
    icon: {
        color: "#23224e",
        fontSize: "30px",
        cursor: "pointer",
        width: 18.3,
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        padding: " 16px 0px 20px 0px",
        alignItems: "center",
    },
    menuItem: {
        color: "#464646",
        fontFamily: "Poppins",
        fontSize: 12,
        fontWeight: 400,
        borderBottom: "1px solid #efecec",
        borderTop: "1px solid #efecec",
    },
    accountWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
            color: "blue",
        },
    },
    icons: {
        marginRight: 10,
        width: 15,
    },
    drop: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        [theme.breakpoints.down("xs")]: {
            flexWrap: "wrap-reverse",
            justifyContent: "flex-end",
            alignItems: "flex-end",
        },
    },
    menu: {
        "& .MuiMenu-paper": {
            top: "40px !important",
            transition:
                "opacity 241ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0ms, transform 400ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0ms  !important",
            [theme.breakpoints.down("xs")]: {
                top: "42.8px !important",
                left: "178px  !important",
            },
        },
        "& .MuiListItemIcon-root": {
            color: "#23224e !important",
        },
    },
}));

const Header = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pathname } = useHistory().location;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [change, setChange] = useState(false);
    const { accounts, activeAccounts } = useSelector((state) => state.wallet);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMobileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const moreRef = useRef(null);
    const createAccount = () => {
        history.push("/create-account");
    };
    const Setting = () => {
        history.push("/setting");
    };
    const goBack = () => {
        history.push("/dashboard");
    };

    const lockWalletHandler = () => {
        dispatch(logout());
        setChange(true);
        history.push("/unlock-wallet");
        dispatch({ type: "CLEAR_STATES" });
        dispatch(socketDisconnect());
    };

    useEffect(() => {
        if (ExtensionStore.isSupported) {
            return chrome.storage.onChanged.addListener(function () {
                dispatch({ type: "SESSION_LOGOUT" });
            });
        }
    }, [change, dispatch]);


    const AccountAddress = async (address, displayName, index) => {
        const data = [
            {
                displayName: displayName,
                index: index,
                address: address,
            },
        ];
        handleMenuClose();
        dispatch(setAddress(address));
        dispatch(activeIndex(index));
        dispatch(activeAccount(data));
        ExtensionStore.set({ activeAccounts: data });
    };

    useEffect(() => {
        if (ExtensionStore.isSupported) {
            return chrome.storage.onChanged.addListener(function (changes, e) {
                try {
                    Object.entries(changes).forEach(([key, value]) => {
                        if (key !== undefined && key !== null) {
                            const newAccount = changes.activeAccounts.newValue;
                            const data = [
                                {
                                    displayName: newAccount[0].displayName,
                                    index: newAccount[0].index,
                                    address: newAccount[0].address,
                                },
                            ];
                            ExtensionStore.set({ address: newAccount[0].address });
                            dispatch(setAddress(newAccount[0].address));
                            dispatch(activeIndex(newAccount[0].index));
                            dispatch(activeAccount(data));
                        }
                    });
                } catch (error) {
                    console.log("error", error);
                }
            });
        }
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <Box className={classes.wrapper}>
                <img
                    src={logo}
                    alt="logo"
                    onClick={goBack}
                    style={{ cursor: "pointer", objectFit: "contain", width: 66, height: 17 }}
                />
                <Box className={classes.drop}>
                    {pathname === "/account" ? <HeaderDropDown /> : null}

                    <Tooltip title="More options">
                        <img
                            ref={moreRef}
                            onClick={handleMobileMenuOpen}
                            src={userIcon}
                            alt="userIcon"
                            className={classes.icon}
                        />
                    </Tooltip>
                </Box>
            </Box>
            <Divider />

            <Menu
                getContentAnchorEl={null}
                anchorEl={moreRef.current}
                open={isMenuOpen}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                className={classes.menu}
                onClose={handleMenuClose}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}>
                <MenuItem className={classes.textDecoration} onClick={createAccount}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="Create Account" />
                </MenuItem>
                <Scrollbars autoHeight autoHeightMin={40} autoHeightMax={135}>
                    {accounts &&
                        accounts.map((account, index) => (
                            <div
                                onClick={() =>
                                    AccountAddress(account.address, account.displayName, index)
                                }
                                key={index}>
                                <MenuItem
                                    className={
                                        activeAccounts[0].index == index
                                            ? classes.textDecorationActive
                                            : classes.textDecoration
                                    }>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText key={index}>{account.displayName}</ListItemText>
                                </MenuItem>
                            </div>
                        ))}
                </Scrollbars>
                <MenuItem className={classes.textDecoration} onClick={Setting}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </MenuItem>
                <MenuItem className={classes.textDecoration} onClick={lockWalletHandler}>
                    <ListItemIcon>
                        <img src={logout1} alt="head" width="18px" />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </MenuItem>
            </Menu>
        </div>
    );
};
export default Header;
