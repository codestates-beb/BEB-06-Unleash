import React from "react";
import Tilt from 'react-parallax-tilt';
const BusinessNFT = () => {
  const arr = Array.from(Array(6));
  const glare2 = "rgb(255, 119, 115) 10%, rgba(255,237,95,1) 20%, rgba(168,255,95,1) 30%, rgba(131,255,247,1) 40%, rgba(120,148,255,1) 50%, rgb(216, 117, 255) 60%, rgb(255, 119, 115) 70%, rgb(255, 119, 115) 80%, rgba(255,237,95,1) 90%, rgba(168,255,95,1) 100%"

    return (
        <>
          <Tilt glareEnable={true} glareMaxOpacity={0.5} glarePosition="all"  transitionSpeed={400} scale={1.1} tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="white">
            <div className="default_nft_container" >
              <div className="default_nft_img" >
                <div className="default_nft_whiteimg">
                  {arr.map((item, idx) => <span key={idx}></span>)}
                  <div className="default_nft_contents_contentwrapper">
                    <h2>To Tokyo</h2>
                    <p>tokyo is great place to visit</p>
                  </div>
                <div className="business_nft_poka" />
                </div>
              </div>
              <div className="default_nft_info_container">
                <div className="default_nft_info">
                  <span className="default_nft_seminame">Tokyo</span>
                  <span className="default_nft_name">Tokyo</span>
                </div>
                <div className="default_nft_values">
                  <span className="default_nft_price">price</span>
                  <span className="default_nft_eth">1000ETH</span>
                </div>
              </div>
            </div>
          </Tilt>
        </>
        
    );
};

export default BusinessNFT;
