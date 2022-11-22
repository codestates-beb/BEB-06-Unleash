import React, {useState, useContext} from "react";
import MarketPlaceCalander from "./MarketPlaceCalander";
import { TestContext } from "../../resources/context_store/Test";
import axios from "axios"

const MarketPlaceAside = () => {
  const context = useContext(TestContext);
  // 해야할거, sidebar glow effect, postion 지정,
  // 여기서 선택하는거 state 로 올리기. form태그.
  // 날짜?
  const {isOpen, setIsOpen, isOpen2, setIsOpen2} = context;

  // 아래의 내용은 context 에서 전역으로 설정되서 온 것을 바꿔주면됨.
  const [city, setCity] = useState('');
  const [seatClass, setSeatClass] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleDButtonClick = () => {
    setIsOpen(() => !isOpen);
  }
  const handleCButtonClick = () => {
    setIsOpen2(() => !isOpen2);
  }
  const handleSubmit = () => {
    const filter = {city: city, seatClass: seatClass, departDate: departDate, returnDate: returnDate}
  }

  return (
    
      <div>
        <aside className="marketplace_contents_sidebar">
          <form className="marcketplace_contents_sidebar_container" onSubmit={handleSubmit}>
              <button type="button" className="marketplace_contents_collapse" onClick={handleDButtonClick}>Set Destination</button>
              {isOpen &&
              <ul className="marketplace_contents_destination">
                <li>city</li>
                <li>NewYork</li>
                <li>Osaka</li>
                <li>Australia</li>
                <li>Roma</li>
              </ul>}
            <div className="marketplace_contents_class">
              <button type="button" onClick={handleCButtonClick}>Set class</button>
              {isOpen2 && 
              <ul className="marketpace_contents_class_value">
                <li>First</li>
                <li>Business</li>
                <li>Economy</li>
              </ul>}
            </div>
            <MarketPlaceCalander />
            <button className="marketplace_search" type="submit">search</button>
          </form>
        </aside>
      </div>
  );
};

export default MarketPlaceAside;
