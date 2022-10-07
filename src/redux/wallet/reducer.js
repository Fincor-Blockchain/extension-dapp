import * as actionTypes from "./actionTypes";
import { SCALE } from "../../vars/scale";
import { denomToSymbol } from "../../utils/utils";

const initialState = {
  meta: {},
  mnemonic: "",
  accounts: [],
  transactions: [],

  coins: [],
  coinsLoading: false,
  allTxs: null,
  allTxsLoading: false,
  selectedRow: -1,
  selectedCoin: {},
  txsLoading: false,
  graphDetail: null,
  graphDetailLoading: false,
  marketPrice: {
    usd: "",
  },
  psixMarketPrice: {
    price: "",
  },
  isSending: false,
  isSuccessOpen: false,
  isErrorOpen: false,
  successText: "",
  errorText: "",
  isFileSuccessOpen: false,
  fileSuccessText: "",
  isTxsHash: false,
  denom: "",
  amount: "",
  toAddress: "",
  txsHash: "",
  activeAccounts: [],
  activeItemIndex: 0,
  contacts: {
    fincorContacts: [],
  },
  activeContact: {},
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ROW: {
      return {
        ...state,
        selectedRow: action.payload,
      };
    }

    case actionTypes.SET_SELECTED_COIN: {
      return {
        ...state,
        selectedCoin: action.payload,
      };
    }

    case actionTypes.SET_WALLET_META: {
      return {
        ...state,
        meta: action.payload,
      };
    }

    case actionTypes.SET_ACCOUNTS: {
      return {
        ...state,
        accounts: action.payload,
      };
    }

    case actionTypes.SET_MNEMONIC: {
      return {
        ...state,
        mnemonic: action.payload,
      };
    }

    case actionTypes.GET_ACCOUNT_DETAILS: {
      const coinsList =
        action?.payload?.map((coin) => ({
          ...coin,
          symbol: denomToSymbol(coin.denom),
          balance: coin.amount / SCALE,
        })) || [];
      return {
        ...state,
        coins: coinsList,
        coinsLoading: false,
      };
    }

    case actionTypes.GET_ACCOUNT_DETAILS_LOADING: {
      return {
        ...state,
        detailsLoading: action.payload,
      };
    }

    case actionTypes.GET_All_TRANSACTIONS_LOADING: {
      return {
        ...state,
        allTxsLoading: true,
      };
    }

    case actionTypes.SET_GRAPH_DATA: {
      return {
        ...state,
        graphDetail: action.payload,
        graphDetailLoading: false,
      };
    }
    case actionTypes.SET_GRAPH_DATA_LOADING: {
      return {
        ...state,
        graphDetailLoading: true,
      };
    }

    case actionTypes.GET_All_TRANSACTIONS: {
      return {
        ...state,
        allTxs: action.payload,
        allTxsLoading: false,
      };
    }

    case actionTypes.CREATE_TX_LOADING: {
      return {
        ...state,
        txsLoading: true,
      };
    }

    // case actionTypes.SET_ADDRESS: {
    //   return {
    //     ...state,
    //     address: action.payload,
    //   };
    // }

    case actionTypes.GET_MARKET_PRICE: {
      return {
        ...state,
        marketPrice: action.payload,
      };
    }

    case actionTypes.GET_PSIX_MARKET_PRICE: {
      return {
        ...state,
        psixMarketPrice: action.payload,
      };
    }

    case actionTypes.SEND_TXS_LOADING: {
      return {
        ...state,
        isSending: action.payload,
      };
    }

    case actionTypes.SUCCESS_BAR_CONTENT: {
      return {
        ...state,
        isSuccessOpen: action.payload.isOpen,
        successText: action.payload.message,
      };
    }

    case actionTypes.BACKUP_FILE_SUCCESS_BAR_CONTENT: {
      return {
        ...state,
        isFileSuccessOpen: action.payload.isOpen,
        fileSuccessText: action.payload.message,
      };
    }

    case actionTypes.ERROR_BAR_CONTENT: {
      return {
        ...state,
        isErrorOpen: action.payload.isOpen,
        errorText: action.payload.message,
      };
    }

    case actionTypes.CLOSE_SEND_TXS_BAR: {
      return {
        ...state,
        isSuccessOpen: action.payload,
        isErrorOpen: action.payload,
        isFileSuccessOpen: action.payload,
      };
    }

    case actionTypes.SENT_TXS_HASH: {
      return {
        ...state,
        isTxsHash: action.payload.isTxsHash,
        denom: action.payload.denom,
        amount: action.payload.amount,
        toAddress: action.payload.toAddress,
        txsHash: action.payload.txsHash,
      };
    }
    case actionTypes.ACTIVE_ACCOUNTS: {
      return {
        ...state,
        activeAccounts: action.payload,
      };
    }
    case actionTypes.ACTIVE_INDEX: {
      return {
        ...state,
        activeItemIndex: action.payload,
      };
    }
    case actionTypes.SET_CONTACTS: {
      return {
        ...state,
        contacts: action.payload,
      };
    }
    case actionTypes.SET_ACTIVE_CONTACT: {
      return {
        ...state,
        activeContact: action.payload,
      };
    }
    case actionTypes.CLEAR_STATES: {
      return {
        ...state,
        meta: {},
        mnemonic: "",
        accounts: [],
        transactions: [],
        coins: [],
        selectedRow: -1,
        selectedCoin: {},
        txsLoading: false,
        allTxs: {},
        graphDetail: [],
        marketPrice: {},
        psixMarketPrice: {
          price: "",
        },
        isSending: false,
        isSuccessOpen: false,
        isErrorOpen: false,
        isFileSuccessOpen: false,
        fileSuccessText: "",
        isTxsHash: false,
        denom: "",
        amount: "",
        toAddress: "",
        txsHash: "",
      };
    }

    default: {
      return state;
    }
  }
};

export default walletReducer;
