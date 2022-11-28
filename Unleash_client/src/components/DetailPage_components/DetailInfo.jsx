import React, {useState, useEffect} from "react";
import { romaDummy, newYorkDummy, sydneyDummy, osakaDummy, parisDummy } from "../MarketPlace_components/MarketplaceDummy";
import { ethers, Contract } from "ethers";
import axios from "axios";
import { useContext } from "react";
import { ListContext } from "../../resources/context_store/ListContext";
import Abi from "../../resources/exAbi.json"

const DetailInfo = (props) => {
  const context = useContext(ListContext);
  const {listAll, userData} = context;
  // 상태로 만들어버려서 로컬스토리지 고친 후 새로고침 하지 못하게.
  const [realOne, setRealOne] = useState('')
  const contractAddress = "0x4e83a90c7C94c35af5e5563Fabb8F0421a5C01Ac";
  
  const [number, setNumber] = useState('');
  const nft = JSON.parse(localStorage.getItem("airlineNFT"));

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new Contract(contractAddress, Abi, signer);

  const [destination, setDestination] = useState({});
  const [price, setPrice] = useState(nft[0].nftvoucher.price);

  useEffect(() => {
    const filtered = listAll.filter((item) => {
      return item.token_id === nft[0].token_id
      && item.class === nft[0].class
      && item.to === nft[0].to
      && item.nftvoucher.price === nft[0].nftvoucher.price;
    });
    setRealOne(filtered);
    if (nft[0].to === "ITM") return setDestination(osakaDummy); // 뒷정리함수.
    if (nft[0].to === "JFK") return setDestination(newYorkDummy);
    if (nft[0].to === "CDG") return setDestination(parisDummy);
    if (nft[0].to === "SYD") return setDestination(sydneyDummy);
    if (nft[0].to === "FCO") return setDestination(romaDummy);
  }, []);
  const handleChange = (e) => {
    setNumber(e.target.value);
    setPrice(() => Number(e.target.value) * nft[0].nftvoucher.price);
  }
  const handleSubmit = async (e) => {
    console.log(nft[0].token_id)
    e.preventDefault();
    console.log(userData);
    if (!realOne) return alert("올바르지 않은 방식의 거래입니다.");
    try {
      await provider.send("eth_requestAccounts", []);

      const call = await axios.get(`http://localhost:5001/marketplace/signature?token_id=${Number(nft[0].token_id)}`);
      const signature = call.data.signature_data;
      const voucher = call.data.nftvoucher;
      const {token_id, price, totalsupply} = voucher[0];


      const txHash = await contract.connect(signer).mint(
        userData.wallet_address, number, [token_id, price, totalsupply], signature
      ).sendTransaction({
        value: price * number,
      })
      // price * number 해서 이더 보내기.
      const txResult =  await txHash.wait();
      console.log(txResult);

    } catch(e) {
      console.log(e);
      return e;
    }
  }

  return (
    <>
      <div className="detailpage_container_info">
        <div className="detailpage_personal_info">
          <span>{destination.city} TokenID: {nft[0].token_id}</span>
          <span>owned by airlines</span>
          <form onSubmit={handleSubmit}>
            <input type="text" value={number} onChange={handleChange} />
            <button type="submit">Buy</button>
          </form>
        </div>
        <div className="detailpage_price">
          <div className="detail_top" >
            <span>Price</span>
          </div>
          <div className="detailpage_price_eth">
            <span>{price} ETH</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInfo;
