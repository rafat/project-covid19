import React,{useState} from 'react';
import OverviewBar from './elements/OverviewBar';
import {useSelector,useDispatch} from 'react-redux';
import Spinner from '../components/elements/Spinner';
import ChartsContainer from './elements/ChartsContainer';
import Table from './elements/Table';
import {StateKeys} from '../data/StateKeys';

const State = ({stateId}) => {
    const tdata = useSelector(state => state.tabledata);
    const [tableData,setTabledata] = useState(false);
    const [title,setTitle]=  useState('');
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();

    
    if (!tableData && stateId) {
        dispatch({type:'GET_STATES_TABLE_DATA',stateId: stateId});
        setTabledata(true);
        setLoading(false);
        setTitle(StateKeys[stateId].toUpperCase());
    }

    if (loading) {
        return (
            <Spinner />
        );
    };

    const columns = [{ 
        Header: 'Date', 
        accessor: 'date',
        },{ 
        Header: 'Confirmed Cases', 
        accessor: 'positive' 
        },{
        Header: 'Deaths',
        accessor: 'death'
        },{
        Header:'Hospitalized',
        accessor:'hospitalized'
        },
        { 
        Header: 'Total Tests', 
        accessor: 'total' 
    }];

    if (loading === false && tableData) {
        return (
        
            <>
                    <OverviewBar stateId={stateId} title={title} />
                    <ChartsContainer stateId={stateId} />
                    <Table labels={columns} content={tdata} />
            </>
        )
    }

    
};

export default State;