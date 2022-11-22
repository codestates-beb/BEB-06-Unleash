import React, {useState} from "react";
import Tilt from 'react-parallax-tilt';

const DefaultNft = (props) => {
  // state에 빈배열 넣어서 NFT100개 면 다 false였다가,

  //const [animated, setAnimated] = useState(false);
  // hover한 상태에서 transition이 끝날 경우에.

  //nft class 별로, shadow다르기 first gold business neon green economy black
  const arr = Array.from(Array(11));
  const [active, setActive] = useState(false);
  const handleActive = (e) => {
    setActive(() => !active);
  }

  return ( 
      <>
        <Tilt className={ active ? "Tilt" : ""}  glareEnable={true} glareMaxOpacity={0.5} glarePosition="all"  transitionSpeed={400} scale={1.1} tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="white"  style={{  zIndex : ( active ? 11 : 9 )  }} >
          <div className={active ? "default_nft_container_active" : "default_nft_container"} onClick={handleActive} >
            <div className="default_nft_img" >
              <div className="default_nft_whiteimg">
                {arr.map((item, idx) => <span key={idx}></span>)}
                <div className={active ? "default_nft_contents_contentwrapper_active" : "default_nft_contents_contentwrapper"}>
                  <h2>Paris</h2>
                  <p>Travel with Unleash</p>
                  <p>110ETH</p>
                </div>
              <div className="default_nft_poka" />
              </div>
            </div>
            <div className={active ? "default_nft_img_back_active" : "default_nft_img_back"} />
          </div>
          <div className={active ? "nft_buy_button_active" : 'nft_buy_button'}>
              <a href={props.locate}><button>{props.bs}</button></a>
          </div>
          
        </Tilt>

        {active && (
          <div className="dim" ></div>
        )}
      </>
  );
}

export default DefaultNft;