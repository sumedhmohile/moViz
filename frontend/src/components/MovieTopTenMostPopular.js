import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieTopTenMostPopular = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movieTopTenMostPopular/")
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
          type: "bar",
          x: graphData.map((x) => x.popularity).reverse(),
          y: graphData.map((x) => x.title).reverse(),
          orientation: "h",
        },
      ]}
      layout={{
        title: "Movie Top Ten Most Popular",
        xaxis: {
          title: "Popularity",
          rangeslider: {},
        },
        yaxis: { title: "Title" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
