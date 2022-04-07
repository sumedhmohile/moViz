import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieAvgRuntimeVsYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movieAvgRuntimeVsYear/")
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
          y: graphData.map((x) => x.runtime),
          type: "bar",
        },
      ]}
      layout={{
        title: "Movie Average Runtime vs. Year",
        xaxis: {
          title: "Year",
          tickformat: "d",
          rangeslider: {},
        },
        yaxis: { title: "Average Runtime" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
