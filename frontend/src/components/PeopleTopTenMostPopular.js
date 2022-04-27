import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Plot from "react-plotly.js";

export const PeopleTopTenMostPopular = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/peopleTopTenMostPopular/")
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
        data={[
          {
            x: graphData.map((x) => x.popularity).reverse(),
            y: graphData.map((x) => x.name).reverse(),
            type: "bar",
            orientation: "h",
          },
        ]}
        layout={{
          title: "People Top Ten Most Popular",
          xaxis: {
            title: "Popularity",
            rangeslider: {},
          },
          yaxis: {
            title: "Name",
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
