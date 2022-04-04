import axios from "axios";
import React, { useState, useEffect } from "react";
import Comparison from "./Comparison";

const URL =
  "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/";

function fetchGraphData(xSetter, ySetter) {
  const article = { graphID: "durationVSrevenue" };
  axios.post(URL, article).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let xArray = [];
    let yArray = [];

    for (let i = 0; i < dataArray.length; ++i) {
      xArray.push(dataArray[i].runtime);
      yArray.push(dataArray[i].revenue);
    }

    xSetter(xArray);
    ySetter(yArray);
  });
}

function CompHolder() {
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

  return <Comparison></Comparison>;
}

export default CompHolder;
