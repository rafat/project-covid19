import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {Link} from '@reach/router';
import OverviewBar from './elements/OverviewBar';
import ChartsContainer from './elements/ChartsContainer';
import Table from './elements/Table';


const Home = () => {
    const currentState = useSelector(state => state);

    const content = currentState.stovdata;
    const title = 'UNITED STATES';
    
    const columns = [{ 
        Header: 'State', 
        accessor: 'state',
        Cell: ({ row }) => <Link to={row.original.key}>{row.original.state}</Link>
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
    return (
        <>
            <OverviewBar title={title} />
            <ChartsContainer />
            <Table labels={columns} content={content} />
        </>
    );

    
};

export default Home;