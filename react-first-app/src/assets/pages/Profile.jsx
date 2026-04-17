import { useState, useEffect } from 'react';
import Header from '../components/Header';
import "../css/profile.css";
import UserLogo from '../img/001.webp';
import UserBanner from '../img/bg001.webp';
import LogoMale from '../img/male.webp';
import LogoTr from '../img/tr.webp';
import Gallery1 from '../img/dikey002.webp';
import Gallery2 from '../img/dikey005.webp';
import Gallery3 from '../img/012.webp';
import Gallery4 from '../img/005.webp';
import Gallery5 from '../img/008.webp';
import { IoCloseSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function Profile() {

    const progress = 73;
    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const [isExpanded, setIsExpanded] = useState(false);
    const bioText =
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolor necessitatibus tempora ducimus nam ut illum officiis aliquid neque eligendi, possimus ipsum praesentium, architecto debitis assumenda molestiae! Illo, nesciunt beatae. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolor necessitatibus tempora ducimus nam ut illum officiis aliquid neque eligendi, possimus ipsum praesentium, architecto debitis assumenda molestiae! Illo, nesciunt beatae Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolor necessitatibus tempora ducimus nam ut illum officiis aliquid neque eligendi, possimus ipsum praesentium, architecto debitis assumenda molestiae! Illo, nesciunt beatae";

    const shortenedText = bioText.length > 200 ? bioText.slice(0, 200) + "..." : bioText;

    const [showProfileCustomizationSection, setShowProfileCustomizationSection] = useState(false);

    const profileCustomizationSectionOpen = () => {
        setShowProfileCustomizationSection(true);
    };

    const profileCustomizationSectionClose = () => {
        setShowProfileCustomizationSection(false);
    };

    useEffect(() => {
        if (showProfileCustomizationSection) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showProfileCustomizationSection]);

    const [profileCustomizationProfileImageSection, SetProfileCustomizationProfileImageSection] = useState(false);

    const profileCustomizationProfileImageSectionOpen = () => {
        SetProfileCustomizationProfileImageSection(true);
    };

    const profileCustomizationProfileImageSectionClose = () => {
        SetProfileCustomizationProfileImageSection(false);
    };

    const [profileCustomizationProfileBannerSection, SetProfileCustomizationProfileBannerSection] = useState(false);

    const profileCustomizationProfileBannerSectionOpen = () => {
        SetProfileCustomizationProfileBannerSection(true);
    };

    const profileCustomizationProfileBannerSectionClose = () => {
        SetProfileCustomizationProfileBannerSection(false);
    };

    const [fileNameProfileImage, SetFileNameProfileImage] = useState(null);

    const handleFileChangeProfileImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const maxLength = 15;
            const truncatedName =
                file.name.length > maxLength
                    ? file.name.substring(0, maxLength) + "..."
                    : file.name;
            SetFileNameProfileImage(truncatedName);
        }
    };

    const [fileNameProfileBanner, SetFileNameProfileBanner] = useState(null);

    const handleFileChangeProfileBanner = (event) => {
        const file = event.target.files[0];
        if (file) {
            const maxLength = 15;
            const truncatedName =
                file.name.length > maxLength
                    ? file.name.substring(0, maxLength) + "..."
                    : file.name;
            SetFileNameProfileBanner(truncatedName);
        }
    };

    return (
        <div>
            <Header />
            <div className="user-profile-section">
                <div className="user-profile">
                    <div className="user-profile-header">
                        <img src={UserBanner} className="user-profile-banner" />
                        <img src={UserLogo} className="user-profile-image" onClick={profileCustomizationSectionOpen} />
                        <div className="user-customization-settings-button" onClick={profileCustomizationSectionOpen} >
                            <IoMdSettings className='user-customization-settings-button-icon' />
                        </div>
                        <div className="user-profile-xp-bar">
                            <svg width="60" height="60" className="progress-ring">
                                <circle
                                    className="progress-ring-bg"
                                    cx="30"
                                    cy="30"
                                    r={radius}
                                    fill="transparent"
                                    stroke="#e6e6e6"
                                    strokeWidth="5"
                                />
                                <circle
                                    className="progress-ring-progress"
                                    cx="30"
                                    cy="30"
                                    r={radius}
                                    fill="transparent"
                                    stroke="#4caf50"
                                    strokeWidth="5"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    style={{ transition: 'stroke-dashoffset 0.5s' }}
                                />
                            </svg>
                            <div className="level-indicator">
                                <span className="level-indicator-number">38</span>
                            </div>
                        </div>
                    </div>
                    <div className="user-profile-main">
                        <div className="user-profile-badges">
                            <img src={UserLogo} className="user-badge" />
                            <img src={LogoMale} className="user-badge" />
                            <img src={LogoTr} className="user-badge" />
                        </div>
                        <div className="user-info">

                            <p className="user-info-user-date">Kayıt Tarihi: 21.08.2006</p>
                            <div className="user-info-title-text">
                                <h2 className="user-info-user-name">kintaro99w</h2>
                                <span className="user-info-user-type">admin</span>
                            </div>
                            <p className="user-info-user-id">ID: 5339865006</p>

                        </div>
                        <div className="user-bio">
                            <h3 className="user-bio-title">Hakkımda</h3>
                            <p className="user-bio-text">
                                {isExpanded ? bioText : shortenedText}{" "}
                                {bioText.length > 100 && (
                                    <span
                                        className="toggle-bio"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        style={{
                                            color: "#fff",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {isExpanded ? "Daha az göster" : "Devamını oku"}
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="user-status">
                            <div className="user-status-box">
                                <span className="user-status-title">Toplam karakter</span>
                                <div className="user-status-value">86</div>
                            </div>
                            <div className="user-status-box">
                                <span className="user-status-title">Efsanevi karakter</span>
                                <div className="user-status-value">7</div>
                            </div>
                            <div className="user-status-box">
                                <span className="user-status-title">Ard arda giriş yapılan gün sayısı</span>
                                <div className="user-status-value">14</div>
                            </div>
                            <div className="user-status-box">
                                <span className="user-status-title">Toplam Galibiyet</span>
                                <div className="user-status-value">648</div>
                            </div>
                            <div className="user-status-box">
                                <span className="user-status-title">Galibiyet serisi</span>
                                <div className="user-status-value">17</div>
                            </div>
                            <div className="user-status-box">
                                <span className="user-status-title">Arkadaşlar</span>
                                <div className="user-status-value">2</div>
                            </div>
                        </div>
                        <div className="user-gallery-section">
                            <div className="user-gallery-header">
                                <h3 className="user-gallery-header-title">Galeri - kintaro99w</h3>
                            </div>
                            <div className="user-gallery">
                                <div className="user-gallery-box">
                                    <img src={Gallery1} className="user-gallery-box-image" />
                                    <div className="user-gallery-box-body">
                                        <span className="user-gallery-box-body-title">Kaneki</span>
                                        <span className="user-gallery-box-body-more">Tokyo Ghoul</span>
                                    </div>
                                    <span className="user-gallery-box-card-point">
                                        98
                                    </span>
                                </div>
                                <div className="user-gallery-box">
                                    <img src={Gallery2} className="user-gallery-box-image" />
                                    <div className="user-gallery-box-body">
                                        <span className="user-gallery-box-body-title">Makima</span>
                                        <span className="user-gallery-box-body-more">Chainsaw Man</span>
                                    </div>
                                    <span className="user-gallery-box-card-point">
                                        92
                                    </span>
                                </div>
                                <div className="user-gallery-box">
                                    <img src={Gallery3} className="user-gallery-box-image" />
                                    <div className="user-gallery-box-body">
                                        <span className="user-gallery-box-body-title">Eto Yoshimaru</span>
                                        <span className="user-gallery-box-body-more">Tokyo Ghoul</span>
                                    </div>
                                    <span className="user-gallery-box-card-point">
                                        94
                                    </span>
                                </div>
                                <div className="user-gallery-box">
                                    <img src={Gallery4} className="user-gallery-box-image" />
                                    <div className="user-gallery-box-body">
                                        <span className="user-gallery-box-body-title">Yor Forger</span>
                                        <span className="user-gallery-box-body-more">Spy x Family</span>
                                    </div>
                                    <span className="user-gallery-box-card-point">
                                        87
                                    </span>
                                </div>
                                <div className="user-gallery-box">
                                    <img src={Gallery5} className="user-gallery-box-image" />
                                    <div className="user-gallery-box-body">
                                        <span className="user-gallery-box-body-title">Thorfinn</span>
                                        <span className="user-gallery-box-body-more">Vinland Saga</span>
                                    </div>
                                    <span className="user-gallery-box-card-point">
                                        91
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showProfileCustomizationSection && (
                <div className="user-profile-customization-section">
                    <div className="user-profile-customization-section-box">
                        <div className="user-profile-customization-header">
                            <div className="user-profile-customization-header-close-button-row">
                                <IoCloseSharp className="user-profile-customization-header-close-button" onClick={profileCustomizationSectionClose} />
                            </div>
                            <h2 className='user-profile-customization-header-title'>Profilinizi düzenleyin</h2>
                        </div>
                        <div className="user-profile-customization-box-main">
                            <div className="user-profile-customization-component">
                                <div className="user-profile-customization-profile-image-section">
                                    <div className="user-profile-customization-component-header">
                                        <h3 className='user-profile-customization-component-header-title'>Profil resmi</h3>
                                    </div>
                                    <div className="user-profile-customization-profile-image-upload-component" onClick={profileCustomizationProfileImageSectionOpen}>
                                        <img src={UserLogo} className="user-profile-customization-profile-image" />
                                        <div className="user-profile-customization-profile-image-upload-icon-component">
                                            <FaCloudUploadAlt className='user-profile-customization-profile-image-upload-icon' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-profile-customization-component">
                                <div className="user-profile-customization-profile-banner-section">
                                    <div className="user-profile-customization-component-header">
                                        <h3 className='user-profile-customization-component-header-title'>Banner</h3>
                                    </div>
                                    <div className="user-profile-customization-profile-banner-upload-component" onClick={profileCustomizationProfileBannerSectionOpen}>
                                        <img src={UserBanner} className="user-profile-customization-banner-image" />
                                        <div className="user-profile-customization-profile-banner-upload-icon-component">
                                            <FaCloudUploadAlt className='user-profile-customization-profile-banner-upload-icon' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-profile-customization-component">
                                <div className="user-profile-customization-profile-about-section">
                                    <div className="user-profile-customization-component-header">
                                        <h3 className='user-profile-customization-component-header-title'>Hakkımda</h3>
                                    </div>
                                    <textarea placeholder="Hakkımda bilgisi girmek için dokunun." className="user-profile-customization-about-textbox"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="user-profile-customization-footer">
                            <div className="user-profile-customization-footer-actions">
                                <button className='user-profile-customization-footer-button'>İptal</button>
                                <button className='user-profile-customization-footer-button'>Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {profileCustomizationProfileImageSection && (
                <div className="user-profile-image-customization-section">
                    <div className="user-profile-image-customization-section-box">
                        <div className="user-profile-customization-header">
                            <div className="user-profile-customization-header-close-button-row">
                                <IoCloseSharp className="user-profile-customization-header-close-button" onClick={profileCustomizationProfileImageSectionClose} />
                            </div>
                        </div>
                        <div className="user-profile-customization-box-main">
                            <div className="user-profile-customization-component">
                                <p className='user-profile-customization-text'>Mevcut profil resminizi kaldırmak için tıklayın.</p>
                            </div>
                            <div className="user-profile-customization-component">
                                <div className="user-profile-customization-file-upload-container">
                                    <input
                                        type="file"
                                        id="fileInputProfileImage"
                                        className="user-profile-customization-file-upload-input"
                                        onChange={handleFileChangeProfileImage}
                                    />
                                    <label htmlFor="fileInputProfileImage" className="user-profile-customization-file-upload-label">
                                        <FaCloudUploadAlt className="user-profile-customization-file-upload-icon" />
                                        {fileNameProfileImage ? (
                                            <span className="user-profile-customization-file-upload-file-name">{fileNameProfileImage}</span>
                                        ) : (
                                            <span>Yeni profil resminiz için bir dosya seçin.</span>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {profileCustomizationProfileBannerSection && (
                <div className="user-profile-image-customization-section">
                    <div className="user-profile-image-customization-section-box">
                        <div className="user-profile-customization-header">
                            <div className="user-profile-customization-header-close-button-row">
                                <IoCloseSharp className="user-profile-customization-header-close-button" onClick={profileCustomizationProfileBannerSectionClose} />
                            </div>
                        </div>
                        <div className="user-profile-customization-box-main">
                            <div className="user-profile-customization-component">
                                <p className='user-profile-customization-text'>Banner resminizi varsayılan olarak ayarlamak için tıklayın.</p>
                            </div>
                            <div className="user-profile-customization-component">
                                <div className="user-profile-customization-file-upload-container">
                                    <input
                                        type="file"
                                        id="fileInputProfileBanner"
                                        className="user-profile-customization-file-upload-input"
                                        onChange={handleFileChangeProfileBanner}
                                    />
                                    <label htmlFor="fileInputProfileBanner" className="user-profile-customization-file-upload-label">
                                        <FaCloudUploadAlt className="user-profile-customization-file-upload-icon" />
                                        {fileNameProfileBanner ? (
                                            <span className="user-profile-customization-file-upload-file-name">{fileNameProfileBanner}</span>
                                        ) : (
                                            <span>Yeni profil resminiz için bir dosya seçin.</span>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;