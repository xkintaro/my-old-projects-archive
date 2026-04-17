import { KintaroTextBox1, KintaroTextBox2 } from "../inputs/KintaroTextBox";
import { KintaroAccentButton } from "../inputs/KintaroButton";

function KintaroUserLogin() {


  return (
    <div className="kintaro-xahzy">

      <div className="kintaro-user-form">

        <img src="/x/006.jpg" alt="logo" className="kintaro-kintaro-user-form-logo" />

        <KintaroTextBox1
          title={"Kullanıcı Adı"}
        />

        <KintaroTextBox2
          title={"Şifre"}
        />

        <KintaroAccentButton
          title={"Giriş Yap"}
        />

      </div>

    </div >
  )
}

export default KintaroUserLogin
