import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./redux/store/store";





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider>
      <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
      </React.StrictMode>
    </SnackbarProvider>

);
