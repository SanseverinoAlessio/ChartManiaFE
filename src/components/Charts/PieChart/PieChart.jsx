import { Pie } from "react-chartjs-2";
import { useRef } from "react";


function PieChart({options, plugins,configData,chartRef}) {


  return <Pie options={options} plugins={plugins} ref={chartRef} data={configData} />;
}

export default PieChart;
