import { useState, useEffect } from "react";
import axios from "axios";
import { Comparison } from "./Comparison";

function fetchGraphData(xSetter, ySetter) {
  axios
    .post("/moviz/graph/", { graphID: "durationVSrevenue" })
    .then((response) => {
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

export const CompHolder = () => {
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
};
