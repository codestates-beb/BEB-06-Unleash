import React from "react";
import FirstNFT from "../NFTs/FirstNFT"

const DetailDesc = () => {
  return (
    <div className="detailpage_container_nft">
      <div className="detailpage_container_nft_container">
        <div className="detailpage_nft_top1" />
        <FirstNFT/>
      </div>
      <div className="detailpage_nft_desc">
        <div className="detail_top" />
        <span>description</span>
        <ul className="detailpage_nft_desc_list">
          <li><span>class</span></li>
          <li><span>from</span></li>
          <li><span>to</span></li>
          <li><span>departure</span></li>
          <li><span>arrival</span></li>
        </ul>
      </div>
    </div>
  );
};

export default DetailDesc;
