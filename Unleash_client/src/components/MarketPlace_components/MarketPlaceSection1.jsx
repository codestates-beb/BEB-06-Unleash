import React, {useState, useContext, useEffect} from "react";
import { newYorkDummy, sydneyDummy, parisDummy, romaDummy, osakaDummy } from "./MarketplaceDummy";
import { ListContext } from "../../resources/context_store/ListContext";
//import city2 from "../../resources/image/main.jpg"
// 파일명과 전역 설정된 목적지랑 맞춤.
// import Tokyo from 'Tokyo'
// import NewYork from 'NewYork'
// ,,,,

const MarketPlaceSection1 = () => {
  const [destination, setDestination] = useState({});
  const list = JSON.parse(localStorage.getItem("marketList"));

  useEffect(() => {
    if (list[0].to === "ITM") return setDestination(osakaDummy);
    if (list[0].to === "JFK") return setDestination(newYorkDummy);
    if (list[0].to === "CDG") return setDestination(parisDummy);
    if (list[0].to === "SYD") return setDestination(sydneyDummy);
    if (list[0].to === "FCO") return setDestination(romaDummy);
  }, [destination]);

  return (
    <>
      <div className="marketplace_section1">
        <div className="marketplace_section1_img"
        style={{backgroundImage: `url(${destination.section1})`, backgroundSize:"cover"}}
        >
          <span className="marketplace_section1_span">{destination.city}</span>
        </div>
      </div>
    </>
  );
};

export default MarketPlaceSection1;
