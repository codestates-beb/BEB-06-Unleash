import {Resolver} from 'did-resolver';
import {getResolver,EthereumDIDRegistry,REGISTRY,stringToBytes32} from 'ethr-did-resolver';
import { EthrDID,DelegateTypes  } from "ethr-did";
import { verifyCredential } from "did-jwt-vc"
import {ethers,Contract} from "ethers"
const rpcUrl = process.env.REACT_APP_RPC_URL
const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli"}));

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const contract = new Contract(REGISTRY,EthereumDIDRegistry.abi,provider); 

export const verifyJWT = async(_vcJWT) => {
    const verifiedVP = await verifyCredential(_vcJWT, didResolver)
    if(!verifiedVP.verified) {
      return false;
    }
    return verifiedVP;
  }

export const verifyValidDelegate = async(ID_Address) => {
  const delegateType = stringToBytes32(DelegateTypes.veriKey);
  const ADDRESS_VCID = ethers.utils.computeAddress(ID_Address);
  return await contract.validDelegate(process.env.REACT_APP_IATA_ADDRESS,delegateType,ADDRESS_VCID)
}

export const DIDtoAddress = (_did) => {
    let result = String(_did);
    result = result.replace("did:ethr:0x5:","")
    result = result.replace("did:ethr:","")
    return result;
}

export const IATA_DID_Document = async() => {
    const ISSUER_Did = new EthrDID({
        identifier: process.env.REACT_APP_IATA_ADDRESS,
        chainNameOrId:5,
      });
    return await didResolver.resolve(ISSUER_Did.did);
}

export const verifyVCID = async(_VCID,_DID_DOCUMENT) => {
    const ADDRESS_VCID = ethers.utils.computeAddress(_VCID);
    for(const method of _DID_DOCUMENT.didDocument.verificationMethod) {
        const check = method.blockchainAccountId.includes(ADDRESS_VCID);
        if(check) {
            return true;
        }
    }
    return false;
}
