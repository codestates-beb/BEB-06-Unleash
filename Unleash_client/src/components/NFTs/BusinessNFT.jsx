import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import { ListContext } from "../../resources/context_store/ListContext";

  

const BusinessNFT = (props) => {
  const context = useContext(ListContext);
  const arr = Array.from(Array(11));
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
        <Tilt className={ "default_nft_box" + (active ? " Tilt" : "")} glareEnable={true}  glareMaxOpacity={0.5} glarePosition="all"  transitionSpeed={400} scale={1.1} tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="white" style={{  zIndex : ( active ? 11 : 9 )  }} >
          <div className={active ? "default_nft_container_active" : "default_nft_container"} onClick={handleActive} style={{backgroundColor: "rgba(175, 238, 238, 0.805)"}}>
            <div className="default_nft_img" style={{backgroundImage: `url(${bg})`}}>
              <div className="default_nft_whiteimg" >
                {arr.map((item, idx) => <span key={idx} style={{backgroundImage: `url(${bg})`}}></span>)}
                <div className={active ? "default_nft_contents_contentwrapper_active" : "default_nft_contents_contentwrapper"}>
                  <h2>{city}</h2>
                  <p>Travel with Unleash</p>
                  {left && <p>left : {left}</p>}
                  <p>{price}ETH</p>
                  <p>{departure}</p>
                  <p>{arrival}</p>
                </div>
              <div className="business_nft_poka" />
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

export default BusinessNFT;
