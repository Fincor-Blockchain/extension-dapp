// import { createStore, applyMiddleware, compose } from 'redux';

// import thunk from 'redux-thunk';
// import reducer from './reducer';
// const initialState = {};
// const middleware = [thunk];

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(...middleware));
// const store = createStore(reducer, initialState, enhancer);

// export default store;

import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";
// import { createLogger } from 'redux-logger';

import rootReducer from "./reducer";

const persistConfig = {
    // Root
    key: "root",
    // Storage Method (React Native)
    storage,
    timeout: null,
    // Whitelist (Save Specific Reducers)
    whitelist: ["wallet"], //, "wallet"
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [""],
};

// const loggerMiddleware = createLogger();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(preloadedState = {}) {
    const middlewares = [thunkMiddleware]; // loggerMiddleware
    const middlewareEnhancer =
        process.env.NODE_ENV === "development"
            ? composeWithDevTools(applyMiddleware(...middlewares))
            : applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(...enhancers);

    const store = createStore(persistedReducer, preloadedState, composedEnhancers);

    let persistor = persistStore(store);

    return { store, persistor };
}
