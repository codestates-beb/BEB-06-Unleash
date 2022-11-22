import React from "react";
import DetailDesc from "../components/DetailPage_components/DetailNftDesc";
import DetailInfo from "../components/DetailPage_components/DetailInfo";

const NftDetailPage = () => {
  return (
    <main className="detail_main">
      {/* 헤더헤더 */}
        <div className="detailpage_container">
          <DetailDesc />
          <DetailInfo />
        </div>
    </main>
  );
};

export default NftDetailPage;
