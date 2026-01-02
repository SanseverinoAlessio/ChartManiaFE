import { Grid, Button } from "@mui/material";
import { CHART_TYPES } from "../../../constants/chartTypes";
import Card from "@mui/material/Card";
import "./chart_selection.css";
import { useNavigate } from "react-router";

function ChartSelection() {
  const navigate = useNavigate();
  function createOne(chartType){
    navigate("/personal-area/chart/create/" + chartType);
  }

  return (
    <>
      <div style={{ paddingLeft: "10px",marginTop:"20px" }}>
        <Grid container spacing={3}>
          {CHART_TYPES.map((el) => (
            <Grid key={el.chartType} size={4}>
              <Card className="charts">
                <h3>{el.label}</h3>
                <Button onClick={()=>{createOne(el.chartType)}} variant="contained">Create one</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default ChartSelection;
