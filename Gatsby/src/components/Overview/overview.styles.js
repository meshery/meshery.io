import styled from "styled-components";

const OverviewWrapper = styled.section`
  padding: 3rem;
  color: #fff;
  align-items: center;
  background-color: #222;

  .container {
    max-width: 80%;
    margin: 0 auto;
    h1 {
      text-align: center;
      font-size: 5rem;
    }

    .google-slides {
      position: relative;
      padding-bottom: 59%;
      overflow: hidden;
      align-items: center;
      text-align: center;

      iframe {
        border: 0;
        position: absolute;
        top: 0;
        left: 0;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default OverviewWrapper;
