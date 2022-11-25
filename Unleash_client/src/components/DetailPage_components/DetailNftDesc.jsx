import React, {useState, useEffect} from "react";
import FirstNFT from "../NFTs/FirstNFT"
import BusinessNFT from "../NFTs/BusinessNFT"
import DefaultNFT from "../NFTs/DefaultNft"
import { romaDummy } from "../MarketPlace_components/MarketplaceDummy";

const DetailDesc = (props) => {
  const [bg, setBg] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    setBg(romaDummy.nftImg);
    setCity(romaDummy.city);
  }, [])

  // context에서 받아온거.
  return (
    <div className="detailpage_container_nft">
      <div className="detailpage_container_nft_container">
        <div className="detailpage_nft_top1">
          <span>NFT</span>
        </div>
        <DefaultNFT bg={bg} city={city}/>
      </div>
      <div className="detailpage_nft_desc">
        <div className="detail_top">
          <span>Description</span>
        </div>
        <ul className="detailpage_nft_desc_list">
          <li><span>class : economy</span></li>
          <li><span>from : ICN</span></li>
          <li><span>to : CDG</span></li>
          <li><span>departure : time</span></li>
          <li><span>arrival : time</span></li>
        </ul>
      </div>
    </div>
  );
};

export default DetailDesc;
