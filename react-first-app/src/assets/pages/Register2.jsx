import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../css/login.css';
import BgImage from '../img/bg001.webp';
import { TiArrowBack } from "react-icons/ti";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Register2() {

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/register3');
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
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
                        <div className="user-form-component" style={{ marginTop: 10 }}>
                            <Link to="/register" className="user-form-back-button" style={{ marginTop: 20 }}>
                                <TiArrowBack className='user-form-back-button-icon' />
                                <span className="user-form-back-button-text">Geri</span>
                            </Link>
                        </div>
                        <div className="user-form-component">
                            <div className="user-form-header">
                                <h2 className="user-form-header-title">Adım: 2</h2>
                                <p className="user-form-header-text">Kendinize bir şifre belirleyin.</p>
                            </div>
                        </div>
                        <div className="user-form-component">
                            <div className="kintaro-floating-layout">
                                <input
                                    className="kintaro-floating-icon-textbox"
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder=""
                                />
                                <label className="kintaro-floating-icon-label">Şifre</label>
                                {passwordVisible ? (
                                    <IoEyeOff className="kintaro-floating-icon-image" onClick={togglePasswordVisibility} />
                                ) : (
                                    <IoEye className="kintaro-floating-icon-image" onClick={togglePasswordVisibility} />
                                )}
                            </div>
                        </div>
                        <div className="user-form-component">
                            <div className="kintaro-floating-layout">
                                <input
                                    className="kintaro-floating-icon-textbox"
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    placeholder=""
                                />
                                <label className="kintaro-floating-icon-label">Şifre Tekrar</label>
                                {confirmPasswordVisible ? (
                                    <IoEyeOff className="kintaro-floating-icon-image" onClick={toggleConfirmPasswordVisibility} />
                                ) : (
                                    <IoEye className="kintaro-floating-icon-image" onClick={toggleConfirmPasswordVisibility} />
                                )}
                            </div>
                        </div>
                        <div className="user-form-component">
                            <p className="user-form-system-message">Girdiğiniz şifreler birbiriyle uyuşmuyor.</p>
                        </div>
                        <div className="user-form-component">
                            <button className="kintaro-fill-button" onClick={handleRedirect}>Sonraki</button>
                        </div>
                        <div className="user-form-component"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register2;
