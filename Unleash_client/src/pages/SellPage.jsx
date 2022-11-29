import React, {useState, useEffect} from "react";
import SellForm from "../components/SellPage_components/SellForm";
import FirstNFT from "../components/NFTs/FirstNFT"
import { romaDummy } from "../components/MarketPlace_components/MarketplaceDummy";


const SellPage =() => {
    //ethers 이용해서 complete 버튼 누르면 메타마스크에서 tx 보내기.
    const [bg, setBg] = useState('');
    const [city, setCity] = useState('');
  
    useEffect(() => {
      setBg(romaDummy.nftImg); // 나중에는 Map 써서 item.
      setCity(romaDummy.city);
    }, []);

    return (
      <main className="sellpage_main">
      {/* 헤더헤더 */}
        <div className="sellpage_container">
          <div className="sellpage_listing">
            <span>List for sale</span>
            <div className="sellpage_listing_wrapper">
              <span>Choose a type of sale</span>
              <SellForm />
            </div>
          </div>
          <div className="sellpage_item">
            <div className="sellpage_nft">
            <FirstNFT bg={bg} city={city}/>
            </div>
          </div>
        </div>
      </main>
    );
  }

  export default SellPage;
