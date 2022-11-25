import React, {useEffect, useState} from "react";
import DefaultNft from "../components/NFTs/DefaultNft";
import FirstNFT from "../components/NFTs/FirstNFT"
import BusinessNFT from "../components/NFTs/BusinessNFT"
import { romaDummy, osakaDummy, sydneyDummy, newYorkDummy, parisDummy } from "../components/MarketPlace_components/MarketplaceDummy";
import axios from "axios";
const P2PMarket = () => {
  

  const arr = Array.from(Array(5));
  const [bg, setBg] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    
    setBg(romaDummy.nftImg);
    setCity(romaDummy.city);
  }, [])

  return (
    <div className="marketplacep2p">
      <main className="marketplacep2p_main">
        <div className="marketplacep2p_container">
          <div className="marketplacep2p_section1">
            <div className="marketplacep2p_section1_img">
              <span>𝙐𝙣𝙡𝙚𝙖𝙨𝙝</span>
            </div>
          </div>
          <div className="marketplacep2p_info">
            <span>We believe,</span> 
            <span>there's a chance to unleash our identity with DID.</span>
            <span>This market is the result what we believe.</span>
            <span>Enjoy.</span>
          </div>
          {/* advanced */}
{/*           <div className="marketplacep2p_theme">
            <div><button></button></div>
            <div><button>Asia</button></div>
            <div><button></button></div>
            <div><button></button></div>
            <div><button></button></div>
          </div> */}
          <div className="marketplacep2p_nfts">
          {arr.map((item, idx) => <DefaultNft locate="/p2pdetailpage" bs="buy" bg={bg} city={city}/>)}
          {arr.map((item, idx) => <DefaultNft locate="/p2pdetailpage" bs="buy" bg={bg} city={city}/>)}
          {arr.map((item, idx) => <DefaultNft locate="/p2pdetailpage" bs="buy" bg={bg} city={city}/>)}
          </div>
        </div>
      </main>
    </div>

  );
};

export default P2PMarket;
