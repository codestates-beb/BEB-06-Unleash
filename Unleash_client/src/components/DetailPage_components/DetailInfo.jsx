import React from "react";

const DetailInfo = () => {

  return (
    <>
      <div className="detailpage_container_info">
        <div className="detailpage_personal_info">
          <span>Paris TokenID</span>
          <span>owned by airlines or users</span>
          <button>Buy</button>
        </div>
        <div className="detailpage_price">
          <div className="detail_top" >
            <span>price</span>
          </div>
          <div className="detailpage_price_eth">
            <span>110ETH</span>
          </div>
        </div>
        <div className="detailpage_price">
          <div className="detail_top" >
            <span>price history</span>
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
