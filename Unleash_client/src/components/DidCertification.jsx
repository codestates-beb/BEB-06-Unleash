import { Fragment, useEffect, useState } from "react";
import Nationality_selectBox from "../components/Ticketing_selectBox/Nationality_selectBox";
import CountryCode_selectBox from "../components/Ticketing_selectBox/CountryCode_selectBox";
import {
  verifyJWT,
  DIDtoAddress,
  IATA_DID_Document,
  verifyVCID,
  verifyValidDelegate,
} from "../helper/DID";
import axios from "axios";

function DidCertification() {
  const [month, setMonth] = useState([
    "Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Auguest",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [day, setDay] = useState([]);
  const [year, setYear] = useState([]);
  const [gender, setGender] = useState(["Select gender", "Female", "Male"]);
  const [account, setCurrentAccount] = useState("");

  const [vcJwt, setVcJwt] = useState(undefined);
  const [VCID, setVCID] = useState(undefined);
  const [claimMsg,setClaimMsg] = useState(undefined)

  const [credentialSubject, setCredentialSubject] = useState({
    sure_name: undefined,
    given_name: undefined,
    country_code: undefined,
    phone_number: undefined,
    national: undefined,
    email: undefined,
    DateOfIssue: undefined,
  });

  useEffect(() => {
    let result = ["Day"];
    for (let i = 1; i < 32; i++) {
      result.push(i);
    }
    setDay(result);

    let result2 = ["Year"];
    for (let i = 1900; i < 2022; i++) {
      result2.push(i);
    }
    setYear(result2);
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // VC 발급
  const claimVC = async () => {
    try {
      setClaimMsg("{지갑주소}로 VC 생성 요청 중입니다. 약 5~15초 정도 소요되며,\n 이더리움 Goerli 네트워크 상태에 따라 지연될수 있습니다.")
      // VC 발급 및 갱신 요청
      const result = await axios.post(
        process.env.REACT_APP_IATA_BACKEND_URL + "/did/claimVC",
        {
          walletAddress: "0x3aFA93a829a3d12D56336e6320559C8A372e76AE",
        }
      );

      setVcJwt(result.data.vc);

      // JWT 검증
      const result_verifyJWT = await verifyJWT(result.data.vc);

      // 검증 실패 시
      if (!result_verifyJWT) {
        alert("유효하지 않은 VC 입니다.");
        return;
      }

      // 검증 성공시 JWT Payload 데이터 조회
      const userInfo = result_verifyJWT.payload.vc.credentialSubject.user;
      const vcID = result_verifyJWT.issuer;

      setCredentialSubject(userInfo);
      setVCID(vcID);

    } catch (error) {
      if (error.response.status === 400) {
        alert(
          "IATA에 회원가입된 정보가 없습니다. 회원가입을 먼저 진행해주세요."
        );
        return;
      }
      alert(error);
    } finally {
      setClaimMsg("")
    }
  };

  // VC 요청
  const requestVC = async () => {
    try {
      // IATA DB에 내 JWT VC 요청
      const result = await axios.post(
        process.env.REACT_APP_IATA_BACKEND_URL + "/did/requestVC",
        {
          walletAddress: "0x3aFA93a829a3d12D56336e6320559C8A372e76AE",
        }
      );

      if (result.status == 204) {
        alert("발급된 VC가 없습니다. 새로 발급 받아주세요.");
        return;
      }
      setVcJwt(result.data.vc);

      // JWT 검증
      const result_verifyJWT = await verifyJWT(result.data.vc);

      // 검증 실패 시
      if (!result_verifyJWT) {
        alert("유효하지 않은 VC 입니다.");
        return;
      }

      // 검증 성공시 JWT Payload 데이터 조회
      const userInfo = result_verifyJWT.payload.vc.credentialSubject.user;
      // const issuerInfo = result_verifyJWT.payload.vc.credentialSubject.issuer;
      const vcID = result_verifyJWT.issuer;
      console.log(vcID);

      // 인증서 유효기간 검증
      const ID_Address = DIDtoAddress(vcID);
      const result_verifyValidDelegate = await verifyValidDelegate(ID_Address);

      //  유효기간 지나면
      if (!result_verifyValidDelegate) {
        alert("인증서의 유효기간이 지났습니다. VC 유효기간 갱신을 해주세요.");
        return;
      }

      setCredentialSubject(userInfo);
      setVCID(vcID);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="didCertification_box">
      <div className="ticketing_title"></div>
      <div className="tiketing_box">
        <div className="tiketing_top">
          <div
            className="tiketing_finsh_button did"
            style={{ marginRight: "40px" }}
            onClick={requestVC}
          >
            Request VC
          </div>
          <div className="tiketing_finsh_button did" onClick={claimVC}>
            Claim VC
          </div>
          {claimMsg}
        </div>

        <div className="tiketing_oneLine">
          <div className="tiketing_Line full">
            <div className="tiketing_Line_text">Verifiable Credential</div>
            <input
              className="tiketing_Line_input"
              placeholder="Verifiable Credential"
            />
          </div>
        </div>

        <div className="tiketing_oneLine">
          <div className="tiketing_Line half">
            <div className="tiketing_Line_text">First name</div>
            <input
              className="tiketing_Line_input"
              placeholder="First and middle name"
            />
          </div>

          <div className="tiketing_Line half">
            <div className="tiketing_Line_text">Last name</div>
            <input className="tiketing_Line_input" placeholder="Last name" />
          </div>
        </div>

        <div className="tiketing_oneLine">
          <div className="tiketing_Line third">
            <div className="tiketing_Line_text">Date of birth</div>
            <select className="tiketing_Line_selectBox">
              {month.map((value, key) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="tiketing_Line third">
            <select className="tiketing_Line_selectBox">
              {day.map((value, key) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="tiketing_Line third">
            <select className="tiketing_Line_selectBox">
              {year.map((value, key) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="tiketing_oneLine">
          <div className="tiketing_Line half">
            <div className="tiketing_Line_text">Gender</div>
            <select className="tiketing_Line_selectBox">
              {gender.map((value, key) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="tiketing_Line half">
            <div className="tiketing_Line_text">Nationality</div>
            <Nationality_selectBox />
          </div>
        </div>

        <div className="tiketing_oneLine">
          <div className="tiketing_Line third">
            {/* <div className="tiketing_Line_text_bold">Contact information</div> */}
            <div className="tiketing_Line_text">Country code</div>
            <CountryCode_selectBox />
          </div>

          <div className="tiketing_Line sixty">
            <div className="tiketing_Line_text">Phone number</div>
            <input
              className="tiketing_Line_input"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="tiketing_oneLine">
          <div className="tiketing_Line full">
            <div className="tiketing_Line_text">Email</div>
            <input
              className="tiketing_Line_input"
              placeholder="Enter a valid email address"
            />
          </div>
        </div>

        <div className="tiketing_oneLine">
          <div className="tiketing_Line sixty">
            <div className="tiketing_Line_text">Wallet</div>
            <input
              className="tiketing_Line_input"
              value={account}
              onChange={(e) => setCurrentAccount(e.target)}
              placeholder="Wallet"
            />
          </div>

          <div className={"connect_wallet_button on"} onClick={connectWallet}>
            Connect Wallet
          </div>
        </div>
      </div>
    </div>
  );
}

export default DidCertification;
