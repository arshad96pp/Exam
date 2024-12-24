import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/app.css";
import { AppContextProvider } from "./context/index.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { GlobelContextProvider } from "./context/GlobelCotext/index.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <GlobelContextProvider>
        <AppContextProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </AppContextProvider>
      </GlobelContextProvider>
    </HashRouter>
  </React.StrictMode>
);
