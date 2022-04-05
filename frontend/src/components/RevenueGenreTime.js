import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const RevenueGenreTime = () => {
  const [graphData, setGraphData] = useState([]);

  const selectorOptions = {
    buttons: [
      {
        step: "year",
        stepmode: "todate",
        count: 1,
        label: "YTD",
      },
      {
        step: "year",
        stepmode: "backward",
        count: 1,
        label: "1y",
      },
      {
        step: "all",
      },
    ],
  };

  useEffect(() => {
    axios
      .post("/moviz/graph/", {
        graphID: "revenueByGenreAndYear",
      })
      .then((res) => {
        console.log(res.data);
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
            y.push(genreTemp[j].revenue);
          }

          if (data[i]) {
            genre = data[i].genre;
          }
          element.x = x;
          element.y = y;
          combinedData.push(element);
        }
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
        title: "Movie Genre vs. Revenue vs. Year",
        xaxis: {
          title: "Year",
          range: [1910, 2025],
          rangeselector: selectorOptions,
          rangeslider: {},
        },
        yaxis: { title: "Revenue" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
        // displayModeBar: false,
      }}
    />
  );
};
