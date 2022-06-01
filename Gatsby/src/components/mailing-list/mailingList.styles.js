import styled from "styled-components";

const MailingListWrapper = styled.section`
  padding: 2rem 0 6.625rem 0 !important;

  .mail-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    button {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 16px 64px;
      width: 264px;
      font-size: 1.5rem !important;
      font-weight: bold !important;
    }

    .mail-row {
      display: flex;
      gap: 3rem;
    }
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
`;

export default MailingListWrapper;
