import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router";
import CustomRoutes from "./components/CustomRoutes.jsx";

function App() {
  // Verifica se l'URL corrente inizia con /personal-area
  return (
    <>
      <BrowserRouter>
        <CustomRoutes/>
      </BrowserRouter>
    </>
  );
}

export default App;
