import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import '../css/login.css'
import bgImage from '../img/bg001.webp'
import { IoSend } from "react-icons/io5"
import { FaArrowCircleRight } from "react-icons/fa"

function Register() {

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/register2');
  };

  return (
    <div>
      <Header />
      <div className="user-form-section">
        <div className="user-form">
          <div className="user-form-image-section">
            <img src={bgImage} className="user-form-image" />
          </div>
          <div className="user-form-main">
            <div className="user-form-component">
              <div className="user-form-header">
                <h2 className="user-form-header-title">
                  Kullanıcı Kayıt
                </h2>
                <p className="user-form-header-text">
                  Kayıt olmak için kendinize bir kullanıcı adı seçiniz.
                </p>
              </div>
            </div>
            <div className="user-form-component">
              <div className="kintaro-floating-layout">
                <input className="kintaro-floating-icon-textbox" type="text" placeholder="" />
                <label className="kintaro-floating-icon-label">Kullanıcı Adı</label>
                <IoSend className="kintaro-floating-icon-image" onClick={handleRedirect} />
              </div>
            </div>
            <div className="user-form-component">
              <p className="user-form-system-message">
                Kullanıcı adı zaten kullanılıyor.
              </p>
            </div>
            <div className="user-form-component">
              <div className="user-form-directed">
                <p className="user-form-directed-text">
                  Zaten bir hesabınız varsa giriş yapabilirsiniz.
                </p>
                <Link to="/login">
                  <FaArrowCircleRight className="user-form-directed-button" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
