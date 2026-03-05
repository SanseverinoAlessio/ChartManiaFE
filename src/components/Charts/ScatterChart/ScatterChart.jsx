import { useRef } from "react";
import { Scatter } from "react-chartjs-2";

function ScatterChart({ options, plugins, configData,chartRef }) {
  
  const customizedChartOptions = {...options,
    ...{
    scales: {
      x: { type: "linear", position: "bottom" },
      y: { type: "linear" },
    },
  }};

  return <Scatter options={customizedChartOptions} plugins={plugins} ref={chartRef} data={configData}  />;
}

export default ScatterChart;
