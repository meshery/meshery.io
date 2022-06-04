import styled from "styled-components";

const AdapterTableWrapper = styled.section`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  max-width: 1140px;
  margin: 0 auto;

  .empty{
    padding: 0.5rem 0;
    margin-left: -0.5rem;
  }

  .adapter-logo {
    margin: 10px 5px 10px 0;
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  table.adapters {
    box-shadow: 1px 1px 2px grey;
    border: 1px;

    td {
      width: auto;
      vertical-align: middle;
      border: 1px dashed #cccccc;
      border-right-width: 0px;
      border-left-width: 0px;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      a {
        text-decoration: none;
        color: #00a4ca;
      }
    }

    td:hover {
      background: #eeeeee;
    }

    td.no-adapters {
      width: auto;
      text-align: center;
      color: #aaa;
      font-style: italic;
      border: 0px;
    }

    td.alpha-adapters {
      width: auto;
      background-color: lightgray;
      text-align: center;
      border: 0px;
    }

    td.beta-adapters {
      width: auto;
      background-color: #00d3a9;
      text-align: center;
      color: #fff;
      border: 0px;
    }

    td.stable-adapters {
      width: auto;
      background-color: #3c494f;
      text-align: center;
      color: #fff;
      border: 0px;
    }

    tr:hover {
      background-color: #f5f5f5;
    }
  }
`;

export default AdapterTableWrapper;
