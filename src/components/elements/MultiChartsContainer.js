import React, {useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select';
import LineChart from './LineChart';

import {StateData} from '../../data/StateData';


import {StyledChartsContainer} from '../styles/StyledChartsContainer';

const MultiChartsContainer = () => {
    const options = [];
    const [stats,setStats] = useState('positive');
    const currentState = useSelector(state => state);
    const dispatch = useDispatch();
    let data = [];
    let settings = {};

    settings.linecolor = '#00a8e6';

    for(let i = 0; i < StateData.length;++i) {
        options.push({"value":StateData[i].name,"label":StateData[i].name,"key":StateData[i].state});
    }

    const [selectedValues,setSelectedValues] = useState(options[0]);

    data = currentState.comparedata;


    const displayMultiChart = (val) => {
        console.log(val);
        setSelectedValues(val);
        dispatch({type:'GET_COMPARISON_CHART_DATA',yaxis:val,stats:stats});
    }

    return (
        <StyledChartsContainer>
            <div className="chart-content">
            <Select 
            defaultValue={options[0]}
            options={options}
            value={selectedValues}
            isMulti
            onChange={displayMultiChart}
            name="Multiple Lines"
            className="basic-multi-select"
            />
            <LineChart data={data} settings={settings} />
            </div>
        </StyledChartsContainer>
    );
};

export default MultiChartsContainer;