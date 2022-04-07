import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const PeopleGenderCount = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/peopleGenderCount/")
      .then((response) => {
        let genders = new Set(response.data.map((x) => x.gender));
        let data = [];

        for (let gender of genders) {
          let gender_data = response.data.filter((x) => x.gender === gender);
          data.push({
            type: "bar",
            x: gender_data.map((x) => x.count).reverse(),
            y: gender_data.map((x) => x.known_for_department).reverse(),
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
    <Plot
      data={graphData}
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
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
