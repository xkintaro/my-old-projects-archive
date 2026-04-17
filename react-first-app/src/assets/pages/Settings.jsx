import React, { useState, useEffect } from 'react';
import { Link, useLocation, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import ProfileEdit from '../pages/ProfileEdit';
import "../css/settings.css";
import { FaUserLock, FaUser, FaComment, FaHeart, FaBan, FaFlag, FaKey } from "react-icons/fa";
import { BiDevices } from "react-icons/bi";
import { TbGenderMale } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";
import ChangeFlag from './ChangeFlag';
import ChangeGender from './ChangeGender';
import HesapBilgileri from './HesapBilgileri';
import SifreVeGuvenlik from './SifreVeGuvenlik';
import Cihazlarim from './Cihazlarim';
import Engellenenler from './Engellenenler';
import Yorumlar from './Yorumlar';
import Begeniler from './Begeniler';

function Settings() {

    const location = useLocation();

    const [isMenuVisible, setIsMenuVisible] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleMenuClick = () => {
        if (isSmallScreen) {
            setIsMenuVisible(false);
            setIsContentVisible(true);
        }
    };

    const handleBackClick = () => {
        if (isSmallScreen) {
            setIsMenuVisible(true);
            setIsContentVisible(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="settings-section">
                <div className="settings-box">
                    {isSmallScreen && isContentVisible && (
                        <div className="settings-header">
                            <IoArrowBack className='settings-header-icon' onClick={handleBackClick} />
                            <h2 className="settings-header-title">Ayarlar</h2>
                        </div>
                    )}

                    <div className="settings-x">
                        {(!isSmallScreen || isMenuVisible) && (
                            <div className="settings-side-menu">
                                <div className="settings-side-menu-component">
                                    <div className="settings-side-menu-component-header">
                                        <span className="settings-side-menu-component-header-title">Profil özelleştirme</span>
                                    </div>
                                    <div className="settings-side-menu-component-body">
                                        <Link to="/settings/profileedit" className={`settings-side-menu-component-link ${location.pathname === '/settings/profileedit' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <FaUser className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Profili düzenle</span>
                                        </Link>
                                    </div>
                                    <div className="settings-side-menu-component-body">
                                        <Link to="/settings/changeflag" className={`settings-side-menu-component-link ${location.pathname === '/settings/changeflag' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <FaFlag className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Bayrak seçimi</span>
                                        </Link>
                                    </div>
                                    <div className="settings-side-menu-component-body">
                                        <Link to="/settings/changegender" className={`settings-side-menu-component-link ${location.pathname === '/settings/changegender' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <TbGenderMale className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Cinsiyet seçimi</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="settings-side-menu-component">
                                    <div className="settings-side-menu-component-header">
                                        <span className="settings-side-menu-component-header-title">Hesap güvenliği</span>
                                    </div>
                                    <div className="settings-side-menu-component-body">
                                        <Link to="/settings/hesapbilgileri" className={`settings-side-menu-component-link ${location.pathname === '/settings/hesapbilgileri' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <FaUserLock className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Hesap bilgileri</span>
                                        </Link>
                                        <Link to="/settings/sifreveguvenlik" className={`settings-side-menu-component-link ${location.pathname === '/settings/sifreveguvenlik' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <FaKey className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Şifre ve güvenlik</span>
                                        </Link>
                                        <Link to="/settings/cihazlarim" className={`settings-side-menu-component-link ${location.pathname === '/settings/cihazlarim' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <BiDevices className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Cihazlarım</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="settings-side-menu-component">
                                    <div className="settings-side-menu-component-header">
                                        <span className="settings-side-menu-component-header-title">Etkileşimlerim</span>
                                    </div>
                                    <div className="settings-side-menu-component-body">
                                        <Link to="/settings/engellenenler" className={`settings-side-menu-component-link ${location.pathname === '/settings/engellenenler' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <FaBan className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Engellenenler</span>
                                        </Link>
                                        <Link to="/settings/yorumlar" className={`settings-side-menu-component-link ${location.pathname === '/settings/yorumlar' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <FaComment className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Yorumlar</span>
                                        </Link>
                                        <Link to="/settings/begeniler" className={`settings-side-menu-component-link ${location.pathname === '/settings/begeniler' ? 'active-link-menu' : ''}`} onClick={handleMenuClick}>
                                            <FaHeart className='settings-side-menu-component-link-icon' />
                                            <span className="settings-side-menu-component-link-text">Beğeniler</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        {(!isSmallScreen || isContentVisible) && (
                            <div className="settings-box-main">
                                <Routes>
                                    <Route path="/" element={<ProfileEdit />} />
                                    <Route path="/profileedit" element={<ProfileEdit />} />
                                    <Route path="/changeflag" element={<ChangeFlag />} />
                                    <Route path="/changegender" element={<ChangeGender />} />
                                    <Route path="/hesapbilgileri" element={<HesapBilgileri />} />
                                    <Route path="/sifreveguvenlik" element={<SifreVeGuvenlik />} />
                                    <Route path="/cihazlarim" element={<Cihazlarim />} />
                                    <Route path="/engellenenler" element={<Engellenenler />} />
                                    <Route path="/yorumlar" element={<Yorumlar />} />
                                    <Route path="/begeniler" element={<Begeniler />} />
                                </Routes>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
