import './resources/css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState, useContext } from 'react';
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
  return (
    <div className="App">
      <BrowserRouter>
        <ListStore>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/marketplacep2p" element={<P2PMarket />} />
            <Route path="/nftdetailpage" element={<NftDetailPage />} />
            <Route path="/p2pdetailpage" element={<P2pDetailPage />} />
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
