import { GiCommercialAirplane } from "react-icons/gi";
import { Link , useNavigate } from "react-router-dom";

const Header = (props) => {
    return (
      <div className="Header">
        <Link to = "/mainpage">   
            <div className="Header_logo_border" >
            <GiCommercialAirplane className="Header_logo" />
            </div>
            <div className="Header_logo_text" >
                𝙐𝙣𝙡𝙚𝙖𝙨𝙝
            </div>
        </Link>

        <div className="Header_text" onClick={props.onOpenSignIn} >Log in</div>
        <Link to = "/marketplace/:id">   
         <div className="Header_text" >MarketPlace</div>
        </Link>
      </div>
    );
  }
  
  export default Header;
  