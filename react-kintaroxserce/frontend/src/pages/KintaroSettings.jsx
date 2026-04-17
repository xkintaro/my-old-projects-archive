import { KintaroTitle1, KintaroTitle3 } from "../components/KintaroTitle";
import { KintaroDescription } from "../components/KintaroDescription";
import { FaUser } from "react-icons/fa";

function KintaroSettings() {
    return (
        <div className="kintaro-settings">

            <KintaroTitle1 title={"Ayarlar"} />

            <div className="kintaro-settings-main">

                <div className="kintaro-settings-main-item">

                    <div className="kintaro-settings-main-item-left">

                        <FaUser className="kintaro-settings-main-item-icon" />

                        <div className="kintaro-settings-main-item-texts">
                            <KintaroTitle3 title={"Anasayfa ışıltı efekti"} />
                            <KintaroDescription text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, quod."} maxLength={75} showToggleButton={false} />
                        </div>

                    </div>

                    <div className="kintaro-settings-main-item-right">

                        <label className="kintaro-toggle-switch">
                            <input type="checkbox" className="kintaro-toggle-input" />
                            <span className="kintaro-toggle-slider"></span>
                        </label>

                    </div>

                </div>

                <div className="kintaro-settings-main-item">

                    <div className="kintaro-settings-main-item-left">

                        <FaUser className="kintaro-settings-main-item-icon" />

                        <div className="kintaro-settings-main-item-texts">
                            <KintaroTitle3 title={"Anasayfa ışıltı efekti"} />
                            <KintaroDescription text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, quod."} maxLength={75} showToggleButton={false} />
                        </div>

                    </div>

                    <div className="kintaro-settings-main-item-right">

                        <label className="kintaro-toggle-switch">
                            <input type="checkbox" className="kintaro-toggle-input" />
                            <span className="kintaro-toggle-slider"></span>
                        </label>

                    </div>

                </div>

                <div className="kintaro-settings-main-item">

                    <div className="kintaro-settings-main-item-left">

                        <FaUser className="kintaro-settings-main-item-icon" />

                        <div className="kintaro-settings-main-item-texts">
                            <KintaroTitle3 title={"Anasayfa ışıltı efekti"} />
                            <KintaroDescription text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, quod."} maxLength={75} showToggleButton={false} />
                        </div>

                    </div>

                    <div className="kintaro-settings-main-item-right">

                        <label className="kintaro-toggle-switch">
                            <input type="checkbox" className="kintaro-toggle-input" />
                            <span className="kintaro-toggle-slider"></span>
                        </label>

                    </div>

                </div>

                <div className="kintaro-settings-main-item">

                    <div className="kintaro-settings-main-item-left">

                        <FaUser className="kintaro-settings-main-item-icon" />

                        <div className="kintaro-settings-main-item-texts">
                            <KintaroTitle3 title={"Anasayfa ışıltı efekti"} />
                            <KintaroDescription text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, quod."} maxLength={75} showToggleButton={false} />
                        </div>

                    </div>

                    <div className="kintaro-settings-main-item-right">

                        <label className="kintaro-toggle-switch">
                            <input type="checkbox" className="kintaro-toggle-input" />
                            <span className="kintaro-toggle-slider"></span>
                        </label>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default KintaroSettings
