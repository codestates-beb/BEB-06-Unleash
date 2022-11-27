import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import { ListContext } from "../../resources/context_store/ListContext";


const FirstNFT = (props) => {
  const context = useContext(ListContext);
  const arr = Array.from(Array(11));
  const glare2 = "rgb(255, 119, 115) 10%, rgba(255,237,95,1) 20%, rgba(168,255,95,1) 30%, rgba(131,255,247,1) 40%, rgba(120,148,255,1) 50%, rgb(216, 117, 255) 60%, rgb(255, 119, 115) 70%, rgb(255, 119, 115) 80%, rgba(255,237,95,1) 90%, rgba(168,255,95,1) 100%"
  const [active, setActive] = useState(false);

  const {bg, locate, bs, locate2, bs2, price, departure, arrival, left, city, token_Id, seller} = props;
  const {listAll, setAirlineNFT} = context;

  const handleActive = (e) => {
    setActive(() => !active);
  }
  const handleDefaultBuyClick = () => {
    const filtered = [...listAll].filter((item) => item.token_id === token_Id);
    setAirlineNFT(filtered);
  }
  const handleRetrieve = () => {
    // 여기서 retireve. contract에서 cancel 함수 호출.
  }

  const handleTicketChange = () => {
    // ticket과 교환 하는 컨트랙트 함수 호출.
  }

    return (
        <>
          <Tilt className={ active ? "Tilt" : ""} glareEnable={true} glareMaxOpacity={0.2} glarePosition="all"  transitionSpeed={400}  tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor={glare2}
          scale={1.1}  style={{  zIndex : ( active ? 11 : 9 ) }}>
            <div className={active ? "default_nft_container_first_active" : "default_nft_container_first"} onClick={handleActive}>
              <div className="default_nft_img" style={{backgroundImage: `url(${bg})`}}>
                <div className="default_nft_whiteimg">
                  {arr.map((item, idx) => <span key={idx} style={{backgroundImage: `url(${bg})`}}></span>)}
                  <div className={active ? "default_nft_contents_contentwrapper_active" : "default_nft_contents_contentwrapper"}>
                    <h2>{city}</h2>
                    <p>Travel with Unleash</p>
                    {left && <p>left : {left}</p>}
                    <p>{price}ETH</p>
                    <p>{departure}</p>
                    <p>{arrival}</p>
                  </div>
                  <div className="first_nft_poka" />
                </div>
              </div>
              <div className={active ? "default_nft_img_back_active" : "default_nft_img_back"} style={{backgroundImage: `url(${bg})`}}/>
            </div>
            <div className={active ? "nft_buy_button_active" : 'nft_buy_button'}>
              {bs && <Link to={locate}><button onClick={handleDefaultBuyClick}>{bs}</button></Link>}
              {bs2 === "retrieve" && <Link to=""><button onClick={handleRetrieve}>{bs2}</button></Link>}
              {bs2 === "change" && <Link to={locate2}><button onClick={handleTicketChange}>{bs2}</button></Link>}
            </div>
          </Tilt>

          {active && (
          <div className="dim" ></div>
        )}

        </>
        );
};

export default FirstNFT;
