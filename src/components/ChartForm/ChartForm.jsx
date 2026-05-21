import { Box, Grid, Button, Drawer, Toolbar, Divider, IconButton, Typography } from "@mui/material";
import "./chart_form.css";
import { useRef, useEffect } from "react";
import ChartInputTable from "../ChartInputTable/ChartInputTable";
import ChartFactory from "../ChartFactory";
import CategoricalInputTable from "../CategoricalInputTable/CategoricalInputTable";
import { TextField } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useChartInputSidebar } from "../../contexts/ChartInputSidebarContext.jsx";

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
  const { isOpen, open, close } = useChartInputSidebar();
  const chart = chartRef.current;
  const TARGET_WIDTH = 1920;

  useEffect(() => {
    open();
  }, []);

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

  return (
    <>
      <Box className="chart-creation">
        <h2>{title}</h2>

        <Grid container>
          <Grid className="chart-factory-container" size={12}>
            <ChartFactory
              chartRef={chartRef}
              chartData={chartData}
              chartLabels={chartLabels}
              xAxisType={chartTypeInfo.xAxisType}
              chartType={chartType}
            />
          </Grid>
        </Grid>
      </Box>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={close}
        variant="temporary"
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 400,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
            Input dati
          </Typography>
          <IconButton onClick={close}>
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>

        <Divider />

        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, overflow: "auto", flexGrow: 1 }}>
          <TextField
            value={chartTitle || ""}
            onChange={(e) => setChartTitle(e.target.value)}
            label="Chart Title"
            variant="outlined"
            size="small"
            fullWidth

          />

          <Button
            onClick={handleSave}
            variant="outlined"
            disabled={isSaving}
            fullWidth
          >
            {isSaving ? "Salvataggio..." : "Salva"}
          </Button>

          {chartTypeInfo.xAxisType === "string" ? (
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
        </Box>
      </Drawer>
    </>
  );
}

export default ChartForm;
