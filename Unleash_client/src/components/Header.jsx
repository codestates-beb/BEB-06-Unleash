import { GiCommercialAirplane } from "react-icons/gi";
import { Link , useNavigate , useLocation  } from "react-router-dom";
// import { TestContext } from "../resources/context_store/ListContext";
import { ListContext } from "../resources/context_store/ListContext";
import { Fragment, useEffect , useState , useContext } from "react";
import axios from "axios"

const Header = () => {
  const context = useContext(ListContext);
  const { setUserData , setLoginStatus } = context;
  const [landingState , setLandingState ] = useState(false);
  const [account , setCurrentAccount ] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      let data = {wallet_address : accounts};
      axios.post('http://localhost:5000/user/login', data )
      .then(function(res){
        setCurrentAccount(accounts[0]);
        setUserData(res.data[0]);
        setLoginStatus(true);
      }).catch(function (error) {
        console.log(error);
        alert(error.response.data);
      });

    } catch (error) {
      console.log(error)
    }
  }

  const logOut = () => {
    setCurrentAccount("");
  }


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

        { !account ? (
          <div className="Header_text" onClick={connectWallet} >Connect Wallet</div>
        ) : (
          <div className="Header_text" onClick={logOut} >Logout</div>
        )}
        { account && (
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
  