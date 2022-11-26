import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import { ListContext } from "../../resources/context_store/ListContext";

const DefaultNft = (props) => {
  const context = useContext(ListContext);
  const arr = Array.from(Array(11));
  const [active, setActive] = useState(false);

  const {bg, locate, bs, locate2, bs2, price, departure, arrival, left, city, token_Id} = props;
  const {list, setAirlineNFT} = context;

  const handleActive = (e) => {
    setActive(() => !active);
  }

  const handleDefaultBuyClick = () => {
    const filtered = [...list].filter((item) => item.token_id === token_Id);
    setAirlineNFT(filtered);
  }

  return ( 
      <>
        <Tilt className={ active ? "Tilt" : ""}  glareEnable={true} glareMaxOpacity={0.5} glarePosition="all"  transitionSpeed={400} scale={1.1} tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="white"  style={{  zIndex : ( active ? 11 : 9 )  }} >
          <div className={active ? "default_nft_container_active" : "default_nft_container"} onClick={handleActive} >
            <div className="default_nft_img"  style={{backgroundImage: `url(${bg})`}}>
              <div className="default_nft_whiteimg" >
                {arr.map((item, idx) => <span key={idx} style={{backgroundImage: `url(${bg})`}}></span>)}
                <div className={active ? "default_nft_contents_contentwrapper_active" : "default_nft_contents_contentwrapper"}>
                  <h2>{city}</h2>
                  <p>Travel with Unleash</p>
                  <p>left : {left}</p>
                  <p>{price}ETH</p>
                  <p>{departure}</p>
                  <p>{arrival}</p>
                </div>
              <div className="default_nft_poka" />
              </div>
            </div>
            <div className={active ? "default_nft_img_back_active" : "default_nft_img_back"} style={{backgroundImage: `url(${bg})`}}/>
          </div>
          <div className={active ? "nft_buy_button_active" : 'nft_buy_button'}>
            <Link to={locate}><button onClick={handleDefaultBuyClick}>{bs}</button></Link>
            {bs2 && <Link to={locate2}><button onClick={handleDefaultBuyClick}>{bs2}</button></Link>}
          </div>
          
        </Tilt>

        {active && (
          <div className="dim" ></div>
        )}
      </>
  );
}

export default DefaultNft;