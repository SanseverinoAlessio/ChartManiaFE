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
} from "@mui/material";
import NumberField from "../NumberFields";
import ColorPicker from "../ColorPicker/ColorPicker";

function CategoricalInputTable({
  chartData,
  setChartData,
  chartLabels,
  setChartLabels,
  chartTypeInfo,
}) {

  const isDatasetLevel = chartTypeInfo?.colorLevel === "dataset";

  const addRow = () => {
    setChartLabels([...chartLabels, `Label ${chartLabels.length + 1}`]);
    setChartData((prevData) =>
      prevData.map((dataset) => {
        const newColor = isDatasetLevel ? (dataset.data[0]?.color || "#f44040") : "#f44040";
        return {
          ...dataset,
          data: [...dataset.data, { x: "", y: 0, color: newColor }],
        };
      })
    );
  };

  const removeRow = (indexToRemove) => {
    if (chartLabels.length > 1) {
      setChartLabels(chartLabels.filter((_, i) => i !== indexToRemove));
      setChartData((prevData) =>
        prevData.map((dataset) => ({
          ...dataset,
          data: dataset.data.filter((_, i) => i !== indexToRemove),
        }))
      );
    }
  };

  const addDataset = () => {
    setChartData((prevData) => {
      const newColor = "#f44040";
      return [
        ...prevData,
        {
          name: "Dataset " + (prevData.length + 1),
          data: chartLabels.map(() => ({ x: "", y: 0, color: newColor })),
        }
      ];
    });
  };

  const removeDataset = (datasetIndex) => {
    if (chartData.length > 1) {
      setChartData(chartData.filter((_, i) => i !== datasetIndex));
    }
  };

  const handleValueChange = (datasetIndex, dataIndex, field, value) => {
    setChartData((prevData) => {
      const updated = [...prevData];
      updated[datasetIndex].data[dataIndex][field] = value;
      return updated;
    });
  };

  const handleDatasetColorChange = (datasetIndex, newColor) => {
    setChartData((prevData) =>
      prevData.map((ds, idx) => {
        if (idx === datasetIndex) {
          return {
            ...ds,
            data: ds.data.map((point) => ({ ...point, color: newColor })),
          };
        }
        return ds;
      })
    );
  };

  const handleLabelChanges = (index, newValue) => {
    setChartLabels((prev) =>
      prev.map((val, i) => (i === index ? newValue : val))
    );
  };

  const handleDatasetNameChange = (datasetIndex, newName) => {
    setChartData((prevData) => {
      const updated = [...prevData];
      updated[datasetIndex].name = newName;
      return updated;
    });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold", width: "200px" }}>
              Label (Asse X)
            </TableCell>
            {chartData.map((ds, idx) => (
              <TableCell key={idx} align="center">
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TextField
                      variant="standard"
                      size="small"
                      value={ds.name}
                      placeholder="Nome Dataset"
                      onChange={(e) => handleDatasetNameChange(idx, e.target.value)}
                      sx={{ input: { textAlign: "center", fontWeight: "bold" } }}
                    />
                    {chartData.length > 1 && (
                      <IconButton size="small" color="error" onClick={() => removeDataset(idx)}>
                        ×
                      </IconButton>
                    )}
                  </Box>
                  
                  {isDatasetLevel && (
                    <ColorPicker
                      color={ds.data[0]?.color || "#f44040"}
                      setColor={(newColor) => handleDatasetColorChange(idx, newColor)}
                    />
                  )}
                </Box>
              </TableCell>
            ))}
            <TableCell align="center" sx={{ width: "50px" }}>
              <IconButton onClick={addDataset} color="primary" variant="contained">
                +
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chartLabels.map((label, labelIndex) => (
            <TableRow key={labelIndex} hover>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={label}
                  onChange={(e) => handleLabelChanges(labelIndex, e.target.value)}
                />
              </TableCell>
              
              {chartData.map((ds, dsIdx) => (
                <TableCell key={dsIdx} align="center">
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <NumberField
                      size="small"
                      value={ds.data[labelIndex].y}
                      onValueChange={(newValue) =>
                        handleValueChange(dsIdx, labelIndex, "y", newValue)
                      }
                    />
                    
                    {!isDatasetLevel && (
                      <ColorPicker
                        color={ds.data[labelIndex].color}
                        setColor={(newColor) =>
                          handleValueChange(dsIdx, labelIndex, "color", newColor)
                        }
                      />
                    )}
                  </Box>
                </TableCell>
              ))}

              <TableCell align="center">
                <IconButton color="error" onClick={() => removeRow(labelIndex)}>
                  -
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={chartData.length + 2}>
              <Button 
                onClick={addRow} 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 1, borderStyle: "dashed" }}
              >
                + Add Row
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoricalInputTable;