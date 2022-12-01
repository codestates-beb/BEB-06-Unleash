import React, { useContext } from 'react';
import MyPageContents from '../components/MyPage_components/MyPage_contents';
import Layer from '../components/MyPage_components/Layer';
import { ethers, Contract } from 'ethers';
import Abi from '../resources/exAbi.json';
import MarketAbi from '../resources/MarketAbi.json';
import { ListContext } from '../resources/context_store/ListContext';
import DidLoading from '../components/DidLoading';

const MyPage = () => {
  const context = useContext(ListContext);
  const { active, setActive } = context;

  const contractAddress = '0xB7c26E7F3d7AE71cE62A97Edc59Fe4F4d94AAA3D';
  const marketContractAddress = '0xD97423f13396D1a7EF1090Cd040b3339eAC8AaC2';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new Contract(contractAddress, Abi, signer);
  const contract2 = new Contract(marketContractAddress, MarketAbi, signer);

  const handleApprove = async () => {
    setActive(true);
    try {
      const txHash = await contract.setApprovalForAll(
        marketContractAddress,
        true
      );
      const txResult = await txHash.wait();
      if (txResult) {
        setActive(false);
        alert('승인이 완료되었습니다.');
      }
    } catch (e) {
      setActive(false);
      alert('승인에 실패했습니다.');
      console.log(e);
      return e;
    }
  };
  const handleTake = async () => {
    setActive(true);
    try {
      const txHash = await contract2.withdraw();
      const txResult = await txHash.wait();
      if (txResult) {
        setActive(false);
        alert('인출이 완료되었습니다.');
      }
    } catch (e) {
      setActive(false);
      alert('인출에 실패했습니다.');
      console.log(e);
      return e;
    }
  };

  return (
    <div className="mypage">
      <div className="mypage_section1">
        <div className="mypage_section1_stage">
          <Layer />
        </div>
      </div>
      <div className="mypage_avatar_default" />
      <div className="mypage_approve">
        <button type="button" onClick={handleApprove}>
          Approve
        </button>
      </div>
      <div className="mypage_approve_money">
        <button type="button" onClick={handleTake}>
          Get ETH
        </button>
      </div>
      <MyPageContents />
      {active ? <DidLoading /> : ''}
    </div>
  );
};

export default MyPage;
