import { Line } from "react-chartjs-2";
import { useRef } from "react";
function LineChart({ configData }) {
  const chartRef = useRef(null);
  return <Line ref={chartRef} data={configData}/>;
}

export default LineChart;
