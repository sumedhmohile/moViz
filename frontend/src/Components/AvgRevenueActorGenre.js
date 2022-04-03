import Plot from 'react-plotly.js';
import axios from 'axios'
import { useEffect, useState } from 'react';

export const AvgRevenueActorGenre = () => {
    const [graphData,setGraphData] = useState([])

    useEffect(()=> {
        axios.post('http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/',
        { 
            graphID : "avgRevenueActorGenre"
        })
        .then(res => {
            var combinedData = {}
            
            var data = res.data.data
            console.log(res.data)
            var i = 0

            var actor = data[i].name 
            combinedData.x = ['Adventure','Fantasy','Animation','Drama','Horror','Action','Comedy','History','Western','Thriller','Crime','Documentary','Science Fiction','Mystery','Music','Romance','Family','War',
            // 'TV Movie'
            ]
            combinedData.y = []
            combinedData.z = []
            
            while(data[i]){
              var actorGenre = {}
              var zValues = []

              for(var j=0; j<combinedData.x.length; j++){
                actorGenre[combinedData.x[j]] = '0'   
              }

              while(data[i] && data[i].name === actor){
                // if(parseInt(data[i].avg_revenue)==0){
                //   actorGenre[data[i].genre] = 0
                // }else
                  actorGenre[data[i].genre] = (data[i].avg_revenue)
                i++
              }

              Object.keys(actorGenre).map(function(key){
                zValues.push(actorGenre[key])
              });
              combinedData.y.unshift(actor)
              combinedData.z.unshift(zValues)

              if(data[i] !== undefined){
                actor = data[i].name
              }

            }
            console.log(combinedData)
            combinedData.type = 'heatmap'
            combinedData.colorscale = 'YlOrRd'
            setGraphData(combinedData)
      }).catch(err =>{
        console.log(err)
      })
    }, [])
  
    return (
      <Plot 
          data= {[graphData]}
          layout={{
            margin:{
              l: 200
            },
            width: window.innerWidth/1.5, 
            height: window.innerHeight/1.2,
            title: 'Average Revenue of Popular Actors by Genre',
            yaxis: {title: 'Actor'}, 
            xaxis: {title: 'Genre'} 
          }}
          config={{
            scrollZoom: true,
          }}

        />
    );
}