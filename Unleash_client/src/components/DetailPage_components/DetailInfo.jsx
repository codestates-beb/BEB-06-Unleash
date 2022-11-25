import React from "react";

const DetailInfo = () => {


  //Ethers 이용해 TX 보내기.
  const handleButtonClick = () => {

  }

  return (
    <>
      <div className="detailpage_container_info">
        <div className="detailpage_personal_info">
          <span>Osaka TokenID</span>
          <span>owned by airlines</span>
          <button type="button" onClick={handleButtonClick} >Buy</button>
        </div>
        <div className="detailpage_price">
          <div className="detail_top" >
            <span>Price</span>
          </div>
          <div className="detailpage_price_eth">
            <span>110ETH</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInfo;
