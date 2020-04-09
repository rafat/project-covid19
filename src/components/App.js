import React,{useState} from 'react';
import {Router} from '@reach/router';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Header from './elements/Header';
import Spinner from './elements/Spinner';
import {API_OV_URL, API_DAILY_URL, API_STOV_URL, API_STATES_URL} from '../config';

import Home from './Home';
import State from './State';
import Compare from './Compare';
import About from './About';

import {GlobalStyle} from './styles/GlobalStyle';
import { useEffect } from 'react';

const App = () => {
    //const content = useSelector(state => state);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();

    const getData = () => {
        const rOV = axios.get(API_OV_URL);
        const rDAILY = axios.get(API_DAILY_URL);
        const rSTOV = axios.get(API_STOV_URL);
        const rSTATES = axios.get(API_STATES_URL);

        return dispatch => {
            axios.all([rOV,rDAILY,rSTOV,rSTATES])
            .then(
                axios.spread((...responses) => {
                    const resOV = responses[0];
                    const resDAILY = responses[1];
                    const resSTOV = responses[2];
                    const resSTATES = responses[3];

                    dispatch({type:'FETCH_OV_DATA',usovdata: resOV.data});
                    dispatch({type:'FETCH_US_DATA',usdata: resDAILY.data});
                    dispatch({type:'FETCH_STOV_DATA',stovdata: resSTOV.data});
                    dispatch({type:'FETCH_STATES_DATA',stdata: resSTATES.data});
                    console.log("Dispatched");
                    setLoading(false);
                })
            ).catch(errors => {
                console.log(errors);
            });
        }
    };

    useEffect(() => {
        dispatch(getData());
    },[]);

    if (loading) {
        return (
            <Spinner />
        );
    } else {
        return (
            <>
                <Header />
                <Router>
                    <Home path="/"/>
                    <State path="/:stateId" />
                    <Compare path="/compare" />
                    <About path="/about" />
                </Router>
                <GlobalStyle />
            </>
        )
    }

};

export default App;
