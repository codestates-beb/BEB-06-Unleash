import { Fragment, useEffect , useState } from "react";
import Nationality_selectBox from '../components/Ticketing_selectBox/Nationality_selectBox';
import CountryCode_selectBox from '../components/Ticketing_selectBox/CountryCode_selectBox'; 

function DidCertification() {
  const [month, setMonth] = useState([ "Month" , "January" , "February" , "March" , "April" , "May" , "June" , "July" , "Auguest" , "September" , "October" , "November" , "December"  ]);
  const [day , setDay] = useState([]);
  const [year , setYear] = useState([]);
  const [gender , setGender] = useState(["Select gender" , "Female" , "Male"]);
  const [account , setCurrentAccount ] = useState("");

  useEffect(() => {
    let result = ["Day"];
    for ( let i = 1; i < 32; i++) {
      result.push(i);
    }
    setDay(result);

    let result2 = ["Year"];
    for ( let i = 1900; i < 2022; i++) {
      result2.push(i);
    }
    setYear(result2);
  },[]);


  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="didCertification_box" >
        <div className="ticketing_title" ></div>
        <div className="tiketing_box" >

        <div className="tiketing_top">
            <div className="tiketing_finsh_button did" style={{ marginRight : "40px" }} >Request VC</div>
            <div className="tiketing_finsh_button did" >Claim VCX</div>
        </div>

          <div className="tiketing_oneLine">
            <div className="tiketing_Line full" >
              <div className="tiketing_Line_text" >First name</div> 
              <input className="tiketing_Line_input" placeholder="Email"  />
            </div>
          </div>

          <div className="tiketing_oneLine">
            <div className="tiketing_Line half" >
              <div className="tiketing_Line_text" >First name</div> 
              <input className="tiketing_Line_input" placeholder="First and middle name"  />
            </div>

            <div className="tiketing_Line half" >
              <div className="tiketing_Line_text" >Last name</div> 
              <input className="tiketing_Line_input" placeholder="Last name"  />
            </div>
          </div>

          <div className="tiketing_oneLine">
            <div className="tiketing_Line third" >
              <div className="tiketing_Line_text" >Date of birth</div> 
              <select className="tiketing_Line_selectBox" >
                {month.map((value,key) => (
                  <option key={key} value={value} >{value}</option>
                ))}
              </select>
            </div>

            <div className="tiketing_Line third" >
              <select className="tiketing_Line_selectBox" >
                {day.map((value,key) => (
                  <option key={key} value={value} >{value}</option>
                ))}
              </select>
            </div>

            <div className="tiketing_Line third" >
              <select className="tiketing_Line_selectBox" >
                {year.map((value,key) => (
                  <option key={key} value={value} >{value}</option>
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
              <Nationality_selectBox />
            </div>
          </div>

          
          <div className="tiketing_oneLine">
            <div className="tiketing_Line third" >
              {/* <div className="tiketing_Line_text_bold">Contact information</div> */}
              <div className="tiketing_Line_text" >Country code</div> 
              <CountryCode_selectBox />
            </div>

            <div className="tiketing_Line sixty" >
              <div className="tiketing_Line_text" >Phone number</div> 
              <input className="tiketing_Line_input" placeholder="Enter phone number"  />
            </div>
          </div>


          <div className="tiketing_oneLine">
            <div className="tiketing_Line full" >
              <div className="tiketing_Line_text" >Email</div> 
              <input className="tiketing_Line_input" placeholder="Enter a valid email address"  />
            </div>
          </div>


          <div className="tiketing_oneLine">
            <div className="tiketing_Line sixty" >
              <div className="tiketing_Line_text" >Wallet</div> 
              <input className="tiketing_Line_input" value={account} onChange={ e => setCurrentAccount(e.target)}  placeholder="Wallet"  />
            </div>

            <div className={"connect_wallet_button on"}  onClick={connectWallet} >Connect Wallet</div>
          </div>


       



        </div>
      </div>
  );
}

export default DidCertification;
