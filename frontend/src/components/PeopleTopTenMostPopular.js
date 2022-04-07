import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const PeopleTopTenMostPopular = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/peopleTopTenMostPopular/")
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
          x: graphData.map((x) => x.popularity).reverse(),
          y: graphData.map((x) => x.name).reverse(),
          orientation: "h",
        },
      ]}
      layout={{
        title: "People Top Ten Most Popular",
        xaxis: {
          title: "Popularity",
          rangeslider: {},
        },
        yaxis: { title: "Name" },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
    />
  );
};
