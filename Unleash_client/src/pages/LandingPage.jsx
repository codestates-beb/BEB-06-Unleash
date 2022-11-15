import React from "react";
import '../resources/css/App.css'
import image from '../resources/image/4.jpg'

const LandingPage = () => {
  return (
    <>
      <div className="landing">
        <h1 className="landing_logo">𝙐𝙣𝙡𝙚𝙖𝙨𝙝</h1>
        <img className="landing_bgImg" src={image} alt=""/>
        <button className="landing_button">Unleash your travel</button>
      </div>
    </>
  );
};

export default LandingPage;
