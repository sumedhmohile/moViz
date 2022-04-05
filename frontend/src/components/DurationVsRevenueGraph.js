import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const DurationVsRevenueGraph = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", { graphID: "durationVSrevenue" })
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
          x: graphData.map((x) => x.runtime),
          y: graphData.map((x) => x.revenue),
          type: "bar",
        },
      ]}
      layout={{
        title: "Average Revenue vs. Movie Runtime",
        xaxis: { title: "Runtime in Minutes" },
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
