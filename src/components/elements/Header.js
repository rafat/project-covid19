import React from 'react';
import { StyledHeader } from '../styles/StyledHeader';
import {Link} from '@reach/router';


const Header = () => {
    return (
        <StyledHeader>
            <Link to="/"><h3>PROJECT COVID19</h3> </Link>
            <div className="header-right">
            <Link to="/compare"><h3>COMPARE STATS</h3></Link>
            <Link to="/about"><h3>ABOUT</h3></Link>
            </div>
              
        </StyledHeader>
    )
    
};

export default Header;