import { Box, Grid } from "@mui/material";
import "./chart_creation.css";
import { useEffect, useState } from "react";
import ChartInputTable from "../../../components/ChartInputTable/ChartInputTable";
import ChartFactory from "../../../components/ChartFactory";
import { useParams } from "react-router";
import { getChartTypeInfo } from "../../../helpers/ChartHelper";
import { useNavigate } from "react-router";
import CategoricalInputTable from "../../../components/CategoricalInputTable/CategoricalInputTable";

function ChartCreation() {
  const { chartType } = useParams();
  const chartTypeInfo = getChartTypeInfo(chartType);
  const navigate = useNavigate();
  useEffect(() => {
    if (chartTypeInfo == null) {
      return navigate("/personal-area/charts");
    }
  });

  const [chartLabels, setChartLabels] = useState(["New Label"]);
  const [chartData, setChartData] = useState([
    {
      name: "DataSet1",
      data: [
        {
          x: 0,
          y: 0,
          color: "#f44040",
        },
      ],
    },
  ]);

  return (
    <>
      <Box className="chart-creation">
        <h2>Chart Creation</h2>
        <Grid container>
          <Grid size={12} height={400}>
            <ChartFactory
              chartData={chartData}
              chartLabels={chartLabels}
              xAxisType={chartTypeInfo.xAxisType}
              chartType={chartType}
            ></ChartFactory>
          </Grid>
          <Grid className="chart-input-table-container" size={12} height={400}>
            {chartTypeInfo.xAxisType == "string" ? (
              <CategoricalInputTable
                chartLabels={chartLabels}
                chartTypeInfo={chartTypeInfo}
                setChartLabels={setChartLabels}
                setChartData={setChartData}
                chartData={chartData}
              />
            ) : (
              <ChartInputTable
                chartTypeInfo={chartTypeInfo}
                chartData={chartData}
                setChartData={setChartData}
              ></ChartInputTable>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ChartCreation;
