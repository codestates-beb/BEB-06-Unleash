import React, {useState, useContext} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";


const MarketPlaceCalander = () => {
  const [departDate, setDepartDate] = useState(new Date('12/01/2022'));
  const [departDateOpen, setDepartDateOpen] = useState(false);
  const [returnDate, setReturnDate] = useState(new Date('12/31/2022'));
  const [returnDateOpen, setReturnDateOpen] = useState(false);

  const onOpenDepartDate = () => {
    setDepartDateOpen(() => !departDateOpen);
 }

const onChangeDepartDate = (e) => {
  setDepartDate(e);
  setDepartDateOpen(false);
}

const onOpenReturnDate = () => {
  setReturnDateOpen(() => !returnDateOpen);
}

const onChangeReturnDate = (e) => {
  setReturnDate(e);
  setReturnDateOpen(false);
}

  return (
    <>
      <div className="mainPage_ticketing_detail_form" onClick={onOpenDepartDate} >
        <div className="mainPage_ticketing_name">Depart date</div>
        <div className="mainPage_ticketing_select">{moment(departDate).format("YYYY년 MM월 DD일")} </div>
        {departDateOpen && (
          <div className="mainPage_tiketting_calendar_box" >
            <Calendar onChange={onChangeDepartDate} value={departDate}   formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}/>
          </div>
        )}
      </div>
      <div className="mainPage_ticketing_detail_form"  onClick={onOpenReturnDate} >
        <div className="mainPage_ticketing_name">Return date</div>
        <div className="mainPage_ticketing_select">{moment(returnDate).format("YYYY년 MM월 DD일")} </div>
        {returnDateOpen && (
          <div className="mainPage_tiketting_calendar_box" >
            <Calendar onChange={onChangeReturnDate} value={returnDate}  formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})} />
          </div>
        )}
      </div>
    </>

  );
};

export default MarketPlaceCalander;
