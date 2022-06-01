import styled from "styled-components";

const ComingSoonWrapper = styled.section`
  .card-overlay {
    position: relative;
    width: 261px;
    padding: 20px;
    border-radius: 15px;
    border: 0;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 2px 2px 6px 0px #00d3a9;
    margin-bottom: 20px;
    height: 335px;
    margin-right: 0;
    border-radius: 15px;
    border: 0;
    transition: 0.4s ease-out;
    box-shadow: 2px 2px 6px 0px #00d3a9;
    margin-bottom: 20px;
    flex-direction: row-reverse;

    .overlay-text {
      position: absolute;
      top: 40%;
      left: 50%;
      color: white;
      font-size: 19px;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      z-index: 2;
      white-space: nowrap;
    }
    .pattern-name {
      color: #333;
      font-weight: 1400;
      font-style: bold;
      white-space: nowrap;
      text-align: center;
    }
    .pattern-image-overlay {
      opacity: 0.5;
      margin: 0;
    }
    .pattern-id-overlay {
      position: absolute;
      bottom: 0;
      right: 0;
      padding-top: 10px;
      margin-right: 14px;

      .smp-overlay {
        width: 25px;
        bottom: 0;
        right: 0;
        opacity: 0.7;
        vertical-align: middle;
        padding-right: 2px;
        margin-bottom: 0;
      }
    }
  }
`;

export default ComingSoonWrapper;
