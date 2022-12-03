import React, {useState, useEffect} from "react";
import { newYorkDummy, sydneyDummy, parisDummy, romaDummy, osakaDummy } from "./MarketplaceDummy";
import { BsGlobe2, BsFillInfoSquareFill, BsFillTelephoneFill } from "react-icons/bs";
import {MdHotel} from "react-icons/md"
// 나중에 해야할것.
// 전역상태에 따라 도시 이름도 바뀌어야하기 때문에 Ticket To City 부분 수정.
// 디테일정보 수정 깃허브주소 이런거 넣으면될듯.
// dummy데이터에서 객체 형태로 저장한 description불러와서 state와 함께 설정.
// import dummy from 'dummy.js'


const MarketPlaceInfo = () => {
  const [destination, setDestination] = useState({});
  const list = JSON.parse(localStorage.getItem("marketList"));

  useEffect(() => {
    if (list[0].to === "ITM") return setDestination(osakaDummy); // 뒷정리함수.
    if (list[0].to === "JFK") return setDestination(newYorkDummy);
    if (list[0].to === "CDG") return setDestination(parisDummy);
    if (list[0].to === "SYD") return setDestination(sydneyDummy);
    if (list[0].to === "FCO") return setDestination(romaDummy);
  }, [destination, list]);

  return (
    <>
      <div className="marketplace_info">
        <div className="marketplace_info_container">
          <div className="marketplace_info_avatar" style={{backgroundImage: `url(${destination.nftImg})`}}/>
          <div className="marketplace_info_name">
            <span>Ticket To</span>
            <span>{destination.city}</span>
          </div>
          <div className="marketplace_info_flexgrow" />
          <div className="marketplace_info_detail">
            <a href={destination.url}><BsGlobe2 /></a>
            <a href="https://www.0404.go.kr/dev/country.mofa?idx=&hash=&chkvalue=no2&stext=&group_idx=&alert_level=0"><BsFillInfoSquareFill /></a>
            <a href={destination.url2}><BsFillTelephoneFill style={{color: "#03ad"}}/></a>
            <a href={"https://www.hotels.com"}><MdHotel style={{color: "black", fontSize: "35px"}}/></a>
          </div>
        </div>
        <div className="marketplace_description_container">
          <div className="marketplace_description_contents">
            <span>{destination.description}</span>
          </div>
          <div className="marketplace_description_eth">
            <span>First class price: {list[2].nftvoucher.price} ETH</span>
            <span>Business class price: {list[1].nftvoucher.price} ETH</span>
            <span>Economy class price: {list[0].nftvoucher.price} ETH</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPlaceInfo;
