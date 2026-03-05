// ChartAdapter.js
export class ChartAdapter {
  
  static toPayload({ chartName, chartType, labels,chartImage, chartData }) {
    const labelsArray = Array.isArray(labels) ? labels : [];
    const chartDataArray = Array.isArray(chartData) ? chartData : [];

    const payload = {
      name: chartName,
      type: chartType,
      chartImage: chartImage,
      labels: labelsArray,
      datasets: chartDataArray.map((chartDataSet) => {
        const dataPointsArray = Array.isArray(chartDataSet?.data) ? chartDataSet.data : [];

        return {
          id: chartDataSet?.id || null,
          name: chartDataSet?.name ?? "",
          data: dataPointsArray.map((chartPoint, chartPointIndex) => {
            const labelValue =
              chartPoint?.label != null ? chartPoint.label : labelsArray[chartPointIndex] ?? null;

            return {
              id: chartPoint?.id || null,
              label: labelValue,
              x: Number(chartPoint?.x ?? 0),
              y: Number(chartPoint?.y ?? 0),
              color: chartPoint?.color ?? null,
            };
          }),
        };
      }),
    };

    return payload;
  }

  static fromBackendDto(chartDto) {
    const datasetDtoArray = Array.isArray(chartDto?.datasets) ? chartDto.datasets : [];

    const chartData = datasetDtoArray.map((dataSetDto) => {
      const pointDtoArray = Array.isArray(dataSetDto?.points) ? dataSetDto.points : [];

      return {
        id: dataSetDto?.id ?? null,
        name: dataSetDto?.name ?? "",
        data: pointDtoArray.map((pointDto) => {
          return {
            id: pointDto.id,
            x: Number(pointDto?.x ?? 0),
            y: Number(pointDto?.y ?? 0),
            color: pointDto?.color ?? null,
            label: pointDto?.label ?? null,
          };
        }),
      };
    });

    const backendLabelsArray = Array.isArray(chartDto?.labels) ? chartDto.labels : [];
    let labels = backendLabelsArray;

    if (labels.length === 0) {
      const alreadySeenLabels = new Set();
      const derivedLabels = [];

      for (const datasetDto of datasetDtoArray) {
        const pointDtoArray = Array.isArray(datasetDto?.points) ? datasetDto.points : [];
      

        for (const pointDto of pointDtoArray) {
          const labelCandidate = pointDto?.label;

          if (
            typeof labelCandidate === "string" &&
            labelCandidate.length > 0 &&
            alreadySeenLabels.has(labelCandidate) === false
          ) {
            alreadySeenLabels.add(labelCandidate);
            derivedLabels.push(labelCandidate);
          }
        }
      }

      labels = derivedLabels;
    }

    return { labels, chartData, chartTitle: chartDto?.name ?? "" };
  }

  
  static normalizeFrontendState({ labels, chartData }) {
    const labelsArray = Array.isArray(labels) ? labels : [];
    const chartDataArray = Array.isArray(chartData) ? chartData : [];

    const normalizedChartData = chartDataArray.map((chartDataSet) => {
      const dataPointsArray = Array.isArray(chartDataSet?.data) ? chartDataSet.data : [];

      return {
        ...chartDataSet,
        data: dataPointsArray.map((chartPoint, chartPointIndex) => {
          return {
            ...chartPoint,
            label: chartPoint?.label ?? labelsArray[chartPointIndex] ?? null,
          };
        }),
      };
    });

    return { labels: labelsArray, chartData: normalizedChartData };
  }
}
