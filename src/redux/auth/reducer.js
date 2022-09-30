import {
    SET_AUTHENTICATION_MNEMONIC_WORDS,
    SESSION_LOGIN,
    SESSION_LOGOUT,
    CLEAR_WORDS,
} from "./actionTypes";

const getLogin = localStorage.getItem("login");
const initialState = {
    loggedIn: getLogin ? true : false,
    mnemonicWords: "",
};

localStorage.setItem("login", initialState.loggedIn);

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_AUTHENTICATION_MNEMONIC_WORDS: {
            return {
                ...state,
                mnemonicWords: payload,
            };
        }
        case CLEAR_WORDS: {
            return {
                ...state,
                mnemonicWords: "",
            };
        }

        case SESSION_LOGIN: {
            return {
                ...state,
                loggedIn: true,
            };
        }

        case SESSION_LOGOUT: {
            return {
                ...state,
                loggedIn: false,
            };
        }

        default:
            return state;
    }
};

export default authReducer;
