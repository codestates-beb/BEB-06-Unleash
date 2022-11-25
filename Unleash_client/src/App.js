import './resources/css/App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import { Fragment, useEffect , useState } from "react";
import LandingPage from './pages/LandingPage.jsx'
import MainPage from './pages/MainPage.jsx'
import MyPage from './pages/MyPage.jsx'
import TicketChangePage from './pages/TicketChangePage.jsx'
import MarketPlace from './pages/MarketPlace.jsx'
import NftDetailPage from './pages/NftDetailPage.jsx'
import SellPage from './pages/SellPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import Signup from "./pages/Signup";
import P2PMarket from './pages/P2PMarket';
import P2pDetailPage from './pages/P2pDetailPage'
import Header from "./components/Header";

//contextAPI
import ListStore from './resources/context_store/ListContext';
import Test from './resources/context_store/Test';

function App() {
  const [landingState , setLandingState ] = useState(false);
  const [account , setCurrentAccount ] = useState("");

  const onLandingState = () => {
    setLandingState(true);
  }


  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = () => {
    setCurrentAccount("");
  }

  return (
    <div className="App">
      <BrowserRouter >
        <ListStore>
          <Header connectWallet={connectWallet} account={account} logOut={logOut} />
          <Routes >
            <Route path='/' element={<LandingPage onLandingState={onLandingState} />} />
            <Route path='/mainpage' element={<MainPage />} />
            <Route path='/mypage' element={<MyPage />}  />
            <Route path='/marketplace' element={<MarketPlace />}/>
            <Route path='/marketplacep2p' element={<P2PMarket />}/>
            <Route path='/nftdetailpage' element={<NftDetailPage />}/>
            <Route path='/p2pdetailpage' element={<P2pDetailPage />}/>
            <Route path='/sellpage' element={<SellPage />}/>
            <Route path='/loadingpage' element={<LoadingPage />}/>
            <Route path='/ticketchangepage' element={<TicketChangePage />}/>
            <Route path='/signup' element={<Signup  />}/>
          </Routes>
        </ListStore>
      </BrowserRouter>


    </div>
  );
}

export default App;
