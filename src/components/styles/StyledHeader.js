import styled from 'styled-components';

export const StyledHeader = styled.div`
  background: #00a8e6;

  width: 100%;
  height: 40px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 90;

  h3 {
    
    font-family: 'Rubik', sans-serif;
    font-size: 15px;
    text-align: center;

  }

  @media screen and (max-width: 500px) {
    max-width: 1280px;
    min-height: 0px;
  }
`;

