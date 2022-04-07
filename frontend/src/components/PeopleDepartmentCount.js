import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

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
    <Plot
      data={[
        {
          type: "bar",
          x: graphData.map((x) => x.count).reverse(),
          y: graphData.map((x) => x.known_for_department).reverse(),
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
