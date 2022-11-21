import './resources/css/App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import { Fragment, useEffect , useState } from "react";
import LandingPage from './pages/LandingPage.jsx'
import MainPage from './pages/MainPage.jsx'
import MyPage from './pages/MyPage.jsx'
import TicketingPage from './pages/TicketingPage.jsx'
import MarketPlace from './pages/MarketPlace.jsx'
import NftDetailPage from './pages/NftDetailPage.jsx'
import SellPage from './pages/SellPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import TiketChangePage from './pages/TiketChangePage.jsx'
import Header from "./components/Header";
import SignIn from "./components/SignIn";

function App() {
  const [openSignIn , setOpenSignIn] = useState(false);
  const [landingState , setLandingState ] = useState(false);

  const onLandingState = () => {
    setLandingState(true);
  }

  const onOpenSignIn = () => {
    setOpenSignIn(true);
  }

  const onCloseSignIn = () => {
    setOpenSignIn(false);
  }

  return (
    <div className="App">
      <BrowserRouter >
        {landingState && (
          <Header onOpenSignIn={onOpenSignIn} />
        )}
        <Routes >
          <Route path='/' element={<LandingPage onLandingState={onLandingState} />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/mypage' element={<MyPage  />}  />
          <Route path='/tiketingpage' element={<TicketingPage />}/>
          <Route path='/marketplace/:id' element={<MarketPlace />}/>
          <Route path='/nftdetailpage' element={<NftDetailPage />}/>
          <Route path='/sellpage' element={<SellPage />}/>
          <Route path='/loadingpage' element={<LoadingPage />}/>
          <Route path='/tiketchangepage' element={<TiketChangePage />}/>
        </Routes>
      </BrowserRouter>

      {openSignIn &&
          <SignIn />
      }
    </div>
  );
}

export default App;
