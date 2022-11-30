import React, {useState, useContext} from "react";
import MarketPlaceCalander from "./MarketPlaceCalander";
import { TestContext } from "../../resources/context_store/Test";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ListContext } from "../../resources/context_store/ListContext";

const MarketPlaceAside = () => {
  const context = useContext(TestContext);
  const conetext2 = useContext(ListContext);
  const navigate = useNavigate();
  const {isOpen, setIsOpen, isOpen2, setIsOpen2} = context;
  const {setList} = conetext2;
  const ToBox = { Roma : "FCO" , Osaka : "ITM" , Sydney : "SYD" , NewYork : "JFK" , Paris: "CDG"}

  // 아래의 내용은 context 에서 전역으로 설정되서 온 것을 바꿔주면됨.
  const [city, setCity] = useState('');
  const [departDate, setDepartDate] = useState(new Date('12/01/2022'));

  const cities = ["Paris", "NewYork", "Osaka", "Sydney", "Roma"]
  const [bg, setBg] = useState(false);

  const handleDButtonClick = (e) => {
    setIsOpen(() => !isOpen);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city || !departDate) return alert("도시와 출발일자를 선택해주세요.")
    let filter = {city: city, departDate: departDate}
    let To = ToBox[filter.city];
    let params = {  "from" : "ICN" };
    params["to"] = To;
    params["departuretime"] = new Date(departDate.getTime() - (departDate.getTimezoneOffset() * 60000)).toISOString().substr(0, 11);
    axios.get('http://localhost:5001/marketplace/ticket', {params} )
    .then(res => {
      const data = res.data;
      const list = JSON.stringify([...data]);
      localStorage.setItem("marketList", list);
      setList(() => res.data);
      //window.location.reload();
    })
    .catch(e => {
      console.log(e);
      return e;
    })
  }
  const handleClick = (e) => {
    console.log(bg)
    setBg(() => !bg);
    setCity(e.target.textContent)
  }
  // 전체 도시 리스트 완성되면 , 배열 만들어서 46번째 li부분 map처리.
  return (
    
      <div>
        <aside className="marketplace_contents_sidebar">
          <form className="marcketplace_contents_sidebar_container" onSubmit={handleSubmit}>
              <button type="button" className="marketplace_contents_collapse" onClick={handleDButtonClick}>Set Destination</button>
              {isOpen &&
              <ul className="marketplace_contents_destination" >
                {cities.map((item, idx) => <li onClick={handleClick} className={bg ? "active_destination_list" : ""} key={idx}><p>{item}</p></li>)}
              </ul>}
            <MarketPlaceCalander departDate={departDate} setDepartDate={setDepartDate}/>
            <button className="marketplace_search" type="submit">search</button>
          </form>
        </aside>
      </div>
  );
};

export default MarketPlaceAside;
