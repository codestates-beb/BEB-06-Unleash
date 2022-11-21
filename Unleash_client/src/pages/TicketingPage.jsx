import { BsFillPersonFill } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import FirstNFT from "../components/NFTs/FirstNFT"

function TicketingPage() {
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
              <div className="tiketing_Line_selectBox" >Month  <MdArrowDropDown  className="tiketing_Line_SelectBox_icon" /></div>
            </div>

            <div className="tiketing_Line third" >
              <div className="tiketing_Line_selectBox"  >Day <MdArrowDropDown  className="tiketing_Line_SelectBox_icon" /></div>
            </div>

            <div className="tiketing_Line third" >
              <div className="tiketing_Line_selectBox" >Year <MdArrowDropDown  className="tiketing_Line_SelectBox_icon" /></div>
            </div>
          </div>

          <div className="tiketing_oneLine">
            <div className="tiketing_Line half" >
              <div className="tiketing_Line_text" >Gender</div> 
              <div className="tiketing_Line_selectBox" > Select gender  <MdArrowDropDown  className="tiketing_Line_SelectBox_icon" /></div>
            </div>

            <div className="tiketing_Line half" >
              <div className="tiketing_Line_text" >Nationality</div> 
              <div className="tiketing_Line_selectBox"  >United States <MdArrowDropDown  className="tiketing_Line_SelectBox_icon" /></div>
            </div>
          </div>

          
          <div className="tiketing_oneLine">
            <div className="tiketing_Line third" >
              <div className="tiketing_Line_text_bold">Contact information</div>
              <div className="tiketing_Line_text" >Country code</div> 
              <div className="tiketing_Line_selectBox" > +1  <MdArrowDropDown  className="tiketing_Line_SelectBox_icon" /></div>
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
              <div className="tiketing_Line_selectBox" > +1  <MdArrowDropDown  className="tiketing_Line_SelectBox_icon" /></div>
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
        <div className="tiketing_nft_box" >
         <FirstNFT />
        </div>
      </div>
    </div>
  );
}

export default TicketingPage;
