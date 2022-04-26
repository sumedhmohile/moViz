import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { Box } from "@mui/material";

export const PeopleDepartmentCount = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/peopleDepartmentCount/")
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{m: '3em', boxShadow:3}} height='90vh '>
    <Plot
      data={[
        {
          x: graphData.map((x) => x.count).reverse(),
          y: graphData.map((x) => x.known_for_department).reverse(),
          type: "bar",
          orientation: "h",
        },
      ]}
      layout={{
        title: "People Department Count",
        xaxis: {
          title: "Count",
          tickformat: "s",
          rangeslider: {},
        },
        yaxis: { automargin: true, title: "Known for Department" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
    </Box>
  );
};
