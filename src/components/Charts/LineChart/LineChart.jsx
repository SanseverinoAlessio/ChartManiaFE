import { Line } from "react-chartjs-2";
import { useRef } from "react";
function LineChart({options,plugins, configData,chartRef }) {
  return <Line plugins={plugins} options={options} ref={chartRef} data={configData}/>;
}

export default LineChart;
