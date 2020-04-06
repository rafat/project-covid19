import React, {useState} from 'react';
import {StyledOverviewBar} from '../styles/StyledOverviewBar';
import {useSelector} from 'react-redux';
import Spinner from '../elements/Spinner';
import { useEffect } from 'react';


const OverviewBar = ({stateId,title}) => {
    const [loading,setLoading] = useState(true);
    let [overview,setOverview] = useState({});
    const currentState = useSelector(state => state);

    useEffect(() => {
        let ov = {};
        
        if (stateId) {
            ov = currentState.stovdata.find(x => x.key === stateId);
        } else {
            ov = currentState.usovdata;
        }
        
        setOverview(ov);
        
        setLoading(false);
    },[currentState,stateId]);;

    if (loading) {
        return (<Spinner />);
    }

    if (loading === false && !overview) {
        return (<h3>Oops Something went wrong.</h3>)
    }
    
    

    return (
        <StyledOverviewBar>
            <div className="overviewbar-content">
            <div className="overviewbar-content-col">
                    <span className="overviewbar-title">
                        {title}
                    </span>
                </div>
                <div className="overviewbar-content-col">
                    <span className="overviewbar-info">
                        CONFIRMED CASES : {overview.positive}
                    </span>
                </div>
                <div className="overviewbar-content-col">
                    <span className="overviewbar-info">
                        DEATHS : {overview.death}
                    </span>
                </div>
                <div className="overviewbar-content-col">
                    <span className="overviewbar-info">
                        HOSPITALIZED : {overview.hospitalized}
                    </span>
                </div>
                <div className="overviewbar-content-col">
                    <span className="overviewbar-info">
                        TOTAL TESTS : {overview.total}
                    </span>
                </div>
            </div>
        </StyledOverviewBar>
    )
};

export default OverviewBar;