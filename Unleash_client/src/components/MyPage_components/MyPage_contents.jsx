import React, {useState, useRef, useEffect} from "react";
import DefaultNft from "../NFTs/DefaultNft";
import FirstNFT from "../NFTs/FirstNFT";
import BusinessNFT from "../NFTs/BusinessNFT";
import axios from "axios"
import { romaDummy } from "../MarketPlace_components/MarketplaceDummy"; // 나중에 추가.

const MyPageContents = () => {
  // const first = metadata.filter((item) => item.class === "퍼스트")
  // const business = metadata.filter((item) => item.class === "이코노미")
  // const economy = metadata.filter((item) => item.class === "비지니스")
  const [bg, setBg] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    setBg(romaDummy.nftImg);
    setCity(romaDummy.city);
  }, [])

  // mypage contents는 일단 DB에서 리스트를 다 불러온거임.
  // ListState 에 저장.
  useEffect(() => {
    //axios.get(http://localhost:5000/user/owned) // 질문 status별로 나누어져 있어서, status가 필요.
  }, [])
  // 그러면 이 state가지고, user가 보유한 nft 리스트가 나올태니. 상태(owned selling...)에 따라서 보여주는걸 바꾸면됨.
  const arr = Array.from(Array(10));
  const arr2 = Array.from(Array(5));
  const arr3 = Array.from(Array(5));
  const status = ["owned", "selling", "used", "selled"];
  const [border, setBorder] = useState([true, false, false, false]);

  const handleClick = (e) => {
    const text = e.target.textContent;
    if (text === status[0]) return setBorder([true, false, false, false]);
    if (text === status[1]) return setBorder([false, true, false, false]);
    if (text === status[2]) return setBorder([false, false, true, false]);
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
      {arr2.map((item, idx) => {return <FirstNFT key={idx} bs="sell" bs2="change" locate="/sellpage" locate2="/ticketchangepage" bg={bg} city={city}/>})}
      {arr3.map((item, idx) => {return <BusinessNFT key={idx} bs="sell" bs2="change" locate="/sellpage" locate2="/ticketchangepage" bg={bg} city={city}/>})}
      {arr.map((item, idx) => {return <DefaultNft key={idx} bs="sell" bs2="change" locate="/sellpage" locate2="/ticketchangepage" bg={bg} city={city}/>})}
      </div>
    </div>
  );
};

export default MyPageContents;
