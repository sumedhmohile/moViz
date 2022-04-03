import axios from "axios";
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
// import Plotly from 'react-plotly.js';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

const URL = "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function fetchGraphData(xSetter, ySetter, genreSetter, nameSetter) {
    const article = { graphID: 'budgetPopularityGenre' };
        axios.post(URL, article)
            .then(response => {
                console.log(response.data);

                var dataArray = response.data.data;

                let xArray = new Array();
                let yArray = new Array();
                let genreArray = new Array();
                let nameArray = new Array();
//                let colo

                let colourDict = new Object();

                for(var i = 0 ; i < dataArray.length ; ++i) {
                    colourDict[dataArray[i].name] = getRandomColor();
                }


                for(var i = 0 ; i < dataArray.length ; ++i) {
//                    resultDict[dataArray[i].genre][xData].push()

                    xArray.push(dataArray[i].budget);
                    yArray.push(dataArray[i].vote_average);
                    genreArray.push(colourDict[dataArray[i].name]);
                    nameArray.push(dataArray[i].title);
                }

                xSetter(xArray);
                ySetter(yArray);
                genreSetter(genreArray);
                nameSetter(nameArray);

                console.log("CHECK");
                console.log(colourDict['Adventure']);
            });
  }

function BudgetPopularityGenre() {
    const [xDataGetter, xDataSetter] = useState(0);
    const [yDataGetter, yDataSetter] = useState(0);
    const [genreGetter, genreDataSetter] = useState(0);
    const [nameGetter, nameDataSetter] = useState(0);

    useEffect(() => {
        console.log("xData changed!");
      }, [xDataGetter]);

    useEffect(() => {
          console.log("yData changed!");
        }, [yDataGetter]);

    useEffect(() => {
          console.log("genreData changed!");
          console.log(genreGetter);
        }, [genreGetter]);

    useEffect(() => {
          console.log("nameData changed!");
        }, [nameGetter]);


    useEffect(() => {
      console.log("I have been mounted");
      fetchGraphData(xDataSetter, yDataSetter, genreDataSetter, nameDataSetter);
    }, []);

    var plotData = [{
        type: 'scatter',
        x: xDataGetter,
        y: yDataGetter,
        mode: 'markers',
        text: nameGetter,
        marker : {
            color: genreGetter
        }
    }];

    return (
             <Plot
             data={plotData}
             layout={ {
                width: window.innerWidth/1.4, 
                height: window.innerHeight/1.2,
                title: 'Budget vs Rating by Genre', 
                yaxis: {title: 'Rating'}, 
                xaxis: {title: 'Budget'} 
              }}
           />

    );
}

export default BudgetPopularityGenre;
