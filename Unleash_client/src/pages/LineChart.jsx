import React from "react";
import {Line} from "react-chartjs-2";

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

export const Data = [
    {
      id: 1,
      year: 2016,
      userGain: 20000
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888
    },
    {
      id: 4,
      year: 2019,
      userGain: 10000
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300
    }
];

export const setChartDatas =(info)=>{
    return(
    {
        labels: info.map((data) => String(data.updatedAt).substr(5,5)), 
        datasets: [
          {
            label: "Price ",
            data: info.map((data) => data.price),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 2
          }
        ]
      }
    )
}

export const LineChart =({chartData})=>{
    return(
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Price History"
              },
              legend: {
                display: false
              }
            }
          }}
        />
    );
}

