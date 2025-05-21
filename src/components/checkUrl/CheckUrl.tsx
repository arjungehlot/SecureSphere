import React from "react";
import Layout from "../layout/Layout";
import LinkEmailAnalyzer from "../LinkEmailAnalyzer";

const CheckUrl = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-[#030712]">
        <LinkEmailAnalyzer />
      </div>
    </Layout>
  );
};

export default CheckUrl;
