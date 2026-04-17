function HesapBilgileri() {
    return (
        <div className="settings-box-main-account-information">
            <div className="settings-box-main-account-information-component">
                <div className="settings-box-main-account-information-component-header">
                    <h3 className="settings-box-main-account-information-component-header-title">Eposta adresi</h3>
                </div>
                <div className="settings-box-main-account-information-component-main">
                    <span className="settings-box-main-account-information-component-main-text">test@gmail.com</span>
                </div>
                <button className="user-settings-button">Değiştir</button>
            </div>
            <div className="settings-box-main-account-information-component">
                <div className="settings-box-main-account-information-component-header">
                    <h3 className="settings-box-main-account-information-component-header-title">Hesap kayıt tarihi</h3>
                </div>
                <div className="settings-box-main-account-information-component-main">
                    <span className="settings-box-main-account-information-component-main-text">21.08.2024</span>
                </div>
            </div>
        </div>
    )
}

export default HesapBilgileri
