import { CHART_TYPES } from "../constants/chartTypes";

export const getChartTypeInfo = (chartType)=>{
    let result = CHART_TYPES.filter((item)=>{
        return item.chartType == chartType;
    });
    return result[0] || null;
};