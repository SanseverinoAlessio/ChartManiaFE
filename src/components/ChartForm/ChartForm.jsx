import { Box, Grid, Button } from "@mui/material";
import "./chart_form.css";
import { useRef } from "react";
import ChartInputTable from "../ChartInputTable/ChartInputTable";
import ChartFactory from "../ChartFactory";
import CategoricalInputTable from "../CategoricalInputTable/CategoricalInputTable";
import { TextField } from "@mui/material";

function ChartForm({
  title,
  chartType,
  chartTypeInfo,
  chartLabels,
  setChartLabels,
  chartData,
  setChartData,
  onSave,
  chartTitle,
  setChartTitle,
  isSaving = false,
}) {
  const chartRef = useRef(null);
  const chart = chartRef.current;
  const TARGET_WIDTH = 1920;

  async function handleSave() {
    const originalRatio =
    chartRef.current.options.devicePixelRatio ?? window.devicePixelRatio;

    try {
      chartRef.current.options.devicePixelRatio = TARGET_WIDTH / chart.width;
      chartRef.current.resize();

      const chartImage = chartRef.current.toBase64Image();
      await onSave({
        chartImage,
        chartLabels,
        chartData,
      });
    } finally {
      chart.options.devicePixelRatio = originalRatio;
      chart.resize();
    }
  }

  console.log("chartTitle", chartTitle);
  return (
    <>
      <Box className="chart-creation">
        <h2>{title}</h2>

        <Grid container>
          <Grid size={12}>
            <TextField
              value={chartTitle || ""}
              onChange={(e) => {
                setChartTitle(e.target.value);
              }}
              label="Chart Title"
              variant="outlined"
              size="small"
              style={{ marginBottom: "10px" }}
            />
          </Grid>

          <Button
            style={{ marginBottom: "10px" }}
            onClick={handleSave}
            variant="outlined"
            disabled={isSaving}
          >
            {isSaving ? "Salvataggio..." : "Salva"}
          </Button>

          <Grid className="chart-factory-container" size={12}>
            <ChartFactory
              chartRef={chartRef}
              chartData={chartData}
              chartLabels={chartLabels}
              xAxisType={chartTypeInfo.xAxisType}
              chartType={chartType}
            />
          </Grid>

          <Grid className="chart-input-table-container" size={12} height={400}>
            {chartTypeInfo.xAxisType == "string" ? (
              <CategoricalInputTable
                chartLabels={chartLabels}
                chartTypeInfo={chartTypeInfo}
                setChartLabels={setChartLabels}
                setChartData={setChartData}
                chartData={chartData}
              />
            ) : (
              <ChartInputTable
                chartTypeInfo={chartTypeInfo}
                chartData={chartData}
                setChartData={setChartData}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ChartForm;
