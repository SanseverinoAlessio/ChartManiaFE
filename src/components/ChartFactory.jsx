import { CHART_TYPES } from "../constants/chartTypes";
import ScatterChart from "./Charts/ScatterChart/ScatterChart";
import BarChart from "./Charts/BarChart/BarChart";
import LineChart from "./Charts/LineChart/LineChart";
import PieChart from "./Charts/PieChart/PieChart";

function ChartFactory({ chartType, xAxisType, chartData, chartLabels }) {
  //Adapt chart data
  function adaptData() {
    if (xAxisType == "string") {
      return {
        labels: chartLabels,
        datasets: chartData.map((dataset) => ({
          label: dataset.name,
          data: dataset.data.map((item) => item.y) || [],
          borderWidth: 2,
          borderColor: dataset.data.map((item) => item.color) || [],
          backgroundColor: dataset.data.map((item) => item.color) || [],
        })),
      };
    }


    return {
      labels: [],
      datasets: chartData.map((dataset) => ({
        label: dataset.name,
        data: dataset.data,
        showLine: true,
        borderWidth: 2,
        borderColor: dataset.data[0].color,
        backgroundColor: dataset.data[0].color,
        tension: 0.2,
        pointRadius: 5,
      })),
    };
  }

  console.log(adaptData());

  switch (chartType) {
    case "bar":
      return <BarChart configData={adaptData()} />;
    case "scatter":
      return <ScatterChart configData={adaptData()} />;
    case "line":
      return <LineChart configData={adaptData()} />;
    case "pie":
      return <PieChart configData={adaptData()}></PieChart>;
    default:
      return null;
  }
}

export default ChartFactory;
