import logo from "./logo.svg";
import "./App.css";
import { TextField, ThemeProvider } from "@mui/material";
import MainRouter from "./routes/MainRouter";
import Header from "./features/Header/Header";
import { theme } from "./styles/theme";
import { useState } from "react";
import BudjetContextProvider from "./context/BudjetContext";

function App() {
  return (
    <BudjetContextProvider>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BudjetContextProvider>
  );
}

export default App;
