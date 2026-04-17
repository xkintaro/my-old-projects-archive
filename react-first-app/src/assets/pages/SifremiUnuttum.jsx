import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../css/login.css';
import BgImage from '../img/bg001.webp';
import { TiArrowBack } from "react-icons/ti";
import { IoSend } from "react-icons/io5"

function SifremiUnuttum() {

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/sifremiunuttum2');
    };

    return (
        <div>
            <Header />
            <div className="user-form-section">
                <div className="user-form">
                    <div className="user-form-image-section">
                        <img src={BgImage} className="user-form-image" />
                    </div>
                    <div className="user-form-main">
                        <div className="user-form-component">
                            <Link to="/login2" className="user-form-back-button">
                                <TiArrowBack className='user-form-back-button-icon' />
                                <span className="user-form-back-button-text">Geri</span>
                            </Link>
                        </div>
                        <div className="user-form-component">
                            <p className="user-form-information-text">
                                Şifrenizi yenileyebilmek için, hesabınıza kayıtlı olan eposta adresini giriniz
                            </p>
                        </div>
                        <div className="user-form-component">
                            <div className="kintaro-floating-layout">
                                <input className="kintaro-floating-icon-textbox" type="text" placeholder="" />
                                <label className="kintaro-floating-icon-label">Eposta</label>
                                <IoSend className="kintaro-floating-icon-image" onClick={handleRedirect} />
                            </div>
                        </div>
                        <div className="user-form-component">
                            <p className="user-form-system-message">
                                Eposta adresi bulunamadı.
                            </p>
                        </div>
                        <div className="user-form-component"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SifremiUnuttum
