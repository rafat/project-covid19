import React from 'react';
import OverviewBar from './elements/OverviewBar';

import MultiChartsContainer from './elements/MultiChartsContainer';

const Compare = () => {
    const title = 'UNITED STATES';

    return (
        <>
            <OverviewBar title={title} />
            
            <MultiChartsContainer />
        </>
    );
};

export default Compare;