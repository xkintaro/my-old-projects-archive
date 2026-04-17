import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import '../css/login.css'
import BgImage from '../img/bg001.webp'
import { IoSend } from "react-icons/io5"
import { FaArrowCircleRight } from "react-icons/fa"

function Login() {

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/login2');
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
                            <div className="user-form-header">
                                <h2 className="user-form-header-title">
                                    Kullanıcı Girişi
                                </h2>
                                <p className="user-form-header-text">
                                    Hesabınıza giriş yapabilmek için, kullanıcı adınızı veya e-posta adresinizi giriniz.
                                </p>
                            </div>
                        </div>
                        <div className="user-form-component">
                            <div className="kintaro-floating-layout">
                                <input className="kintaro-floating-icon-textbox" type="text" placeholder="" />
                                <label className="kintaro-floating-icon-label">Kullanıcı Adı veya Eposta</label>
                                <IoSend className="kintaro-floating-icon-image" onClick={handleRedirect} />
                            </div>
                        </div>
                        <div className="user-form-component">
                            <p className="user-form-system-message">
                                Kullanıcı bulunamadı.
                            </p>
                        </div>
                        <div className="user-form-component">
                            <div className="user-form-directed">
                                <p className="user-form-directed-text">
                                    Hesabınız yoksa, hemen kaydolabilirsiniz
                                </p>
                                <Link to="/register">
                                    <FaArrowCircleRight className="user-form-directed-button" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
