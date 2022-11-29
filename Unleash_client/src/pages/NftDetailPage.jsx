import React, { useContext, useEffect } from "react";
import DetailDesc from "../components/DetailPage_components/DetailNftDesc";
import DetailInfo from "../components/DetailPage_components/DetailInfo";
import { ListContext } from "../resources/context_store/ListContext";
import LoadingPage from "./LoadingPage";

const NftDetailPage = () => {
  const context = useContext(ListContext);
  const {active} = context;
  //nft state 받아와서 적용.
  return (
    active ? <LoadingPage /> :
    <main className="detail_main">
        <div className="detailpage_container">
          <DetailDesc />
          <DetailInfo />
        </div>
    </main>
  );
};

export default NftDetailPage;
