import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router";
import CustomRoutes from "./components/CustomRoutes.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomRoutes/>
      </BrowserRouter>
    </>
  );
}

export default App;
