import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import walletReducer from "./wallet/reducer";
import encryptionReducer from "./encryption/reducer";
// import txsReducer from "./txs/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  wallet: walletReducer,
  encrypt: encryptionReducer,
  // txs: txsReducer,
});

export default rootReducer;
