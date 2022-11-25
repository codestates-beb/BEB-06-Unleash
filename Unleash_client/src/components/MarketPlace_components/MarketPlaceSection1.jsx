import React, {useState, useContext, useEffect} from "react";
import { newYorkDummy, sydneyDummy, parisDummy, romaDummy, osakaDummy } from "./MarketplaceDummy";
import { ListContext } from "../../resources/context_store/ListContext";
//import city2 from "../../resources/image/main.jpg"
// 파일명과 전역 설정된 목적지랑 맞춤.
// import Tokyo from 'Tokyo'
// import NewYork from 'NewYork'
// ,,,,

const MarketPlaceSection1 = () => {
  const context = useContext(ListContext);
  
  const [destination, setDestination] = useState({});

  useEffect(() => {
    if (context.list[0].to === "ITM") return setDestination(osakaDummy);
    if (context.list[0].to === "JFK") return setDestination(newYorkDummy);
    if (context.list[0].to === "CDG") return setDestination(parisDummy);
    if (context.list[0].to === "SYD") return setDestination(sydneyDummy);
    if (context.list[0].to === "FCO") return setDestination(romaDummy);
  }, []);
  //const a = [city, city2]; a 는 모듈화된 이미지 7개.

  // city값에 전역으로 설정된 === 필터링된 도착지. city를 대입해야함.
  // const context = useContext(AppContext); -> city이름이옴.

  // city 필터.
  /*
  setSectionImg(() => a.filter((item) => {
    return item === context.state.city
  })) */


  return (
    <>
      <div className="marketplace_section1">
        <div className="marketplace_section1_img"
        style={{background: `url(${destination.section1})`}}
        >
          <span className="marketplace_section1_span">{destination.city}</span>
        </div>
      </div>
    </>
  );
};

export default MarketPlaceSection1;
