import React from "react";
const MarketPlaceAside = () => {

  // 해야할거, sidebar glow effect, postion 지정,
  // 여기서 선택하는거 state 로 올리기. form태그.
  // 날짜?
  // 

  return (
    <div>
      <aside className="marketplace_contents_sidebar">
        <form className="marcketplace_contents_sidebar_container">
          <header className="marketplace_contents_sidebar_header">
            <button className="marketplace_contents_collapse">Set Destination</button>
            <div className="marketplace_contents_destination">
              <span>Paris</span>
              <span>NewYork</span>
              <span>Osaka</span>
              <span>Australia</span>
              <span>Roma</span>
            </div>
          </header>
          <div className="marketplace_contents_class">
            <button>Set class</button>
            <div className="marketpace_contents_class_value">
              <span>First</span>
              <span>Business</span>
              <span>Economy</span>
            </div>
          </div>
        </form>
      </aside>
    </div>
    
  );
};

export default MarketPlaceAside;
