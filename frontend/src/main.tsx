import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";
import { Toaster } from "react-hot-toast";

import { createTheme, ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import "./index.css";

import { AuthProvider } from "./context/auth.context.tsx";

axios.defaults.baseURL = "http://localhost:5005/api/v1";
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "white" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
