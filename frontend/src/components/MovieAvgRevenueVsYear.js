import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieAvgRevenueVsYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movieAvgRevenueVsYear/")
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Plot
      data={[
        {
          x: graphData.map((x) => x.year),
          y: graphData.map((x) => x.revenue),
          type: "bar",
        },
      ]}
      layout={{
        title: "Movie Average Revenue vs. Year",
        xaxis: {
          title: "Year",
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
