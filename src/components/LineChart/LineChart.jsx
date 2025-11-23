
import Chart from 'react-google-charts'
import { data } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


const LineChart = ({historicalData}) => {


const [Data, setData]=useState([["Date", "Prices"]])

useEffect (()=>{
    let dataCopy= [["Date", "Prices"]];
    if(historicalData.prices){
        historicalData.prices.map((item)=>{
            dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
        })
        setData(dataCopy);
    }
},[historicalData])
    return (
    <Chart
        chartType='LineChart'
        data={Data}
        height="100%"
        legendToggle
    
    />
  )
}

export default LineChart
