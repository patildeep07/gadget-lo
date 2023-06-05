import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";

// Routes
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppProvider";
import { AuthProvider, AuthContext } from "./context/AuthProvider";

export { AppContext, AuthContext };

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
