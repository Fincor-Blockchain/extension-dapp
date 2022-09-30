import {
    SET_AUTHENTICATION_MNEMONIC_WORDS,
    SESSION_LOGIN,
    SESSION_LOGOUT,
    CLEAR_WORDS,
} from "./actionTypes";
import ExtensionStore from "../../utils/local-store";

export const login = () => (dispatch) =>
    dispatch({
        type: SESSION_LOGIN,
    });
export const clearWords = () => (dispatch) =>
    dispatch({
        type: CLEAR_WORDS,
    });

export const logout = () => (dispatch) => {
    ExtensionStore.set({ address: null });
    ExtensionStore.set({ accounts: null });
    dispatch({
        type: SESSION_LOGOUT,
    });
};
export const setGeneratedMnemonics = (words) => (dispatch) =>
    dispatch({
        type: SET_AUTHENTICATION_MNEMONIC_WORDS,
        payload: words,
    });
