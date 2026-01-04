import { useEffect, useState } from "react";
import "./charts.css";
import ChartsTable from "../../../components/ChartsTable/ChartsTable";

function Charts() {
  return (
    <>
     <ChartsTable defaultPageSize={10}/>
    </>
  );
}

export default Charts;
