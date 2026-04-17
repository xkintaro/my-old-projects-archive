function SifreVeGuvenlik() {
  return (
    <div className="settings-box-main-password-and-security">
      <div className="settings-box-main-password-and-security-component">
        <div className="settings-box-main-password-and-security-component-header">
          <h3 className="settings-box-main-password-and-security-component-header-title">Şifre</h3>
        </div>
        <div className="settings-box-main-password-and-security-component-main">
          <span className="settings-box-main-password-and-security-component-main-text">Son değiştirilme tarihi: 21.08.2024</span>
        </div>
        <button className="user-settings-button">Değiştir</button>
      </div>
      <div className="settings-box-main-password-and-security-component">
        <div className="settings-box-main-password-and-security-component-header">
          <h3 className="settings-box-main-password-and-security-component-header-title">İki adımlı doğrulama</h3>
        </div>
        <div className="settings-box-main-password-and-security-component-main">
          <span className="settings-box-main-password-and-security-component-main-text">İki adımlı doğrulama: Devre dışı</span>
        </div>
        <button className="user-settings-button">Etkinleştir</button>
      </div>
    </div>
  )
}

export default SifreVeGuvenlik
