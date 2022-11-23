import React, {useState} from "react";
import DefaultNft from "../NFTs/DefaultNft";
import BusinessNFT from "../NFTs/BusinessNFT";
import FirstNFT from "../NFTs/FirstNFT";
import MarketPlaceAside from "./MarketPlaceAside"

const MarketPlaceContents = () => {
  // nft 필터링하는 곳.
  const arr = Array.from(Array(10));
  const arr2 = Array.from(Array(5));
  const arr3 = Array.from(Array(5));


  return (
    <>
    <div className="marketplace_contents_container">
      <div className="marketplace_contents_dividing">
        <div className="marketplace_contents_b2c" >
          <a href="/p2pmarketplace">
            <button className='marketplace_button_default'>
              <span>Let's Go to P2P macket</span>
          </button>
          </a>
        </div>
      </div>

      <div className="marketplace_contents">
        <MarketPlaceAside />
        <div className="marketplace_contents_nfts">
        {arr2.map((item, idx) => {return <FirstNFT key={idx} bs="buy" locate="/nftdetailpage"/>})}
        {arr3.map((item, idx) => {return <BusinessNFT key={idx} bs="buy" locate="/nftdetailpage"/>})}
        {arr.map((item, idx) => {return <DefaultNft key={idx} bs="buy" locate="/nftdetailpage"/>})}
        </div>
      </div>
    </div>
      
    </>
  );
};

export default MarketPlaceContents;
