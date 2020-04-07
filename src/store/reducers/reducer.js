import * as actionTypes from '../actions/actions';
import {StateKeys} from '../../data/StateKeys';

const initialState = {
    usovdata: {},
    usdata: [],
    stovdata: [],
    stdata: [],
    chartdata: [],
    tabledata: [],
    statechartdata: [],
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
                data = [...data,{"date" : dt,"positive": action.usdata[i].positive, "hospitalized": action.usdata[i].hospitalized,
                                "death": action.usdata[i].death,"total": action.usdata[i].totalTestResults,"deathIncrease":action.usdata[i].deathIncrease,
                                "hospitalizedIncrease":action.usdata[i].hospitalizedIncrease,"positiveIncrease":action.usdata[i].positiveIncrease,
                                "totalIncrease":action.usdata[i].totalTestResultsIncrease,"hospitalizedCumulative": action.usdata[i].hospitalizedCumulative,
                                "hospitalizedCurrently": action.usdata[i].hospitalizedCurrently,"inIcuCumulative": action.usdata[i].inIcuCumulative,
                                "inIcuCurrently": action.usdata[i].inIcuCurrently,"cfr": cfr
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


        case actionTypes.GET_STATES_TABLE_DATA:
            let stateobj = state.stdata.filter(e => e.state===action.stateId);
            data = [];
            tableData=[];
            chartData = [];
            rlen = stateobj.length;
            
            for(let i = rlen -1; i >= 0; i--) {
                let dt = stateobj[i].date.toString().substring(0,4).toString()+"-"+stateobj[i].date.toString().substring(4,6).toString()+
            "-"+stateobj[i].date.toString().substring(6).toString();
                let cfr = (stateobj[i].death/stateobj[i].positive)*100;
                data = [...data,{"date" : dt,"positive": stateobj[i].positive, "hospitalized": stateobj[i].hospitalized,
                                "death": stateobj[i].death,"total": stateobj[i].totalTestResults,"deathIncrease":stateobj[i].deathIncrease,
                                "hospitalizedIncrease":stateobj[i].hospitalizedIncrease,"positiveIncrease":stateobj[i].positiveIncrease,
                                "totalIncrease":stateobj[i].totalTestResultsIncrease,"hospitalizedCumulative": stateobj[i].hospitalizedCumulative,
                                "hospitalizedCurrently": stateobj[i].hospitalizedCurrently,"inIcuCumulative": stateobj[i].inIcuCumulative,
                                "inIcuCurrently": stateobj[i].inIcuCurrently,"cfr": cfr
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

        default : {
            return state;
        }
    }
};

export default reducer;