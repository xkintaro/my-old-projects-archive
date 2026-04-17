import '../assets/css/kintaroUserProfile.css';
import { KintaroButton2 } from "../inputs/KintaroButton";
import { KintaroTitle1, KintaroTitle2 } from "../components/KintaroTitle";
import { KintaroDescription } from "../components/KintaroDescription";

import UserProfileImage from "/user-profile/1.jpg"
import UserProfileGenderBadge from "/gender/male.png"
import UserProfileFlagBadge from "/flag/tr.png"

function KintaroUserProfile() {

    return (
        <div className='kintaro-user-profile'>

            <div className="kintaro-user-profile-head">
                <img src={UserProfileImage} alt="" className="kintaro-user-profile-head-profile-image" />
                <div className="kintaro-user-profile-head-main">
                    <KintaroTitle1 title={"kintaro"} />
                    <div className="kintaro-user-profile-head-main-buttons">

                        <KintaroButton2 title={"Takip Et"} />
                        <KintaroButton2 title={"Mesaj"} />
                        <KintaroButton2 title={"Paylaş"} />

                    </div>
                    <div className="kintaro-user-profile-head-main-followers-following">
                        <div className="kintaro-user-profile-head-main-followers-following-item">0 Takipçi</div>
                        <div className="kintaro-user-profile-head-main-followers-following-item">0 Takip Edilen</div>
                    </div>
                </div>
            </div>

            <div className="kintaro-user-profile-main">
                <div className="kintaro-user-profile-main-badges">
                    <img src={UserProfileImage} alt="" className="kintaro-user-profile-main-badges-item" />
                    <img src={UserProfileGenderBadge} alt="" className="kintaro-user-profile-main-badges-item" />
                    <img src={UserProfileFlagBadge} alt="" className="kintaro-user-profile-main-badges-item" />
                </div>
                <div className="kintaro-user-profile-main-description">
                    <KintaroTitle2 title={"Hakkımda"} />
                    <KintaroDescription text={"xkintaro"} maxLength={300} showToggleButton={true} />
                </div>
            </div>
            
        </div>
    )
}

export default KintaroUserProfile
