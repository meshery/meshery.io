import styled from "styled-components";

const FooterWrapper = styled.section`
  padding: 3.1rem 0 3.1rem 0;
  background: #222;
  .container {
    display: flex;
    margin: auto;
    width: 60%;
  }
  .footer-links {
    width: 100%;
    margin: 1rem;
    padding: 0;

    li {
      list-style: none;
      margin: 0.75rem 0.75rem 0.75rem 0.125rem;

      a {
        &:hover {
          text-decoration: none;
          color: white;
        }
        img {
          margin-right: 10px;
          transition: fill 0.2s ease;
          vertical-align: middle;
          position: relative;
          top: -2px;
          width: 22px;
          height: 22px;
          filter: invert(0.75) grayscale(1);
        }
        &:hover {
          img {
            filter: invert(0);
          }
        }
      }
    }
  }
  .socials {
    flex: 0 0 15%;
  }
  @media screen and (max-width: 1400px) {
    .community,
    .getting-started,
    .resources,
    .socials {
      flex: 0 0 22%;
    }
  }
  @media screen and (max-width: 992px) {
    .container {
      flex-wrap: wrap;
      width: 75%;
    }
    .community,
    .getting-started,
    .resources,
    .socials {
      flex: 0 0 30%;
      margin: 1rem 1rem 1rem 5rem;
    }
  }
  @media screen and (max-width: 650px) {
    .container {
      flex-wrap: wrap;
      width: 90%;
    }
    .community,
    .getting-started,
    .resources,
    .socials {
      flex: 0 0 30%;
      margin: 1rem 1rem 1rem 4rem;
    }
  }
  @media screen and (max-width: 450px) {
    .container {
      flex-wrap: wrap;
      width: 90%;
    }
    .community,
    .getting-started,
    .resources,
    .socials {
      flex: 0 0 100%;
      margin: 1rem 0;
      text-align: center;
    }
  }
  .copyright {
    font-size: 0.9rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #3c494f;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    @media (max-width: 1000px) {
      flex-direction: column;
      text-align: center;
      .text {
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  }

  .layer5-footer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    img {
      width: 120px;
      height: 30px;
    }
  }

  &,
  a {
    color: #999;
  }
  a {
    text-decoration: none;
    &:hover {
      color: #fff;
    }
  }
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.8);
    .title-link {
      transition: 0.2s all;
      color: rgba(255, 255, 255, 0.75);
      &:hover {
        color: #fff;
      }
    }
  }
  .section-categories {
    padding: 0;
    list-style: none;
    margin: 0;
    font-size: 0.9rem;
    .category-link {
      color: rgba(255, 255, 255, 0.5);
      transition: 0.2s all;
    }
  }
`;

export default FooterWrapper;
