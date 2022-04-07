import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieGenreVsBudgetVsRating = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", { graphID: "budgetRatingGenre" })
      .then((response) => {
        let genres = new Set(response.data.data.map((x) => x.name));
        let data = [];

        for (let genre of Array.from(genres).sort()) {
          let genre_data = response.data.data.filter((x) => x.name === genre);
          data.push({
            x: genre_data.map((x) => x.budget),
            y: genre_data.map((x) => x.vote_average),
            mode: "markers",
            type: "scatter",
            name: genre,
            text: genre_data.map((x) => x.title),
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
        title: "Movie Genre vs. Budget vs. Rating",
        xaxis: { title: "Budget" },
        yaxis: { title: "Rating" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ responsive: true }}
    />
  );
};
