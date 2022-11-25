import React, {useContext} from "react";
import MarketPlaceInfo from "../components/MarketPlace_components/MarketPlaceInfo";
import MarketPlaceSection1 from "../components/MarketPlace_components/MarketPlaceSection1";
import MarketPlaceContents from "../components/MarketPlace_components/MarketPlaceContents";
import Test from "../resources/context_store/Test";
import { ListContext } from "../resources/context_store/ListContext";

const MarketPlace = () => {
  const context = useContext(ListContext);

  
  //context.list.city~~
  // context API 사용해야하는것, mainpage 에서 받아오는 항공권 리스트 정보.
  // login 안해도 볼 순 있는데, buy를 누를경우에 Ethers 연결 필요.
  
  return (
    <>
      <div className="marketplace">
        <main className="marketplace_main">
          <div className="marketplace_container">
          <Test>
            <MarketPlaceSection1 />
            <MarketPlaceInfo />
            {/*이게 나중에 marcketplace 컴포넌트들을 감싸는 ContextAPI가 될거임. */}
            <MarketPlaceContents />
          </Test>
          </div>
        </main>
      </div>
    </>
  );
};

export default MarketPlace;
