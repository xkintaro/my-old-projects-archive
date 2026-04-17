import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import '../css/login.css';
import BgImage from '../img/bg001.webp'
import UserLogo from '../img/001.webp';
import { IoSend } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import { FaQuestionCircle } from "react-icons/fa";

function LoginStep2() {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/login3');
    };
    const username = "xkintaro";
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
                            <Link to="/login" className="user-form-back-button">
                                <TiArrowBack className='user-form-back-button-icon' />
                                <span className="user-form-back-button-text">
                                    Geri
                                </span>
                            </Link>
                        </div>
                        <div className="user-form-component">
                            <div className="user-form-user-profile">
                                <img src={UserLogo} className="user-form-user-profile-image" />
                                <span className="user-form-user-profile-text">
                                    {username.length > 14 ? `${username.slice(0, 11)}...` : username}
                                </span>
                            </div>
                        </div>
                        <div className="user-form-component">
                            <div className="kintaro-floating-layout">
                                <input className="kintaro-floating-icon-textbox" type="password" placeholder="" />
                                <label className="kintaro-floating-icon-label">Şifre</label>
                                <IoSend className="kintaro-floating-icon-image" onClick={handleRedirect} />
                            </div>
                        </div>
                        <div className="user-form-component">
                            <p className="user-form-system-message">
                                Denediğiniz şifre yanlış.
                            </p>
                        </div>
                        <div className="user-form-component">
                            <div className="user-form-directed">
                                <p className="user-form-directed-text">
                                    Şifremi unuttum
                                </p>
                                <Link to="/sifremiunuttum">
                                    <FaQuestionCircle className="user-form-directed-button" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginStep2
