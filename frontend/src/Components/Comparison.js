import axios from "axios";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Plotly from "react-plotly.js";

const URL =
  "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/";

function fetchRevenueGraphData(
  actor1,
  actor2,
  actor1GenreSetter,
  actor1RevenueSetter,
  actor2GenreSetter,
  actor2RevenueSetter,
  combinedGenreSetter,
  combinedRevenueSetter
) {
  const article1 = {
    graphID: "avgRevenueByGenreForActor",
    graphData: { actor: actor1 },
  };
  axios.post(URL, article1).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let genreArray = new Array();
    let revenueArray = new Array();

    for (var i = 0; i < dataArray.length; ++i) {
      genreArray.push(dataArray[i].genre);
      revenueArray.push(dataArray[i].revenue);
    }

    actor1GenreSetter(genreArray);
    actor1RevenueSetter(revenueArray);
  });

  const article2 = {
    graphID: "avgRevenueByGenreForActor",
    graphData: { actor: actor2 },
  };
  axios.post(URL, article2).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let genreArray = new Array();
    let revenueArray = new Array();

    for (var i = 0; i < dataArray.length; ++i) {
      genreArray.push(dataArray[i].genre);
      revenueArray.push(dataArray[i].revenue);
    }

    actor2GenreSetter(genreArray);
    actor2RevenueSetter(revenueArray);

    //                    console.log(actor2);
  });

  const article3 = {
    graphID: "avgRevenueByGenreForActors",
    graphData: { actor1: actor1, actor2: actor2 },
  };
  axios.post(URL, article3).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let genreArray = new Array();
    let revenueArray = new Array();

    for (var i = 0; i < dataArray.length; ++i) {
      genreArray.push(dataArray[i].genre);
      revenueArray.push(dataArray[i].revenue);
    }

    combinedGenreSetter(genreArray);
    combinedRevenueSetter(revenueArray);
  });
}

function fetchBudgetGraphData(
  actor1,
  actor2,
  budgetactor1GenreSetter,
  budgetactor1RevenueSetter,
  budgetactor2GenreSetter,
  budgetactor2RevenueSetter,
  budgetcombinedGenreSetter,
  budgetcombinedRevenueSetter
) {
  const article1 = {
    graphID: "avgBudgetByGenreForActor",
    graphData: { actor: actor1 },
  };
  axios.post(URL, article1).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let genreArray = new Array();
    let revenueArray = new Array();

    for (var i = 0; i < dataArray.length; ++i) {
      genreArray.push(dataArray[i].genre);
      revenueArray.push(dataArray[i].budget);
    }

    budgetactor1GenreSetter(genreArray);
    budgetactor1RevenueSetter(revenueArray);
  });

  const article2 = {
    graphID: "avgBudgetByGenreForActor",
    graphData: { actor: actor2 },
  };
  axios.post(URL, article2).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let genreArray = new Array();
    let revenueArray = new Array();

    for (var i = 0; i < dataArray.length; ++i) {
      genreArray.push(dataArray[i].genre);
      revenueArray.push(dataArray[i].budget);
    }

    budgetactor2GenreSetter(genreArray);
    budgetactor2RevenueSetter(revenueArray);

    //                    console.log(actor2);
  });

  const article3 = {
    graphID: "avgBudgetByGenreForActors",
    graphData: { actor1: actor1, actor2: actor2 },
  };
  axios.post(URL, article3).then((response) => {
    console.log(response.data);

    var dataArray = response.data.data;

    let genreArray = new Array();
    let revenueArray = new Array();

    for (var i = 0; i < dataArray.length; ++i) {
      genreArray.push(dataArray[i].genre);
      revenueArray.push(dataArray[i].budget);
    }

    budgetcombinedGenreSetter(genreArray);
    budgetcombinedRevenueSetter(revenueArray);
  });
}

