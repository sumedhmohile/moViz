import Plot from 'react-plotly.js';
import axios from 'axios'
import { useEffect, useState } from 'react';

export const MovieAvgRevenueVsYear = () => {
    const [graphData,setGraphData] = useState([])

    useEffect(()=> {
        axios.get('http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/api/movieAvgRevenuesVsYear/', 
        ).then(res => {
            const data = res.data
            console.log(data)
            var x = []
            var y = []

            for(var i=0; i<data.length; i++){
                x.push(data[i].year)
                y.push(data[i].revenue)
            }

            var graph = {
                x: x,
                y: y,
                type: 'bar'
            }
            setGraphData(graph)
        }).catch(err =>{
        console.log(err)
      })
    }, [])
  
    return (
      <Plot 
          data= {[graphData]}
          layout={{
            margin:{
              l: 50
            },
            width: window.innerWidth/1.2, 
            height: window.innerHeight/1.2,
            title: 'Movie Average Revenue By Year',
          }}
          config={{
            scrollZoom: true,
          }}

        />
    );
}