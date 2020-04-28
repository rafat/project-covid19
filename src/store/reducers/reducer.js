import * as actionTypes from '../actions/actions';
import {StateKeys} from '../../data/StateKeys';
import {StateData} from '../../data/StateData';
import {BaselineData} from '../../data/BaselineData';

const initialState = {
    usovdata: {},
    usdata: [],
    stovdata: [],
    stdata: [],
    chartdata: [],
    tabledata: [],
    statechartdata: [],
    comparedata: [],
    yaxis: '',
    stateId: '',
};

const anySort = (val1,val2) => {
    let compare = 0;

    if (val1 < val2) {
        compare = 1;
    } else {
        compare = -1;
    }

    return compare;
};

const dateSort = (a,b) => {
    let compare = 0;

    const val1 = Date.parse(a.date);
    const val2 = Date.parse(b.date);

    compare = anySort(val1,val2);

    return compare;
};

const posSort = (a,b) => {
    let compare = 0;

    const val1 = a.positive;
    const val2 = b.positive;

    compare = anySort(val1,val2);

    return compare;
};

const reducer = (state = initialState, action) => {
    let chartData = [];
    let tableData = [];
    let data = [];
    let usovData = {};
    let rlen;
    switch (action.type) {
        case actionTypes.FETCH_OV_DATA:
            usovData.death = action.usovdata[0].death;
            usovData.positive = action.usovdata[0].positive;
            usovData.negative = action.usovdata[0].negative;
            usovData.hospitalized = action.usovdata[0].hospitalized;
            usovData.total = action.usovdata[0].totalTestResults;

            return {
                ...state,usovdata: usovData
        };

        case actionTypes.FETCH_US_DATA:
            rlen = action.usdata.length;
            data = [];
            chartData = [];
            tableData = [];
            

            for(let i = rlen -1; i >= 0; i--) {
                let dt = action.usdata[i].date.toString().substring(0,4).toString()+"-"+action.usdata[i].date.toString().substring(4,6).toString()+
            "-"+action.usdata[i].date.toString().substring(6).toString();
                let cfr = (action.usdata[i].death/action.usdata[i].positive)*100;
                cfr = (cfr === undefined) || (isNaN(cfr)) ? null : cfr;
                let pr = (action.usdata[i].positive/action.usdata[i].totalTestResults)*100;
                pr = (pr === undefined) || (isNaN(pr)) ? null : pr;
                let prdaily = (action.usdata[i].positiveIncrease/action.usdata[i].totalTestResultsIncrease)*100;
                prdaily = (prdaily === undefined) || (isNaN(prdaily)) ? null : prdaily;
                data = [...data,{"date" : dt,"positive": action.usdata[i].positive, "hospitalized": action.usdata[i].hospitalized,
                                "death": action.usdata[i].death,"total": action.usdata[i].totalTestResults,"deathIncrease":action.usdata[i].deathIncrease,
                                "hospitalizedIncrease":action.usdata[i].hospitalizedIncrease,"positiveIncrease":action.usdata[i].positiveIncrease,
                                "totalTestResultsIncrease":action.usdata[i].totalTestResultsIncrease,"hospitalizedCumulative": action.usdata[i].hospitalizedCumulative,
                                "hospitalizedCurrently": action.usdata[i].hospitalizedCurrently,"inIcuCumulative": action.usdata[i].inIcuCumulative,
                                "inIcuCurrently": action.usdata[i].inIcuCurrently,"cfr": cfr,"positivityRate": pr, "positivityRateDaily": prdaily
                            }];

                tableData = [...tableData,{x : dt,y: action.usdata[i].positive === undefined ? null : action.usdata[i].positive}];
            }
            chartData = [...chartData,{id: "positive", data: tableData}];
            return {
                ...state,usdata: data,chartdata: chartData
        };

        case actionTypes.FETCH_STOV_DATA:
            data=[];
            rlen = action.stovdata.length;
            for(let i = 0; i < rlen;i++) {
                data = [...data,{"key":action.stovdata[i].state,"state":StateKeys[action.stovdata[i].state],"positive": action.stovdata[i].positive,
                "hospitalized": action.stovdata[i].hospitalized, "death": action.stovdata[i].death,"total": action.stovdata[i].totalTestResults}];
            }
            data.sort(posSort);

            return {
                ...state,stovdata: data
        };

        case actionTypes.FETCH_STATES_DATA:
            return {
                ...state,stdata: action.stdata
        };

        case actionTypes.GET_US_CHART_DATA: 
            chartData = [];
            tableData = [];
            rlen = state.usdata.length;
            
            for (let i = 0; i < rlen;++i) {
                tableData = [...tableData,{x: state.usdata[i]['date'], y: state.usdata[i][action.yaxis] === undefined ? null : state.usdata[i][action.yaxis]}];
            }
            chartData = [...chartData,{id: action.yaxis, data: tableData}];
            return {
                ...state,chartdata: chartData,
            };

        case actionTypes.GET_US_DEFAULT_DATA:
            chartData = [];
            tableData = [];
            rlen = state.usdata.length;
            
            for (let i = 0; i < rlen;++i) {
                tableData = [...tableData,{x: state.usdata[i]['date'], y: state.usdata[i]['positive'] === undefined ? null : state.usdata[i]['positive']}];
            }
            chartData = [...chartData,{id: "positive", data: tableData}];
            return {
                ...state,chartdata: chartData,
            };

        case actionTypes.GET_COMPARE_DEFAULT_DATA:
            chartData = [];
            tableData = [];
            rlen = state.usdata.length;
            let state2 = StateData.filter(e => e.state==="US");
            let pop = state2[0].population/100000;
                
            for (let i = 0; i < rlen;++i) {
                tableData = [...tableData,{x: state.usdata[i]['date'], y: state.usdata[i]['positive'] === undefined ? null : state.usdata[i]['positive']/pop}];
            }
            chartData = [...chartData,{id: "United States", data: tableData}];
            return {
                ...state,comparedata: chartData,
            };


        case actionTypes.GET_STATES_TABLE_DATA:
            let stateobj = state.stdata.filter(e => e.state===action.stateId);
            data = [];
            tableData=[];
            chartData = [];
            rlen = stateobj.length;
            
            for(let i = rlen -1; i >= 0; i--) {
                let dt = stateobj[i].date.toString().substring(0,4).toString()+"-"+stateobj[i].date.toString().substring(4,6).toString()+
            "-"+stateobj[i].date.toString().substring(6).toString();
                let cfr = (stateobj[i].death === undefined || isNaN(stateobj[i].death) || stateobj[i].positive === undefined || isNaN(stateobj[i].positive))
                 ? null : (stateobj[i].death/stateobj[i].positive)*100;

                let pr = (stateobj[i].totalTestResults === undefined || isNaN(stateobj[i].totalTestResults) || stateobj[i].positive === undefined || isNaN(stateobj[i].positive))
                ? null : (stateobj[i].positive/stateobj[i].totalTestResults)*100;
                let prdaily = (stateobj[i].totalTestResultsIncrease === undefined || isNaN(stateobj[i].totalTestResultsIncrease) || stateobj[i].positiveIncrease === undefined ||
                 isNaN(stateobj[i].positiveIncrease)) ? null : (stateobj[i].positiveIncrease/stateobj[i].totalTestResultsIncrease)*100;

                data = [...data,{"date" : dt,"positive": stateobj[i].positive, "hospitalized": stateobj[i].hospitalized,
                                "death": stateobj[i].death,"total": stateobj[i].totalTestResults,"deathIncrease":stateobj[i].deathIncrease,
                                "hospitalizedIncrease":stateobj[i].hospitalizedIncrease,"positiveIncrease":stateobj[i].positiveIncrease,
                                "totalTestResultsIncrease":stateobj[i].totalTestResultsIncrease,"hospitalizedCumulative": stateobj[i].hospitalizedCumulative,
                                "hospitalizedCurrently": stateobj[i].hospitalizedCurrently,"inIcuCumulative": stateobj[i].inIcuCumulative,
                                "inIcuCurrently": stateobj[i].inIcuCurrently,"cfr": cfr, "positivityRate": pr, "positivityRateDaily": prdaily
                            }];
                            
                tableData = [...tableData,{x : dt,y: (stateobj[i].positive === undefined || isNaN(stateobj[i].positive)) ? null : stateobj[i].positive}];
            }

            data.sort(dateSort);

            chartData = [...chartData,{id: "positive", data: tableData}];
            
            return {
                ...state,tabledata:data,statechartdata:chartData
            };

        case actionTypes.GET_STATES_CHART_DATA:
            chartData = [];
            tableData = [];
            rlen = state.tabledata.length;
            
            for (let i = 0; i < rlen;++i) {
                tableData = [...tableData,{x: state.tabledata[i]['date'],
                 y: (state.tabledata[i][action.yaxis] === undefined || isNaN(state.tabledata[i][action.yaxis])) ? null : state.tabledata[i][action.yaxis]}];
            }
            chartData = [...chartData,{id: action.yaxis, data: tableData}];
            return {
                ...state,statechartdata: chartData
            };

        case actionTypes.GET_COMPARISON_CHART_DATA:
            //values
            chartData = [];
            console.log("yaxis");
            console.log(action.yaxis);
            console.log("baseline");
            console.log(action.baseline);

            if (action.baseline === 0) {
                if (action.yaxis) {
                    for(let j = 0; j < action.yaxis.length;++j) {
                        if (action.yaxis[j].key === "US") {
                            chartData = [];
                            tableData = [];
                            rlen = state.usdata.length;
                            let state2 = StateData.filter(e => e.state==="US");
                            let pop = state2[0].population/100000;
    
                            if (action.stats === "cfr" || action.stats === "positivityRate" || action.stats === "positivityRateDaily") {
                                pop = 1;
                            }
                
                            for (let i = 0; i < rlen;++i) {
                                tableData = [...tableData,{x: state.usdata[i]['date'], y: state.usdata[i][action.stats] === undefined ? null : state.usdata[i][action.stats]/pop}];
                            }
                            chartData = [...chartData,{id: action.yaxis[j].value, data: tableData}];
                        } else {
                            let stateobj = state.stdata.filter(e => e.state===action.yaxis[j].key);
                            let state2 = StateData.filter(e => e.state===action.yaxis[j].key);
                            rlen = stateobj.length;
                            let pop = state2[0].population/100000;
                            tableData = [];
                            if (action.stats === "cfr") {
                                for (let i = rlen-1; i >= 0;i--) {
                                    let dt = stateobj[i].date.toString().substring(0,4).toString()+"-"+stateobj[i].date.toString().substring(4,6).toString()+
                                    "-"+stateobj[i].date.toString().substring(6).toString();
                                    let cfr = (stateobj[i].death/stateobj[i].positive)*100;
                                    tableData = [...tableData,{x: dt,
                                    y: (cfr === undefined || isNaN(cfr)) ? null : cfr}];
                                }
    
                            } else if (action.stats === "positivityRate") {
                                for (let i = rlen-1; i >= 0;i--) {
                                    let dt = stateobj[i].date.toString().substring(0,4).toString()+"-"+stateobj[i].date.toString().substring(4,6).toString()+
                                    "-"+stateobj[i].date.toString().substring(6).toString();
                                    let pr = (stateobj[i].positive/stateobj[i].totalTestResults)*100;
                                    
                                    tableData = [...tableData,{x: dt,
                                    y: (pr === undefined) || (isNaN(pr)) ? null : pr}];
                                }
                            } else if (action.stats === "positivityRateDaily") {
                                for (let i = rlen-1; i >= 0;i--) {
                                    let dt = stateobj[i].date.toString().substring(0,4).toString()+"-"+stateobj[i].date.toString().substring(4,6).toString()+
                                    "-"+stateobj[i].date.toString().substring(6).toString();
                                    let prdaily = (stateobj[i].positiveIncrease/stateobj[i].totalTestResultsIncrease)*100;
                                    
                                    tableData = [...tableData,{x: dt,
                                    y: (prdaily === undefined) || (isNaN(prdaily)) ? null : prdaily}];
                                }
                            }
                            else {
                                for (let i = rlen-1; i >= 0;i--) {
                                    let dt = stateobj[i].date.toString().substring(0,4).toString()+"-"+stateobj[i].date.toString().substring(4,6).toString()+
                                    "-"+stateobj[i].date.toString().substring(6).toString();
                                    tableData = [...tableData,{x: dt,
                                    y: (stateobj[i][action.stats] === undefined || isNaN(stateobj[i][action.stats])) ? null : stateobj[i][action.stats]/pop}];
                                }
                            }
                            
                            chartData = [...chartData,{id: action.yaxis[j].value, data: tableData}];
                        }
                        
                    }
                }
            } else {
                if (action.yaxis) {
                    for(let j = 0; j < action.yaxis.length;++j) {
                        if (action.yaxis[j].key === "US") {
                            chartData = [];
                            tableData = [];
                            let stateobj = BaselineData.filter(e => e.value === action.baseline);
                            console.log(stateobj);

                            console.log(stateobj[0].type);
                            console.log(stateobj[0].number);

                            console.log(state.usdata);

                            let state2 = state.usdata.filter(e => (e[stateobj[0].type] >= 1000));
                            
                            rlen = state2.length;

                            console.log(state2);
                
                            for (let i = 0; i < rlen;++i) {
                                tableData = [...tableData,{x: i, y: state2[i][stateobj[0].type] === undefined ? null : state2[i][stateobj[0].type]}];
                            }
                            chartData = [...chartData,{id: action.yaxis[j].value, data: tableData}];
                        } else {

                            let stateobjfirst = state.stdata.filter(e => e.state===action.yaxis[j].key);

                            let stateobj = BaselineData.filter(e => e.value === action.baseline);

                            let state2 = stateobjfirst.filter(e => e[stateobj[0].type] >= e[stateobj[0].number]);
                            
                            rlen = state2.length;
                            
                            tableData = [];
                            if (action.stats === "cfr") {
                                for (let i = rlen-1; i >= 0;i--) {
                                    let cfr = (state2[i].death/state2[i].positive)*100;
                                    tableData = [...tableData,{x: rlen-1-i,
                                    y: (cfr === undefined || isNaN(cfr)) ? null : cfr}];
                                }
    
                            } else if (action.stats === "positivityRate") {
                                for (let i = rlen-1; i >= 0;i--) {
                                    let pr = (state2[i].positive/state2[i].totalTestResults)*100;
                                    tableData = [...tableData,{x: rlen-1-i,
                                    y: (pr === undefined || isNaN(pr)) ? null : pr}];
                                }
    
                            } else if (action.stats === "positivityRateDaily") {
                                for (let i = rlen-1; i >= 0;i--) {
                                    let prdaily = (state2[i].positiveIncrease/state2[i].totalTestResultsIncrease)*100;
                                    tableData = [...tableData,{x: rlen-1-i,
                                    y: (prdaily === undefined || isNaN(prdaily)) ? null : prdaily}];
                                }
    
                            }
                            else {
                                for (let i = rlen-1; i >= 0;i--) {
                                    
                                    tableData = [...tableData,{x: rlen-1-i,
                                    y: (state2[i][stateobj.type] === undefined || isNaN(state2[i][stateobj.type])) ? null : state2[i][stateobj.type]}];
                                }
                            }
                            
                            chartData = [...chartData,{id: action.yaxis[j].value, data: tableData}];
                        }
                        
                    }
                }

            }

            return {
                ...state,comparedata: chartData
            }

        default : {
            return state;
        }
    }
};

export default reducer;