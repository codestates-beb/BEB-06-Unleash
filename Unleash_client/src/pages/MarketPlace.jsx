import React from "react";
import MarketPlaceInfo from "../components/MarketPlace_components/MarketPlaceInfo";
import MarketPlaceSection1 from "../components/MarketPlace_components/MarketPlaceSection1";
import MarketPlaceContents from "../components/MarketPlace_components/MarketPlaceContents";
import Test from "../resources/context_store/Test";

const MarketPlace = () => {
  // context API 사용해야하는것, mainpage 에서 받아오는 항공권 리스트 정보.
  //
  return (
    <>
      <div className="marketplace">
        <main className="marketplace_main">
          <div className="marketplace_container">
          <MarketPlaceSection1 />
          <MarketPlaceInfo />
          <Test>
            <MarketPlaceContents />
          </Test>
          </div>
        </main>
      </div>
    </>
  );
};

export default MarketPlace;
