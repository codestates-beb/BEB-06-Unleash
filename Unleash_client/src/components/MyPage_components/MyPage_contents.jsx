import React from "react";
import MarketPlaceNft from "../MarketPlace_components/MarketPlaceNft";

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
          {arr.map((item, idx) => {return <MarketPlaceNft key={idx} />})}
        </div>
    </div>
  );
};

export default MyPageContents;
