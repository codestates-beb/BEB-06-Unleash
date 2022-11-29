import React, {useState, useEffect, useContext} from "react";
import MyPageContents from "../components/MyPage_components/MyPage_contents";
import Layer from "../components/MyPage_components/Layer";


const MyPage = () => {

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


