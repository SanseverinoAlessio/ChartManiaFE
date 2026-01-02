import { useEffect, useState } from "react";
import "./charts.css";
import ChartsTable from "../../../components/ChartsTable/ChartsTable";

function Charts() {
  //Qui logica per la pagination
  /*useEffect(async () => {
    try {
      const resp = await ChartService.getCharts();
    } catch (e) {
        console.error(e);


    }
  }); */

  return (
    <>
     <ChartsTable defaultPageSize={10}/>
    </>
  );
}

export default Charts;
