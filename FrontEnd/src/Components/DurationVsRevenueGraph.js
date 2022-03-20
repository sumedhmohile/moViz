import axios from "axios";
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'react-plotly.js';

const URL = "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/moviz/graph/";

function fetchGraphData(xSetter, ySetter) {
    const article = { graphID: 'durationVSrevenue' };
        axios.post(URL, article)
            .then(response => {
                console.log(response.data);

                var dataArray = response.data.data;

                let xArray = new Array();
                let yArray = new Array();


                for(var i = 0 ; i < dataArray.length ; ++i) {
                    xArray.push(dataArray[i].runtime);
                    yArray.push(dataArray[i].revenue);
                }

                xSetter(xArray);
                ySetter(yArray);
            });
  }

function DurationVsRevenueGraph() {
    const [count2, setCount2] = useState(0);
    const [xDataGetter, xDataSetter] = useState(0);
    const [yDataGetter, yDataSetter] = useState(0);

    useEffect(() => {
        console.log("xData changed!");
      }, [xDataGetter]);

    useEffect(() => {
          console.log("yData changed!");
        }, [yDataGetter]);


    useEffect(() => {
      console.log("I have been mounted");
      fetchGraphData(xDataSetter, yDataSetter);
    }, []);




    var plotData = [
                             {type: 'bar',
                             x: xDataGetter,
                             y: yDataGetter
                             }

                           ];
    return (
            <Plot
             data={plotData}
             layout={ {width: 600, height: 750, title: 'Average Revenue vs Movie Runtime', yaxis: {title: 'Average Revenue'}, xaxis: {title: 'Runtime in Minutes'} }}
           />

    );
}

export default DurationVsRevenueGraph;
