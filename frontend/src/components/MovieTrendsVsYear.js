import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export const MovieTrendsVsYear = () => {
  const [genreData, setGenreData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [yAxis, setYAxis] = useState("count");
  const [plotType, setPlotType] = useState("bar");

  function getYAxisData(genreGraphData) {
    let y = [];

    if (yAxis === "count") {
      y = genreGraphData.map((x) => x.count);
    } else if (yAxis === "total_revenue") {
      y = genreGraphData.map((x) => x.total_revenue);
    } else if (yAxis === "avg_revenue") {
      y = genreGraphData.map((x) => x.avg_revenue);
    } else if (yAxis === "total_budget") {
      y = genreGraphData.map((x) => x.total_budget);
    } else if (yAxis === "avg_budget") {
      y = genreGraphData.map((x) => x.avg_budget);
    } else if (yAxis === "avg_runtime") {
      y = genreGraphData.map((x) => x.avg_runtime);
    } else if (yAxis === "avg_popularity") {
      y = genreGraphData.map((x) => x.avg_popularity);
    }

    return y;
  }

  const plotHelper = [
    {
      label: "count",
      layoutTitle: "Movie Count vs. Year",
      layoutYaxisTitle: "Count",
    },
    {
      label: "total_revenue",
      layoutTitle: "Movie Total Revenue vs. Year",
      layoutYaxisTitle: "Total Revenue",
    },
    {
      label: "avg_revenue",
      layoutTitle: "Movie Average Revenue vs. Year",
      layoutYaxisTitle: "Average Revenue",
    },
    {
      label: "total_budget",
      layoutTitle: "Movie Total Budget vs. Year",
      layoutYaxisTitle: "Total Budget",
    },
    {
      label: "avg_budget",
      layoutTitle: "Movie Average Budget vs. Year",
      layoutYaxisTitle: "Average Budget",
    },
    {
      label: "avg_runtime",
      layoutTitle: "Movie Average Runtime vs. Year",
      layoutYaxisTitle: "Average Runtime",
    },
    {
      label: "avg_popularity",
      layoutTitle: "Movie Average Popularity vs. Year",
      layoutYaxisTitle: "Average Popularity",
    },
  ];

  let data = [];

  for (let genre of genreData.map((x) => x.name)) {
    let genreGraphData = graphData.filter((x) => x.genre_name === genre);

    data.push({
      x: genreGraphData.map((x) => x.year),
      y: getYAxisData(genreGraphData),
      type: plotType,
      name: genre,
    });
  }

  useEffect(() => {
    axios
      .get("/api/genres")
      .then((response) => {
        setGenreData(response.data);

        return axios.get("/api/movieTrendsVsYear/");
      })
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl>
            <FormLabel>Set Y-Axis</FormLabel>
            <RadioGroup
              row
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
            >
              <FormControlLabel
                value="count"
                control={<Radio />}
                label="Count"
              />
              <FormControlLabel
                value="total_revenue"
                control={<Radio />}
                label="Total Revenue"
              />
              <FormControlLabel
                value="avg_revenue"
                control={<Radio />}
                label="Average Revenue"
              />
              <FormControlLabel
                value="total_budget"
                control={<Radio />}
                label="Total Budget"
              />
              <FormControlLabel
                value="avg_budget"
                control={<Radio />}
                label="Average Budget"
              />
              <FormControlLabel
                value="avg_runtime"
                control={<Radio />}
                label="Average Runtime"
              />
              <FormControlLabel
                value="avg_popularity"
                control={<Radio />}
                label="Average Popularity"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Set Plot Type</FormLabel>
            <RadioGroup
              row
              value={plotType}
              onChange={(e) => setPlotType(e.target.value)}
            >
              <FormControlLabel
                value="bar"
                control={<Radio />}
                label="Bar Chart"
              />
              <FormControlLabel
                value="line"
                control={<Radio />}
                label="Line Chart"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Plot
        data={data}
        layout={{
          title: plotHelper.find((x) => x.label === yAxis).layoutTitle,
          xaxis: {
            title: "Year",
            tickformat: "d",
            rangeslider: {},
          },
          yaxis: {
            title: plotHelper.find((x) => x.label === yAxis).layoutYaxisTitle,
          },
          barmode: "stack",
        }}
        style={{ width: "100%", height: "100%" }}
        config={{
          scrollZoom: true,
          responsive: true,
        }}
      />
    </>
  );
};
