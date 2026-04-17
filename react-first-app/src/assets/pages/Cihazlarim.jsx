import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaTabletAlt } from "react-icons/fa";
import { MdLaptopChromebook } from "react-icons/md";

function Cihazlarim() {
    return (
        <div className="settings-box-main-devices">
            <h3 className="settings-box-main-devices-title">Cihazlarım</h3>
            <div className="settings-box-main-devices-main">
                <div className="settings-box-main-devices-component">
                    <IoPhonePortraitOutline className="settings-box-main-devices-component-device-name-icon" />
                    <span className="settings-box-main-devices-component-device-name">Samsung A50</span>
                    <span className="settings-box-main-devices-component-device-last-online">Son görülme: 17 saat önce</span>
                    <span className="settings-box-main-devices-component-device-location">Turkey/Konya</span>
                    <span className="settings-box-main-devices-component-device-ip">192.168.1.1</span>
                    <button className="user-settings-button">Oturumu kapat</button>
                </div>
                <div className="settings-box-main-devices-component">
                    <FaTabletAlt className="settings-box-main-devices-component-device-name-icon" />
                    <span className="settings-box-main-devices-component-device-name">İpad 7</span>
                    <span className="settings-box-main-devices-component-device-last-online">Son görülme: 17 saat önce</span>
                    <span className="settings-box-main-devices-component-device-location">Turkey/Konya</span>
                    <span className="settings-box-main-devices-component-device-ip">192.168.1.1</span>
                    <button className="user-settings-button">Oturumu kapat</button>
                </div>
                <div className="settings-box-main-devices-component">
                    <MdLaptopChromebook className="settings-box-main-devices-component-device-name-icon" />
                    <span className="settings-box-main-devices-component-device-name">Windows 11</span>
                    <span className="settings-box-main-devices-component-device-last-online">Son görülme: 17 saat önce</span>
                    <span className="settings-box-main-devices-component-device-location">Turkey/Konya</span>
                    <span className="settings-box-main-devices-component-device-ip">192.168.1.1</span>
                    <button className="user-settings-button">Oturumu kapat</button>
                </div>
            </div>
        </div>
    )
}

export default Cihazlarim
