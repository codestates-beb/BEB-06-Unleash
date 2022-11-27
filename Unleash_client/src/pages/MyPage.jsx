import React, {useState, useEffect, useContext} from "react";
import MyPageContents from "../components/MyPage_components/MyPage_contents";
import Layer from "../components/MyPage_components/Layer";
import axios from 'axios';
import { ListContext } from "../resources/context_store/ListContext";

const MyPage = () => {
  const context = useContext(ListContext);

  // Owned = userID 를 Post 해줘야함.
  // selled 에서 nft 버튼을 retrieve로 설정해서 다시 받아오는 기능.
  // mypage에서 Owned에 버튼 2개
  return (
      <div className="mypage">
        <div className="mypage_section1">
          <div className="mypage_section1_stage">
            <Layer />
          </div>
        </div>
        <div className="mypage_avatar_default" />
        <MyPageContents />
      </div>
    );;
};

export default MyPage;


