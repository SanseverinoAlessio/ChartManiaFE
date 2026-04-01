import linePreview from "../assets/chart-previews/line.svg";
import barPreview from "../assets/chart-previews/bar.svg";
import scatterPreview from "../assets/chart-previews/scatter.svg";
import piePreview from "../assets/chart-previews/pie.svg";

export const CHART_TYPES = [
  { chartType: "line", label: "Line Chart", icon: "line_icon", xAxisType: 'string',colorLevel: 'dataset', preview: linePreview },
  { chartType: "bar", label: "Bar Chart", icon: "bar_icon",xAxisType: 'string',colorLevel: 'dataset', preview: barPreview },
  { chartType: "scatter", label: "Scatter Chart", icon: "bubble_chart", xAxisType: 'number', colorLevel: 'dataset', preview: scatterPreview },
  { chartType: "pie", label: "Pie Chart", icon: "bubble_chart",xAxisType: 'string',colorLevel: 'row', preview: piePreview },
];
