import { Bar } from "react-chartjs-2";
import { useRef } from "react";
function BarChart({ plugins,options,configData,chartRef }) {
  return <Bar options={options} plugins={plugins} ref={chartRef} data={configData}/>;
}

export default BarChart;
