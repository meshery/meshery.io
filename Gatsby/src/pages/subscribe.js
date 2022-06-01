import React from "react";
import Layout from "../Layout/layout";
import Subscribe from "../components/subscribe";
import Forum from "../components/forum";

const MailingListPage = () => {
  return (
    <Layout>
      <div style={{ margin: "5rem 15rem" }}>
        <Subscribe />
      </div>
      <Forum />
    </Layout>
  );
};

export default MailingListPage;
