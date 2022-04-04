import axios from "axios";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const URL =
  "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/";

function fetchGraphData(xSetter, ySetter) {
  const article = { graphID: "countByGender" };
  axios.post(URL, article).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let xArray = [];
    let yArray = [];

    for (let i = 0; i < dataArray.length; ++i) {
      xArray.push(dataArray[i].count);
      yArray.push(dataArray[i].gender);
    }

    xSetter(xArray);
    ySetter(yArray);
  });
}

function ActorGenderCount() {
  const [xDataGetter, xDataSetter] = useState(0);
  const [yDataGetter, yDataSetter] = useState(0);

  useEffect(() => {
    console.log("xData changed!");
  }, [xDataGetter]);

  useEffect(() => {
    console.log("yData changed!");
  }, [yDataGetter]);

  useEffect(() => {
    console.log("I have been mounted");
    fetchGraphData(xDataSetter, yDataSetter);
  }, []);

  var plotData = [
    {
      type: "pie",
      values: xDataGetter,
      labels: yDataGetter,
      hole: 0.4,
    },
  ];

  return (
    <Plot
      data={plotData}
      layout={{
        width: window.innerWidth / 1.4,
        height: window.innerHeight / 1.2,
        title: "Actor Gender Distribution",
      }}
    />
  );
}

export default ActorGenderCount;
