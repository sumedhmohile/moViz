import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const PeopleGenderCount = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/peopleGenderCount/")
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Plot
      data={[
        {
          type: "bar",
          x: graphData
            .filter((obj) => obj.gender === "Male")
            .map((x) => x.count)
            .reverse(),
          y: graphData
            .filter((obj) => obj.gender === "Male")
            .map((x) => x.known_for_department)
            .reverse(),
          name: "Male",
          orientation: "h",
        },
        {
          type: "bar",
          x: graphData
            .filter((obj) => obj.gender === "Female")
            .map((x) => x.count)
            .reverse(),
          y: graphData
            .filter((obj) => obj.gender === "Female")
            .map((x) => x.known_for_department)
            .reverse(),
          name: "Female",
          orientation: "h",
        },
        {
          type: "bar",
          x: graphData
            .filter((obj) => obj.gender === "Other")
            .map((x) => x.count)
            .reverse(),
          y: graphData
            .filter((obj) => obj.gender === "Other")
            .map((x) => x.known_for_department)
            .reverse(),
          name: "Other",
          orientation: "h",
        },
      ]}
      layout={{
        title: "People Gender Distribution",
        xaxis: {
          title: "Count",
          rangeslider: {},
        },
        yaxis: { title: "Known for Department" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        responsive: true,
      }}
    />
  );
};
