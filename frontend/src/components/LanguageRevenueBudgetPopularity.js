import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const LanguageRevenueBudgetPopularity = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", { graphID: "budgetRevenueLanguagePopularity" })
      .then((response) => {
        setGraphData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Plot
      data={[
        {
          x: graphData.map((x) => x.budget),
          y: graphData.map((x) => x.revenue),
          mode: "markers",
          type: "scatter",
          text: graphData.map((x) => x.language),
          marker: { size: graphData.map((x) => x.popularity) },
        },
      ]}
      layout={{
        title: "Impact of Language on Popularity, Budget and Revenue",
        xaxis: {
          title: "Budget",
          rangeslider: {},
        },
        yaxis: { title: "Revenue" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
