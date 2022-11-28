import React, {useState, useRef, useEffect} from "react";
import DefaultNft from "../NFTs/DefaultNft";
import FirstNFT from "../NFTs/FirstNFT";
import BusinessNFT from "../NFTs/BusinessNFT";
import axios from "axios"
import { romaDummy, osakaDummy, sydneyDummy, newYorkDummy, parisDummy } from "../../components/MarketPlace_components/MarketplaceDummy";
import { filterOsaka, filterNewYork, filterSydney, filterParis, filterRoma } from "../../components/utils/utils";
import { useContext } from "react";
import { ListContext } from "../../resources/context_store/ListContext";

const MyPageContents = () => {
  const context = useContext(ListContext);
  const {accountNFT, setAccountNFT} = context;

  const [first, setFirst] = useState([]);
  const [business, setBusiness] = useState([]);
  const [economy, setEconomy] = useState([]);

  const [bs, setBs] = useState("");
  const [bs2, setBs2] = useState("");

  useEffect(() => {
    setBs("sell");
    setBs2("change")
    axios.get("http://localhost:5001/user/owned?user_id=1").then(res => {
      const data = res.data;
      setAccountNFT([...data]);
    });
  }, []);

  useEffect(() => {
    setFirst(() => [...accountNFT].filter(item => item.token.class === "퍼스트"));
    setBusiness(() => [...accountNFT].filter(item => item.token.class === "비지니스"));
    setEconomy(() => [...accountNFT].filter(item => item.token.class === "이코노미"));
  }, [accountNFT]);

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

  const status = ["owned", "selling", "used", "selled"];
  const [border, setBorder] = useState([true, false, false, false]);

  const handleClick = (e) => {
    const text = e.target.textContent;

    if (text === status[0]) {
      setBorder([true, false, false, false]);
      setBs("sell");
      setBs2("change");
      // ********************user_id 넣어줘야함.********************
      axios.get("http://localhost:5001/user/owned?user_id=1").then(res => {
        const data = res.data;
        setAccountNFT([...data]);
      });
    }
    if (text === status[1]) {
      setBorder([false, true, false, false]);
      setBs("");
      setBs2("retrieve")
      // ********************address를 넣어야함. seller에********************
      axios.get("http://localhost:5001/user/selling?seller=0xDa6e260864368Fd847A5d416159CF0d23C499DFb").then(res => {
        const data = res.data;
        setAccountNFT([...data])
      })
    };
    if (text === status[2]) {
      setBs("");
      setBs2("");
      setBorder([false, false, true, false]);
      axios.get("http://localhost:5001/user/selled?seller=0x3aFA93a829a3d12D56336e6320559C8A372e76AE").then(res => {
        const data = res.data;
        setAccountNFT([...data])
      })
    }
    if (text === status[3]) return setBorder([false, false, false, true]);
  }
  // if status 가 selling일 경우에, nft 보여줄때 bs를 retrieve로 바꿔서.

  return (
    <div className="mypage_contents">
      <ul className="mypage_contents_category" >
        {status.map((item, idx) => (
          border[idx]
          ? <li
            key={idx}
            onClick={handleClick}
            style={{borderBottom: "5px solid #c1121ec9", transition: "0.3s", borderRadius: "5px", paddingBottom: "3px"}}>
              <span>{item}</span>
            </li>
          : <li key={idx} onClick={handleClick}><span>{item}</span></li>
        ))}
      </ul>
      <div className="mypage_contents_nfts">
      {firstOsaka && firstOsaka.map((item, idx) => <FirstNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={osakaDummy.nftImg} city={osakaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {firstRoma && firstRoma.map((item, idx) => <FirstNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={romaDummy.nftImg} city={romaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {firstParis && firstParis.map((item, idx) => <FirstNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={parisDummy.nftImg} city={parisDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {firstNewYork && firstNewYork.map((item, idx) => <FirstNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={newYorkDummy.nftImg} city={newYorkDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {firstSydney && firstSydney.map((item, idx) => <FirstNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={sydneyDummy.nftImg} city={sydneyDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}

      {businessOsaka && businessOsaka.map((item, idx) => <BusinessNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={osakaDummy.nftImg} city={osakaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {businessRoma && businessRoma.map((item, idx) => <BusinessNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={romaDummy.nftImg} city={romaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {businessParis && businessParis.map((item, idx) => <BusinessNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={parisDummy.nftImg} city={parisDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {businessNewYork && businessNewYork.map((item, idx) => <BusinessNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={newYorkDummy.nftImg} city={newYorkDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {businessSydney && businessSydney.map((item, idx) => <BusinessNFT key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={sydneyDummy.nftImg} city={sydneyDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}

      {economyOsaka && economyOsaka.map((item, idx) => <DefaultNft key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={osakaDummy.nftImg} city={osakaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {economyRoma && economyRoma.map((item, idx) => <DefaultNft key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={romaDummy.nftImg} city={romaDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/> )}
      {economyParis && economyParis.map((item, idx) => <DefaultNft key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={parisDummy.nftImg} city={parisDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {economyNewYork && economyNewYork.map((item, idx) => <DefaultNft key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={newYorkDummy.nftImg} city={newYorkDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      {economySydney && economySydney.map((item, idx) => <DefaultNft key={idx} locate="/sellpage" locate2="/ticketchangepage" bs={bs} bs2={bs2} bg={sydneyDummy.nftImg} city={sydneyDummy.city} price={item.price} departure={item.token.departuretime} arrival={item.token.arrivaltime} token_Id={item.token_id} offer_id={item.offer_id} amount={item.amount}/>)}
      </div>
    </div>
  );
};

export default MyPageContents;
