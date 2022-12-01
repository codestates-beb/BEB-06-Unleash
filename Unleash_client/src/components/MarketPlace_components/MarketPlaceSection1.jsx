import React, {useState, useEffect} from "react";
import { newYorkDummy, sydneyDummy, parisDummy, romaDummy, osakaDummy } from "./MarketplaceDummy";

const MarketPlaceSection1 = () => {
  const [destination, setDestination] = useState({});
  const list = JSON.parse(localStorage.getItem("marketList"));

  useEffect(() => {
    if (list[0].to === "ITM") return setDestination(osakaDummy);
    if (list[0].to === "JFK") return setDestination(newYorkDummy);
    if (list[0].to === "CDG") return setDestination(parisDummy);
    if (list[0].to === "SYD") return setDestination(sydneyDummy);
    if (list[0].to === "FCO") return setDestination(romaDummy);
  }, [destination, list]);

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
