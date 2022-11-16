import React from "react";

const MarketPlaceNft = () => {

  //const [animated, setAnimated] = useState(false);
  // hover한 상태에서 transition이 끝날 경우에.
/*     const handleMouseEnter = (e) => {
      e.target.classList.add("hover");
    }
    const handleTransitionEnd = (e) => {
      e.target.classList.remove("hover");
    } */

  return (
    <>
      <div className="marketplace_contents_nft_container">
        <div className="marketplace_contents_nft_img">
          <div className="marketplace_contents_whiteimg">
            <span></span><span></span><span></span><span></span><span></span>
            <div className="marketplace_contents_contentwrapper">
              <h2>To Tokyo</h2>
              <p>tokyo is great place to visit</p>
            </div>
          </div>
        </div>
        <div className="marketplace_contents_nft_info_container">
          <div className="marketplace_contents_nft_info">
            <span className="marketplace_contents_nft_seminame">Tokyo</span>
            <span className="marketplace_contents_nft_name">Tokyo</span>
          </div>
          <div className="marketplace_contents_nft_values">
            <span className="marketplace_contents_nft_price">price</span>
            <span className="marketplace_contents_nft_eth">1000ETH</span>
          </div>
        </div>
      </div>
     </>
  );
}

export default MarketPlaceNft;