import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Plot from "react-plotly.js";

export const MovieTopTenMostPopular = () => {
  const [graphData, setGraphData] = useState([]);
  const [transposegraphData, setTransposeGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movieTopTenMostPopular/")
      .then((response) => {
        setGraphData(response.data);

        let temp = [
          response.data.map((x) => x.title).reverse(),
          response.data
            .map((x) => (x.tagline === null ? "NaN" : x.tagline))
            .reverse(),
          response.data
            .map((x) => (x.homepage === null ? "NaN" : x.homepage))
            .reverse(),
          response.data.map((x) => x.original_language).reverse(),
          //   response.data.map((x) => x.overview).reverse(),
          response.data.map((x) => x.status).reverse(),
          response.data
            .map((x) => (x.release_date === null ? "NaN" : x.release_date))
            .reverse(),
          response.data
            .map((x) => (x.budget === null ? "NaN" : x.budget))
            .reverse(),
          response.data
            .map((x) => (x.revenue === null ? "NaN" : x.revenue))
            .reverse(),
          response.data
            .map((x) => (x.runtime === null ? "NaN" : x.runtime))
            .reverse(),
          response.data
            .map((x) => (x.vote_average === null ? "NaN" : x.vote_average))
            .reverse(),
          response.data.map((x) => x.vote_count).reverse(),
        ];

        setTransposeGraphData(
          temp.map((_, colIndex) => temp.map((row) => row[colIndex]))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ m: "3em", boxShadow: 3 }} height="90vh">
      <Plot
        data={[
          {
            type: "bar",
            x: graphData.map((x) => x.popularity).reverse(),
            y: graphData.map((x) => x.title).reverse(),
            orientation: "h",
            customdata: transposegraphData,
            hovertemplate: `<br>
<b>Title:</b> %{customdata[0]}<br>
<b>Tagline:</b> %{customdata[1]}<br>
<b>Homepage:</b> <a href="%{customdata[2]}">%{customdata[2]}</a><br>
<b>Original Language:</b> %{customdata[3]}<br>
<b>Status:</b> %{customdata[4]}<br>
<b>Release Date:</b> %{customdata[5]}<br>
<b>Budget:</b> %{customdata[6]}<br>
<b>Revenue:</b> %{customdata[7]}<br>
<b>Runtime:</b> %{customdata[8]} minutes<br>
<b>Vote Average:</b> %{customdata[9]}<br>
<b>Vote Count:</b> %{customdata[10]}
<extra></extra>`,
          },
        ]}
        layout={{
          title: "Movie Top Ten Most Popular",
          xaxis: {
            title: "Popularity",
            rangeslider: {},
          },
          yaxis: {
            title: "Title",
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
