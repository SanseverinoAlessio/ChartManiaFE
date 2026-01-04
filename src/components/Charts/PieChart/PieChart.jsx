import { Pie } from "react-chartjs-2";
import { useRef } from "react";


function PieChart({configData}) {
  const chartRef = useRef(null);

  return <Pie ref={chartRef} data={configData} />;
}

export default PieChart;
