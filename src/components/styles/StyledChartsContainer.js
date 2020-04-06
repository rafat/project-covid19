import styled from 'styled-components';

export const StyledChartsContainer = styled.div`

  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  height: 550px;

  .chart-content {
    display: flex;
    flex-flow: column;
    align-items: center;
    max-width: 1280px;
    height: 400px;
    margin: auto;
    padding: 10px 0;
  }

  .select-content {
    width: 50%;
    border: 2px #1c1c1c;
    color: primary75;
  }

  h3 {
    font-family: 'Rubik', sans-serif;
    font-size: 20px;
    text-align: center;
  }

  @media screen and (max-width: 500px) {
    max-width: 1280px;
    min-height: 300px;
  }
`;