import React, {useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select';
import LineChart from './LineChart';
import RenderButton from './RenderButton';

import {StateData} from '../../data/StateData';


import {StyledChartsContainer} from '../styles/StyledChartsContainer';

const MultiChartsContainer = () => {
    const statesOptions = [];
    const [stats,setStats] = useState('positive');
    const [slabel,setSlabel] = useState('CONFIRMED CASES');
    const currentState = useSelector(state => state);
    const dispatch = useDispatch();
    let data = [];
    let settings = {};

    settings.axisLeft = {orient: 'left',legend: 'Number of Cases (Per Capita * 100K)' };

    for(let i = 0; i < StateData.length;++i) {
        statesOptions.push({"value":StateData[i].name,"label":StateData[i].name,"key":StateData[i].state});
    }

    const [selectedValues,setSelectedValues] = useState(statesOptions[0]);

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

    data = currentState.comparedata;

    console.log(data);


    const setStatesData= (val) => {
        setSelectedValues(val);
        //dispatch({type:'GET_COMPARISON_CHART_DATA',yaxis:selectedValues,stats:stats});
    }

    const setStatistics = (val) => {
        setStats(val.value);
        setSlabel(val.label.toUpperCase());
        //dispatch({type:'GET_COMPARISON_CHART_DATA',yaxis:selectedValues,stats:stats});
    };

    const RefreshGraph = () => {
        dispatch({type:'GET_COMPARISON_CHART_DATA',yaxis:selectedValues,stats:stats});
    }

    return (
        <StyledChartsContainer>
            <div className="chart-content">
            <Select 
            value={stats} 
            onChange={setStatistics} 
            options={options} 
            className="select-content"
            />
            <h3>{slabel}</h3>
            <LineChart data={data} settings={settings} />
            <div className="bottombar-content">
            <Select 
            defaultValue={statesOptions[0]}
            options={statesOptions}
            value={selectedValues}
            isMulti
            onChange={setStatesData}
            name="Multiple Lines"
            className="basic-multi-select"
            />
            <RenderButton callback={RefreshGraph} />
            </div>
            
            
            </div>
        </StyledChartsContainer>
    );
};

export default MultiChartsContainer;