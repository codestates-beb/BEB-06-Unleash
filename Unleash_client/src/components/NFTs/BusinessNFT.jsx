import React, {useState} from "react";
import { Link } from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import { newYorkDummy, sydneyDummy, parisDummy, romaDummy, osakaDummy } from "../MarketPlace_components/MarketplaceDummy";

  

const BusinessNFT = (props) => {
  const arr = Array.from(Array(11));
  const [active, setActive] = useState(false);
  const handleActive = (e) => {
    setActive(() => !active);
  }
  const handleBuyClick = () => {
    console.log(1);
    //setNFT 로 선택한 NFT를 전역으로 올리고, LIStingpage로 라우팅.
    // or 여기서 ether로 결제후에 DB로 쏴서 리스팅 업로드. useEffect(()=>{}, [listing])
  }
  const {nftImg, city} = osakaDummy;

  return (
      <>
        <Tilt className={ "default_nft_box" + (active ? " Tilt" : "")} glareEnable={true}  glareMaxOpacity={0.5} glarePosition="all"  transitionSpeed={400} scale={1.1} tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="white" style={{  zIndex : ( active ? 11 : 9 )  }} >
          <div className={active ? "default_nft_container_active" : "default_nft_container"} onClick={handleActive} style={{backgroundColor: "rgba(175, 238, 238, 0.805)"}}>
            <div className="default_nft_img" style={{backgroundImage: `url(${nftImg})`}}>
              <div className="default_nft_whiteimg" >
                {arr.map((item, idx) => <span key={idx} style={{backgroundImage: `url(${nftImg})`}}></span>)}
                <div className={active ? "default_nft_contents_contentwrapper_active" : "default_nft_contents_contentwrapper"}>
                  <h2>{city}</h2>
                  <p>Travel with Unleash</p>
                  <p>110ETH</p>
                </div>
              <div className="business_nft_poka" />
              </div>
            </div>
            <div className={active ? "default_nft_img_back_active" : "default_nft_img_back"} style={{backgroundImage: `url(${nftImg})`}}/>
          </div>
          <div className={active ? "nft_buy_button_active" : 'nft_buy_button'}>
            <Link to={props.locate}><button onClick={handleBuyClick}>{props.bs}</button></Link>
            {props.bs2 && <a href={props.locate2}><button onClick={handleBuyClick}>{props.bs2}</button></a>}
          </div>
        </Tilt>

        {active && (
          <div className="dim" ></div>
        )}
      </>
      
  );
};

export default BusinessNFT;
