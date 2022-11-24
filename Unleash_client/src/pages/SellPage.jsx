import React from "react";
import SellForm from "../components/SellPage_components/SellForm";
import FirstNFT from "../components/NFTs/FirstNFT"

const SellPage =() => {
  
    //ethers 이용해서 complete 버튼 누르면 메타마스크에서 tx 보내기.
    return (
      <main className="sellpage_main">
      {/* 헤더헤더 */}
        <div className="sellpage_container">
          <div className="sellpage_listing">
            <span>List for sale</span>
            <div className="sellpage_listing_wrapper">
              <span>Choose a type of sale</span>
              <SellForm />
            </div>
          </div>
          <div className="sellpage_item">
            <div className="sellpage_nft">
            <FirstNFT />
            </div>
          </div>
        </div>
      </main>
    );
  }

  export default SellPage;
