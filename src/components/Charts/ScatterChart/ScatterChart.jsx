import { useRef } from "react";
import { Scatter } from "react-chartjs-2";

function ScatterChart({ chartData }) {
  const chartRef = useRef(null);
  const data = {
    datasets: [
      {
        label: "Dataset",
        data: [...chartData].sort((a, b) => a.x - b.x),
        showLine: true,
        borderWidth: 2,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: { type: "linear", position: "bottom" },
      y: { type: "linear" },
    },
  };

  return <Scatter ref={chartRef} data={data} options={options} />;
}

export default ScatterChart;
