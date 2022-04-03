import Plot from 'react-plotly.js';
import axios from 'axios'
import { useEffect, useState } from 'react';

export const MoviesCountVsYear = () => {
    const [graphData,setGraphData] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:8000/api/movieCountVsYear/',
        ).then(res => {
            const data = res.data
            console.log(data)
            var x = []
            var y = []

            for(var i=0; i<data.length; i++){
                x.push(data[i].year)
                y.push(data[i].count)
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
            title: 'Movie Count by Year',
            yaxis: {title: 'Movie Count'}, 
            xaxis: {title: 'Year'} 
          }}
          config={{
            scrollZoom: true,
          }}

        />
    );
}