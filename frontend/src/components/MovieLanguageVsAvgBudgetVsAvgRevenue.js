import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieLanguageVsAvgBudgetVsAvgRevenue = () => {
  const [languageData, setLanguageData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  let data = [];

  for (let language of languageData.map((x) => x.english_name)) {
    let languageGraphData = graphData.filter((x) => x.language === language);

    data.push({
      x: languageGraphData.map((x) => x.avg_budget),
      y: languageGraphData.map((x) => x.avg_revenue),
      mode: "markers",
      type: "scatter",
      name: language,
      text: languageGraphData.map((x) => x.language),
      marker: { size: languageGraphData.map((x) => x.avg_popularity) },
    });
  }

  useEffect(() => {
    axios
      .get("/api/languages/")
      .then((response) => {
        setLanguageData(response.data);

        return axios.get("api/movieLanguageVsAvgBudgetVsAvgRevenue/");
      })
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Plot
      data={data}
      layout={{
        title: "Impact of Language on Popularity, Budget and Revenue",
        xaxis: {
          title: "Average Budget",
          tickformat: "s",
          rangeslider: {},
        },
        yaxis: { title: "Average Revenue" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
