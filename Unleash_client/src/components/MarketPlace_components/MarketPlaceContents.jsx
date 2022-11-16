import React from "react";
import MarketPlaceNft from "./MarketPlaceNft";
const MarketPlaceContents = () => {

  return (
    <>
    <div className="marketplace_contents_container">
      <div className="marketplace_contents_dividing">
        <div className="marketplace_contents_b2c">
          <button>b2c</button>
        </div>
        <div className="marketplace_contents_p2p">
          <button>p2p</button>
        </div>
      </div>
      <div className="marketplace_contents">
        <aside className="marketplace_contents_aside">11</aside>
        <div className="marketplace_contents_nfts">
          {Array.from(Array(30), x => <MarketPlaceNft />)}
        </div>
      </div>
    </div>
      
    </>
  );
};

export default MarketPlaceContents;
