import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import { ListContext } from "../../resources/context_store/ListContext";
import axios from "axios";

const DefaultNft = (props) => {
  const context = useContext(ListContext);
  const arr = Array.from(Array(11));
  const [active, setActive] = useState(false);

  const {bg, locate, bs, locate2, bs2, price, departure, arrival, left, city, token_Id, seller, offer_id, amount} = props;
  const {listAll, p2pMarketList, accountNFT, loginStatus} = context;

  const handleActive = (e) => {
    setActive(() => !active);
  }
  const handleDefaultBuyClick = () => {
    if (!loginStatus) return alert("지갑을 연결하세요!");
    const filtered = [...listAll].filter((item) => item.token_id === token_Id);
    const filtered2 = [...p2pMarketList].filter(item =>
      item.seller === seller && item.offer_id === offer_id);
    const local1 = JSON.stringify([...filtered]);
    const local2 = JSON.stringify([...filtered2]);
    localStorage.setItem("airlineNFT", local1);
    localStorage.setItem("p2pNFT", local2);
  }

  const handleSellClick = () => {
    if (!loginStatus) return alert("지갑을 연결하세요!");
    const filtered3 = [...accountNFT].filter(item => item.token_id === token_Id);
    const local3 = JSON.stringify([...filtered3]);
    localStorage.setItem("sellNFT", local3);
  }

  const handleRetrieve = () => {
    // 여기서 retireve. contract에서 cancel 함수 호출.
    const selectOne = [...accountNFT].filter((item) => {
      return item.offer_id === offer_id;
    })
    console.log(selectOne);
    /* axios.put("http://localhost:5001/marketplace/cancel", {
      offer_id : selectOne.offer_id,
      amount : selectOne.amount,
      user_id : selectOne.user_id,
      token_id : selectOne.token_id
    }) */
  }
  

  return ( 
      <>
        <Tilt className={ active ? "Tilt" : ""}  glareEnable={true} glareMaxOpacity={0.5} glarePosition="all"  transitionSpeed={400} scale={1.3} tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="white"  style={{  zIndex : ( active ? 11 : 9 )  }} >
          <div className={active ? "default_nft_container_active" : "default_nft_container"} onClick={handleActive} >
            <div className="default_nft_img"  style={{backgroundImage: `url(${bg})`}}>
              <div className="default_nft_whiteimg" >
                {arr.map((item, idx) => <span key={idx} style={{backgroundImage: `url(${bg})`}}></span>)}
                <div className={active ? "default_nft_contents_contentwrapper_active" : "default_nft_contents_contentwrapper"}>
                  <h2>{city}</h2>
                  <p>Travel with Unleash</p>
                  {left && <p>left : {left}</p>}
                  {amount && <p>amount: {amount}</p>}
                  {price && <p>{price}ETH</p>}
                  <p>{departure}</p>
                  <p>{arrival}</p>
                </div>
              <div className="default_nft_poka" />
              </div>
            </div>
            <div className={active ? "default_nft_img_back_active" : "default_nft_img_back"} style={{backgroundImage: `url(${bg})`}}/>
          </div>
          <div className={active ? "nft_buy_button_active" : 'nft_buy_button'}>
            {bs === "buy" && <Link to={loginStatus ? locate : "" }><button onClick={handleDefaultBuyClick}>{bs}</button></Link>}
            {bs === "sell" && <Link to={loginStatus ? locate : "" }><button onClick={handleSellClick}>{bs}</button></Link>}
            {bs2 === "retrieve" && <Link to=""><button onClick={handleRetrieve}>{bs2}</button></Link>}
            {bs2 === "change" && <Link to={locate2}><button>{bs2}</button></Link>}
          </div>
          
        </Tilt>

        {active && (
          <div className="dim" ></div>
        )}
      </>
  );
}

export default DefaultNft;