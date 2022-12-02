import React, {useState, useContext, useEffect, useCallback} from "react";
import {Link} from "react-router-dom";
import DefaultNft from "../NFTs/DefaultNft";
import BusinessNFT from "../NFTs/BusinessNFT";
import FirstNFT from "../NFTs/FirstNFT";
import MarketPlaceAside from "./MarketPlaceAside"
import MarketPlaceClass from "./MarketPlaceClass";
import { ListContext } from "../../resources/context_store/ListContext";
import { romaDummy, newYorkDummy, sydneyDummy, osakaDummy, parisDummy } from "./MarketplaceDummy";


const MarketPlaceContents = () => {
  const context = useContext(ListContext);
  const [destination, setDestination] = useState({});
  const list = JSON.parse(localStorage.getItem("marketList"));

  const filterList = useCallback(() => {
    if (list[0].to === "ITM") setDestination(osakaDummy); // 뒷정리함수.
    if (list[0].to === "JFK") setDestination(newYorkDummy);
    if (list[0].to === "CDG") setDestination(parisDummy);
    if (list[0].to === "SYD") setDestination(sydneyDummy);
    if (list[0].to === "FCO") setDestination(romaDummy);
  }, [list])

  useEffect(() => {
    filterList();
  }, [destination, context, list, filterList]);

  // nft 필터링
  const first = [...list].filter((item) => item.class === "퍼스트");
  const business = [...list].filter((item) => item.class === "비지니스");
  const economy = [...list].filter((item) => item.class === "이코노미");

  return (
    <>
    <div className="marketplace_contents_container">
      <div className="marketplace_contents_dividing">
        <div className="marketplace_contents_b2c" >
          <Link to="/marketplacep2p" >
            <button className='marketplace_button_default'>
              <span>Let's Go to P2P market</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="marketplace_contents">
        <MarketPlaceAside />
        <MarketPlaceClass />
        <div className="marketplace_contents_nfts">
        {first.map((item, idx) => {
          return (
          <FirstNFT 
            key={idx}
            bs="buy"
            locate="/nftdetailpage"
            bg={destination.nftImg}
            city={destination.city}
            price={item.nftvoucher.price}
            departure={item.departuretime}
            arrival={item.arrivaltime}
            left={item.nftvoucher.totalsupply}
            token_Id={item.token_id}
          />)
        })}
        {business.map((item, idx) => {
          return (
          <BusinessNFT
            key={idx}
            bs="buy"
            locate="/nftdetailpage"
            bg={destination.nftImg}
            city={destination.city}
            price={item.nftvoucher.price}
            departure={item.departuretime}
            arrival={item.arrivaltime}
            left={item.nftvoucher.totalsupply}
            token_Id={item.token_id}
          />)
        })}
        {economy.map((item, idx) => {
          return (
          <DefaultNft
            key={idx}
            bs="buy"
            locate="/nftdetailpage"
            bg={destination.nftImg}
            city={destination.city}
            price={item.nftvoucher.price}
            departure={item.departuretime}
            arrival={item.arrivaltime}
            left={item.nftvoucher.totalsupply}
            token_Id={item.token_id}
            />)
        })}
        </div>
      </div>
    </div>
      
    </>
  );
};

export default MarketPlaceContents;
