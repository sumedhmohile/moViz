import Plot from "react-plotly.js";
import axios from "axios";
import { useEffect, useState } from "react";

export const MovieTotalBudgetVsYear = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/api/movieTotalBudgetVsYear/"
      )
      .then((res) => {
        const data = res.data;
        console.log(data);
        var x = [];
        var y = [];

        for (let i = 0; i < data.length; i++) {
          x.push(data[i].year);
          y.push(data[i].budget);
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
        title: "Movie Total Budget vs. Year",
        xaxis: { title: "Year" },
        yaxis: { title: "Budget" },
      }}
      config={{
        scrollZoom: true,
      }}
    />
  );
};
