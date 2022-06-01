import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.bottom-cta {
    background: linear-gradient(
      to bottom,
      $brand-color 0%,
      $middle-gradient-color 100%
    );
    color: #fff;
    text-align: center;
    margin: 0 auto;
    padding: 100px 0;
    vertical-align: top;
  
    h2 {
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }
  
  #button-scroll-to-up {
    display: inline-block;
    background-color: #3c494f;;
    width: 55.5px;
    height: 55.5px;
    text-align: center;
    border-radius: 50%;
    position: fixed;
    bottom:-60px;
    right: 30px;
    z-index: 1;
    cursor: pointer;
    transition: bottom 0.2s;
  }
  #button-scroll-to-up::after {
    border-style: solid;
      border-width: 0.25em 0.25em 0 0;
      content: '';
      display: inline-block;
      height: 0.7em;
      position: relative;
    top: 1.4em;
      transform: rotate(-45deg);
      vertical-align: center;
      width: 0.7em;
    color: #fff;
  }
  #button-scroll-to-up.show {
    bottom: 20px;
  }
  
  .testimonial {
    background: #f5f5f5;
    margin: 0;
    padding: 100px 0;
  
    .testimonial-block {
      max-width: 750px;
      width: 98%;
      margin: 0 auto;
  
      @media #{$mid-point} {
        @include flexbox;
  
        blockquote {
          -webkit-flex: 1;
          flex: 1;
        }
      }
    }
  }
  
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
  
    .adopter-title {
      font-size: 1.5em;
      font-weight: 500;
      margin: 0 0 10px 0;
    }
  
    .adopter-description {
      margin-top: 0px;
      margin-bottom: 30px;
      font-size: 0.9em;
    }
  
    .adopter-button {
      font-size: medium;
      margin-bottom: 50px;
    }
  }
  
  .hero {
    color: #ffffff;
    text-align: center;
    background: linear-gradient(
        to bottom,
        $middle-gradient-color 0%,
        $secondary-brand-color 100%
      )
      no-repeat #a05fb7;
    padding-top: 75px;
  
    p {
      color: #fff;
    }
  }
  
  .bg-white {
    background-color: #fff;
    color: #000;
    padding: 2rem 0;
  }
  
  .cncf-section {
    text-align: center;
  
    .layer5-caption {
      display: inline;
      align-items: inherit;
      justify-content: center;
      margin: auto;
      font-size: 1.1rem;
      color: #000;
  
      img {
        width: 110px;
        height: 25px;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        margin-bottom: -4.5px;
      }
    }
  
    h4 {
      font-size: 1rem;
      line-height: 1rem;
      margin-bottom: 1rem;
    }
  
    .cncf-img {
      max-width: 700px;
      margin-bottom: 1rem;
    }
  }
  
  .reversehero {
    color: #ffffff;
    display: flex;
    text-align: center;
    background: linear-gradient(
        to top,
        $middle-gradient-color 0%,
        $secondary-brand-color 100%
      )
      no-repeat #a05fb7;
    padding: 0px;
  
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 5vw;
      gap: 3rem;
    }
  
    .mailinglist {
      padding: 4rem 0 6.625rem 0 !important;
    }
  
    .mail-heading {
      font-family: "Open Sans";
      margin: 0rem auto 0.2rem auto;
      font-size: 2em !important;
    }
  
    .mail-subheading {
      margin: 0rem auto 2rem auto;
      font-size: 1.2rem;
    }
    p {
      color: #fff;
    }
  
    .button-alt {
      width: 232px;
    }
    .button-user {
      padding: 16px 93px !important;
    }
    .button-dev {
      padding: 16px 59.6px !important;
    }
    .button-maintain {
      padding: 16px 60px !important;
    }
    .button-comm{
      padding: 16px 56.6px !important;
    }
    .button-alt a {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 16px 50px;
      font-size: 1.5rem !important;
      font-weight: bold !important;
    }
  
    .button-alt a:hover {
      background: #fff;
      color: #3c494f;
      text-decoration: none;
    }
  
    .mail-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      padding-top: 10px;
    }
    .mail-row {
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      gap: 2rem;
      width: 100%;
      justify-content: space-evenly;
    }
    @media (max-width: 574px) {
      .mailinglist {
        height: auto;
      }
      .button-alt {
        width: 100%;
      }
      .mail-row {
        flex-direction: column;
        gap: 2rem !important;
      }
      .mail-container {
        gap: 2rem !important;
      }
    }
    @media (min-width: 1121px) and (max-width: 1194px) {
      .mail-container {
        gap: 1rem;
        padding-top: 0px;
      }
      .mail-row {
        gap: 1rem;
      }
    }
    @media (max-width: 1120px) {
      .mail-container {
        gap: 2rem;
        padding-top: 0px;
      }
      .mail-row {
        gap: 2rem;
      }
    }
    @media (min-width: 575px) and (max-width: 840px) {
      .mail-container {
        gap: 1rem!important;
        padding-top: 0px;
      }
      .mail-row {
        gap: 1rem;
      }
    }
  }
  
  .homepage-join {
    display: flex;
    flex-direction: column;
  
    & > div {
      padding: 4vh 3vw;
    }
  
    & > div:first-of-type {
      background: $brand-color;
      padding: 3rem 3rem 3.5rem!important;
      border-radius:10px;
    }
  }
  
  .google-slides {
    position: relative;
    padding-bottom: 59%;
    overflow: hidden;
    align-items: center;
    text-align: center;
  }
  
  .google-slides iframe {
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
  }
  
  .overview-section {
    padding-top: 10px;
    color: #fff;
    align-items: center;
    background-color: #222;
  }
  
  .getting-started {
    color: #ffffff;
    text-align: center;
    background-color: #666;
    // background: linear-gradient(to top, $menu-color -80%, $primary-brand-color 80%) no-repeat #a05fb7;
    padding-top: 50px;
  
    p {
      color: #fff;
    }
  }
  
  @media #{$desktop} {
    .flex {
      @include flexbox;
      align-items: center;
      flex-direction: row;
  
      .text,
      .image {
        -webkit-flex: 1;
        flex: 1;
        padding: 0 20px;
      }
    }
  
    .content section:nth-child(even) .flex {
      flex-direction: row-reverse;
    }
  }
  
  @media #{$mobile} {
    .created-by-section .company-image {
      width: auto;
      padding: 0px;
    }
  
    .used-by-section .companies-image {
      flex-direction: column;
  
    .used-by-section .companies-image {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 10px;
  
      img {
        padding-bottom: 30px;
        width: 100%;
      }
  
      #ericsson-logo {
        padding-left: 20px;
      }
    }
  }
  
  .serviceLandscapeContainer {
    padding: 4rem 0;
  }
  
  .programs-section {
    padding: 0rem 4rem;
    margin-top: 4rem;
    max-width: 1400px;
    margin: auto;
  }
  @media screen and (max-width: 840px) {
    .reversehero {
      & > div {
        flex-direction: column;
      }
    }
  }
  
  @media (max-width: 1150px) {
    .programs-section {
      padding: 0 0rem;
    }
  }
  }

`;

export default GlobalStyle;
