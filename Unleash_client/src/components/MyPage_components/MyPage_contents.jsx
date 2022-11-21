import React from "react";
import DefaultNft from "../NFTs/DefaultNft";
import FirstNFT from "../NFTs/FirstNFT";
import BusinessNFT from "../NFTs/BusinessNFT";

const MyPageContents = () => {
  const arr = Array.from(Array(10));
  const arr2 = Array.from(Array(5));
  const arr3 = Array.from(Array(5));
  return (
    <div className="mypage_contents">
      <div className="mypage_contents_category">
        <span>owned</span>
        <span>selling</span>
        <span>used</span>
        <span>selled</span>
      </div>
      <div className="mypage_contents_nfts">
      {arr2.map((item, idx) => {return <FirstNFT key={idx} bs="sell" locate="/nftdetailpage"/>})}
      {arr3.map((item, idx) => {return <BusinessNFT key={idx} bs="sell" locate="/nftdetailpage"/>})}
      {arr.map((item, idx) => {return <DefaultNft key={idx} bs="sell" locate="/nftdetailpage"/>})}
        </div>
    </div>
  );
};

export default MyPageContents;
