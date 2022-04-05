import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const PopularityByGenreAndYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", {
        graphID: "popularityByGenreAndYear",
      })
      .then((res) => {
        var combinedData = [];
        var data = res.data.data;
        var genre = data[0].genre;
        var i = 1;

        while (data[i]) {
          var x = [];
          var y = [];
          var element = {
            name: genre,
            type: "scatter",
            mode: "lines",
          };

          var genreTemp = [];
          while (data[i] && data[i].genre === genre) {
            if (data[i].year === "0") {
              i++;
              continue;
            }

            genreTemp.push(data[i]);
            i++;
          }
          genreTemp.sort(function (a, b) {
            if (a.year < b.year) return -1;
            if (a.year > b.year) return 1;
            return 0;
          });

          for (let j = 0; j < genreTemp.length; j++) {
            x.push(genreTemp[j].year);
            y.push(genreTemp[j].popularity);
          }

          if (data[i]) {
            genre = data[i].genre;
          }
          element.x = x;
          element.y = y;
          combinedData.push(element);
        }
        console.log(combinedData);
        setGraphData(combinedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Plot
      data={graphData}
      layout={{
        title: "Popularity of Genres vs. Time",
        xaxis: {
          title: "Popularity",
          range: [1910, 2025],
          rangeslider: {},
        },
        yaxis: {
          title: "Year",
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
