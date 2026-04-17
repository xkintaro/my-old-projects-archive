import { Link } from 'react-router-dom';
import '../assets/css/kintaroFooter.css';
import { FaDiscord, FaGithub, FaInstagram } from "react-icons/fa";
import { KintaroTitle1 } from "../components/KintaroTitle";

function KintaroFooter() {
    return (
        <div className='kintaro-footer'>
            <div className="kintaro-footer-head">
                <KintaroTitle1 title={"DeepAnime"} />
                <p className="kintaro-footer-head-text">© 2025 DeepAnime, Tüm hakları saklıdır.</p>
                <div className="kintaro-footer-head-icons">
                    <Link to='/under-construction'>
                        <FaDiscord className='kintaro-footer-head-icon' />
                    </Link>
                    <Link to='/under-construction'>
                        <FaGithub className='kintaro-footer-head-icon' />
                    </Link>
                    <Link to='/under-construction'>
                        <FaInstagram className='kintaro-footer-head-icon' />
                    </Link>
                </div>
            </div>
            <div className='kintaro-footer-content'>
                <div className="kintaro-footer-links">
                    <h1 className="kintaro-footer-links-title">Bağlantılar</h1>
                    <Link to='/' className='kintaro-footer-link'>Anasayfa</Link>
                    <Link to='/explore' className='kintaro-footer-link'>Keşfet</Link>
                    <Link to='/about' className='kintaro-footer-link'>Hakkında</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>Duyurular</Link>
                    <Link to='/blog' className='kintaro-footer-link'>Blog</Link>
                </div>
            </div>
            <div className='kintaro-footer-content'>
                <div className="kintaro-footer-links">
                    <h1 className="kintaro-footer-links-title">Popüler Kategoriler</h1>
                    <Link to='/under-construction' className='kintaro-footer-link'>İntikam</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>Harem</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>Shounen</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>İsekai</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>School</Link>
                </div>
            </div>
            <div className='kintaro-footer-content'>
                <div className="kintaro-footer-links">
                    <h1 className="kintaro-footer-links-title">Kaynaklar</h1>
                    <Link to='/under-construction' className='kintaro-footer-link'>API</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>Belgeler</Link>
                    <Link to='/blog' className='kintaro-footer-link'>Blog</Link>
                    <Link to='/kintaro-downloader' className='kintaro-footer-link'>Downloader</Link>
                </div>
            </div>
            <div className='kintaro-footer-content'>
                <div className="kintaro-footer-links">
                    <h1 className="kintaro-footer-links-title">Hukuki</h1>
                    <Link to='/under-construction' className='kintaro-footer-link'>Gizlilik Politikası</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>Kullanım Şartları</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>Çerez Politikası</Link>
                </div>
            </div>
            <div className='kintaro-footer-content'>
                <div className="kintaro-footer-links">
                    <h1 className="kintaro-footer-links-title">Yardım</h1>
                    <Link to='/contact' className='kintaro-footer-link'>İletişim</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>SSS</Link>
                    <Link to='/under-construction' className='kintaro-footer-link'>Destek</Link>
                </div>
            </div>
        </div>
    )
}

export default KintaroFooter
