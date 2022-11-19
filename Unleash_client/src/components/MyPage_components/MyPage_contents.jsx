import React from "react";
import MarketPlaceNft from "../NFTs/DefaultNft";
import FirstNFT from "../NFTs/FirstNFT";
import BusinessNFT from "../NFTs/BusinessNFT";

const MyPageContents = () => {
  const arr = Array.from(Array(20));
  return (
    <div className="mypage_contents">
      <div className="mypage_contents_category">
        <span>owned</span>
        <span>selling</span>
        <span>used</span>
        <span>selled</span>
      </div>
      <div className="mypage_contents_nfts">
        <FirstNFT />
        <FirstNFT />
        <FirstNFT />
        <FirstNFT />
        <BusinessNFT />
        <BusinessNFT />
        <BusinessNFT />
        <BusinessNFT />
        <BusinessNFT />
        <BusinessNFT />
          {arr.map((item, idx) => {return <MarketPlaceNft key={idx} />})}
        </div>
    </div>
  );
};

export default MyPageContents;
