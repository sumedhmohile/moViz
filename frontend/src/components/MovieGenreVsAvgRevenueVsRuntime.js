import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Plot from "react-plotly.js";

export const MovieGenreVsAvgRevenueVsRuntime = () => {
  const [genreData, setGenreData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/genres/")
      .then((response) => {
        setGenreData(response.data);

        return axios.get("api/movieGenreVsAvgRevenueVsRuntime/");
      })
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let data = [];

  for (let genre of genreData.map((x) => x.name)) {
    let genreGraphData = graphData.filter((x) => x.genre_name === genre);

    data.push({
      x: genreGraphData.map((x) => x.runtime),
      y: genreGraphData.map((x) => x.avg_revenue),
      type: "bar",
      name: genre,
    });
  }

  return (
    <Box sx={{ m: "3em", boxShadow: 3 }} height="90vh">
      <Plot
        data={data}
        layout={{
          title: "Movie Genre vs. Average Revenue vs. Runtime",
          xaxis: {
            title: "Runtime in Minutes",
            tickformat: "d",
            rangeslider: {},
          },
          yaxis: {
            title: "Average Revenue",
            automargin: true,
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
