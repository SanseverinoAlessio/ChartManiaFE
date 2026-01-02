import { CHART_TYPES } from "../constants/chartTypes";
import ScatterChart from "./Charts/ScatterChart/ScatterChart";
import BarChart from "./Charts/BarChart/BarChart";

function ChartFactory({chartType,chartData}) {
    const selectedChart = CHART_TYPES.filter((el) => el.chartType == chartType)[0]

    if(!selectedChart)
        return;
    
    switch (selectedChart.chartType) {
        case "bar":
            return <BarChart chartData={chartData} />;
        case "scatter":
            return <ScatterChart chartData={chartData} />;
        default:
            return null;
    }
}

export default ChartFactory;
