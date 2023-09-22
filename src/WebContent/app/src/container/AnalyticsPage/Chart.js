import React, { useEffect, useState } from 'react';
import Title from './Title';
import ReactEcharts from "echarts-for-react"

export default function Chart({ option, title }) {
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <ReactEcharts option={option}/>
        </React.Fragment>
    )
}

