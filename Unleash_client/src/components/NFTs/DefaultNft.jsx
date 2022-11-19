import React, {useState} from "react";
import Tilt from 'react-parallax-tilt';

const DefaultNft = () => {
  // state에 빈배열 넣어서 NFT100개 면 다 false였다가,

  //const [animated, setAnimated] = useState(false);
  // hover한 상태에서 transition이 끝날 경우에.

  //nft class 별로, shadow다르기 first gold business neon green economy black
  const arr = Array.from(Array(5));


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
              <div className="default_nft_poka" />
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
}

export default DefaultNft;