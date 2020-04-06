import React from 'react';
import {ResponsiveLine} from '@nivo/line';


const LineChart = ({data,settings}) => {
    let scheme = 'nivo';
    let margin ={top: 20, right: 100, bottom: 50, left: 50};
    let yScale = {type: "linear",stacked: false};
    let xScale = {type: "time",precision: "day",format: "%Y-%m-%d"};
    let xFormat = 'time:%Y-%m-%d';
    let axisBottom = {format: "%b %d", orient: 'bottom', legend: 'Date', tickValues: 5};
    let axisLeft = {orient: 'left',legend: 'Number of Cases' };
    let legend = [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ];


    if (settings) {
        scheme = settings.linecolor ? settings.linecolor : scheme;
    }

    return (
        <ResponsiveLine
            data={data}
            margin={margin}
            yScale={yScale}
            xScale={xScale}
            xFormat={xFormat}
            axisBottom={axisBottom}
            axisLeft={axisLeft}
            useMesh={true}
            colors={scheme}
            legends={legend}        
        />
    );
};

export default LineChart;