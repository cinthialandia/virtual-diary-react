import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <App useSuspense={false} />
  </React.StrictMode>,
  document.getElementById("root")
);
