import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

export const ActorGenderCount = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/actorGenderCount/")
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
          type: "pie",
          values: graphData.map((x) => x.count),
          labels: graphData.map((x) => x.gender),
          hole: 0.4,
        },
      ]}
      layout={{
        title: "Actor Gender Distribution",
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ responsive: true }}
    />
  );
};
