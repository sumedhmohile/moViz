import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieGenreVsAvgPopularityVsYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", { graphID: "popularityByGenreAndYear" })
      .then((response) => {
        let genres = new Set(response.data.data.map((x) => x.genre));
        let data = [];

        for (let genre of Array.from(genres).sort()) {
          let genre_data = response.data.data.filter((x) => x.genre === genre);
          data.push({
            x: genre_data.map((x) => x.year),
            y: genre_data.map((x) => x.popularity),
            type: "scatter",
            name: genre,
          });
        }

        setGraphData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Plot
      data={graphData}
      layout={{
        title: "Movie Genre vs. Average Popularity vs. Year",
        xaxis: {
          title: "Year",
          tickformat: "d",
          rangeslider: {},
        },
        yaxis: {
          title: "Popularity",
          fixedrange: false,
        },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
