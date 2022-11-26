import './resources/css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import MainPage from './pages/MainPage.jsx';
import MyPage from './pages/MyPage.jsx';
import TicketChangePage from './pages/TicketChangePage.jsx';
import MarketPlace from './pages/MarketPlace.jsx';
import NftDetailPage from './pages/NftDetailPage.jsx';
import SellPage from './pages/SellPage.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import Signup from './pages/Signup';
import P2PMarket from './pages/P2PMarket';
import P2pDetailPage from './pages/P2pDetailPage';
import Header from './components/Header';
import axios from 'axios';

//contextAPI
import ListStore from './resources/context_store/ListContext';
import Test from './resources/context_store/Test';

function App() {
  const [landingState, setLandingState] = useState(false);
  const [account, setCurrentAccount] = useState('');

  const onLandingState = () => {
    setLandingState(true);
  };

  const logIn = async () => {
    const wallet = await connectWallet();
    const data = { wallet_address: wallet };
    console.log('data', data);

    axios
      .post('http://localhost:5000/user/login', { wallet_address: wallet })
      .then(function (res) {
        console.log('here');
        setCurrentAccount(wallet); // 헤더쪽으로 넘어가는 state
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
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
      sessionStorage.setItem('isWalletConnected', true); // sessionStorage에 저장 => 세션종료되면 날라감
      return accounts[0];
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setCurrentAccount('');
    sessionStorage.setItem('isWalletConnected', false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header logIn={logIn} logOut={logOut} />
        <ListStore>
          <Routes>
            <Route
              path="/"
              element={<LandingPage onLandingState={onLandingState} />}
            />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            {/* <Route path='/ticketingpage' element={<TicketingPage />}/> */}
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/nftdetailpage" element={<NftDetailPage />} />
            <Route path="/sellpage" element={<SellPage />} />
            <Route path="/loadingpage" element={<LoadingPage />} />
            <Route path="/ticketchangepage" element={<TicketChangePage />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </ListStore>
      </BrowserRouter>
    </div>
  );
}

export default App;
