import { BsFillPersonFill } from "react-icons/bs";
import { Fragment, useEffect , useState } from "react";
import FirstNFT from "../components/NFTs/FirstNFT"
import Nationality_selectBox from '../components/Ticketing_selectBox/Nationality_selectBox';
import CountryCode_selectBox from '../components/Ticketing_selectBox/CountryCode_selectBox'; 
import $ from "jquery";


function TicketingPage() {
  const [month, setMonth] = useState([ "Month" , "January" , "February" , "March" , "April" , "May" , "June" , "July" , "Auguest" , "September" , "October" , "November" , "December"  ]);
  const [day , setDay] = useState([]);
  const [year , setYear] = useState([]);
  const [gender , setGender] = useState(["Select gender" , "Female" , "Male"]);
  const [nftFixed , setnftFixed] = useState(false);

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


  useEffect(() => {
    $(window).scroll(function () {
      var scrollValue = $(document).scrollTop();
      if (  scrollValue >= 150 ) {
        setnftFixed(true);
      } else {
        setnftFixed(false);
      }
    });
  });

  return (
    <div className="ticketing" >
      <div className="ticketing_center_box" >
        <div className="ticketing_title" >Passenger information</div>
        <div className="ticketing_title_sub" >Please make sure that the details below match the information on your passport</div>
        <div className="tiketing_box" >

          <div className="tiketing_passenger" >
            <div className="tiketing_passenger_box" >
              <BsFillPersonFill className="tiketing_passenger_icon" />
            </div>
            <div className="tiketing_passenger_text" >Passenger</div>
            <div className="tiketing_passenger_text_sub">Adult | Korea</div>
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
              <div className="tiketing_Line_text_bold">Contact information</div>
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
              <div className="tiketing_Line_text_bold">Emergency contact</div>
              <div className="tiketing_Line full" >
                <div className="tiketing_Line_text" >Name</div> 
                <input className="tiketing_Line_input" placeholder="Enter your emergency contact`s name"  />
              </div>
          </div>

          <div className="tiketing_oneLine">
            <div className="tiketing_Line third" >
              <div className="tiketing_Line_text" >Country code</div> 
              <CountryCode_selectBox />
            </div>

            <div className="tiketing_Line sixty" >
              <div className="tiketing_Line_text" >Phone number</div> 
              <input className="tiketing_Line_input" placeholder="Enter phone number"  />
            </div>
          </div>
        </div>
        <div className="tiketing_buy_box" >

          <div className="tiketing_buy_total" >Total price</div>
          <div className="tiketing_buy_price" >USDT <span>253</span></div>
          <div className="tiketing_buy_button">Buy</div>

        </div>
        <div className={"tiketing_nft_box" + ( nftFixed ? " on" : "") } >
         <FirstNFT />
        </div>
      </div>
    </div>
  );
}

export default TicketingPage;
