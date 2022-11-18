import React from "react";


import MarketPlaceInfo from "../components/MarketPlace_components/MarketPlaceInfo";
import MarketPlaceSection1 from "../components/MarketPlace_components/MarketPlaceSection1";
import MarketPlaceContents from "../components/MarketPlace_components/MarketPlaceContents";

const MarketPlace = () => {
  return (
    <>
      <div className="marketplace">
      {/* header */}
        <main className="marketplace_main">
          <div className="marketplace_container">
          <MarketPlaceSection1 />
          <MarketPlaceInfo />
          <MarketPlaceContents />
          </div>
        </main>
      </div>
    </>
  );
};

export default MarketPlace;
