import React from "react";


const MarketPlaceInfo = () => {
  return (
    <>
      <div className="marketplace_info">
        <div className="marketplace_info_container">
          <div className="marketplace_info_avatar" />
          <span className="marketplace_info_name">Ticket To Tokyo</span>
          <div className="marketplace_info_flexgrow" /> 
          <div className="marketplace_info_detail">디테일정보</div>
        </div>
        <div className="marketplace_description_container">
          <div className="marketplace_description_contents">
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis ipsum, explicabo unde vero quas consequatur soluta eveniet dolore aut dicta. Dignissimos aliquid dolore nobis vel eaque similique ducimus maxime fugiat.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis ipsum, explicabo unde vero quas consequatur soluta eveniet dolore aut dicta. Dignissimos aliquid dolore nobis vel eaque similique ducimus maxime fugiat.</span>
          </div>
          <div className="marketplace_description_eth">
            <span>price</span>
          </div>
          <div className="marketplace_description_dollars">
            <span>price</span>
          </div>

        </div>
        
      </div>
    </>
  );
};

export default MarketPlaceInfo;
