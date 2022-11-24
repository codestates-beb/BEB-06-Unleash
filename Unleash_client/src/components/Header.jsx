import { GiCommercialAirplane } from "react-icons/gi";
import { Link , useNavigate , useLocation  } from "react-router-dom";

const Header = (props) => {


  let location = useLocation();
  const locationName = location.pathname;

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

        { !props.account ? (
          <div className="Header_text" onClick={props.connectWallet} >Connect Wallet</div>
        ) : (
          <div className="Header_text" onClick={props.logOut} >Logout</div>
        )}
        { props.account && (
          <Link to = "/mypage">   
            <div className={"Header_text" + ( locationName == "/mypage" ? " on" : "" ) }  >
              MyPage
              { locationName == "/mypage" && (
                <div className="Header_text_border"></div>
              )}
            </div>
          </Link>
        )}
        <Link to = "/signup">   
          <div className={"Header_text"  + ( locationName == "/signup" ? " on" : "" ) } > SignUp
             { locationName == "/signup" && (
                <div className="Header_text_border"></div>
              )}
          </div>
        </Link>
        <Link to = "/marketplace">   
         <div className={"Header_text" + ( locationName == "/marketplace" ? " on" : "" ) } >MarketPlace
         
            { locationName == "/marketplace" && (
                <div className="Header_text_border"></div>
            )}
         </div>
        </Link>
      </div>
    );
  }
  
  export default Header;
  