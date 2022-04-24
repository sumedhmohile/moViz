import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { Box } from "@mui/material";

export const ActorGenreVsAvgRevenue = () => {
  const [genreData, setGenreData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/genres")
      .then((response) => {
        setGenreData(response.data);

        return axios.post("/moviz/graph/", { graphID: "avgRevenueActorGenre" });
      })
      .then((response) => {
        let dataDict = {};

        let names = Array.from(new Set(response.data.data.map((x) => x.name)));
        let genres = genreData.map((x) => x.name);
        dataDict.x = genres;
        dataDict.y = names;

        dataDict.z = Array.from(Array(names.length), () =>
          new Array(genres.length).fill("0")
        );
        response.data.data
          .filter((x) => x.avg_revenue !== "None")
          .map(
            (x) =>
              (dataDict.z[names.indexOf(x.name)][genres.indexOf(x.genre)] =
                x.avg_revenue)
          );

        dataDict.type = "heatmap";
        dataDict.colorscale = "Blues";
        dataDict.reversescale = true;

        setGraphData([dataDict]);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [genreData]);

  return (
    <Box sx={{m: '3em', boxShadow:3}} height='90vh '>
      <Plot
        data={graphData}
        layout={{
          title: "Average Revenue of Popular Actors by Genre",
          xaxis: { title: "Genre" },
          yaxis: { automargin: true, title: "Actor" },
        }}
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true }}
      />
    </Box>
  );
};
