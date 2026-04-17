import { useState } from 'react';
import "../css/settings.css";
import UserLogo from '../img/001.webp';
import UserBanner from '../img/bg001.webp';

function ProfileEdit() {
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
        <div className="settings-box-main-edit-profile">
            <div className="settings-box-main-edit-profile-component">
                <div className="settings-box-main-edit-profile-image-section">
                    <div className="settings-box-main-edit-profile-image-section-header">
                        <h3 className="settings-box-main-edit-profile-image-section-header-title">Profil resmi</h3>
                        <img src={UserLogo} className="settings-box-main-edit-profile-image-section-header-profile-image" />
                    </div>
                    <div className="user-settings-edit-profile-image-file-upload-container">
                        <input
                            type="file"
                            id="fileInputProfileImage"
                            className="user-settings-edit-profile-image-file-upload-input"
                            onChange={handleFileChangeProfileImage}
                        />
                        <label htmlFor="fileInputProfileImage" className="user-settings-edit-profile-image-file-upload-label">
                            {fileNameProfileImage ? (
                                <span className="user-settings-edit-profile-image-file-upload-file-name">{fileNameProfileImage}</span>
                            ) : (
                                <span>Fotoğrafı değiştir</span>
                            )}
                        </label>
                    </div>
                </div>
            </div>
            <div className="settings-box-main-edit-profile-component">
                <div className="settings-box-main-edit-profile-banner-section">
                    <h3 className="settings-box-main-edit-profile-banner-section-header-title">Banner resmi</h3>
                    <img src={UserBanner} className="settings-box-main-edit-profile-banner-section-header-profile-banner" />
                    <div className="user-settings-edit-profile-banner-file-upload-container">
                        <input
                            type="file"
                            id="fileInputProfileBanner"
                            className="user-settings-edit-profile-banner-file-upload-input"
                            onChange={handleFileChangeProfileBanner}
                        />
                        <label htmlFor="fileInputProfileBanner" className="user-settings-edit-profile-banner-file-upload-label">
                            {fileNameProfileBanner ? (
                                <span className="user-settings-edit-profile-banner-file-upload-file-name">{fileNameProfileBanner}</span>
                            ) : (
                                <span>Fotoğrafı değiştir</span>
                            )}
                        </label>
                    </div>
                </div>
            </div>
            <div className="settings-box-main-edit-profile-component">
                <div className="user-settings-customization-profile-about-section">
                    <div className="user-settings-customization-component-header">
                        <h3 className='user-settings-customization-component-header-title'>Hakkımda</h3>
                    </div>
                    <textarea placeholder="Hakkımda bilgisi girmek için dokunun." className="user-settings-customization-about-textbox"></textarea>
                </div>
            </div>
            <div className="user-settings-buttons">
                <button className='user-settings-button'>İptal</button>
                <button className='user-settings-button'>Kaydet</button>
            </div>
        </div>
    )
}

export default ProfileEdit
