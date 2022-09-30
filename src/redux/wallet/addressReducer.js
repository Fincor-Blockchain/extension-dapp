import * as actionTypes from "./actionTypes";

const initialState = {
  address: "",
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADDRESS: {
      return {
        ...state,
        address: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default addressReducer;
