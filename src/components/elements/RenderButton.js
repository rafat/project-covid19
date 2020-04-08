import React from 'react';
import {StyledButton} from '../styles/StyledButton';

const RenderButton = ({callback}) => {
    return (
        <StyledButton type="button" onClick={callback}>
            REFRESH
        </StyledButton>
    );
};

export default RenderButton;