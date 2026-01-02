import { useEffect, useState } from "react";
import ChartService from "../../services/api/ChartService";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";
import { getGridStringOperators } from "@mui/x-data-grid";

function ChartsTable(props) {
  const [rows, setRows] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const filterOperators = getGridStringOperators().filter(({ value }) =>
    ["contains"].includes(value)
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: props.defaultPageSize || 10,
  });
  const [filterModel, setFilterModel] = useState({ item: [] });
  const [sortModel, setSortModel] = useState([]);

  const navigate = useNavigate();
  const genericAlert = withReactContent(Swal);
  async function deleteItem(id) {
    const alert = await genericAlert.fire({
      title: "Warning?",
      text: "Are u sure you want to delete this element?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Confirm",
    });

    if (!alert.isConfirmed) return false;

    try {
      await ChartService.deleteItem(id);
    } catch (e) {
      console.error(e);
      genericAlert.fire({
        title: "Error",
        text: "There was an error during the delation",
        icon: "error",
      });
      return;
    }

    genericAlert.fire({
      title: "Success",
      text: "The element has been removed",
      icon: "success",
    });

    setPaginationModel((prev) => {
      return {
        ...prev,
        page: 0,
      };
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await ChartService.getCharts(
          paginationModel.page,
          paginationModel.pageSize,
          filterModel,
          sortModel,
          {
            signal: controller.signal,
          }
        );

        setTotalItems(response.totalElements);
        setRows(response.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [paginationModel, sortModel, filterModel]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      filterOperators: filterOperators,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      filterOperators: filterOperators,
    },
    {
      field: "actions",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <ButtonGroup>
              <Button>Mostra</Button>
              <Button
                onClick={() => {
                  navigate("personal-area/charts/edit/" + params.id);
                }}
              >
                Modifica
              </Button>
              <Button
                onClick={() => {
                  deleteItem(params.id);
                }}
                color="error"
              >
                Elimina
              </Button>
            </ButtonGroup>
          </>
        );
      },
      headerName: "Actions",
      flex: 1,
    },
  ];

  return (
    <>
      <div style={{ height: "calc(100vh - 5px)" }}>
        <DataGrid
          disableRowSelectionOnClick={true}
          rows={rows}
          rowCount={totalItems}
          columns={columns}
          paginationModel={paginationModel}
          sortingMode="server"
          filterMode="server"
          paginationMode="server"
          pageSizeOptions={[5, 10, 25, 50]}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={setSortModel}
          onFilterModelChange={setFilterModel}
        />
      </div>
    </>
  );
}

export default ChartsTable;
