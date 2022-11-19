import { useEffect , useState } from "react";
import { TransitionGroup, Transition } from "react-transition-group";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const MainPage = () => {
  const [departDate, setDepartDate] = useState(new Date('12/01/2022'));
  const [departDateOpen, setDepartDateOpen] = useState(false);
  const [returnDate, setReturnDate] = useState(new Date('12/31/2022'));
  const [returnDateOpen, setReturnDateOpen] = useState(false);
  const [toPlace, setToPlace] = useState("paris");
  const [toPlaceSelectBox, setToPlaceSelectBox] = useState(false);

   const onOpenDepartDate = () => {
      setDepartDateOpen(true);
   }

  const onChangeDepartDate = (e) => {
    setDepartDate(e);
    console.log(departDate);
    setDepartDateOpen(false);
  }

  const onOpenReturnDate = () => {
    setReturnDateOpen(true);
 }

  const onChangeReturnDate = (e) => {
    setReturnDate(e);
    setReturnDateOpen(false);
  }

  const onClickToValue = (e) => {
    if(e) e.stopPropagation()
    let value = e.currentTarget.attributes.value.value;
    setToPlace(value);
    setToPlaceSelectBox(false);
  }

  const onClickToPlaceSelectBox = () => {
    setToPlaceSelectBox(true);
  }

    return (
      <Transition in={true} timeout={200} appear>
        {(status)=>(
          <div className={`mainPage_overFlow ${status}`} >
            <div className="mainPage" >

              <div className="mainPage_ticketing_box" >
                <div className="mainPage_ticketing_text" >Flight</div>

                <div className="mainPage_ticketing_detail_box">
                  <div className="mainPage_ticketing_detail_form" >
                    <div className="mainPage_ticketing_name">From</div>
                    <div className="mainPage_ticketing_select">seoul</div>
                  </div>
                  <div className="mainPage_ticketing_detail_form" onClick={onClickToPlaceSelectBox}  >
                    <div className="mainPage_ticketing_name">To</div>
                    <div className="mainPage_ticketing_select">{toPlace}</div>
                    {toPlaceSelectBox && (
                      <div className="mainPage_ticketing_select_box" >
                        <div className="mainPage_ticketing_select_text" onClick={onClickToValue} value={"paris"} >paris</div>
                        <div className="mainPage_ticketing_select_text" onClick={onClickToValue} value={"osaka"} >osaka</div>
                        <div className="mainPage_ticketing_select_text" onClick={onClickToValue} value={"austrailia"} >austrailia</div>
                        <div className="mainPage_ticketing_select_text" onClick={onClickToValue} value={"newyork"} >newyork</div>
                        <div className="mainPage_ticketing_select_text" onClick={onClickToValue} value={"roma"} >roma</div>
                      </div>
                    )}
                  </div>
                  <div className="mainPage_ticketing_detail_form" onClick={onOpenDepartDate} >
                    <div className="mainPage_ticketing_name">Depart date</div>
                    <div className="mainPage_ticketing_select">{moment(departDate).format("YYYY년 MM월 DD일")} </div>
                    {departDateOpen && (
                      <div className="mainPage_tiketting_calendar_box" >
                        <Calendar onChange={onChangeDepartDate} value={departDate} />
                      </div>
                    )}
                  </div>
                  
                  <div className="mainPage_ticketing_detail_form"  onClick={onOpenReturnDate} >
                    <div className="mainPage_ticketing_name">Return date</div>
                    <div className="mainPage_ticketing_select">{moment(returnDate).format("YYYY년 MM월 DD일")} </div>
                    {returnDateOpen && (
                      <div className="mainPage_tiketting_calendar_box" >
                        <Calendar onChange={onChangeReturnDate} value={returnDate} />
                      </div>
                    )}
                  </div>

                  <div style={{ display: "inline-block" , position: "relative"  }} >
                   <input placeholder="1" className="mainPage_tiketing_input"/> 
                   <div className="mainPage_tiketting_input_text" > Number of people</div>
                  </div>
                  
                  <div className="mainPage_tiketing_button" >Search</div>
                </div>
              </div>

            </div>
            <div className="mainpage_landing">
              <div className="mainpage_landing_bg" ></div>
              <div className="mainpage_landing_bg bg2"></div>
              <div className="mainpage_landing_bg bg3"></div>
            </div>
         </div>
        )}
      </Transition>
    );
  }
  
  export default MainPage;
  