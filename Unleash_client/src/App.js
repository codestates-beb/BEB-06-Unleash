import './resources/css/App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx'
import MainPage from './pages/MainPage.jsx'
import MyPage from './pages/MyPage.jsx'
import TicketingPage from './pages/TicketingPage.jsx'
import MarketPlace from './pages/MarketPlace.jsx'
import NftDetailPage from './pages/NftDetailPage.jsx'
import SellPage from './pages/SellPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import TiketChangePage from './pages/TiketChangePage.jsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes >
          <Route path='/' element={<LandingPage />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/mypage' element={<MyPage  />}  />
          <Route path='/tiketingpage' element={<TicketingPage />}/>
          <Route path='/marketplace' element={<MarketPlace />}/>
          <Route path='/nftdetailpage' element={<NftDetailPage />}/>
          <Route path='/sellPage' element={<SellPage />}/>
          <Route path='/loadingpage' element={<LoadingPage />}/>
          <Route path='/tiketchangepage' element={<TiketChangePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
