import React, {useState} from "react";
import '../resources/css/App.css'
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();
  const [bgImg, setBgImg] = useState('landing_bgImg');

  const handleLogoChange = () => {
    setBgImg('landing_bgImg1')
    navigate("/mainpage");
  }
  const handleMouseOver = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left ;
    let y = e.clientY - rect.top ;
    e.target.style.setProperty('--x', x + 'px');
    e.target.style.setProperty('--y', y + 'px');
  }
  return (
      <div className="landing">
        <h1 className="landing_logo">𝙐𝙣𝙡𝙚𝙖𝙨𝙝</h1>
        <div className={bgImg} />
        <div className="landing_gradiant_h"onMouseMove={handleMouseOver} />
        <button className="landing_button" onClick={handleLogoChange}>Unleash your travel</button> {/*버튼을 누르면 bgImg classanme이 bgImg1로 바뀜. */}
      </div>
  );
};

export default LandingPage;
