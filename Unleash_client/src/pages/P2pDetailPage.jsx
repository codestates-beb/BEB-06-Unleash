import React, {useState, useEffect, useContext} from "react";
import DefaultNFT from "../components/NFTs/DefaultNft";
import FirstNFT from "../components/NFTs/FirstNFT";
import BusinessNFT from "../components/NFTs/BusinessNFT";
import { romaDummy, osakaDummy, sydneyDummy, newYorkDummy, parisDummy } from "../components/MarketPlace_components/MarketplaceDummy";
import { ListContext } from "../resources/context_store/ListContext";

const P2pDetailPage = () => {
  const context = useContext(ListContext);
  const nft = JSON.parse(localStorage.getItem("airlineNFT"));
  const p2pinfo = JSON.parse(localStorage.getItem("p2pNFT"));
  const [destination, setDestination] = useState({});

 useEffect(() => {
  if (nft[0].to === "ITM") return setDestination(osakaDummy); // 뒷정리함수.
  if (nft[0].to === "JFK") return setDestination(newYorkDummy);
  if (nft[0].to === "CDG") return setDestination(parisDummy);
  if (nft[0].to === "SYD") return setDestination(sydneyDummy);
  if (nft[0].to === "FCO") return setDestination(romaDummy);
 }, []);

  return (
    <main className="detailp2p_main">
      <div className="detailp2ppage_container">
        <div className="detailp2ppage_container_nft">
          <div className="detailp2ppage_container_nft_container">
            <div className="detailp2ppage_nft_top1">
              <span>NFT</span>
            </div>
            {nft[0].class === "퍼스트" && <FirstNFT
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
          <div className="detailp2ppage_nft_desc">
            <div className="detailp2p_top">
              <span>Description</span>
            </div>
            <ul className="detailp2ppage_nft_desc_list">
              <li><span>class : {nft[0].class}</span></li>
              <li><span>from : ICN</span></li>
              <li><span>to : {nft[0].to}</span></li>
              <li><span>departure : <br/>{nft[0].departuretime}</span></li>
              <li><span>arrival : <br/>{nft[0].arrivaltime}</span></li>
              <li><span>seller : <br/>{p2pinfo[0].seller}</span></li>
            </ul>
          </div>
        </div>
        <div className="detailp2ppage_container_info">
          <div className="detailp2ppage_personal_info">
            <span>Osaka {nft[0].token_id}</span>
            <span>owned by {p2pinfo[0].seller}</span>
            <button>Buy</button>
          </div>
          <div className="detailp2ppage_price">
            <div className="detailp2p_top" >
              <span>Price</span>
            </div>
            <div className="detailp2ppage_price_eth">
              <span>{p2pinfo[0].price}ETH</span>
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
