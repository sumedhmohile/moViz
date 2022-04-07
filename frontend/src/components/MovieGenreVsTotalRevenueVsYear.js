import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const MovieGenreVsTotalRevenueVsYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .post("/moviz/graph/", { graphID: "revenueByGenreAndYear" })
      .then((response) => {
        let genres = new Set(response.data.data.map((x) => x.genre));
        let data = [];

        for (let genre of Array.from(genres).sort()) {
          let genre_data = response.data.data.filter((x) => x.genre === genre);
          data.push({
            x: genre_data.map((x) => x.year),
            y: genre_data.map((x) => x.revenue),
            type: "bar",
            name: genre,
          });
        }

        setGraphData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Plot
      data={graphData}
      layout={{
        title: "Movie Genre vs. Total Revenue vs. Year",
        xaxis: {
          title: "Year",
          tickformat: "d",
          rangeselector: {
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
            tickformat: "%Y",
          },
          rangeslider: {},
        },
        yaxis: { title: "Revenue" },
        barmode: "stack",
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
