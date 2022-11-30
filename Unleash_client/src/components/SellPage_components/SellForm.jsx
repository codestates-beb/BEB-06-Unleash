import React, {useState, useContext} from "react";
import { ListContext } from "../../resources/context_store/ListContext";
import {ethers, Contract} from "ethers";
import MarketAbi from "../../resources/MarketAbi.json"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellForm = (props) => {
  const context = useContext(ListContext);
  const navigate = useNavigate();
  const {userData} = context;
  const {nft} = props
  
  
  const result = (110 - 110*0.025).toFixed(2);
  const [price, setPrice] = useState('');


  const marketContractAddress = "0xd3430935ca701c2aF5844574275D7DB60D08120c";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new Contract(marketContractAddress, MarketAbi, signer);

  const handleChange = (e) => {
    setPrice(e.target.value);
  }

  const handleSubmit = async (e) => {
    console.log(nft[0].token_id, price)
    e.preventDefault();
    try {
      const txHash = await contract.connect(signer).sell(
        nft[0].token_id,
        Number(price),
        1
      )
      const txResult =  await txHash.wait();
      if (txResult) {
        axios.post("http://localhost:5001/marketplace/sell", {
          token_id: nft[0].token_id,
          price: price,
          amount: 1,
          seller: userData.wallet_address
        }, {
          withCredentials: true
        }).then(res => console.log(res)).catch(e => console.log(e));
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  return (
    <form className="sellpage_listing_form" onSubmit={handleSubmit}>
      <div className="sellpage_type_button">
        <button type="button">Sell</button>
        <button type="button">Refund</button>
      </div>
      <div className="sellpage_listing_input">
        <span>Set a Price</span>
        <input type='text' onChange={handleChange} value={price}/>
      </div>
      <div className="sellpage_listing_summary">
        <span>Summary</span>
        <div className="sellpage_summary_details">
          <span>Listing price</span>
          <span>110ETH</span>
        </div>
        <div className="sellpage_summary_details">
          <span>Service fee</span>
          <span>2.5%</span>
        </div>
        <div className="sellpage_summary_details">
          <span>Listing price</span>
          <span>{result}ETH</span>
        </div>
      </div>
      <div className="sellpage_total">
        <span>Total potential earnings</span>
        <span>{result}ETH</span>
      </div>
      <button type="submit">Complete Listing</button>
    </form>
  );
};

export default SellForm;
