import { GiCommercialAirplane, GiConsoleController } from 'react-icons/gi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Fragment, useEffect, useState, useContext } from 'react';
import { ListContext } from '../resources/context_store/ListContext';
import axios from 'axios';

const Header = () => {
  const context = useContext(ListContext);
  const { userData, setUserData, setLoginStatus } = context;
  const [landingState, setLandingState] = useState(false);
  const [account, setCurrentAccount] = useState('');

  useEffect(() => {
    if (
      sessionStorage?.getItem('initial') || // 맨 처음, 로그인 버튼 누르기 전까지는 로그인 관련 함수가 실행 X
      (!sessionStorage?.getItem('initial') && // 탭 새로 켰을때, 이전에 로그인 상태였으면 실행 // => 새로켰으므로 session인 initial은 null,
        localStorage?.getItem('isLogout') === 'false') //local에 있는 isLogout은 탭 닫기 이전의 기록이 있음
    ) {
      axios
        .get('http://localhost:5001/user/approve', {
          withCredentials: true,
        })
        .then(res => {
          const userInformation = res.data.data.userInfo;

          setUserData(userInformation);
          const data = userInformation.wallet_address;
          if (data && localStorage?.getItem('isLogout') === 'false') {
            connect4approve();
          } // 로그인 된 상태로 렌더링 시, jwt 토큰 verify가 된 상태면
          // connect4approve 실행해서 지갑 연결 자동 실행
          sessionStorage.setItem('doubleCheck', userData);
        })
        .catch(err => {
          console.log(err);
          if (err.response.data === 'expired access token') {
            // jwt 만료가 된 처음 시점에만 이 에러가 옴
            alert('다시 로그인하세요');
            setUserData([]); // jwt 만료되었으므로 유저 정보도 초기화
            logOut();
          }
        });
      console.log(userData);
    }
    // }
  }, [window.location.pathname, sessionStorage?.getItem('doubleCheck')]);
  // 도메인이 바뀔때 한번 // userData 값이 바뀌었을때 한번

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

  const handleNetworkChanged = (...args) => {
    const networkId = args[0];
    if (networkId !== '5') {
      logOut();
    }
  };

  useEffect(() => {
    // 네트워크변경, 연결된 지갑 변경, 메타마스크 내의 로그아웃시 자동으로 실행
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

  const connectWallet = async () => {
    try {
      console.log('here');
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
        .post('http://localhost:5001/user/login', data, {
          withCredentials: true,
        })
        .then(function (res) {
          setCurrentAccount(accounts[0]);
          localStorage.setItem('isLogout', false);
          sessionStorage.setItem('initial', true);
          setUserData(res.data);
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
    setUserData([]);
    setCurrentAccount('');
    setLoginStatus(false);
    localStorage.setItem('isLogout', true);
    axios
      .get('http://localhost:5001/user/logout', {
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
