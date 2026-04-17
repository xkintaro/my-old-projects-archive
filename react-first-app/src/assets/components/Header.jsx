import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/header.css';
import UserLogo from '../img/001.webp';
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { SiBasicattentiontoken } from "react-icons/si";
import { FaPlus } from "react-icons/fa";

function Header() {

    const location = useLocation();

    const [isMenuProfileVisible, setIsMenuProfileVisible] = useState(false);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const profileRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !profileRef.current.contains(event.target)) {
                setIsMenuProfileVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100) {
                setIsMobileMenuVisible(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsMobileMenuVisible((prevState) => !prevState);
    };

    return (
        <div className="header">
            <div className="header-logo">
                <div className="header-menu-button" onClick={toggleMenu}>
                    <span className={`header-menu-button-line ${isMobileMenuVisible ? 'line-1' : ''}`}></span>
                    <span className={`header-menu-button-line ${isMobileMenuVisible ? 'line-2' : ''}`}></span>
                    <span className={`header-menu-button-line ${isMobileMenuVisible ? 'line-3' : ''}`}></span>
                </div>
                <Link to="/home">
                    <h1 className="header-title">kintaro</h1>
                </Link>
            </div>
            <div className="header-nav">
                <Link to="/home" className={`header-nav-link ${location.pathname === '/home' ? 'active-link' : ''}`}>
                    <span className="header-nav-link-icon">
                        <FaHome />
                    </span>
                    <span className="header-nav-link-title">Anasayfa</span>
                </Link>
                <Link to="/shop" className={`header-nav-link ${location.pathname === '/shop' ? 'active-link' : ''}`}>
                    <span className="header-nav-link-icon">
                        <FaShop />
                    </span>
                    <span className="header-nav-link-title">Mağaza</span>
                </Link>
                <Link to="/friends" className={`header-nav-link ${location.pathname === '/friends' ? 'active-link' : ''}`}>
                    <span className="header-nav-link-icon">
                        <FaUserFriends />
                    </span>
                    <span className="header-nav-link-title">Arkadaşlar</span>
                </Link>
            </div>
            <div className={`header-nav-mobile ${isMobileMenuVisible ? 'visibleMobileMenu' : ''}`}>
                <Link to="/home" className="header-nav-mobile-link">
                    <span className="header-nav-mobile-link-icon">
                        <FaHome />
                    </span>
                    <span className="header-nav-mobile-link-title">
                        Anasayfa
                    </span>
                </Link>
                <Link to="/shop" className="header-nav-mobile-link">
                    <span className="header-nav-mobile-link-icon">
                        <FaShop />
                    </span>
                    <span className="header-nav-mobile-link-title">
                        Mağaza
                    </span>
                </Link>
                <Link to="/friends" className="header-nav-mobile-link">
                    <span className="header-nav-mobile-link-icon">
                        <FaUserFriends />
                    </span>
                    <span className="header-nav-mobile-link-title">
                        Arkadaşlar
                    </span>
                </Link>
            </div>
            <div className="header-profile" ref={profileRef}>
                <div className="header-profile-head" onClick={() => setIsMenuProfileVisible(!isMenuProfileVisible)}>
                    <img src={UserLogo} className="header-profile-head-image" />
                    <span className="header-profile-head-title">kintaro99w</span>
                </div>
                <div className={`header-profile-body ${isMenuProfileVisible ? 'visibleProfileMenu' : ''}`} ref={menuRef}>
                    <Link to="/profile" className="header-profile-body-link">
                        <span className="header-profile-body-link-icon">
                            <FaUser />
                        </span>
                        <span className="header-profile-body-link-title">
                            Profilim
                        </span>
                    </Link>
                    <Link to="/settings" className="header-profile-body-link">
                        <span className="header-profile-body-link-icon">
                            <IoMdSettings />
                        </span>
                        <span className="header-profile-body-link-title">
                            Ayarlar
                        </span>
                    </Link>
                    <Link to="/login" className="header-profile-body-link">
                        <span className="header-profile-body-link-icon">
                            <FaUser />
                        </span>
                        <span className="header-profile-body-link-title">
                            Giriş Yap
                        </span>
                    </Link>
                    <Link to="" className="header-profile-body-link">
                        <span className="header-profile-body-link-icon">
                            <TbLogout />
                        </span>
                        <span className="header-profile-body-link-title">
                            Çıkış Yap
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
