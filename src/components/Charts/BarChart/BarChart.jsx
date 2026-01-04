import { Bar } from "react-chartjs-2";
import { useRef } from "react";
function BarChart({ configData }) {
  const chartRef = useRef(null);
  return <Bar ref={chartRef} data={configData}/>;
}

export default BarChart;
