import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../css/login.css';
import BgImage from '../img/bg001.webp';
import { TiArrowBack } from "react-icons/ti";
import { IoEye, IoEyeOff } from "react-icons/io5";

function SifremiUnuttum3() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const [showMessage, setShowMessage] = useState(false);
    const [countdown, setCountdown] = useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        if (showMessage && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (countdown === 0) {
            navigate('/login');
        }
    }, [showMessage, countdown, navigate]);

    const handleButtonClick = () => {
        setShowMessage(true);
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
                            <Link to="/sifremiunuttum2" className="user-form-back-button" style={{ marginTop: 20 }}>
                                <TiArrowBack className='user-form-back-button-icon' />
                                <span className="user-form-back-button-text">Geri</span>
                            </Link>
                        </div>
                        <div className="user-form-component">
                            <p className="user-form-information-text">Kendinize yeni bir şifre belirleyin.</p>
                        </div>
                        <div className="user-form-component">
                            <div className="kintaro-floating-layout">
                                <input
                                    className="kintaro-floating-icon-textbox"
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder=""
                                />
                                <label className="kintaro-floating-icon-label">Yeni Şifre</label>
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
                                <label className="kintaro-floating-icon-label">Yeni Şifre Tekrar</label>
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
                            <button className="kintaro-fill-button" onClick={handleButtonClick}>Sonraki</button>
                        </div>
                        <div className="user-form-component"></div>
                    </div>
                </div>
            </div>
            {showMessage && (
                <div className="user-redirect-box-section">
                    <div className="user-redirect-box">
                        <div className="user-redirect-box-component">
                            <p className="user-redirect-box-text">
                                İşlem başarılı. {countdown} saniye içinde yönlendirileceksiniz.
                            </p>
                        </div>
                        <div className="user-redirect-box-component">
                            <div className="loading-circle"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SifremiUnuttum3
