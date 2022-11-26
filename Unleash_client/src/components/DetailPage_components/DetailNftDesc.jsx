import React, {useState, useEffect} from "react";
import FirstNFT from "../NFTs/FirstNFT"
import BusinessNFT from "../NFTs/BusinessNFT"
import DefaultNFT from "../NFTs/DefaultNft"
import { romaDummy, newYorkDummy, sydneyDummy, osakaDummy, parisDummy } from "../MarketPlace_components/MarketplaceDummy";

const DetailDesc = (props) => {
  const {nft} = props;
  const [destination, setDestination] = useState({});

  useEffect(() => {
    if (nft[0].to === "ITM") return setDestination(osakaDummy); // 뒷정리함수.
    if (nft[0].to === "JFK") return setDestination(newYorkDummy);
    if (nft[0].to === "CDG") return setDestination(parisDummy);
    if (nft[0].to === "SYD") return setDestination(sydneyDummy);
    if (nft[0].to === "FCO") return setDestination(romaDummy);
  }, [])
  


  // context에서 받아온거.
  return (
    <div className="detailpage_container_nft">
      <div className="detailpage_container_nft_container">
        <div className="detailpage_nft_top1">
          <span>NFT</span>
        </div>
        {nft[0].class == "퍼스트" && <FirstNFT
                    bg={destination.nftImg}
                    city={destination.city}
                    price={nft[0].nftvoucher.price}
                    departure={nft[0].departuretime}
                    arrival={nft[0].arrivaltime}
                    left={nft[0].nftvoucher.totalsupply}/>}
        {nft[0].class == "비지니스" && <BusinessNFT
                            bg={destination.nftImg}
                            city={destination.city}
                            price={nft[0].nftvoucher.price}
                            departure={nft[0].departuretime}
                            arrival={nft[0].arrivaltime}
                            left={nft[0].nftvoucher.totalsupply}/>}
        {nft[0].class == "이코노미" && <DefaultNFT
                            bg={destination.nftImg}
                            city={destination.city}
                            price={nft[0].nftvoucher.price}
                            departure={nft[0].departuretime}
                            arrival={nft[0].arrivaltime}
                            left={nft[0].nftvoucher.totalsupply}/>}
      </div>
      <div className="detailpage_nft_desc">
        <div className="detail_top">
          <span>Description</span>
        </div>
        <ul className="detailpage_nft_desc_list">
          <li><span>class : {nft[0].class}</span></li>
          <li><span>from : {nft[0].from}</span></li>
          <li><span>to : {nft[0].to}</span></li>
          <li><span>departure :<br/>{nft[0].departuretime}</span></li>
          <li><span>arrival :<br/>{nft[0].arrivaltime}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default DetailDesc;
