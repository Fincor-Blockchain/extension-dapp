import * as actionTypes from "./actionTypes";
import { ENCRYPTED_DATA } from "./actionTypes";

const initialState = {
    encryptedData: "",
    address: "",
    keys: [],
};

const encryptionReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ENCRYPTED_DATA: {
            return {
                ...state,
                encryptedData: payload,
            };
        }
        case actionTypes.SET_ADDRESS: {
            return {
                ...state,
                address: payload,
            };
        }
        case actionTypes.SESSION_LOGOUT: {
            return {
                ...state,
                address: "",
            };
        }
        case actionTypes.SET_PRIVATE_KEYS: {
            return {
                ...state,
                keys: payload,
            };
        }
        default:
            return state;
    }
};

export default encryptionReducer;
