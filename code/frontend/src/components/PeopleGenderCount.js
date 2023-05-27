import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Plot from "react-plotly.js";

export const PeopleGenderCount = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/peopleGenderCount/")
      .then((response) => {
        let data = [];

        for (let gender of new Set(response.data.map((x) => x.gender))) {
          let gender_data = response.data.filter((x) => x.gender === gender);

          data.push({
            x: gender_data.map((x) => x.count).reverse(),
            y: gender_data.map((x) => x.known_for_department).reverse(),
            type: "bar",
            name: gender,
            orientation: "h",
          });
        }
        setGraphData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ m: "3em", boxShadow: 3 }} height="90vh">
      <Plot
        data={graphData}
        layout={{
          title: "People Gender Distribution",
          xaxis: {
            title: "Count",
            tickformat: "s",
            rangeslider: {},
          },
          yaxis: {
            title: "Known for Department",
            automargin: true,
          },
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
