import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { Box } from "@mui/material";

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
    <Box sx={{m: '3em', boxShadow: 3}} height='90vh '>
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
        margin: {
          
        },
        title: "Movie Top Ten Most Popular",
        xaxis: {
          title: "Popularity",
          rangeslider: {},
        },
        yaxis: { 
          title: "Title", 
          automargin: true 
        },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        // responsive: true,
      }}
    />
    </Box>
  );
};
