import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const AvgRevenueActorGenre = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", { graphID: "avgRevenueActorGenre" })
      .then((response) => {
        let dataDict = {};
        let genres = [
          "Action",
          "Adventure",
          "Animation",
          "Comedy",
          "Crime",
          "Documentary",
          "Drama",
          "Family",
          "Fantasy",
          "History",
          "Horror",
          "Music",
          "Mystery",
          "Romance",
          "Science Fiction",
          "TV Movie",
          "Thriller",
          "War",
          "Western",
        ];
        let names = Array.from(new Set(response.data.data.map((x) => x.name)));

        dataDict.x = genres;
        dataDict.y = names;

        dataDict.z = Array.from(Array(10), () => new Array(19).fill("0"));
        for (let record of response.data.data) {
          if (record.avg_revenue !== "None") {
            dataDict.z[names.indexOf(record.name)][
              genres.indexOf(record.genre)
            ] = record.avg_revenue;
          }
        }

        dataDict.type = "heatmap";
        dataDict.colorscale = "Blues";
        dataDict.reversescale = true;

        setGraphData([dataDict]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Plot
      data={graphData}
      layout={{
        title: "Average Revenue of Popular Actors by Genre",
        xaxis: { title: "Genre" },
        yaxis: { title: "Actor" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ responsive: true }}
    />
  );
};
