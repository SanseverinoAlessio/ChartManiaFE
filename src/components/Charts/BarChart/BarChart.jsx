import { Bar } from "react-chartjs-2";
import { useRef } from "react";
function BarChart({ chartData }) {
  const chartRef = useRef(null);
 
  const data = {
    datasets: [
      {
        label: "Dataset",
        data: chartData,
        borderWidth: 2,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return <Bar ref={chartRef} data={data}/>;
}

export default BarChart;
