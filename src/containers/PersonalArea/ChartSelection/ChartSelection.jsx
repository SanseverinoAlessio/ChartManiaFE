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
      <div style={{ paddingLeft: "10px",marginTop:"20px",marginRight:"20px" }}>
        <Grid container spacing={3}>
          {CHART_TYPES.map((el) => (
            <Grid key={el.chartType} size={{sm:12, md: 6, lg:4}}>
              <Card className="charts">
                <img
                  src={el.preview}
                  alt={`${el.label} preview`}
                  className="chart-preview"
                />
                <h3>{el.label}</h3>
                <Button color="info" onClick={()=>{createOne(el.chartType)}} variant="contained">Create one</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default ChartSelection;
