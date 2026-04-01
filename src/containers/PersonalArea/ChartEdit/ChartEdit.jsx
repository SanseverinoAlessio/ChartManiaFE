import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChartAdapter } from "../../../adapters/ChartAdapter";
import ChartService from "../../../services/api/ChartService";
import { getChartTypeInfo } from "../../../helpers/ChartHelper";
import ChartForm from "../../../components/ChartForm/ChartForm";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function ChartEdit() {
  const { chartId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState(null);
  const [chartTypeInfo, setChartTypeInfo] = useState(null);
  const [chartTitle, setChartTitle] = useState("");
  const genericAlert = withReactContent(Swal);
  

  useEffect(() => {
    async function loadChartData() {
      try {
        const request = await ChartService.getChart(chartId);
        let chartDto = request.data;
        setChartType(chartDto.type);
        const typeInfo = getChartTypeInfo(chartDto.type);
        setChartTypeInfo(typeInfo);

        const {
          labels,
          chartData: data,
          chartTitle: title,
        } = ChartAdapter.fromBackendDto(chartDto);

        setChartLabels(labels);
        setChartData(data);
        setChartTitle(title);
      } catch (e) {
        navigate("/personal-area/charts");
      } finally {
        setIsLoading(false);
      }
    }

    loadChartData();
  }, [chartId, navigate]);

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

      await ChartService.updateChart(chartId, adaptedData);

      navigate("/personal-area/charts");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading || !chartTypeInfo) {
    return <div>Caricamento...</div>;
  }

  return (
    <ChartForm
      title="Chart Edit"
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
