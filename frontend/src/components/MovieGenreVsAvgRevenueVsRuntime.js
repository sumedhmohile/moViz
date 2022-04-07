import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieGenreVsAvgRevenueVsRuntime = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", { graphID: "durationVSrevenue" })
      .then((response) => {
        let genres = new Set(response.data.data.map((x) => x.genre));
        let data = [];

        for (let genre of Array.from(genres).sort()) {
          let genre_data = response.data.data.filter((x) => x.genre === genre);
          data.push({
            type: "bar",
            x: genre_data.map((x) => x.runtime),
            y: genre_data.map((x) => x.revenue),
            name: genre,
          });
        }

        setGraphData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Plot
      data={graphData}
      layout={{
        title: "Movie Genre vs. Average Revenue vs. Runtime",
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
