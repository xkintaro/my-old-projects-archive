import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCompass, FaCog } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

function KintaroSidebar() {

  const location = useLocation();

  return (
    <div className='kintaro-sidebar'>

      <Link to="/home" className={`kintaro-sidebar-item ${location.pathname === '/home' ? 'active-link' : ''}`}>
        <FaHome className='kintaro-sidebar-item-icon' />
        <span className="kintaro-sidebar-item-text">Anasayfa</span>
      </Link>

      <Link to="/explore" className={`kintaro-sidebar-item ${location.pathname === '/explore' ? 'active-link' : ''}`}>
        <FaCompass className='kintaro-sidebar-item-icon' />
        <span className="kintaro-sidebar-item-text">Keşfet</span>
      </Link>

      <Link to="/about" className={`kintaro-sidebar-item ${location.pathname === '/about' ? 'active-link' : ''}`}>
        <FaCircleInfo className='kintaro-sidebar-item-icon' />
        <span className="kintaro-sidebar-item-text">Hakkında</span>
      </Link>

      <Link to="/settings" className={`kintaro-sidebar-item ${location.pathname === '/settings' ? 'active-link' : ''}`}>
        <FaCog className='kintaro-sidebar-item-icon' />
        <span className="kintaro-sidebar-item-text">Ayarlar</span>
      </Link>

    </div>
  )
}

export default KintaroSidebar
