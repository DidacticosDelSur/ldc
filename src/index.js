import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import Router from "./routes/Routes";
import './assets/scss/icons.css';
import { AuthProvider } from "./services/AuthContext";
import { GlobalFunctionsProvider } from "./services/GlobalFunctionsContext";
import { PageProvider } from "./services/PageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalFunctionsProvider>
        <PageProvider>
          <Router />
        </PageProvider>
      </GlobalFunctionsProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
