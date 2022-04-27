import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Plot from "react-plotly.js";

export const MovieGenreVsBudgetVsRating = () => {
  const [genreData, setGenreData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  let data = [];

  for (let genre of genreData.map((x) => x.name)) {
    let genreGraphData = graphData.filter((x) => x.genre_name === genre);

    data.push({
      x: genreGraphData.map((x) => x.budget),
      y: genreGraphData.map((x) => x.vote_average),
      mode: "markers",
      type: "scatter",
      name: genre,
      text: genreGraphData.map((x) => x.title),
      marker: { size: genreGraphData.map((x) => x.vote_count / 1000) },
    });
  }

  useEffect(() => {
    axios
      .get("/api/genres/")
      .then((response) => {
        setGenreData(response.data);

        return axios.get("api/movieGenreVsBudgetVsRating/");
      })
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ m: "3em", boxShadow: 3 }} height="90vh">
      <Plot
        data={data}
        layout={{
          title: "Movie Genre vs. Budget vs. Rating",
          xaxis: {
            title: "Budget",
            tickformat: "s",
            rangeslider: {},
          },
          yaxis: {
            title: "Rating",
            range: [0, 10],
          },
        }}
        style={{ width: "100%", height: "100%" }}
        config={{
          scrollZoom: true,
          responsive: true,
        }}
      />
    </Box>
  );
};
