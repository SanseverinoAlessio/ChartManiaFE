import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, Box, TextField } from "@mui/material"; // Added Box and TextField
import { faCogs, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChartInputTable({ setChartData, rows }) {
  const addRow = () => {
    const newRow = {
      x: 0,
      y: 0,
    };
    setChartData([...rows, newRow]);
  };

  const removeRow = (indexToRemove) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, index) => index !== indexToRemove);
      setChartData(newRows);
    }
  };

  const handleValueChange = (index, field, newValue) => {
    const newRows = rows.map((row, i) => {
      if (i === index) {
        return {
          ...row,
          [field]: newValue,
        };
      }
      return row;
    });
    setChartData(newRows);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
        <Table size="small" aria-label="Chart Values">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                X Value
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Y Value
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <FontAwesomeIcon
                  icon={faCogs}
                  title="Actions"
                ></FontAwesomeIcon>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <TextField
                    size="  "
                    value={row.x}
                    onChange={(e) =>
                      handleValueChange(index, "x", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell align="left">
                  <TextField
                    size="small"
                    type="number"
                    value={row.y}
                    onChange={(e) =>
                      handleValueChange(index, "y", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}
                  >
                    <Button
                      onClick={() => removeRow(index)}
                      variant="outlined"
                      color="error"
                      disabled={rows.length === 1}
                      sx={{ minWidth: "40px", padding: "5px 8px" }}
                    >
                      <FontAwesomeIcon
                        icon={faMinus}
                        size="sm"
                      ></FontAwesomeIcon>
                    </Button>

                    {index === rows.length - 1 && (
                      <Button
                        onClick={addRow}
                        variant="outlined"
                        color="primary"
                        sx={{ minWidth: "40px", padding: "5px 8px" }}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          size="sm"
                        ></FontAwesomeIcon>
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ChartInputTable;
