import React, { useContext } from "react";
import DetailDesc from "../components/DetailPage_components/DetailNftDesc";
import DetailInfo from "../components/DetailPage_components/DetailInfo";
import { ListContext } from "../resources/context_store/ListContext";

const NftDetailPage = () => {
  //nft state 받아와서 적용.
  const context = useContext(ListContext);
  console.log(localStorage)

  return (
    <main className="detail_main">
        <div className="detailpage_container">
          <DetailDesc />
          <DetailInfo />
        </div>
    </main>
  );
};

export default NftDetailPage;
