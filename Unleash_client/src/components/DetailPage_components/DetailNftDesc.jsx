import React from "react";
import FirstNFT from "../NFTs/FirstNFT"
import BusinessNFT from "../NFTs/BusinessNFT"
import DefaultNFT from "../NFTs/DefaultNft"

const DetailDesc = (props) => {

  // context에서 받아온거.
  return (
    <div className="detailpage_container_nft">
      <div className="detailpage_container_nft_container">
        <div className="detailpage_nft_top1">
          <p>NFT</p>
        </div>
        <DefaultNFT/>
      </div>
      <div className="detailpage_nft_desc">
        <div className="detail_top">
          <span>description</span>
        </div>
        
        <ul className="detailpage_nft_desc_list">
          <li><span>class : economy</span></li>
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
