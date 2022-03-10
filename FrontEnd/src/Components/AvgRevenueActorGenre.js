import Plot from 'react-plotly.js';
import axios from 'axios'
import { useEffect, useState } from 'react';

export const AvgRevenueActorGenre = () => {
    const [graphData,setGraphData] = useState([])

    useEffect(()=> {
        axios.post('https://afternoon-basin-72348.herokuapp.com/http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/', 
        { 
            graphID : "avgRevenueActorGenre"
        })
        .then(res => {
            console.log(res.data)
            var combinedData = []
            var data = res.data.data
      }).catch(err =>{
        console.log(err)
      })
    }, [])
  
    return (
      <Plot
          data= {graphData}
          layout={{
            width: window.innerWidth/1.3, 
            height: window.innerHeight/1.2,
            title: '',
            xaxis: {
              range: [1910,2025],
              rangeslider: {},
            },
            yaxis: {
                fixedrange: false,
            },
          }}
          config={{
            scrollZoom: true,
          }}

        />
    );
}