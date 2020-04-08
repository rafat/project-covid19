import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';


import OverviewBar from './elements/OverviewBar';

import MultiChartsContainer from './elements/MultiChartsContainer';

const Compare = () => {
    const title = 'UNITED STATES';
    const dispatch = useDispatch();
    const currentState = useSelector(state => state);

    console.log(currentState.usdata);

    useEffect(() => {
        dispatch({type:'GET_COMPARE_DEFAULT_DATA'});
    },[]);

    return (
        <>
            <OverviewBar title={title} />
            
            <MultiChartsContainer />
        </>
    );
};

export default Compare;