import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/store";
import "./index.css";
import App from "./App";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import "./translator/i18n";
const { store, persistor } = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </StoreProvider>,
  // </React.StrictMode>//
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
