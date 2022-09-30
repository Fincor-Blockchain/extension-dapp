import io from "socket.io-client";
import { SERVER_URL, SOCKET_IP } from "../../vars/api";
import {
    SET_WALLET_META,
    SET_ACCOUNTS,
    SET_MNEMONIC,
    GET_ACCOUNT_DETAILS_LOADING,
    GET_ACCOUNT_DETAILS,
    SEND_TXS_LOADING,
    GET_All_TRANSACTIONS,
    GET_All_TRANSACTIONS_LOADING,
    ACTIVE_ACCOUNTS,
    ACTIVE_INDEX,
} from "./actionTypes";
const fincor = require("@libonomy/cuspstakejs");

const socket = io(SOCKET_IP, {
    transports: ["websocket"],
});

export const setWalletMeta = (meta) => ({
    type: SET_WALLET_META,
    payload: meta,
});

export const setAccounts = (accounts) => ({
    type: SET_ACCOUNTS,
    payload: accounts,
});

export const setMnemonic = (mnemonic) => ({
    type: SET_MNEMONIC,
    payload: mnemonic,
});

export const userUnlockWallet = (meta, accounts, mnemonic) => async (dispatch) => {
    dispatch(setWalletMeta(meta));
    dispatch(setAccounts(accounts));
    dispatch(setMnemonic(mnemonic));
};

export const getAccountDetailsLoading = (loading) => ({
    type: GET_ACCOUNT_DETAILS_LOADING,
    payload: loading,
});

export const sendTransactionLoading = (value) => ({
    type: SEND_TXS_LOADING,
    payload: value,
});

export const getAllTransactionsLoading = () => ({
    type: GET_All_TRANSACTIONS_LOADING,
});


export const sendTransaction =
    (
        toAddress,
        sentAmount,
        fee,
        memo,
        denom,
        ecpairPriv,
    ) =>
    async (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(sendTransactionLoading(true));
            const { address } = getState().encrypt;
            fetch(
                `${SERVER_URL}/users/getAccounts?address=${address}`,
                {
                    method: "GET",
                    headers: {
                        "x-secret-web-wallet": "LIB-WEB-WALLET-TX",
                    },
                },
            )
                .then((response) => response.json())
                .then(async (res) => {
                    const data = JSON.parse(res);
                    const chainId = process.env.REACT_APP_CHAIN_ID;
                    let x = fincor.network(process.env.REACT_APP_SERVER_URL, chainId);
                    let stdSignMsg = x.newStdMsg({
                        msgs: [
                            {
                                type: "cusp-sdk/MsgSend",
                                value: {
                                    amount: [
                                        {
                                            amount: String(sentAmount * 1000000), // 6 decimal places (1000000 FFNR = 1 FNR)
                                            denom: denom, // coin denomination is FFNR
                                        },
                                    ],
                                    from_address: address,
                                    to_address: toAddress,
                                },
                            },
                        ],
                        chain_id: chainId,
                        fee: {
                            amount: [{ amount: String(fee), denom: "ffnr" }],
                            gas: String(200000),
                        },
                        memo: memo === undefined ? "" : memo,
                        account_number: data.result.value.account_number,
                        sequence: data.result.value.sequence,
                    });
                    const signedTx = await x.sign(stdSignMsg, ecpairPriv);

                    var myHeaders = new Headers();
                    myHeaders.append("x-secret-web-wallet", "LIB-WEB-WALLET-TX");
                    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                    var urlencoded = new URLSearchParams();
                    urlencoded.append("signedTx", JSON.stringify(signedTx));

                    var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: urlencoded,
                        redirect: "follow",
                    };

                    fetch(
                        `${SERVER_URL}/users/webTx`,
                        requestOptions,
                    )
                        .then((response) => response.text())
                        .then(async (result) => {
                            const res = JSON.parse(result);
                            const response = JSON.parse(res);
                            dispatch(sendTransactionLoading(false));
                            resolve(response.txhash);
                        })
                        .catch((err) => {
                            console.log(err, "error");
                            dispatch(sendTransactionLoading(false));
                        });
                })
                .catch((err) => {
                    dispatch(sendTransactionLoading(false));
                });
        });
    };

export const socketConnect = () => async (dispatch) => {
    socket.connect();
};

export const socketDisconnect = () => async (dispatch) => {
    socket.disconnect();
};

export const socketRegisterClient = (address) => async (dispatch) => {
    dispatch(getAccountDetailsLoading(true));
    dispatch(getAllTransactionsLoading());
    socket.emit("RegisterClient", address);
    if (socket.disconnected) {
        dispatch(getAccountDetailsLoading(false));
        dispatch({
            type: GET_ACCOUNT_DETAILS,
            payload: [],
        });
        dispatch({
            type: GET_All_TRANSACTIONS,
            payload: null,
        });
    }
};

export const listenTransactions = () => (dispatch) => {
    socket.on("userTransaction", (data) => {
        dispatch({
            type: GET_All_TRANSACTIONS,
            payload: data,
        });
    });
};

export const listenBalance = () => (dispatch) => {
    socket.on("walletBalance", (data) => {
        dispatch(getAccountDetailsLoading(false));
        dispatch({
            type: GET_ACCOUNT_DETAILS,
            payload: data.value.coins,
        });
    });
};

export const activeAccount = (activeAccounts) => ({
    type: ACTIVE_ACCOUNTS,
    payload: activeAccounts,
});
export const activeIndex = (activeItemIndex) => ({
    type: ACTIVE_INDEX,
    payload: activeItemIndex,
});
export const socketTerminateClient = () => async (dispatch, getState) => {
    const address = getState().encrypt.address;
    socket.emit("terminate", address);
};
