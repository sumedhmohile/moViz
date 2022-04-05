import Plot from "react-plotly.js";
import axios from "axios";
import { useEffect, useState } from "react";

export const MovieAvgRevenueVsYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movieAvgRevenueVsYear/")
      .then((res) => {
        const data = res.data;
        console.log(data);
        var x = [];
        var y = [];

        for (let i = 0; i < data.length; i++) {
          if (parseInt(data[i].year) > 2022) continue;
          x.push(data[i].year);
          y.push(data[i].revenue);
        }

        var graph = {
          x: x,
          y: y,
          type: "bar",
        };
        setGraphData(graph);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Plot
      data={[graphData]}
      layout={{
        margin: {
          l: 50,
        },
        width: window.innerWidth / 1.2,
        height: window.innerHeight / 1.2,
        title: "Movie Average Revenue vs. Year",
        xaxis: { title: "Year" },
        yaxis: { title: "Average Revenue" },
      }}
      config={{
        scrollZoom: true,
      }}
    />
  );
};
