import styled from 'styled-components';

export const StyledButton = styled.button`
  background: #00a8e6;
  width: 150px;
  height: 30px;
  color: #000;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 10px;
  font-family: 'Rubik', sans-serif;
  font-size: 15px;
  display: block;
  margin: 10px auto;
  padding: 0 10px;
  outline: none;

  :hover {
    opacity: 0.8;
  }
`;