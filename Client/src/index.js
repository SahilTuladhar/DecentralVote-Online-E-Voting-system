import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ElectionItemContextProvider } from "./contexts/electionItem-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ElectionItemContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ElectionItemContextProvider>
  </React.StrictMode>
);
