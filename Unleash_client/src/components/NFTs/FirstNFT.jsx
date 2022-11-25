import React, {useState} from "react";
import {Link} from "react-router-dom";
import Tilt from 'react-parallax-tilt';

const FirstNFT = (props) => {
  
  const arr = Array.from(Array(11));
  const glare2 = "rgb(255, 119, 115) 10%, rgba(255,237,95,1) 20%, rgba(168,255,95,1) 30%, rgba(131,255,247,1) 40%, rgba(120,148,255,1) 50%, rgb(216, 117, 255) 60%, rgb(255, 119, 115) 70%, rgb(255, 119, 115) 80%, rgba(255,237,95,1) 90%, rgba(168,255,95,1) 100%"
  const [active, setActive] = useState(false);
  const handleActive = (e) => {
    setActive(() => !active);
  }
  const handleBuyClick = () => {
    console.log(1);
    //setNFT 로 선택한 NFT를 전역으로 올리고, LIStingpage로 라우팅.
    // or 여기서 ether로 결제후에 DB로 쏴서 리스팅 업로드. useEffect(()=>{}, [listing])
  }
  // filtering된 값에 JFK가 들어있으면 nftImg는 NewYork로.
  const cities = ["NewYork","Osaka","Roma","Sydney","Paris"];
  const airports = ["JFK", "ITN", "FCO", "SYD", "CDG"];

    return (
        <>
          <Tilt className={ active ? "Tilt" : ""} glareEnable={true} glareMaxOpacity={0.2} glarePosition="all"  transitionSpeed={400}  tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor={glare2}
          scale={1.1}  style={{  zIndex : ( active ? 11 : 9 ) }}>
            <div className={active ? "default_nft_container_first_active" : "default_nft_container_first"} onClick={handleActive}>
              <div className="default_nft_img" style={{backgroundImage: `url(${props.bg})`}}>
                <div className="default_nft_whiteimg">
                  {arr.map((item, idx) => <span key={idx} style={{backgroundImage: `url(${props.bg})`}}></span>)}
                  <div className={active ? "default_nft_contents_contentwrapper_active" : "default_nft_contents_contentwrapper"}>
                    <h2>{props.city}</h2>
                    <p>Travel with Unleash</p>
                    <p>110ETH</p>
                  </div>
                  <div className="first_nft_poka" />
                </div>
              </div>
              <div className={active ? "default_nft_img_back_active" : "default_nft_img_back"} style={{backgroundImage: `url(${props.bg})`}}/>
            </div>
            <div className={active ? "nft_buy_button_active" : 'nft_buy_button'}>
              <Link to={props.locate}><button onClick={handleBuyClick}>{props.bs}</button></Link>
              {props.bs2 && <Link to={props.locate2}><button onClick={handleBuyClick}>{props.bs2}</button></Link>}
            </div>
          </Tilt>

          {active && (
          <div className="dim" ></div>
        )}

        </>
        );
};

export default FirstNFT;
