import { ENCRYPTED_DATA, SET_ADDRESS, SET_PRIVATE_KEYS } from "./actionTypes";

export const setEncryptedData = (data) => (dispatch) =>
    dispatch({
        type: ENCRYPTED_DATA,
        payload: data,
    });

export const setAddress = (address) => (dispatch) =>
    dispatch({
        type: SET_ADDRESS,
        payload: address,
    });
export const setPrivateKeys = (keys) => (dispatch) =>
    dispatch({
        type: SET_PRIVATE_KEYS,
        payload: keys,
    });
