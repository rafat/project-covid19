import React from 'react';
import OverviewBar from '../components/elements/OverviewBar';
import {StyledAbout} from '../components/styles/StyledAbout';

const About = () => {
    const title = 'UNITED STATES';

    return (
        <>
        <OverviewBar title={title} />
        <StyledAbout >
            <div className="about-content">
            <p>Data Visualization and Forecasting Models for the COVID19 Data obtained from The Covid Tracking Project</p>
            <p>Repository at <a href="https://github.com/rafat/project-covid19">https://github.com/rafat/project-covid19</a></p>
            <p>The project uses Data API of The Covid Tracking Project <a href="https://covidtracking.com/api">https://covidtracking.com/api</a></p>
            </div>
            
        </StyledAbout>
        </>
        
    )
}

export default About;