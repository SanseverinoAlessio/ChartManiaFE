import { Box, Grid } from "@mui/material";
import "./chart_creation.css";
import ScatterChart from "../../../components/Charts/ScatterChart/ScatterChart";
import { useState } from "react";
import ChartInputTable from "../../../components/ChartInputTable/ChartInputTable";
import ChartFactory from "../../../components/ChartFactory";
import { useParams } from "react-router";
function ChartCreation() {
  const [chartData, setChartData] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const { chartType } = useParams();


  return (
    <>
      <Box className="chart-creation">
        <h2>Chart Creation</h2>
        <Grid container>
          <Grid size={6} height={400}>
              <ChartFactory chartData={chartData} chartType={chartType}></ChartFactory>
          </Grid>
          <Grid className="table-wrapper" size={6}>
            <ChartInputTable
              setChartData={setChartData}
              rows={chartData}
            ></ChartInputTable>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ChartCreation;
