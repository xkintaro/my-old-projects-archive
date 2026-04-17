import { useEffect } from "react";
import AudioPlayer from "./components/audioplayer";
import TopMenu from "./components/navbar/topmenu";
import BottomMenu from "./components/navbar/bottommenu";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ProfilePage from "./pages/profile";
import ProfileRedirect from "./pages/profile/redirect";
import NotFound404Page from "./pages/not-found-404";

import { ModalProvider } from "./contexts/ModalContext";
import { AuthProvider } from './contexts/AuthContext';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { UserProvider } from './contexts/UserContext.jsx';

import Servers from "./pages/servers/index.jsx";

import ServersModal from "./components/navbar/topmenu/servers-modal/index.jsx";
import AuthModal from "./components/navbar/topmenu/auth-modal";
import UserLogoutModal from "./pages/profile/logout-modal/index.jsx";
import UserUpdateModal from "./pages/profile/user-update-modal/index.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ModalProvider>
        <AuthProvider>
          <CurrentUserProvider>

            <ScrollToTop />

            <ServersModal />
            <AuthModal />
            <UserLogoutModal />
            <UserUpdateModal />

            <TopMenu />
            <BottomMenu />


            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />

              <Route path="/profile" element={<ProfileRedirect />} />

              <Route path="/profile/:id" element={
                <UserProvider>
                  <ProfilePage />
                </UserProvider>
              }
              />

              <Route path="/servers" element={<Servers />} />
              <Route path="/*" element={<NotFound404Page />} />
            </Routes>

            <Footer />
          </CurrentUserProvider>
        </AuthProvider>
      </ModalProvider>

      <AudioPlayer
        playerTitle="Kintaro Player"
        audioBasePath="/audio-player/audio/"
        imageBasePath="/audio-player/image/"
        songs={[
          { title: "Saccharine", file: "3.mp4", image: "1.webp", artist: "Violent Vira" },
          { title: "Dont care", file: "2.mp3", image: "2.webp", artist: "Violent Vira" },
          { title: "Nanatsu no taizai, ban and elaine perfect theme", file: "1.mp3", image: "3.webp", artist: "Unknown" }
        ]}
      />
    </Router>
  );
}

export default App;