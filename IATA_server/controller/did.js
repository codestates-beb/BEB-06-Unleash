const { ethers } = require("ethers");
const { EthrDID, DelegateTypes } = require("ethr-did");
const {
  createVerifiableCredentialJwt,
  verifyCredential,
} = require("did-jwt-vc");
const {getDate} = require('../helper/did')
const db = require("../sequelize/models");

require("dotenv").config();
const chainNameOrId = 5;
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

const ISSUER_PK = process.env.ISSUER_PK;
const ISSUER_ADDRESS = process.env.ISSUER_ADDRESS;

const ISSUER_Signer = new ethers.Wallet(ISSUER_PK, provider);

// Issuer DID
const ISSUER_Did = new EthrDID({
    identifier: ISSUER_ADDRESS,
    privateKey: ISSUER_PK,
    provider: ISSUER_Signer.provider,
    chainNameOrId,
    txSigner: ISSUER_Signer,
    alg: "ES256K",
  });

module.exports = {
  claimVC: async (req, res) => {
    let responseData;
    try {
      const { walletAddress,expiresIn } = req.body;

      const result = await db["user"].findOne({
        where: {
          wallet_address: walletAddress,
        },
      });
      // 회원정보 없을 경우 return Error
      if (result == null) {
        responseData = {
          ok: false,
          message: "error : No user data",
        };
        return res.status(404).send(responseData);
      }

      const subjectDid = new EthrDID({
        chainNameOrId,
        // DID Identifier
        identifier: walletAddress,
      });
      const {email,sure_name,given_name,nick_name,national,country_code,phone_number,wallet_address} = result;
      const vcPayload = {
        sub: subjectDid.did,
        vc: {
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiableCredential"],
          credentialSubject: {
            issuer: {
              Authority: "IATA",
              Message:
                "This Credentials is valid for all countries unless otherwise endorsed.",
              Address: ISSUER_ADDRESS,
            },
            user: {
                email,
                sure_name,
                given_name,
                nick_name,
                national,
                country_code,
                phone_number,
                wallet_address,
                DateOfIssue: getDate(),
            },
          },
        },
      };

      // ISSUER : Add Delegate to ERC1056
      const addDelegate = await ISSUER_Did.createSigningDelegate(DelegateTypes.veriKey,expiresIn);
      const issuerDelegateKp = new EthrDID(
        Object.assign(Object.assign({}, addDelegate.kp), { chainNameOrId })
      );

      // Sign JWT VC
      const vcJwt = await createVerifiableCredentialJwt(
        vcPayload,
        issuerDelegateKp
      );

      return res.status(200).send(result);
    } catch (error) {
      console.log(`rqVC API ERROR : ${error}`);
      responseData = {
        ok: false,
        message: "error",
        data: {
          error: error,
        },
      };
      return res.status(404).send(responseData);
    }
  },
};
