import React from "react";

// 나중에 해야할것.
// 전역상태에 따라 도시 이름도 바뀌어야하기 때문에 Ticket To City 부분 수정.
// 디테일정보 수정 깃허브주소 이런거 넣으면될듯.
// dummy데이터에서 객체 형태로 저장한 description불러와서 state와 함께 설정.
// import dummy from 'dummy.js'


const MarketPlaceInfo = () => {
  // const context = useContext(AppContext);
  // const [description, setDescription] = useState('');
  // const filteredCity = dummy.filter((item) => item === context.state.city);
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
            {/* <span>{filteredCity.description}</span>*/}
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis ipsum, explicabo unde vero quas consequatur soluta eveniet dolore aut dicta. Dignissimos aliquid dolore nobis vel eaque similique ducimus maxime fugiat.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis ipsum, explicabo unde vero quas consequatur soluta eveniet dolore aut dicta. Dignissimos aliquid dolore nobis vel eaque similique ducimus maxime fugiat.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis ipsum, explicabo unde vero quas consequatur soluta eveniet dolore aut dicta. Dignissimos aliquid dolore nobis vel eaque similique ducimus maxime fugiat.</span>
          </div>
          <div className="marketplace_description_eth">
            {/* NFT 가격 이더리움으로 */}
            <span>price</span>
          </div>
          <div className="marketplace_description_dollars">
            {/* NFT 가격 달러 or KRW로 환산해서 표시 */}
            <span>price</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPlaceInfo;
