import axios from "axios";
import React, { useState } from "react";
import Plot from "react-plotly.js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function fetchGraphData(
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
  budgetcombinedRevenueSetter,
  actor1PopularitySetter,
  actor2PopularitySetter,
  combinedPopularitySetter,
  actor1RatingSetter,
  actor2RatingSetter,
  combinedRatingSetter
) {
  console.log(actor1Input);
  axios
    .get("/api/comparisonForPerson/", { params: { person_name: actor1Input } })
    .then((response) => {
      console.log(response);

      var dataArray = response.data;

      let genreArray = [];
      let revenueArray = [];
      let budgetArray = [];
      let popularityArray = [];
      let ratingArray = [];

      for (let i = 0; i < dataArray.length; ++i) {
        genreArray.push(dataArray[i].genre_name);
        revenueArray.push(dataArray[i].avg_revenue);
        budgetArray.push(dataArray[i].avg_budget);
        popularityArray.push(dataArray[i].avg_popularity);
        ratingArray.push(dataArray[i].avg_rating);
      }

      actor1GenreSetter(genreArray);
      actor1RevenueSetter(revenueArray);
      budgetactor1GenreSetter(genreArray);
      budgetactor1RevenueSetter(budgetArray);
      actor1PopularitySetter(popularityArray);
      actor1RatingSetter(ratingArray);
    });

  axios.get(URL, { params: { person_name: actor2Input } }).then((response) => {
    console.log(response);

    var dataArray = response.data;

    let genreArray = [];
    let revenueArray = [];
    let budgetArray = [];
    let popularityArray = [];
    let ratingArray = [];

    for (let i = 0; i < dataArray.length; ++i) {
      genreArray.push(dataArray[i].genre_name);
      revenueArray.push(dataArray[i].avg_revenue);
      budgetArray.push(dataArray[i].avg_budget);
      popularityArray.push(dataArray[i].avg_popularity);
      ratingArray.push(dataArray[i].avg_rating);
    }

    actor2GenreSetter(genreArray);
    actor2RevenueSetter(revenueArray);
    budgetactor2GenreSetter(genreArray);
    budgetactor2RevenueSetter(budgetArray);
    actor2PopularitySetter(popularityArray);
    actor2RatingSetter(ratingArray);
  });

  axios
    .get("/api/peopleCorrelation/", {
      params: { person_name1: actor1Input, person_name2: actor2Input },
    })
    .then((response) => {
      console.log(response);

      var dataArray = response.data;

      let genreArray = [];
      let revenueArray = [];
      let budgetArray = [];
      let popularityArray = [];
      let ratingArray = [];

      for (let i = 0; i < dataArray.length; ++i) {
        genreArray.push(dataArray[i].genre_name);
        revenueArray.push(dataArray[i].avg_revenue);
        budgetArray.push(dataArray[i].avg_budget);
        popularityArray.push(dataArray[i].avg_popularity);
        ratingArray.push(dataArray[i].avg_rating);
      }

      combinedGenreSetter(genreArray);
      combinedRevenueSetter(revenueArray);
      budgetcombinedGenreSetter(genreArray);
      budgetcombinedRevenueSetter(budgetArray);
      combinedPopularitySetter(popularityArray);
      combinedRatingSetter(ratingArray);
    });
}

export const Comparison = () => {
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

  const [actor1PopularityGetter, actor1PopularitySetter] = useState("");
  const [actor2PopularityGetter, actor2PopularitySetter] = useState("");
  const [combinedPopularityGetter, combinedPopularitySetter] = useState("");

  const [actor1RatingGetter, actor1RatingSetter] = useState("");
  const [actor2RatingGetter, actor2RatingSetter] = useState("");
  const [combinedRatingGetter, combinedRatingSetter] = useState("");

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

  var actor1PopularityTrace = {
    x: actor1GenreGetter,
    y: actor1PopularityGetter,
    name: actor1Input,
    type: "bar",
  };

  var actor2PopularityTrace = {
    x: actor2GenreGetter,
    y: actor2PopularityGetter,
    name: actor2Input,
    type: "bar",
  };

  var combinedPopularityTrace = {
    x: combinedGenreGetter,
    y: combinedPopularityGetter,
    name: "Combined",
    type: "bar",
  };

  var actor1RatingTrace = {
    x: actor1GenreGetter,
    y: actor1RatingGetter,
    name: actor1Input,
    type: "bar",
  };

  var actor2RatingTrace = {
    x: actor2GenreGetter,
    y: actor2RatingGetter,
    name: actor2Input,
    type: "bar",
  };

  var combinedRatingTrace = {
    x: combinedGenreGetter,
    y: combinedRatingGetter,
    name: "Combined",
    type: "bar",
  };

  var data1 = [actor1Trace, actor2Trace, combinedTrace];
  var data2 = [budgetactor1Trace, budgetactor2Trace, budgetcombinedTrace];
  var data3 = [
    actor1PopularityTrace,
    actor2PopularityTrace,
    combinedPopularityTrace,
  ];
  var data4 = [actor1RatingTrace, actor2RatingTrace, combinedRatingTrace];

  return (
    <div>
      <div>
        <Grid container spacing={2} sx={{ mb: "30px", alignItems: "center" }}>
          <Grid item>
            <TextField
              size="small"
              type="text"
              placeholder="Actor Name"
              value={actor1Input}
              onInput={(e) => setActor1Input(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              size="small"
              type="text"
              placeholder="Actor Name"
              value={actor2Input}
              onInput={(e) => setActor2Input(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() =>
                fetchGraphData(
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
                  budgetcombinedRevenueSetter,
                  actor1PopularitySetter,
                  actor2PopularitySetter,
                  combinedPopularitySetter,
                  actor1RatingSetter,
                  actor2RatingSetter,
                  combinedRatingSetter
                )
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
      <Plot
        data={data1}
        layout={{
          width: window.innerWidth / 1.4,
          height: window.innerHeight / 1.2,
          title: "Actor Correlation for Average Revenue by Genre",
          yaxis: { title: "Average Revenue" },
          xaxis: { title: "Genres" },
        }}
      />
      <Plot
        data={data2}
        layout={{
          width: window.innerWidth / 1.4,
          height: window.innerHeight / 1.2,
          title: "Actor Correlation for Average Budget by Genre",
          yaxis: { title: "Average Budget" },
          xaxis: { title: "Genres" },
        }}
      />
      <Plot
        data={data3}
        layout={{
          width: window.innerWidth / 1.4,
          height: window.innerHeight / 1.2,
          title: "Actor Correlation for Average Popularity by Genre",
          yaxis: { title: "Average Popularity" },
          xaxis: { title: "Genres" },
        }}
      />
      <Plot
        data={data4}
        layout={{
          width: window.innerWidth / 1.4,
          height: window.innerHeight / 1.2,
          title: "Actor Correlation for Average Rating by Genre",
          yaxis: { title: "Average Rating" },
          xaxis: { title: "Genres" },
        }}
      />
    </div>
  );
};
