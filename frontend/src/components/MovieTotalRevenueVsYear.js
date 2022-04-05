import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieTotalRevenueVsYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movieTotalRevenueVsYear/")
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
        title: "Movie Total Revenue vs. Year",
        xaxis: { title: "Year" },
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
