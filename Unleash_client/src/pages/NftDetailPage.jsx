import React from "react";
import DetailDesc from "../components/DetailPage_components/DetailNftDesc";
import DetailInfo from "../components/DetailPage_components/DetailInfo";

const NftDetailPage = () => {
  return (
    <div className="detail_main">
      {/* 헤더헤더 */}
      <div className="detailpage">
        <div className="detailpage_container">
          <DetailDesc />
          <DetailInfo />
        </div>
      </div>
    </div>
  );
};

export default NftDetailPage;
