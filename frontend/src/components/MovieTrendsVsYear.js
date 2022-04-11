import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

export const MovieTrendsVsYear = () => {
  const [yAxis, setYAxis] = useState("count");
  const [plotType, setPlotType] = useState("bar");
  const [graphData, setGraphData] = useState([]);

  const options = [
    {
      label: "count",
      y: graphData.map((x) => x.count),
      layoutTitle: "Movie Count vs. Year",
      layoutYaxisTitle: "Movie Count",
    },
    {
      label: "total_revenue",
      y: graphData.map((x) => x.total_revenue),
      layoutTitle: "Movie Total Revenue vs. Year",
      layoutYaxisTitle: "Total Revenue",
    },
    {
      label: "avg_revenue",
      y: graphData.map((x) => x.avg_revenue),
      layoutTitle: "Movie Average Revenue vs. Year",
      layoutYaxisTitle: "Average Revenue",
    },
    {
      label: "total_budget",
      y: graphData.map((x) => x.total_budget),
      layoutTitle: "Movie Total Budget vs. Year",
      layoutYaxisTitle: "Total Budget",
    },
    {
      label: "avg_budget",
      y: graphData.map((x) => x.avg_budget),
      layoutTitle: "Movie Average Budget vs. Year",
      layoutYaxisTitle: "Average Budget",
    },
    {
      label: "avg_runtime",
      y: graphData.map((x) => x.avg_runtime),
      layoutTitle: "Movie Average Runtime vs. Year",
      layoutYaxisTitle: "Average Runtime",
    },
  ];

  useEffect(() => {
    axios
      .get("/api/movieTrendsVsYear/")
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
        data={[
          {
            x: graphData.map((x) => x.year),
            y: options.find((x) => x.label === yAxis).y,
            type: plotType,
          },
        ]}
        layout={{
          title: options.find((x) => x.label === yAxis).layoutTitle,
          xaxis: {
            title: "Year",
            tickformat: "d",
            rangeslider: {},
          },
          yaxis: {
            title: options.find((x) => x.label === yAxis).layoutYaxisTitle,
          },
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
