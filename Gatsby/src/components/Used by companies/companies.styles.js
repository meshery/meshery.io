import styled from "styled-components";

const CompaniesWrapper = styled.section`
  .created-by-section {
    max-width: 1140px;
    margin: auto;
    padding: 0 0 20px 0;

    .created-by {
      color: dimgray;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      margin-bottom: 30px;
      text-align: center;
    }

    .company-image {
      // filter: grayscale(70%);
      max-width: 350px;
      margin: auto;
      padding: 20px 0px 50px 0px;
      transition: 0.5s ease-in-out all;

      &:hover {
        filter: none;
      }
    }

    img {
      padding-bottom: 10px;
    }
  }

  .used-by-section {
    max-width: 1140px;
    margin: auto;
    padding: 0 0 20px 0;

    .used-by {
      text-align: center;
      margin-bottom: 20px;
      font-weight: 600;
      color: dimgray;
      text-decoration: none;
      text-transform: uppercase;
    }

    .companies-image {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-evenly;
      align-items: center;
      margin: auto;
    }

    .company-image {
      filter: grayscale(75%);
      transition: 0.5s ease-in-out all;
      padding: 0px 30px 0px 30px;

      &:hover {
        filter: none;
      }
    }

    img {
      padding-bottom: 30px;
      width: 250px;
    }
  }

  .adopter-section {
    max-width: 1140px;
    margin: auto;
    padding: 0 0 20px 0;
    text-align: center;

    h3 {
      font-size: 1.5em;
      font-weight: 500;
      margin: 0 0 10px 0;
    }

    .adopter-descption {
      margin-top: 0px;
      margin-bottom: 30px;
      font-size: 0.9em;
      text-align: center;
      max-width: inherit;
    }

    button {
      font-size: medium;
      margin-bottom: 50px;
      color: #fff;
      text-decoration: none;
      padding: 10px 30px;
      background: #3c494f;
      border-radius: 3px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      transition: 0.2s ease-in-out;
      cursor: pointer;
    }
  }
`;

export default CompaniesWrapper;
