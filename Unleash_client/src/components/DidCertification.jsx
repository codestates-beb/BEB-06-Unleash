import { Fragment, useEffect, useState , useContext } from "react";
import Nationality_selectBox from "../components/Ticketing_selectBox/Nationality_selectBox";
import CountryCode_selectBox from "../components/Ticketing_selectBox/CountryCode_selectBox";
import { ListContext } from "../resources/context_store/ListContext";
import {ethers, Contract} from "ethers";
import erc1155ABI from '../resources/exAbi.json';
import Swal from 'sweetalert2';


import  VcPopup  from "./VcPopup";



import {
  verifyJWT,
  DIDtoAddress,
  IATA_DID_Document,
  verifyVCID,
  verifyValidDelegate,
} from "../helper/DID";
import axios from "axios";

function DidCertification(props) {
  const erc1155Address = "0x62b32166F925FA3f7a0b01B87c4354ab5A488018"
  // const erc1155ABI = "abi data"
  const context = useContext(ListContext);
  const { userData , selectedNft } = context;
  const [vcPopup , setVcPopup] = useState(false);

  const [month, setMonth] = useState([ "Month" , "1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "11" , "12"  ]);
  const [day , setDay] = useState([]);
  const [year , setYear] = useState([]);
  const [gender , setGender] = useState(["Select gender" , "Female" , "Male"]);

  const [r_month, setR_Month] = useState();
  const [r_day , setR_Day] = useState();
  const [r_year , setR_Year] = useState();

  const [account , setCurrentAccount ] = useState("");
  const [email , setEmail ] = useState("");
  const [sure_name , setSure_name ] = useState("");
  const [given_name , setGiven_name ] = useState("");
  const [nick_name , setNick_name ] = useState("");
  const [national , setNational ] = useState("");
  const [country_code , Setcountry_code ] = useState("");
  const [phone_number , SetPhone_number ] = useState("");
  const [vc , setvc ] = useState("");


  const [vcJwt, setVcJwt] = useState(undefined);
  const [VCID, setVCID] = useState(undefined);
  const [claimMsg,setClaimMsg] = useState(undefined)
  const [verifyMsg, setVerifyMsg] = useState(undefined);


  const [credentialSubject, setCredentialSubject] = useState({
    sure_name: undefined,
    given_name: undefined,
    country_code: undefined,
    phone_number: undefined,
    national: undefined,
    email: undefined,
    DateOfIssue: undefined,
  });


  const onChangeNation = (e) => {
    let value = e.target.value;
    setNational(value);
  }

  const onChangeCountryCode = (e) => {
    let value = e.target.value;
    Setcountry_code(value);
  }

  useEffect(() => {
    let result = ["Day"];
    for (let i = 1; i < 32; i++) {
      result.push(i);
    }
    setDay(result);

    let result2 = ["Year"];
    for (let i = 1900; i < 2028; i++) {
      result2.push(i);
    }
    setYear(result2);
  }, []);

  // VC ??????
  const claimVC = async () => {
    try {
      props.setDidLoading(true);
      props.setText( "?????? ?????????????????? ??? 5~15??? ?????? ????????????, ???????????? Goerli ???????????? ????????? ?????? ???????????? ????????????.");
      // VC ?????? ??? ?????? ??????
      const result = await axios.post(
        process.env.REACT_APP_IATA_BACKEND_URL + "/did/claimVC",
        {
          walletAddress: userData.wallet_address,
        }
      );

      setVcJwt(result.data.vc);

      // JWT ??????
      const result_verifyJWT = await verifyJWT(result.data.vc);

      // ?????? ?????? ???
      if (!result_verifyJWT) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: '???????????? ?????? VC ?????????.',
          showConfirmButton: false,
          timer: 1500
        })
        props.setDidLoading(false);
        return;
      }

      // ?????? ????????? JWT Payload ????????? ??????
      const userInfo = result_verifyJWT.payload.vc.credentialSubject.user;
      const vcID = result_verifyJWT.issuer;

      setCredentialSubject(userInfo);
      setVCID(vcID);

    } catch (error) {
      if (error.response.status === 400) {
        props.setDidLoading(false);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'IATA??? ??????????????? ????????? ????????????. ??????????????? ?????? ??????????????????.',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 1500
      })
    } finally {
      setVcPopup(true);
      props.setDidLoading(false);
    }
  };

  // DID VC??? SSI??? ???????????? ?????? ????????? ???????????? ????????? ??????????????? DB??? ????????? VC JWT ?????? API ??????
  const requestVC = async () => {
    try {
      // IATA DB??? ??? JWT VC ??????
      const result = await axios.post(
        process.env.REACT_APP_IATA_BACKEND_URL + "/did/requestVC",
        {
          walletAddress: userData.wallet_address,
        }
      );

      if (result.status == 204) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: "????????? VC??? ????????????. ?????? ?????? ???????????????.",
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }

      setVcJwt(result.data.vc);

      // JWT ??????
      const result_verifyJWT = await verifyJWT(result.data.vc);

      // ?????? ?????? ???
      if (!result_verifyJWT) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: "???????????? ?????? VC ?????????.",
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }

      // ?????? ????????? JWT Payload ????????? ??????
      const userInfo = result_verifyJWT.payload.vc.credentialSubject.user;
      // const issuerInfo = result_verifyJWT.payload.vc.credentialSubject.issuer;
      const vcID = result_verifyJWT.issuer;


      // ????????? ???????????? ??????
      const ID_Address = DIDtoAddress(vcID);
      const result_verifyValidDelegate = await verifyValidDelegate(ID_Address);

      //  ???????????? ?????????
      if (!result_verifyValidDelegate) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: "???????????? ??????????????? ???????????????. VC ???????????? ????????? ????????????.",
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }

      setCredentialSubject(userInfo);
      setVCID(vcID);
      setUserData(userInfo);
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  
  // VC ??????
  const verifyVC = async() => {
    try {
      // setVerifyMsg("Verifiable Credential ?????? ??????...")
      props.setDidLoading(true);
      props.setText( "?????? ?????????????????? ??? 1~2??? ?????? ????????????, ???????????? Goerli ???????????? ????????? ?????? ???????????? ????????????.");
      const _DID_DOCUMENT = await IATA_DID_Document();
      const _VCID = DIDtoAddress(VCID);
      const result = await verifyVCID(_VCID,_DID_DOCUMENT);  

      if(!result) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: "IATA????????? ???????????? VC??? ????????????.",
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }
      // todo : NFT ??????

          // ???????????????
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new Contract(erc1155Address, erc1155ABI, signer);

    // const sendERC1155 = async() => {
      const tx = await contract.connect(signer).safeTransferFrom(
          userData.wallet_address,
          "0x0000000000000000000000000000000000000001",
          selectedNft[0].token_id,
          1,
          "0x00"
      )
      const rxResult = await tx.wait();

      console.log(rxResult);
      if (rxResult) {
      await axios.put("http://localhost:5001/marketplace/exchange", {
        amount : 1,
        user_id : userData.id,
        token_id : selectedNft[0].token_id,
        seller: userData.wallet_address
      }, {
        withCredentials: true
      }).catch(e => {
        console.log(e);
        return;
      })

      props.setticket(true);
    }
      
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 1500
      })
      props.setDidLoading(false);
    } finally {
      // setVerifyMsg("End Request")
      props.setDidLoading(false);
    
    }
  }

  const setUserData = (data) => {

    setCurrentAccount(data.wallet_address);
    setEmail(data.email);
    setSure_name(data.sure_name);
    setGiven_name(data.given_name);
    setNick_name(data.nick_name);
    setNational(data.national);
    Setcountry_code(data.country_code);
    SetPhone_number(data.phone_number);

    let birth = data.DateOfIssue;

    setR_Year(birth.substr(0,4));
    var r_year = document.querySelector('#r_year');
    r_year.value = birth.substr(0,4);

    let month = birth.substr(5,2);
    if (month.substr(5,1) == "0") {
      month = birth.substr(6,1);
    }

    setR_Month(month);
    var r_month = document.querySelector('#r_month');
    r_month.value = month;


    let day = birth.substr(8,2);
    if (birth.substr(8,1) == "0") {
      day = birth.substr(8,1);
    }

    setR_Day(day);
    var r_day = document.querySelector('#r_day');
    r_day.value = day;

  }

  const onClickFinsh = async() => {
    try {
      await verifyVC();
   
    } catch (error) {
      
    } 
  }

  const vcSolve = async() => {

    if (vc.length == 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "vc??? ?????? ????????????",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    // JWT ??????
    const result_verifyJWT = await verifyJWT(vc);

    // ?????? ?????? ???
    if (!result_verifyJWT) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "???????????? ?????? VC ?????????.",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    // ?????? ????????? JWT Payload ????????? ??????
    const userInfo = result_verifyJWT.payload.vc.credentialSubject.user;
    // const issuerInfo = result_verifyJWT.payload.vc.credentialSubject.issuer;
    const vcID = result_verifyJWT.issuer;
    // console.log(vcID);

    // ????????? ???????????? ??????
    const ID_Address = DIDtoAddress(vcID);
    const result_verifyValidDelegate = await verifyValidDelegate(ID_Address);

    //  ???????????? ?????????
    if (!result_verifyValidDelegate) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "???????????? ??????????????? ???????????????. VC ???????????? ????????? ????????????.",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    setCredentialSubject(userInfo);
    setVCID(vcID);
    setUserData(userInfo);
    
  }

  return (
    <Fragment>
     
      <div className="didCertification_box">
        <div className="tiketing_box" style={{ marginTop: "100px" }} >
          <div className="tiketing_top">
            {/* <div
              className="tiketing_finsh_button did"
              style={{ marginRight: "40px" }}
              onClick={requestVC}
            >
              Request VC
            </div> */}
            <div className="tiketing_finsh_button did" onClick={claimVC}>
              Claim VC
            </div>
            {claimMsg}
          </div>

          <div className="tiketing_oneLine">
            <div className="tiketing_Line sixty">
              <div className="tiketing_Line_text">JWT Of Verifiable Credential</div>
              <input
                className="tiketing_Line_input"
                placeholder="Verifiable Credential"
                value={vc}
                onChange={(e) => setvc(e.target.value)}
              />
            </div>

            <div className="connect_wallet_button" onClick={vcSolve}  >Vc Solve</div>


          </div>

          <div className="tiketing_oneLine">
              <div className="tiketing_Line half" >
                <div className="tiketing_Line_text" >First name</div> 
                <input className="tiketing_Line_input" onChange={(e) => setSure_name(e.target.value)} value={sure_name} placeholder="First and middle name"  />
              </div>

              <div className="tiketing_Line half" >
                <div className="tiketing_Line_text" >Last name</div> 
                <input className="tiketing_Line_input" onChange={(e) => setGiven_name(e.target.value)} value={given_name} placeholder="Last name"  />
              </div>
            </div>

            <div className="tiketing_oneLine">
              <div className="tiketing_Line third" >
                <div className="tiketing_Line_text" >Date of birth</div> 
                <select className="tiketing_Line_selectBox" id="r_month" onChange={ (e) => setR_Month(e.target.value) } value={r_month}   >
                  {month.map((value,key) => (
                    <option  key={key} value={value} >{value}</option>
                  ))}
                </select>
              </div>

              <div className="tiketing_Line third" >
                <select className="tiketing_Line_selectBox" id="r_day" onChange={ (e) => setR_Day(e.target.value) } value={r_day}  >
                  {day.map((value,key) => (
                    <option  key={key} value={value} >{value}</option>
                  ))}
                </select>
              </div>

              <div className="tiketing_Line third" >
                <select className="tiketing_Line_selectBox" id="r_year" onChange={ (e) => setR_Year(e.target.value) } value={r_year}   >
                  {year.map((value,key) => (
                    <option  key={key} value={value} >{value}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="tiketing_oneLine">
              <div className="tiketing_Line half" >
                <div className="tiketing_Line_text" >Gender</div> 
                  <select className="tiketing_Line_selectBox" >
                  {gender.map((value,key) => (
                    <option key={key} value={value} >{value}</option>
                  ))}
                </select>
              </div>

              <div className="tiketing_Line half" >
                <div className="tiketing_Line_text" >Nationality</div> 
                <Nationality_selectBox onChangeNation={onChangeNation}  national={national} />
              </div>
            </div>

            <div className="tiketing_oneLine">
              <div className="tiketing_Line third" >
                {/* <div className="tiketing_Line_text_bold">Contact information</div> */}
                <div className="tiketing_Line_text" >Country code</div> 
                <CountryCode_selectBox onChangeCountryCode={onChangeCountryCode} country_code={country_code} />
              </div>

              <div className="tiketing_Line sixty" >
                <div className="tiketing_Line_text" >Phone number</div> 
                <input className="tiketing_Line_input" onChange={(e) => SetPhone_number(e.target.value)} value={phone_number} placeholder="Enter phone number"  />
              </div>
            </div>

            <div className="tiketing_oneLine">
              <div className="tiketing_Line full" >
                <div className="tiketing_Line_text" >Email</div> 
                <input className="tiketing_Line_input"  onChange={(e) => setEmail(e.target.value)} value={email}  placeholder="Enter a valid email address"  />
              </div>
            </div>

            <div className="tiketing_oneLine">
              <div className="tiketing_Line sixty" >
                <div className="tiketing_Line_text" >Wallet</div> 
                <input className="tiketing_Line_input" value={account} onChange={ e => setCurrentAccount(e.target)}  placeholder="Wallet"  />
              </div>

              <div className="connect_wallet_button on"  >Connect Wallet</div>
            </div>

            <div className="tiketing_finsh_button" onClick={onClickFinsh} >swap</div>
            <div>{verifyMsg}</div>
        </div>
      </div>

      { vcPopup && (
          <VcPopup vcJwt={vcJwt} setVcPopup={setVcPopup} />
      )}
    </Fragment>
  );
}

export default DidCertification;
