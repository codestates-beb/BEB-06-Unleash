import React, {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import DefaultNft from "../NFTs/DefaultNft";
import BusinessNFT from "../NFTs/BusinessNFT";
import FirstNFT from "../NFTs/FirstNFT";
import MarketPlaceAside from "./MarketPlaceAside"
import { ListContext } from "../../resources/context_store/ListContext";
import { romaDummy, newYorkDummy, sydneyDummy, osakaDummy, parisDummy } from "./MarketplaceDummy";

/* metadata
{
"token_id": 1,
"from": "ICN",
"to": "ITM",
"departuretime": "2022-12-01T13:00:00.000Z",
"arrivaltime": "2022-12-01T14:50:00.000Z",
"class": "이코노미"
}
*/

const MarketPlaceContents = () => {

  const context = useContext(ListContext);
  const [bg, setBg] = useState('');
  const [city, setCity] = useState('');

  const {list, setList, a} = context;
  useEffect(() => {
    a([1,2,3,4]);
  }, [])

  //console.log(list)
  localStorage.setItem("ticketList", JSON.stringify(list));
  console.log(JSON.parse(localStorage.ticketList))

  // nft 필터링하는 곳.
  // const first = metadata.filter((item) => item.class === "퍼스트")
  // const business = metadata.filter((item) => item.class === "이코노미")
  // const economy = metadata.filter((item) => item.class === ")
  const arr = Array.from(Array(10));
  const arr2 = Array.from(Array(5));
  const arr3 = Array.from(Array(5));

  useEffect(() => {
    setBg(romaDummy.nftImg);
    setCity(romaDummy.city);
  }, [])



  return (
    
    <>
    <div className="marketplace_contents_container">
      <div className="marketplace_contents_dividing">
        <div className="marketplace_contents_b2c" >
          <Link to="/marketplacep2p" >
            <button className='marketplace_button_default'>
              <span>Let's Go to P2P macket</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="marketplace_contents">
        <MarketPlaceAside />
        <div className="marketplace_contents_nfts">
        {arr2.map((item, idx) => {return <FirstNFT key={idx} bs="buy" locate="/nftdetailpage" bg={bg} city={city}/>})}
        {arr3.map((item, idx) => {return <BusinessNFT key={idx} bs="buy" locate="/nftdetailpage" bg={bg} city={city}/>})}
        {arr.map((item, idx) => {return <DefaultNft key={idx} bs="buy" locate="/nftdetailpage" bg={bg} city={city}/>})}
        </div>
      </div>
    </div>
      
    </>
  );
};

export default MarketPlaceContents;
