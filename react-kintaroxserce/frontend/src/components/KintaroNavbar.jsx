import { Link, useLocation } from 'react-router-dom';
import KintaroNavbarProfileMenu from "./KintaroNavbarProfileMenu";
import KintaroNavbarSearch from "./KintaroNavbarSearch";
import { KintaroTitle1, KintaroTitle2 } from "../components/KintaroTitle";

function KintaroNavbar() {

    const location = useLocation();

    return (
        <div className="kintaro-navbar">

            <Link to="/" title='Anasayfa'>
                <KintaroTitle1 title={"DeepAnime"} />
            </Link>

            <div className="kintaro-navbar-links">

                <Link
                    to="/home"
                    className={`kintaro-navbar-links-item ${location.pathname === '/home' || location.pathname === '/' ? 'active-link' : ''
                        }`}
                >
                    Home
                </Link>

                <Link to="/explore" className={`kintaro-navbar-links-item ${location.pathname === '/explore' ? 'active-link' : ''}`}>
                    Explore
                </Link>

                <Link to="/about" className={`kintaro-navbar-links-item ${location.pathname === '/about' ? 'active-link' : ''}`}>
                    About
                </Link>

                <Link to="/settings" className={`kintaro-navbar-links-item ${location.pathname === '/settings' ? 'active-link' : ''}`}>
                    Settings
                </Link>

            </div>

            <div className="kintaro-navbar-right">

                <KintaroNavbarSearch />
                <KintaroNavbarProfileMenu />

            </div>

        </div>
    );
}

export default KintaroNavbar;