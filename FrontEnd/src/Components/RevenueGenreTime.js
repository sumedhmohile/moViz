import Plot from 'react-plotly.js';
import axios from 'axios'
import { useEffect, useState } from 'react';

export const RevenueGenreTime = () => {
    const [graphData,setGraphData] = useState([])

    useEffect(()=> {
        axios.post('https://afternoon-basin-72348.herokuapp.com/http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/', 
        { 
            graphID : "revenueByGenreAndYear"
        })
        .then(res => {
            var combinedData = []
            var data = res.data.data
            var genre = data[0].genre
            var i = 1
            
            while(data[i]){
                var x = []
                var y = []
                var element = {
                    name: genre,
                    type: 'scatter',
                    mode: 'lines',
                }

                var genreTemp = []
                while(data[i] && data[i].genre === genre){
                    if(data[i].year === "0"){
                        i++
                        continue
                    }
                    
                    genreTemp.push(data[i])
                    i++
                }
                genreTemp.sort(function(a, b) {
                    if (a.year < b.year) return -1;
                    if (a.year > b.year) return 1;
                    return 0;
                });
                
                for(var j=0; j<genreTemp.length; j++){
                    x.push(genreTemp[j].year)
                    y.push(genreTemp[j].revenue)
                }
                
                if(data[i]){
                    genre = data[i].genre
                }
                element.x = x
                element.y = y
                combinedData.push(element)
            }
            setGraphData(combinedData)
            
      }).catch(err =>{
        console.log(err)
      })
    }, [])
  
    return (
      <Plot
          data= {graphData}
          layout={{
            width: 1600, 
            height: 900, 
            title: 'Genre Revenues over Time',
            xaxis: {
              range: [1910,2025]
            },
          }}
          config={{
            scrollZoom: true,
          }}
          
        />
    );
}
