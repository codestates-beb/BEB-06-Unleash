<<<<<<< HEAD
import Web3 from 'web3';
import dotenv, { config } from 'dotenv';
import Abi from './contract/Abi.js';
import air_json from './json/config.js';

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK));
const contractHx = process.env.CONTRACT;
const contract = new web3.eth.Contract(Abi, contractHx);
// var personal = new Personal(Personal.givneProvider || process.env.NETWORK);

const createContract = () => {
  // 컨트랙트 자동생성 // Advanced CheckList
  // 1. 지갑 프라이빗 키를 가져와서 지갑과 연결한다.
  // 2. contract 폴더에 위치한 lazymint.sol을 연결된 지갑에서 배포시킨다.
  // 3. 배포시킨 contractHx와 ABI 값을 상수로 저장한다 (sign 함수에서 이용할 예정)
};

async function hash(str) {
  var result = await contract.methods._hash(str).call();
  return result;
}

const sign = async (tokenId, price, totalSupply, res) => {
  // @@@@@@@@@@ api쪽에서 res을 콜백으로 넘기고 41번째줄에서 send로 넘길예정 @@@@@@@@

  // 자동 메세지 서명
  // 1. 지갑 프라이빗 키를 가져와서 지갑과 연결한다.
  web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
  // 2. [tokenId, price]을 해쉬화한다.  ([tokenId, price]이고 컨트랙트 코드내에 위치한 struct NFTVoucher을 위한 내용이다. 이때 tokenId는 1~150번에 속한다)
  const msg = [tokenId, price, totalSupply];

  hash(msg).then((msgHx) => {
    // 3. 웹 콘솔창에서 ethereum.request({method: "personal_sign", params: [account, hash]}) 이렇게 사용되던걸 이용한다.
    const signature = web3.eth.sign(msgHx, process.env.ACCOUNT);
    // 4. 3번에 대한 출력값으로 signature이 리턴되는데 그 값을 저장해둔다. (총 150개)
    res.status(200).send(signature);
  });
};

// 모든 signature을 저장하거나 보려면 아래 코드 주석풀고 사용할것.

// const extractSignature = () => {
//     for(var i=1; i<=air_json.length; i++){
//         console.log(sign(i,air_json[i-1].price, air_json[i-1].totalsupply));
//     }
// }

extractSignature();

export default sign;
=======
const Abi = require ("./contract/Abi.js");
const ethers = require ("ethers");
const dotenv = require ("dotenv");

dotenv.config();

const Sign = async (props) => { // props로 구매원하는 티켓의 voucher을 보낸다.

    const {tokenId, price, totalSupply} = props;

    const contractAddress = "0xB1f3E9B1B8765a6dc40A2752edAaF2B224Ad6fee";
    const privateKey = process.env.PRIVATE_KEY;

    let wallet = new ethers.Wallet(privateKey);
    let provider = ethers.providers.getDefaultProvider({ name: 'goerli', chainId: 5 });
    let walletWithProvider = new ethers.Wallet(privateKey, provider);  

    const msg = [tokenId, price, totalSupply];
    const contract = new ethers.Contract(contractAddress,Abi,walletWithProvider);
    const msgHx = await contract._hash(msg);    
    // Note: messageHash is a string, that is 66-bytes long, to sign the
    //       binary value, we must convert it to the 32 byte Array that
    //       the string represents
    //
    // i.e.
    //   // 66-byte string
    //   "0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba"
    //
    //   ... vs ...
    //
    //  // 32 entry Uint8Array
    //  [ 89, 47, 167, 67, 136, 159, 199, 249, 42, 194, 163,
    //    123, 177, 245, 186, 29, 175, 42, 92, 132, 116, 28,
    //    160, 224, 6, 29, 36, 58, 46, 103, 7, 186]
    const messageHashBytes = ethers.utils.arrayify(msgHx);  // 위 주석처럼 이 과정을 거쳐야 제대로 sign이 됨
    const flatSig = await wallet.signMessage(messageHashBytes); // 우리가 원하는 최종 signature 해쉬값


    // @@@ 검증 단계 @@@ 
    // let sig = ethers.utils.splitSignature(flatSig);
    // let recovered = await contract.verifyHash(msgHx, sig.v, sig.r, sig.s);
    // console.log(recovered);
    
    return flatSig
}

Sign().then(console.log)

module.exports = Sign;
>>>>>>> d3d364c99bc2d7d5156598d2ef52892ef4511721
