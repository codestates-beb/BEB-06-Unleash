import React, {useState, useEffect, useContext} from "react";
import MyPageContents from "../components/MyPage_components/MyPage_contents";
import Layer from "../components/MyPage_components/Layer";
import { ethers, Contract } from "ethers";
import Abi from "../resources/exAbi.json";
import { ListContext } from "../resources/context_store/ListContext";


const MyPage = () => {
  const context = useContext(ListContext);
  const {userData} = context;

  const contractAddress = "0xB7c26E7F3d7AE71cE62A97Edc59Fe4F4d94AAA3D";
  const marketContractAddress = "0xd3430935ca701c2aF5844574275D7DB60D08120c";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new Contract(contractAddress, Abi, signer);


  const handleApprove = async () => {
    try {
      const txHash = await contract.setApprovalForAll(
        marketContractAddress,
        true,
      )
      const txResult = await txHash.wait()
      console.log(txResult)

    } catch(e) {
      console.log(e);
      return e;
    }
  }

  return (
      <div className="mypage">
        <div className="mypage_section1">
          <div className="mypage_section1_stage">
            <Layer />
          </div>
        </div>
        <div className="mypage_avatar_default" />
        <div className="mypage_approve">
          <button type="button" onClick={handleApprove}>Approve</button>
        </div>
        <MyPageContents />
      </div>
    );;
};

export default MyPage;


