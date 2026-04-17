import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css'

import './assets/css/kintaroAbout.css';
import './assets/css/kintaroExplore.css';
import './assets/css/KintaroUserRegister.css';
import './assets/css/kintaroSettings.css';
import './assets/css/kintaroContentInfo.css';
import './assets/css/kintaroContentPage.css';

import './assets/css/kintaroButton.css';
import './assets/css/kintaroTextBox.css';
import './assets/css/kintaroDropdown.css';

import './assets/css/kintaroNavbar.css';
import "./assets/css/kintaroSidebar.css";
import "./assets/css/kintaroBottomMenu.css";
import './assets/css/kintaroTitle.css';
import './assets/css/kintaroDescription.css';
import './assets/css/kintaroContentBox1.css';
import './assets/css/kintaroContentBox2.css';
import './assets/css/kintaroContentBox3.css';
import './assets/css/kintaroContentBox4.css';
import './assets/css/kintaroCommentBox.css';
import './assets/css/kintaroRating.css';
import './assets/css/kintaroConfirmationDialog.css';
import './assets/css/kintaroSystemMessages.css';
import './assets/css/kintaroProgressBar.css';
import './assets/css/kintaroVideoPlayer.css';
import './assets/css/kintaroScrollingBanner.css';
import './assets/css/kintaroPopulerContents.css';

import './assets/css/kintaroAudioPlayer.css';
import './assets/css/kintaroDownloader.css';

import KintaroHome from './pages/KintaroHome';
import KintaroAbout from './pages/KintaroAbout';
import KintaroExplore from './pages/KintaroExplore';
import KintaroSettings from './pages/KintaroSettings';
import KintaroContentInfo from "./pages/KintaroContentInfo";
import KintaroContentPage from "./pages/KintaroContentPage";

import KintaroNotFound from './pages/KintaroNotFound';
import KintarouUnderConstruction from './pages/KintarouUnderConstruction';

import KintaroNavbar from "./components/KintaroNavbar";
import KintaroSidebar from "./components/KintaroSidebar";
import KintaroBottomMenu from './components/KintaroBottomMenu';

import KintaroAudioPlayer from "./components/KintaroAudioPlayer";

import KintaroDownloader from "./tools/KintaroDownloader";

import KintaroUserLogin from "./pages/KintaroUserLogin";
import KintaroUserRegister from "./pages/KintaroUserRegister";
import KintaroUserProfile from "./pages/KintaroUserProfile";


import KintaroScrollingBanner from "./components/KintaroScrollingBanner";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>

      <ScrollToTop />

      <KintaroNavbar />

      {/*
       <KintaroSidebar /> 
        */}

      <KintaroBottomMenu />


      <KintaroAudioPlayer />

      <div className="kintaro-container">
        <Routes>
          <Route path="/" element={<KintaroHome />} />


          <Route path="/test1" element={<KintaroScrollingBanner />} />


          <Route path="/home" element={<KintaroHome />} />
          <Route path="/about" element={<KintaroAbout />} />
          <Route path="/explore" element={<KintaroExplore />} />
          <Route path="/settings" element={<KintaroSettings />} />
          <Route path="/content-info" element={<KintaroContentInfo />} />
          <Route path="/content-page" element={<KintaroContentPage />} />

          <Route path="/profile" element={<KintaroUserProfile />} />
          <Route path="/register" element={<KintaroUserRegister />} />
          <Route path="/login" element={<KintaroUserLogin />} />

          <Route path="/kintaro-downloader" element={<KintaroDownloader />} />

          <Route path="/under-construction" element={<KintarouUnderConstruction />} />
          <Route path="*" element={<KintaroNotFound />} />
        </Routes>
      </div>

    </Router>
  )
}

export default App;