function createGraphs(
  actor1Input,
  actor2Input,
  actor1GenreSetter,
  actor1RevenueSetter,
  actor2GenreSetter,
  actor2RevenueSetter,
  combinedGenreSetter,
  combinedRevenueSetter,
  budgetactor1GenreSetter,
  budgetactor1RevenueSetter,
  budgetactor2GenreSetter,
  budgetactor2RevenueSetter,
  budgetcombinedGenreSetter,
  budgetcombinedRevenueSetter
) {
  console.log("A1: " + actor1Input);
  console.log("A2: " + actor2Input);
  fetchRevenueGraphData(
    actor1Input,
    actor2Input,
    actor1GenreSetter,
    actor1RevenueSetter,
    actor2GenreSetter,
    actor2RevenueSetter,
    combinedGenreSetter,
    combinedRevenueSetter
  );
  fetchBudgetGraphData(
    actor1Input,
    actor2Input,
    budgetactor1GenreSetter,
    budgetactor1RevenueSetter,
    budgetactor2GenreSetter,
    budgetactor2RevenueSetter,
    budgetcombinedGenreSetter,
    budgetcombinedRevenueSetter
  );

  //    fetchGraphData(xDataSetter, yDataSetter);
}

function Comparison() {
  const [actor1Input, setActor1Input] = useState("");
  const [actor2Input, setActor2Input] = useState("");

  const [actor1GenreGetter, actor1GenreSetter] = useState("");
  const [actor2GenreGetter, actor2GenreSetter] = useState("");
  const [combinedGenreGetter, combinedGenreSetter] = useState("");

  const [actor1RevenueGetter, actor1RevenueSetter] = useState("");
  const [actor2RevenueGetter, actor2RevenueSetter] = useState("");
  const [combinedRevenueGetter, combinedRevenueSetter] = useState("");

  const [budgetactor1GenreGetter, budgetactor1GenreSetter] = useState("");
  const [budgetactor2GenreGetter, budgetactor2GenreSetter] = useState("");
  const [budgetcombinedGenreGetter, budgetcombinedGenreSetter] = useState("");

  const [budgetactor1RevenueGetter, budgetactor1RevenueSetter] = useState("");
  const [budgetactor2RevenueGetter, budgetactor2RevenueSetter] = useState("");
  const [budgetcombinedRevenueGetter, budgetcombinedRevenueSetter] =
    useState("");

  var actor1Trace = {
    x: actor1GenreGetter,
    y: actor1RevenueGetter,
    name: actor1Input,
    type: "bar",
  };

  var actor2Trace = {
    x: actor2GenreGetter,
    y: actor2RevenueGetter,
    name: actor2Input,
    type: "bar",
  };

  var combinedTrace = {
    x: combinedGenreGetter,
    y: combinedRevenueGetter,
    name: "Combined",
    type: "bar",
  };

  var budgetactor1Trace = {
    x: budgetactor1GenreGetter,
    y: budgetactor1RevenueGetter,
    name: actor1Input,
    type: "bar",
  };

  var budgetactor2Trace = {
    x: budgetactor2GenreGetter,
    y: budgetactor2RevenueGetter,
    name: actor2Input,
    type: "bar",
  };

  var budgetcombinedTrace = {
    x: budgetcombinedGenreGetter,
    y: budgetcombinedRevenueGetter,
    name: "Combined",
    type: "bar",
  };

  var data1 = [actor1Trace, actor2Trace, combinedTrace];
  var data2 = [budgetactor1Trace, budgetactor2Trace, budgetcombinedTrace];

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Actor1"
          value={actor1Input}
          onInput={(e) => setActor1Input(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Actor2"
          value={actor2Input}
          onInput={(e) => setActor2Input(e.target.value)}
        ></input>
        <button
          onClick={() =>
            createGraphs(
              actor1Input,
              actor2Input,
              actor1GenreSetter,
              actor1RevenueSetter,
              actor2GenreSetter,
              actor2RevenueSetter,
              combinedGenreSetter,
              combinedRevenueSetter,
              budgetactor1GenreSetter,
              budgetactor1RevenueSetter,
              budgetactor2GenreSetter,
              budgetactor2RevenueSetter,
              budgetcombinedGenreSetter,
              budgetcombinedRevenueSetter
            )
          }
        >
          Submit
        </button>
      </div>
      <Plot
        data={data1}
        layout={{
          width: window.innerWidth / 1.4,
          height: window.innerHeight / 1.2,
          title: "Actor Correlation For Average Revenue by Genre",
          yaxis: { title: "Average Revenue" },
          xaxis: { title: "Genres" },
        }}
      />
      <Plot
        data={data2}
        layout={{
          width: window.innerWidth / 1.4,
          height: window.innerHeight / 1.2,
          title: "Actor Correlation For Average Budget by Genre",
          yaxis: { title: "Average Budget" },
          xaxis: { title: "Genres" },
        }}
      />
    </div>
  );
}

export default Comparison;
