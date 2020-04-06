import React, {useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select';
import LineChart from './LineChart';

import {StyledChartsContainer} from '../styles/StyledChartsContainer';

const ChartsContainer = ({stateId}) => {
    const currentState = useSelector(state => state);
    const [svalue,setSval] = useState('positive');
    const [slabel,setSlabel] = useState('CONFIRMED CASES');
    const dispatch = useDispatch();
    let settings = {};

    let data = [];
    settings.linecolor = '#00a8e6';
    const options = [
        {value: "positive", label: "Confirmed Cases"},
        {value: "total", label: "Total Tests"},
        {value: "death", label: "Deaths"},
        {value: "hospitalized", label: "Hospitalizations"},
        {value: "cfr", label: "Case Fatality Rate (%)"},
        {value: "positiveIncrease", label: "Confirmed Cases (Daily Increase)"},
        {value: "totalIncrease", label:"Total Tests (Daily Increase)"},
        {value: "deathIncrease", label: "Deaths (Daily Increase)"},
        {value: "hospitalizedIncrease", label:"Hospitalizations (Daily Increase)"},
        {value: "hospitalizedCumulative", label: "Hospitalizations (Cumulative)"},
        {value: "hospitalizedCurrently", label:"Hospitalizations (Current)"},
        {value: "inIcuCumulative", label: "ICU Numbers (Cumulative)"},
        {value: "inIcuCurrently", label:"ICU Numbers (Current)"}
    ];

    if (stateId) {
        data = currentState.statechartdata;
    } else {
        data = currentState.chartdata;
    }

    const displayChart = (val) => {
        setSval(val.value);
        setSlabel(val.label.toUpperCase());
        if (stateId) {
            dispatch({type:'GET_STATES_CHART_DATA',yaxis: val.value});
        } else {
            dispatch({type:'GET_US_CHART_DATA',yaxis: val.value});
        }
        
    };
        
    return (
        <StyledChartsContainer>
            <div className="chart-content">
                <Select 
                value={svalue} 
                onChange={displayChart} 
                options={options} 
                className="select-content"
                />
                <h3>{slabel}</h3>
                <LineChart data={data} settings={settings} />
            </div>
        
        </StyledChartsContainer>
        
    );
};

export default ChartsContainer;