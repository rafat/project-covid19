import styled from 'styled-components';

export const StyledOverviewBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  height: auto;
  background: #333333;
  padding: 10px;
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;

  .overviewbar-content {
    width: 100%;
    margin: 0 auto;
    color: #ffffff;
  }

  .overviewbar-content-col {
    float: left;
    width: 20.00%;
    box-sizing: border-box;
    padding: 10px 20px 0 0;
  }

  .overviewbar-info {
    float: left;
  }

  .overviewbar-title {
    float: left;
    color: #00a8e6;
  }

  @media screen and (max-width: 800px) {
    font-size: 10px;
  }
`;
