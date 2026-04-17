import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../css/login.css';
import BgImage from '../img/bg001.webp';
import { TiArrowBack } from "react-icons/ti";
import { IoSend } from "react-icons/io5"
import { IoIosMail } from "react-icons/io";

function Register4() {

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/');
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
                            <Link to="/register3" className="user-form-back-button">
                                <TiArrowBack className='user-form-back-button-icon' />
                                <span className="user-form-back-button-text">Geri</span>
                            </Link>
                        </div>
                        <div className="user-form-component">
                            <div className="user-form-header">
                                <h2 className="user-form-header-title">
                                    Adım: 4
                                </h2>
                                <p className="user-form-header-text">
                                    Eposta adresinize gönderilen doğrulama kodunu giriniz.
                                </p>
                            </div>
                        </div>
                        <div className="user-form-component">
                            <div className="kintaro-floating-layout">
                                <input className="kintaro-floating-icon-textbox" type="text" placeholder="" />
                                <label className="kintaro-floating-icon-label">Doğrulama Kodu</label>
                                <IoSend className="kintaro-floating-icon-image" onClick={handleRedirect} />
                            </div>
                        </div>
                        <div className="user-form-component">
                            <p className="user-form-system-message">
                                Denediğiniz doğrulama kodu yanlış.
                            </p>
                        </div>
                        <div className="user-form-component">
                            <div className="user-form-directed">
                                <p className="user-form-directed-text">
                                    Kodu tekrar gönder
                                </p>
                                <Link to="/">
                                    <IoIosMail className="user-form-directed-button" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register4
