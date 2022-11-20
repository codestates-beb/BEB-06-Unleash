import React, {useState} from "react";
import DefaultNft from "../NFTs/DefaultNft";
import BusinessNFT from "../NFTs/BusinessNFT";
import FirstNFT from "../NFTs/FirstNFT";
import MarketPlaceAside from "./MarketPlaceAside"

const MarketPlaceContents = () => {
  const arr = Array.from(Array(30));

  const [click, setClick] = useState([true, false]);
  const handleButtonClickp2p = () => {
    setClick([false, true]);
  }
  const handleButtonClickb2c = () => {
    setClick([true, false]);
  }

  return (
    <>
    <div className="marketplace_contents_container">
      <div className="marketplace_contents_dividing">
        <div className="marketplace_contents_b2c" onClick={handleButtonClickb2c}>
          <button className={click[0] ? "marketplace_b2c_button_click" : 'marketplace_button_default'}>b2c</button>
        </div>
        <div className="marketplace_contents_p2p" onClick={handleButtonClickp2p}>
          <button className={click[1] ? "marketplace_b2c_button_click" : 'marketplace_button_default'}>p2p</button>
        </div>
      </div>
      <div className="marketplace_contents">
        <MarketPlaceAside />
        <div className="marketplace_contents_nfts">
          <FirstNFT/>
          <FirstNFT/>
          <FirstNFT/>
          <FirstNFT/>
          <BusinessNFT />
          <BusinessNFT />
          <BusinessNFT />
          {arr.map((item, idx) => {return <DefaultNft key={idx} />})}
        </div>
      </div>
    </div>
      
    </>
  );
};

export default MarketPlaceContents;
