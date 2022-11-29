import { GiCommercialAirplane } from 'react-icons/gi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Fragment, useEffect, useState, useContext } from 'react';
import { ListContext } from '../resources/context_store/ListContext';
import axios from 'axios';

const Header = () => {
  const context = useContext(ListContext);
  const { setUserData, setLoginStatus } = context;
  const [landingState, setLandingState] = useState(false);
  const [account, setCurrentAccount] = useState('');

  useEffect(() => {
    if (
      sessionStorage?.getItem('initial') ||
      (!sessionStorage?.getItem('initial') &&
        localStorage?.getItem('isLogout') === 'false') // 문자열임
    ) {
      axios
        .get('http://localhost:5000/user/approve', { withCredentials: true })
        .then(res => {
          const data = res.data.data.userInfo.wallet_address;
          if (data && localStorage?.getItem('isLogout') === 'false') {
            connect4approve();
          }
          // console.log(data);
        })
        .catch(err => {
          if (err.response.data == 'expired access token') {
            // jwt 만료가 된 처음 시점에만 이 에러가 옴
            alert('다시 로그인하세요');
            localStorage.setItem('isLogout', true);
            logOut();
          }
        });
    }
  });

  // (Done) 탭, 창 껐을때, 새로 켰을때 다시 들어오면, 로그인유지

  // 쿠키 소멸시 유저 state 삭제
  // 유저 state 없을시 받아오는
  // 유저

  const handleNetworkChanged = (...args) => {
    const networkId = args[0];
    if (networkId !== '5') {
      localStorage.setItem('isLogout', true);
      logOut();
    }
    // window.location.reload(); // 렌더링 시켜주는 메소드
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        if (accounts.length > 0) {
          logOut();
        }
      });
    }
    window.ethereum?.on('networkChanged', handleNetworkChanged);
    return () => {
      window.ethereum?.removeListener('networkChanged', handleNetworkChanged);
    };
  });

  const connect4approve = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      window.ethereum.request({
        // 체인 변경
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      });
      let data = { wallet_address: accounts[0] };

      axios
        .post('http://localhost:5000/user/login', data, {
          withCredentials: true,
        })
        .then(function (res) {
          setCurrentAccount(accounts[0]);
          localStorage.setItem('isLogout', false);
          sessionStorage.setItem('initial', true);
          setUserData(res.data[0]);
          setLoginStatus(true);
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setCurrentAccount('');
    localStorage.setItem('isLogout', true);
    axios
      .get('http://localhost:5000/user/logout', {
        withCredentials: true,
      })
      .then(console.log);
  };

  let location = useLocation();
  const locationName = location.pathname;

  return (
    <div className="Header">
      <Link to="/mainpage">
        <div className="Header_logo_border">
          <GiCommercialAirplane className="Header_logo" />
        </div>
        <div className="Header_logo_text">𝙐𝙣𝙡𝙚𝙖𝙨𝙝</div>
      </Link>

      {!account ? (
        <div className="Header_text" onClick={connectWallet}>
          Connect Wallet
        </div>
      ) : (
        <div className="Header_text" onClick={logOut}>
          Logout
        </div>
      )}
      {account && (
        <Link to="/mypage">
          <div
            className={'Header_text' + (locationName == '/mypage' ? ' on' : '')}
          >
            MyPage
            {locationName == '/mypage' && (
              <div className="Header_text_border"></div>
            )}
          </div>
        </Link>
      )}
      <Link to="/signup">
        <div
          className={'Header_text' + (locationName == '/signup' ? ' on' : '')}
        >
          {' '}
          SignUp
          {locationName == '/signup' && (
            <div className="Header_text_border"></div>
          )}
        </div>
      </Link>
      <Link to="/marketplacep2p">
        <div
          className={
            'Header_text' + (locationName == '/marketplace' ? ' on' : '')
          }
        >
          MarketPlace
          {locationName == '/marketplace' && (
            <div className="Header_text_border"></div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Header;
