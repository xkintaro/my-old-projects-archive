import  { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCompass, FaCog, FaEllipsisH } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

function KintaroBottomMenu() {
    const location = useLocation();
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const moreButtonRef = useRef(null);
    const menuRef = useRef(null);

    const menuItems = [
        { path: "/home", icon: <FaHome />, text: "Anasayfa" },
        { path: "/explore", icon: <FaCompass />, text: "Keşfet" },
        { path: "/about", icon: <FaCircleInfo />, text: "Hakkında" },
        { path: "/settings", icon: <FaCog />, text: "Ayarlar" },
        { path: "/profile", icon: <FaCog />, text: "Profil" },
        { path: "/messages", icon: <FaCog />, text: "Mesajlar" }
    ];

    const visibleItems = menuItems.slice(0, 3);
    const moreItems = menuItems.slice(3);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !moreButtonRef.current.contains(event.target)) {
                setShowMoreMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="kintaro-bottom-menu">
                {visibleItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`kintaro-bottom-menu-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        {item.icon}

                    </Link>
                ))}

                {moreItems.length > 0 && (
                    <button
                        ref={moreButtonRef}
                        className={`kintaro-bottom-menu-item kintaro-bottom-more-button ${showMoreMenu ? 'active' : ''}`}
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                    >
                        <FaEllipsisH className='kintaro-bottom-menu-icon' />
                    </button>
                )}

                <div
                    className={`kintaro-bottom-more-menu ${showMoreMenu ? 'visible' : ''}`}
                    ref={menuRef}
                >
                    {moreItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="kintaro-bottom-more-item"
                            onClick={() => setShowMoreMenu(false)}
                        >
                            <span className='kintaro-bottom-more-icon'>{item.icon}</span>
                            <span className="kintaro-bottom-more-text">{item.text}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default KintaroBottomMenu;