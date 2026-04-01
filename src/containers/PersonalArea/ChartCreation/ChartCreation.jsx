import "./chart_creation.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getChartTypeInfo } from "../../../helpers/ChartHelper";
import { useNavigate } from "react-router";
import { ChartAdapter } from "../../../adapters/ChartAdapter";
import ChartService from "../../../services/api/ChartService";
import ChartForm from "../../../components/ChartForm/ChartForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ChartCreation() {
  const { chartType } = useParams();
  const chartTypeInfo = getChartTypeInfo(chartType);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [chartTitle, setChartTitle] = useState("");
  const genericAlert = withReactContent(Swal);

  useEffect(() => {
    if (chartTypeInfo == null) {
      return navigate("/personal-area/charts");
    }
  });

  const [chartLabels, setChartLabels] = useState(["New Label"]);
  const [chartData, setChartData] = useState([
    {
      name: "DataSet1",
      data: [
        {
          x: 0,
          y: 0,
          color: "#f44040",
        },
      ],
    },
  ]);

  async function handleSave({ chartImage, chartLabels, chartData }) {
    if (chartTitle == "") {
      genericAlert.fire({
        title: "Error",
        text: "You should insert a title.",
        icon: "error",
      });

      return;
    }

    setIsSaving(true);
    try {
      const adaptedData = ChartAdapter.toPayload({
        chartName: chartTitle,
        chartType: chartType,
        labels: chartLabels,
        chartImage,
        chartData,
      });

      await ChartService.createChart(adaptedData);
      navigate("/personal-area/charts");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ChartForm
      title="Chart Creation"
      chartType={chartType}
      chartTypeInfo={chartTypeInfo}
      chartLabels={chartLabels}
      setChartLabels={setChartLabels}
      chartData={chartData}
      setChartData={setChartData}
      onSave={handleSave}
      isSaving={isSaving}
      chartTitle={chartTitle}
      setChartTitle={setChartTitle}
    />
  );
}

export default ChartCreation;
