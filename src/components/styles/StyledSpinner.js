import styled from 'styled-components';

export const StyledSpinner = styled.div`
  border: 5px solid #1e1e1e; 
  border-top: 5px solid #00a8e6; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2.0s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
