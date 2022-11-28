import React, {useState, useContext} from "react";
import MarketPlaceCalander from "./MarketPlaceCalander";
import { TestContext } from "../../resources/context_store/Test";
import axios from "axios"
import { ListContext } from "../../resources/context_store/ListContext";

const MarketPlaceAside = () => {
  const context = useContext(TestContext);
  const conetext2 = useContext(ListContext);
  // 해야할거, sidebar glow effect, postion 지정,
  // 여기서 선택하는거 state 로 올리기. form태그.
  // 날짜?
  const {isOpen, setIsOpen, isOpen2, setIsOpen2} = context;

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
    const filter = {city: city, departDate: departDate}
    console.log(filter)
  }
  const handleClick = (e) => {
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
              <ul className="marketplace_contents_destination" onClick={handleClick}>
                {cities.map((item, idx) => <li key={idx} style={bg? {backgroundColor: "blue"} : {}}><p>{item}</p></li>)}
              </ul>}
            <MarketPlaceCalander departDate={departDate} setDepartDate={setDepartDate}/>
            <button className="marketplace_search" type="submit">search</button>
          </form>
        </aside>
      </div>
  );
};

export default MarketPlaceAside;
