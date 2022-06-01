import styled from "styled-components";

const ProjectItemWrapper = styled.section`
  .callout {
    width: 100%;
    height: 100%;
    padding-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: none;

    h3 {
      color: #262626;
      font-size: 19px;
      line-height: 24px;
      font-weight: 800;
      margin-bottom: 4px;
      inline-size: 150px;
      overflow-wrap: break-word;
    }

    p {
      font-size: 17px;
      font-weight: 400;
      line-height: 20px;
      color: #666666;

      &.small {
        font-size: 14px;
      }
    }

    .go-corner {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      margin-top: 0.5rem;
      margin-right: 0.5rem;
      width: 31px;
      height: 31px;
      overflow: hidden;
      top: 0;
      right: 0;
      background-color: none;
      border-radius: 0 4px 0 3px;
      content: url("../../assets/images/meshery-logo-light.png");
    }

    .card {
      display: block;
      position: relative;
      max-width: 262px;
      background-color: #f5f5f5;
      border-radius: 4px;
      padding: 25px 24px;
      margin: 12px;
      text-decoration: none;
      z-index: 0;
      overflow: hidden;
      box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 10.3px 17.9px rgba(0, 0, 0, 0.072),
        0 20.8px 33.4px rgba(0, 0, 0, 0.086);

      &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: -27px;
        right: -27px;
        background: #00b39f;
        height: 32px;
        width: 32px;
        border-radius: 12px;
        transform: scale(1);
        transform-origin: 50% 50%;
        transition: transform 0.25s ease-out;
      }

      &:hover:before {
        transform: scale(5);
      }
    }

    .card:hover {
      //   p {
      //     transition: all 0.3s ease-out;
      //     color: rgba(255, 255, 255, 0.8);
      //   }

      //   h3 {
      //     transition: all 0.3s ease-out;
      //     color: #ffffff;
      //   }
      .go-corner {
        content: url("../images/logos/meshery-logo-white.png");
      }
    }
  }
`;

export default ProjectItemWrapper;
