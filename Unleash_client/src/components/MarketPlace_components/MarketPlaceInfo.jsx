import React, {useState, useContext, useEffect} from "react";
import { newYorkDummy, sydneyDummy, parisDummy, romaDummy, osakaDummy } from "./MarketplaceDummy";
import { ListContext } from "../../resources/context_store/ListContext";

// 나중에 해야할것.
// 전역상태에 따라 도시 이름도 바뀌어야하기 때문에 Ticket To City 부분 수정.
// 디테일정보 수정 깃허브주소 이런거 넣으면될듯.
// dummy데이터에서 객체 형태로 저장한 description불러와서 state와 함께 설정.
// import dummy from 'dummy.js'


const MarketPlaceInfo = () => {
  const context = useContext(ListContext);
  const [destination, setDestination] = useState({});

  useEffect(() => {
    if (context.list[0].to === "ITM") return setDestination(osakaDummy);
    if (context.list[0].to === "JFK") return setDestination(newYorkDummy);
    if (context.list[0].to === "CDG") return setDestination(parisDummy);
    if (context.list[0].to === "SYD") return setDestination(sydneyDummy);
    if (context.list[0].to === "FCO") return setDestination(romaDummy);
    console.log(context.list[0].nftvoucher.price);
  }, []);
  // const context = useContext(AppContext);
  // const [description, setDescription] = useState('');
  // const filteredCity = dummy.filter((item) => item === context.state.city);
  
  return (
    <>
      <div className="marketplace_info">
        <div className="marketplace_info_container">
          <div className="marketplace_info_avatar" style={{backgroundImage: `url(${destination.nftImg})`}}/>
          <span className="marketplace_info_name">Ticket To {destination.city}</span>
          <div className="marketplace_info_flexgrow" />
          <div className="marketplace_info_detail">디테일정보</div>
        </div>
        <div className="marketplace_description_container">
          <div className="marketplace_description_contents">
            <span>{destination.description}</span>
          </div>
          <div className="marketplace_description_eth">
            <span>First class floor price: {context.list[250].nftvoucher.price} ETH</span>
            <span>Business class floor price: {context.list[220].nftvoucher.price} ETH</span>
            <span>Economy class floor price: {context.list[0].nftvoucher.price} ETH</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPlaceInfo;
