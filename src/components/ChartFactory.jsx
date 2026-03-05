import { CHART_TYPES } from "../constants/chartTypes";
import ScatterChart from "./Charts/ScatterChart/ScatterChart";
import BarChart from "./Charts/BarChart/BarChart";
import LineChart from "./Charts/LineChart/LineChart";
import PieChart from "./Charts/PieChart/PieChart";

function ChartFactory({
  chartRef,
  chartType,
  xAxisType,
  chartData,
  chartLabels,
}) {
  //Adapt chart data

  const whiteBackgroundPlugin = {
    id: "whiteBackground",
    beforeDraw: (chart, args, options) => {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options?.color || "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    plugins: {
      whiteBackground:  { color: '#ffffff' }
    },
  };


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


  switch (chartType) {
    case "bar":
      return <BarChart plugins={[whiteBackgroundPlugin]} options={options} chartRef={chartRef} configData={adaptData()} />;
    case "scatter":
      return <ScatterChart plugins={[whiteBackgroundPlugin]} options={options} chartRef={chartRef} configData={adaptData()} />;
    case "line":
      return <LineChart plugins={[whiteBackgroundPlugin]} options={options} chartRef={chartRef} configData={adaptData()} />;
    case "pie":
      return <PieChart plugins={[whiteBackgroundPlugin]} options={options} chartRef={chartRef} configData={adaptData()}></PieChart>;
    default:
      return null;
  }
}

export default ChartFactory;
