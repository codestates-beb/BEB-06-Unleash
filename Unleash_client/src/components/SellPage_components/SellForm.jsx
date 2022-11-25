import React from "react";

const SellForm = () => {
  const result = (110 - 110*0.025).toFixed(2);
  //handlesubmit = () => {}
  //handleChange = () => {}

  return (
    <form className="sellpage_listing_form">
      <div className="sellpage_type_button">
        <button type="button">Sell</button>
        <button type="button">Refund</button>
      </div>
      <div className="sellpage_listing_input">
        <span>Set a Price</span>
        <input type='text'/>
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
