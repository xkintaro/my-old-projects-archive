import { KintaroTextBox1, KintaroTextBox2, KintaroTextBox3 } from "../inputs/KintaroTextBox";
import { KintaroAccentButton } from "../inputs/KintaroButton";

function KintaroUserRegister() {

    return (
        <div className="kintaro-xahzy">

            <div className="kintaro-user-form">

                <img src="/x/006.jpg" alt="logo" className="kintaro-kintaro-user-form-logo" />

                <KintaroTextBox1
                    title={"Eposta Adresi"}
                />

                <KintaroTextBox3
                    title={"Doğrulama Kodu"}
                    buttonText={"Kod Al"}
                />

                <KintaroTextBox1
                    title={"Kullanıcı Adı"}
                />

                <KintaroTextBox2
                    title={"Şifre"}
                />

                <KintaroTextBox2
                    title={"Şifre Tekrar"}
                />

                <KintaroAccentButton
                    title={"Kayıt Ol"}
                />

            </div>

        </div>
    );
}

export default KintaroUserRegister;