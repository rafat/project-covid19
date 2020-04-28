import React, {useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select';
import LineChart from './LineChart';
import RenderButton from './RenderButton';

import {StateData} from '../../data/StateData';


import {StyledChartsContainer} from '../styles/StyledChartsContainer';

const MultiChartsContainer = () => {
    let statesOptions = [];
    const pieData = [];
    const [stats,setStats] = useState('positive');
    const [slabel,setSlabel] = useState('CONFIRMED CASES');
    const [baseline,setBaseline] = useState(0);
    const [settings,setSettings] = useState({axisLeft:{orient: 'left',legend: 'Number of Cases (Per Capita * 100K)' }});
    const currentState = useSelector(state => state);
    const dispatch = useDispatch();
    let data = [];

    statesOptions.push({"value":StateData[0].name,"label":StateData[0].name,"key":StateData[0].state});
    for(let i = 1; i < StateData.length;++i) {
        statesOptions.push({"value":StateData[i].name,"label":StateData[i].name,"key":StateData[i].state});
        let stateobj = currentState.stdata.filter(e => e.state===StateData[i].state);
        let pop = StateData[i].population/100000;
        pieData.push({"id":StateData[i].name,"label":StateData[i].name,"value": stateobj[0].positive/pop});
    }

    const [selectedValues,setSelectedValues] = useState([statesOptions[0]]);

    const options = [
        {value: "positive", label: "Confirmed Cases"},
        {value: "total", label: "Total Tests"},
        {value: "death", label: "Deaths"},
        {value: "hospitalized", label: "Hospitalizations"},
        {value: "cfr", label: "Case Fatality Rate (%)"},
        {value: "positivityRate", label: "Positive Tests Rate (%) [Cumulative]"},
        {value: "positivityRateDaily", label: "Positive Tests Rate (%) [Daily]"},
        {value: "positiveIncrease", label: "Confirmed Cases (Daily Increase)"},
        {value: "totalTestResultsIncrease", label:"Total Tests (Daily Increase)"},
        {value: "deathIncrease", label: "Deaths (Daily Increase)"},
        {value: "hospitalizedIncrease", label:"Hospitalizations (Daily Increase)"},
        {value: "hospitalizedCumulative", label: "Hospitalizations (Cumulative)"},
        {value: "hospitalizedCurrently", label:"Hospitalizations (Current)"},
        {value: "inIcuCumulative", label: "ICU Numbers (Cumulative)"},
        {value: "inIcuCurrently", label:"ICU Numbers (Current)"}
    ];

    const baselineOptions = [
        {value: 0, label: "None"},
        {value: 1, label: "10 Confirmed Cases"},
        {value: 2, label: "50 Confirmed Cases"},
        {value: 3, label: "100 Confirmed Cases"},
        {value: 4, label: "1 Death"},
        {value: 5, label: "5 Deaths"},
        {value: 6, label: "10 Deaths"}
    ];

    data = currentState.comparedata;

    console.log(data);


    const setStatesData= (val) => {
        setSelectedValues(val);
        //dispatch({type:'GET_COMPARISON_CHART_DATA',yaxis:selectedValues,stats:stats});
    }

    const setStatistics = (val) => {
        setStats(val.value);
        //setSlabel(val.label.toUpperCase());
        //dispatch({type:'GET_COMPARISON_CHART_DATA',yaxis:selectedValues,stats:stats});
    };


    const RefreshGraph = () => {
        let obj = options.filter(e => e.value === stats);
        setSlabel(obj[0].label.toUpperCase());
        dispatch({type:'GET_COMPARISON_CHART_DATA',yaxis:selectedValues,stats:stats,baseline:0});
    }

    return (
        <>
        <StyledChartsContainer>
            <div className="chart-content">
            <Select 
            value={stats.label} 
            defaultValue={[options[0]]}
            onChange={setStatistics} 
            options={options} 
            className="select-content"
            placeholder="Select Statistics"
            />
            <h3>{slabel}</h3>
            <LineChart data={data} settings={settings} />
            <div className="bottombar-content">
            <Select 
            defaultValue={[statesOptions[0]]}
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
        </>
    );
};

export default MultiChartsContainer;