import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Navbar from "./component/Navbar.jsx";
window.apiURL = "https://crm.accesssurveykshan.co.in/v1";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </>
);
