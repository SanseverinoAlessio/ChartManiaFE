import { useRef } from "react";
import { Scatter } from "react-chartjs-2";

function ScatterChart({ configData }) {
  const chartRef = useRef(null);
  
  const options = {
    scales: {
      x: { type: "linear", position: "bottom" },
      y: { type: "linear" },
    },
  };

  return <Scatter ref={chartRef} data={configData} options={options} />;
}

export default ScatterChart;
