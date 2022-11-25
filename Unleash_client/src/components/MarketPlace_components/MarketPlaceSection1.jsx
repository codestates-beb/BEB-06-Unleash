import React, {useState} from "react";
import { newYorkDummy, sydneyDummy, parisDummy, romaDummy, osakaDummy } from "./MarketplaceDummy";
//import city2 from "../../resources/image/main.jpg"
// 파일명과 전역 설정된 목적지랑 맞춤.
// import Tokyo from 'Tokyo'
// import NewYork from 'NewYork'
// ,,,,

const MarketPlaceSection1 = () => {
  const [destination, setDestination] = useState({});
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
        style={{background: `url(${osakaDummy.section1})`, backgroundSize:"cover"}}
        >
          <span className="marketplace_section1_span">{osakaDummy.city}</span>
        </div>
      </div>
    </>
  );
};

export default MarketPlaceSection1;
