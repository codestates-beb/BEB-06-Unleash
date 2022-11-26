import React, {useCallback, useContext, useEffect, useState} from "react";
import DefaultNft from "../components/NFTs/DefaultNft";
import FirstNFT from "../components/NFTs/FirstNFT"
import BusinessNFT from "../components/NFTs/BusinessNFT"
import { romaDummy, osakaDummy, sydneyDummy, newYorkDummy, parisDummy } from "../components/MarketPlace_components/MarketplaceDummy";
import axios from "axios";
import { ListContext } from "../resources/context_store/ListContext";
const P2PMarket = () => {
  const context = useContext(ListContext);
  const {p2pMarketList, setP2pMarketList} = context;

  const [first, setFirst] = useState([]);
  const [business, setBusiness] = useState([]);
  const [economy, setEconomy] = useState([]);


  const filterOsaka = (v) => [...v].filter(item => item.token.to === "ITM");
  const filterRoma = (v) => [...v].filter(item => item.token.to === "FCO");
  const filterSydney = (v) => [...v].filter(item => item.token.to === "SYD");
  const filterNewYork = (v) => [...v].filter(item => item.token.to === "JFK");
  const filterParis = (v) => [...v].filter(item => item.token.to === "CDG");

  // 값이 변할때 팔때 살때 tx가 있을떄마다 ㅇㅇ.

  useEffect(() => {
      setFirst(() => [...p2pMarketList].filter(item => item.token.class === "퍼스트"));
      setBusiness(() => [...p2pMarketList].filter(item => item.token.class === "비지니스"));
      setEconomy(() => [...p2pMarketList].filter(item => item.token.class === "이코노미"));
    }, []);

  const firstOsaka = filterOsaka(first);
  const businessOsaka = filterOsaka(business);
  const economyOsaka = filterOsaka(economy);

  const firstRoma = filterRoma(first);
  const businessRoma = filterRoma(business);
  const economyRoma = filterRoma(business);

  const firstSydney = filterSydney(first);
  const businessSydney = filterSydney(business);
  const economySydney = filterSydney(economy);

  const firstNewYork = filterNewYork(first);
  const businessNewYork = filterSydney(business);
  const economyNewYork = filterSydney(economy);

  const firstParis = filterParis(first);
  const businessParis = filterSydney(business);
  const economyParis = filterSydney(economy);

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
          {/* osaka roma newyork, sydney, paris 를 모두 분리해줘야함 first, second... */}
            {firstOsaka && firstOsaka.map((item, idx) => <FirstNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={osakaDummy.nftImg} city={osakaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {firstRoma && firstRoma.map((item, idx) => <FirstNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={romaDummy.nftImg} city={romaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {firstParis && firstParis.map((item, idx) => <FirstNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={parisDummy.nftImg} city={parisDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {firstNewYork && firstNewYork.map((item, idx) => <FirstNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={newYorkDummy.nftImg} city={newYorkDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {firstSydney && firstSydney.map((item, idx) => <FirstNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={sydneyDummy.nftImg} city={sydneyDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}

            {businessOsaka && businessOsaka.map((item, idx) => <BusinessNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={osakaDummy.nftImg} city={osakaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {businessRoma && businessRoma.map((item, idx) => <BusinessNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={romaDummy.nftImg} city={romaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {businessParis && businessParis.map((item, idx) => <BusinessNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={parisDummy.nftImg} city={parisDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {businessNewYork && businessNewYork.map((item, idx) => <BusinessNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={newYorkDummy.nftImg} city={newYorkDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {businessSydney && businessSydney.map((item, idx) => <BusinessNFT key={idx} locate="/p2pdetailpage" bs="buy" bg={sydneyDummy.nftImg} city={sydneyDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}

            {economyOsaka && economyOsaka.map((item, idx) => <DefaultNft key={idx} locate="/p2pdetailpage" bs="buy" bg={osakaDummy.nftImg} city={osakaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {economyRoma && economyRoma.map((item, idx) => <DefaultNft key={idx} locate="/p2pdetailpage" bs="buy" bg={romaDummy.nftImg} city={romaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/> )}
            {economyParis && economyParis.map((item, idx) => <DefaultNft key={idx} locate="/p2pdetailpage" bs="buy" bg={parisDummy.nftImg} city={parisDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {economyNewYork && economyNewYork.map((item, idx) => <DefaultNft key={idx} locate="/p2pdetailpage" bs="buy" bg={newYorkDummy.nftImg} city={newYorkDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
            {economySydney && economySydney.map((item, idx) => <DefaultNft key={idx} locate="/p2pdetailpage" bs="buy" bg={sydneyDummy.nftImg} city={sydneyDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} seller={item.seller} token_Id={item.token_id} offer_id={item.offer_id}/>)}
          </div>
        </div>
      </main>
    </div>

  );
};

export default P2PMarket;
