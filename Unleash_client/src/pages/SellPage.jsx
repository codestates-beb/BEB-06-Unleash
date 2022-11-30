import React, {useState, useEffect, useContext} from "react";
import SellForm from "../components/SellPage_components/SellForm";
import FirstNFT from "../components/NFTs/FirstNFT"
import DefaultNft from "../components/NFTs/DefaultNft";
import BusinessNFT from "../components/NFTs/BusinessNFT";
import { romaDummy, sydneyDummy, newYorkDummy, osakaDummy, parisDummy } from "../components/MarketPlace_components/MarketplaceDummy";
import axios from "axios";
import { ListContext } from "../resources/context_store/ListContext";


const SellPage =() => {
    const context = useContext(ListContext);
    const {userData} = context;
    //ethers 이용해서 complete 버튼 누르면 메타마스크에서 tx 보내기.
    const [sellNFT, setSellNFT] = useState([]);
    const [destination, setDestination] = useState('');

    const nft = JSON.parse(localStorage.getItem("sellNFT"));

    useEffect(() => {
      axios.get(`http://localhost:5001/user/owned?user_id=${userData.id}`)
      .then(res => {
        const data = res.data;
        setSellNFT([...data]);
      }).catch((e) => {
        console.log(e);
        return e;
      });
      const filtering = sellNFT.filter(item => item.token_id == nft[0].token_id);
      //console.log(filtering); // 여기서 Id 값은 뭐임?
      //if (!filtering) return alert("올바르지 않은 거래방식입니다.");
      if (nft[0].token.to === "ITM") return setDestination(osakaDummy); // 뒷정리함수.
      if (nft[0].token.to === "JFK") return setDestination(newYorkDummy);
      if (nft[0].token.to === "CDG") return setDestination(parisDummy);
      if (nft[0].token.to === "SYD") return setDestination(sydneyDummy);
      if (nft[0].token.to === "FCO") return setDestination(romaDummy);
    }, []);

    return (
      <main className="sellpage_main">
      {/* 헤더헤더 */}
        <div className="sellpage_container">
          <div className="sellpage_listing">
            <span>List for sale</span>
            <div className="sellpage_listing_wrapper">
              <span>Choose a type of sale</span>
              <SellForm nft={nft}/>
            </div>
          </div>
          <div className="sellpage_item">
            <div className="sellpage_nft">
            {nft[0].token.class === "퍼스트" && <FirstNFT
                    bg={destination.nftImg}
                    city={destination.city}
                    price={nft[0].token.price}
                    departure={nft[0].token.departuretime}
                    arrival={nft[0].token.arrivaltime}
                    amount={nft[0].amount}
                    />}
            {nft[0].token.class == "비지니스" && <BusinessNFT
                    bg={destination.nftImg}
                    city={destination.city}
                    price={nft[0].token.price}
                    departure={nft[0].token.departuretime}
                    arrival={nft[0].token.arrivaltime}
                    amount={nft[0].amount}
                    />}
            {nft[0].token.class == "이코노미" && <DefaultNft
                    bg={destination.nftImg}
                    city={destination.city}
                    price={nft[0].token.price}
                    departure={nft[0].token.departuretime}
                    arrival={nft[0].token.arrivaltime}
                    amount={nft[0].amount}
                    />}
            </div>
          </div>
        </div>
      </main>
    );
  }

  export default SellPage;
