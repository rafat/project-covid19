import React from 'react';
import {ResponsivePie} from '@nivo/pie';

const PieChart = ({data}) => {
    return (
        <ResponsivePie
        data={data}
        sortByValue={true}
        width={600}
        height={600}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        enableSlicesLabels={false}
        colors={{scheme:'paired'}}
        />
    );
};

export default PieChart;