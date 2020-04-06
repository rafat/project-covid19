import React from 'react';
import { StyledHeader } from '../styles/StyledHeader';
import {Link} from '@reach/router';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';


const Header = () => {
    return (
        <StyledHeader>
            <Link to="/"><FontAwesomeIcon icon={faHome} name="home" className="fa-home" /></Link>
            
            <h3>PROJECT COVID19</h3>    
        </StyledHeader>
    )
    
};

export default Header;