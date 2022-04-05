import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const AvgRevenueActorGenre = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", { graphID: "avgRevenueActorGenre" })
      .then((response) => {
        var combinedData = {};

        var data = response.data.data;
        console.log(response.data);
        var i = 0;

        var actor = data[i].name;
        combinedData.x = [
          "Adventure",
          "Fantasy",
          "Animation",
          "Drama",
          "Horror",
          "Action",
          "Comedy",
          "History",
          "Western",
          "Thriller",
          "Crime",
          "Documentary",
          "Science Fiction",
          "Mystery",
          "Music",
          "Romance",
          "Family",
          "War",
          // 'TV Movie'
        ];
        combinedData.y = [];
        combinedData.z = [];

        while (data[i]) {
          var actorGenre = {};
          var zValues = [];

          for (let j = 0; j < combinedData.x.length; j++) {
            actorGenre[combinedData.x[j]] = "0";
          }

          while (data[i] && data[i].name === actor) {
            // if(parseInt(data[i].avg_revenue)==0){
            //   actorGenre[data[i].genre] = 0
            // }else
            actorGenre[data[i].genre] = data[i].avg_revenue;
            i++;
          }

          Object.keys(actorGenre).map(function (key) {
            zValues.push(actorGenre[key]);
          });
          combinedData.y.unshift(actor);
          combinedData.z.unshift(zValues);

          if (data[i] !== undefined) {
            actor = data[i].name;
          }
        }
        console.log(combinedData);
        combinedData.type = "heatmap";
        combinedData.colorscale = "YlOrRd";
        setGraphData(combinedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Plot
      data={[graphData]}
      layout={{
        title: "Average Revenue of Popular Actors by Genre",
        xaxis: { title: "Genre" },
        yaxis: { title: "Actor" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
