import React, {useState, useContext, Fragment} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";


const MarketPlaceCalander = (props) => {
  const [departDateOpen, setDepartDateOpen] = useState(false);
  const {departDate, setDepartDate} = props;

  const onOpenDepartDate = () => {
    setDepartDateOpen(true);
 }

const onChangeDepartDate = (e) => {
  setDepartDate(e);
  const a = new Date(departDate.getTime() - (departDate.getTimezoneOffset() * 60000)).toISOString().substr(0, 11)
  setDepartDateOpen(false);
}
  return (
    <Fragment>
      <div className="mainPage_ticketing_detail_form" onClick={onOpenDepartDate} >
        <div className="mainPage_ticketing_name">Depart date</div>
        <div className="mainPage_ticketing_select">{moment(departDate).format("YYYY년 MM월 DD일")} </div>
        {departDateOpen && (
          <div className="mainPage_tiketting_calendar_box">
            <Calendar onChange={onChangeDepartDate} value={departDate} formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}/>
          </div>
        )}
      </div>
    </Fragment>

  );
};

export default MarketPlaceCalander;
