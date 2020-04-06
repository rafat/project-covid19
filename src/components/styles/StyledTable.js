import styled from 'styled-components';

export const StyledTable = styled.div`
  padding: 1rem;
  align-items: center;
  margin: auto;

  table {
    border-spacing: 0;
    margin: auto;
    border: 2px solid black;
    border-radius: 5px;
    width: 50%;
    align-items: center;
    font-family: 'Rubik', sans-serif;
    font-size: 12px;


    thead {
      background: #00a8e6;
      color: #000;
    }

    tbody {
      background: #fff;
      color: #000;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }
  }
`