import {ethers} from "ethers";
import {TypedDataUtils} from 'ethers-eip712';

// block chain RPC URL
const rpcUrl = process.env.NETWORK;
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const privateKey = process.env.PRIVATE_KEY;

const wallet = (_privateKey) => {
    return new ethers.Wallet(_privateKey, provider);
  };

const signer = wallet(privateKey).connect(provider);

const EIP712Domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ];

  const NFTVoucher = [
    { name: "tokenId", type: "uint256" },
    { name: "minPrice", type: "uint256" },
    { name: "uri", type: "string" },
  ];

  const DomainData = {
    chainId: 1, // Network Chain ID
    name: "EIP712_BTD", // EIP Name
    verifyingContract: "0x....", // EIP Contract Address
    version: "1", // version
  };

  const NFTVoucherData = {
    tokenId: "token ID",
    minPrice: "token Price",
    uri:"token URL"
  };

  const SignatureParams = {
    domain: DomainData,
    message: NFTVoucherData,
    primaryType: "NFTVoucher",
  types: {
    EIP712Domain: EIP712Domain,
    NFTVoucher: NFTVoucher,
  },
};

const getSignature_dataV4 = async() => {
    const sign = TypedDataUtils.encodeDigest(SignatureParams)

    const signature = await signer.signMessage(sign)

    return signature;
}

(async() => {
    const signature = await getSignature_dataV4();
    console.log(signature);
})();

