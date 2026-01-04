import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import NumberField from "../NumberFields";
import ColorPicker from "../ColorPicker/ColorPicker"; // Aggiunto import

function ChartInputTable({ chartData, setChartData }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const addDataset = () => {
    const newIndex = chartData.length;
    setChartData((prevData) => [
      ...prevData,
      {
        name: "Dataset " + (newIndex + 1),
        data: [
          { x: 0, y: 0, color: "#f44040" }, 
          { x: 0, y: 0, color: "#f44040" }, 
        ],
      },
    ]);
    setActiveTab(newIndex);
  };

  const removeDataset = (datasetIndex) => {
    if (chartData.length > 1) {
      setChartData(chartData.filter((_, i) => i !== datasetIndex));
      if (activeTab >= chartData.length - 1) {
        setActiveTab(Math.max(0, chartData.length - 2));
      }
    }
  };

  const addPoint = (datasetIndex) => {
    const updated = [...chartData];
    const currentColor = updated[datasetIndex].data[0]?.color || "#f44040";
    updated[datasetIndex].data.push({ x: 0, y: 0, color: currentColor });
    setChartData(updated);
  };

  const removePoint = (datasetIndex, pointIndex) => {
    if (chartData[datasetIndex].data.length > 1) {
      const updated = [...chartData];
      updated[datasetIndex].data = updated[datasetIndex].data.filter(
        (_, i) => i !== pointIndex
      );
      setChartData(updated);
    }
  };

  const handleValueChange = (datasetIndex, pointIndex, field, value) => {
    console.log("prova", value);
    const updated = [...chartData];
    updated[datasetIndex].data[pointIndex][field] = value;
    setChartData(updated);
  };

  const handleNameChange = (datasetIndex, newName) => {
    const updated = [...chartData];
    updated[datasetIndex].name = newName;
    setChartData(updated);
  };


  const handleDatasetColorChange = (datasetIndex, newColor) => {
    const updated = [...chartData];
    updated[datasetIndex].data = updated[datasetIndex].data.map((point) => ({
      ...point,
      color: newColor,
    }));
    setChartData(updated);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {chartData.map((dataset, index) => (
            <Tab key={index} label={dataset.name || `DS ${index + 1}`} />
          ))}
        </Tabs>
        <IconButton
          onClick={addDataset}
          color="primary"
          sx={{ ml: 1, fontWeight: "bold" }}
        >
          +
        </IconButton>
      </Box>

      {chartData.map((dataset, datasetId) => (
        <Box key={datasetId} hidden={activeTab !== datasetId} sx={{ p: 1 }}>
          {activeTab === datasetId && (
            <TableContainer component={Paper}>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  bgcolor: "#f9f9f9",
                }}
              >
                <TextField
                  label="Dataset Name"
                  variant="outlined"
                  size="small"
                  value={dataset.name}
                  onChange={(e) => handleNameChange(datasetId, e.target.value)}
                />
          
                <ColorPicker
                  color={dataset.data[0]?.color || "#f44040"}
                  setColor={(newColor) => handleDatasetColorChange(datasetId, newColor)}
                />
                {chartData.length > 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeDataset(datasetId)}
                  >
                    Delete Dataset (-)
                  </Button>
                )}
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>X Value</TableCell>
                    <TableCell>Y Value</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataset.data.map((point, pointId) => (
                    <TableRow key={pointId}>
                      <TableCell>
                        <NumberField
                          size="small"
                          value={point.x}
                          onValueChange={(newValue) => {
                            handleValueChange(
                              datasetId,
                              pointId,
                              "x",
                              newValue
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <NumberField
                          size="small"
                          value={point.y}
                          onValueChange={(newValue) => {
                            handleValueChange(
                              datasetId,
                              pointId,
                              "y",
                              newValue
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removePoint(datasetId, pointId)}
                        >
                          -
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Button onClick={() => addPoint(datasetId)}>
                        + Add Point
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ChartInputTable;