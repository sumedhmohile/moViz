import axios from "axios";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const URL =
  "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/";

function fetchGraphData(xSetter, ySetter, languageSetter, popularitySetter) {
  const article = { graphID: "budgetRevenueLanguagePopularity" };
  axios.post(URL, article).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let xArray = [];
    let yArray = [];
    let languageArray = [];
    let popularityArray = [];

    for (let i = 0; i < dataArray.length; ++i) {
      xArray.push(dataArray[i].revenue);
      yArray.push(dataArray[i].budget);
      languageArray.push(dataArray[i].language);
      popularityArray.push(dataArray[i].popularity);
    }

    xSetter(xArray);
    ySetter(yArray);
    languageSetter(languageArray);
    popularitySetter(popularityArray);
  });
}

function LanguageRevenueBudgetPopularity() {
  const [xDataGetter, xDataSetter] = useState(0);
  const [yDataGetter, yDataSetter] = useState(0);
  const [languageDataGetter, languageDataSetter] = useState(0);
  const [popularityDataGetter, popularityDataSetter] = useState(0);

  useEffect(() => {
    console.log("xData changed!");
  }, [xDataGetter]);

  useEffect(() => {
    console.log("yData changed!");
  }, [yDataGetter]);

  useEffect(() => {
    console.log("languageData changed!");
  }, [languageDataGetter]);

  useEffect(() => {
    console.log("popularityData changed!");
  }, [popularityDataGetter]);

  useEffect(() => {
    console.log("I have been mounted");
    fetchGraphData(
      xDataSetter,
      yDataSetter,
      languageDataSetter,
      popularityDataSetter
    );
  }, []);

  var plotData = [
    {
      type: "scatter",
      x: xDataGetter,
      y: yDataGetter,
      mode: "markers",
      text: languageDataGetter,
      marker: {
        size: popularityDataGetter,
      },
    },
  ];

  return (
    <Plot
      data={plotData}
      layout={{
        width: window.innerWidth / 1.4,
        height: window.innerHeight / 1.2,
        title: "Impact of Language on Popularity, Budget and Revenue",
        xaxis: { title: "Budget", range: [0, 110000000] },
        yaxis: { title: "Revenue" },
      }}
    />
  );
}

export default LanguageRevenueBudgetPopularity;
