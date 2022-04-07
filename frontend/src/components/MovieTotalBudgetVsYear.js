import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieTotalBudgetVsYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movieTotalBudgetVsYear/")
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
          y: graphData.map((x) => x.budget),
          type: "bar",
        },
      ]}
      layout={{
        title: "Movie Total Budget vs. Year",
        xaxis: {
          title: "Year",
          rangeslider: {},
        },
        yaxis: { title: "Budget" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
