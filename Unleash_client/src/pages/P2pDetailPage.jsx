import React, {useState, useEffect} from "react";
import DefaultNft from "../components/NFTs/DefaultNft";
//import FirstNFT from "../components/NFTs/FirstNFT";
//import BusinessNFT from "../components/NFTs/BusinessNFT";
import { romaDummy, osakaDummy, sydneyDummy, newYorkDummy, parisDummy } from "../components/MarketPlace_components/MarketplaceDummy";

const P2pDetailPage = () => {
  // 해야할것, nft 종류별로 들어오게.
  // token정보 불러오기. dummy랑 합치기.

  const [bg, setBg] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    setBg(romaDummy.nftImg);
    setCity(romaDummy.city);
  }, [])


  return (
    <main className="detailp2p_main">
      <div className="detailp2ppage_container">
        <div className="detailp2ppage_container_nft">
          <div className="detailp2ppage_container_nft_container">
            <div className="detailp2ppage_nft_top1">
              <span>NFT</span>
            </div>
            <DefaultNft bg={bg} city={city}/>
          </div>
          <div className="detailp2ppage_nft_desc">
            <div className="detailp2p_top">
              <span>Description</span>
            </div>
            <ul className="detailp2ppage_nft_desc_list">
              <li><span>class : economy</span></li>
              <li><span>from : ICN</span></li>
              <li><span>to : CDG</span></li>
              <li><span>departure : time</span></li>
              <li><span>arrival : time</span></li>
            </ul>
          </div>
        </div>
        <div className="detailp2ppage_container_info">
          <div className="detailp2ppage_personal_info">
            <span>Osaka TokenID</span>
            <span>owned by address</span>
            <button>Buy</button>
          </div>
          <div className="detailp2ppage_price">
            <div className="detailp2p_top" >
              <span>Price</span>
            </div>
            <div className="detailp2ppage_price_eth">
              <span>110ETH</span>
            </div>
          </div>
          {/* history부분 */}
          <div className="detailp2ppage_history">
            <div className="detailp2p_top" >
              <span>NFT History</span>
            </div>
            <div className="detailp2ppage_price_history">
              <span>History</span>
            </div>
          </div>
          <div className="detailp2ppage_history">
            <div className="detailp2p_top" >
              <span>Price History</span>
            </div>
            <div className="detailp2ppage_price_history">
              <span>Price History</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default P2pDetailPage;
