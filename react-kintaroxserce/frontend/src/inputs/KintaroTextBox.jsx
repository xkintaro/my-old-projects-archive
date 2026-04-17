import  { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";

const KintaroTextBox1 = ({ value, onChange, title, type }) => {
    return (
        <div className="kintaro-floating-layout">
            <input
                className="kintaro-txtbox-1-textbox"
                type={type}
                placeholder=""
                value={value}
                onChange={onChange}
            />
            <label className="kintaro-txtbox-1-label">{title}</label>
        </div>
    );
};

const KintaroTextBox2 = ({ value, onChange, title }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    return (
        <div className="kintaro-floating-layout">

            <input
                className="kintaro-txtbox-2-textbox"
                type={passwordVisible ? 'text' : 'password'}
                placeholder=""
                value={value}
                onChange={onChange}
            />
            <label className="kintaro-txtbox-2-label">{title}</label>

            {passwordVisible ? (
                <IoEyeOff className="kintaro-txtbox-2-icon" onClick={togglePasswordVisibility} />
            ) : (
                <IoEye className="kintaro-txtbox-2-icon" onClick={togglePasswordVisibility} />
            )}

        </div>
    );
};

const KintaroTextBox3 = ({ value, onChange, title, buttonText, type }) => {
    return (
        <div className="kintaro-floating-layout">
            <input
                className="kintaro-txtbox-3-textbox"
                type={type}
                placeholder=""
                value={value}
                onChange={onChange}
            />
            <label className="kintaro-txtbox-3-label">{title}</label>

            <button className='kintaro-txtbox-3-button'>{buttonText}</button>
        </div>
    );
};

export { KintaroTextBox1, KintaroTextBox2, KintaroTextBox3 };