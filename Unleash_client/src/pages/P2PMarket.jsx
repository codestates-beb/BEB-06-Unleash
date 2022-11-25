import React, {useEffect, useState} from "react";
import DefaultNft from "../components/NFTs/DefaultNft";
import { romaDummy, osakaDummy, sydneyDummy, newYorkDummy, parisDummy } from "../components/MarketPlace_components/MarketplaceDummy";

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
          <div>
            <span>Get your Ticket!</span>
          </div>
          <div className="marketplacep2p_nfts">
          {arr.map((item, idx) => <DefaultNft locate="/p2pdetailpage" bs="buy" bg={bg} city={city}/>)}
          </div>
        </div>
      </main>
    </div>

  );
};

export default P2PMarket;
