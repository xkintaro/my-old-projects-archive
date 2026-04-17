import { IoIosClose } from "react-icons/io";

const KintaroButton1 = ({ title }) => {
    return (
        <button className="kintaro-button-reset kintaro-button-1" title={title}>
            {title}
        </button>
    );
};

const KintaroButton2 = ({ title }) => {
    return (
        <button className="kintaro-button-reset kintaro-button-2" title={title}>
            {title}
        </button>
    );
};

const KintaroButton1W100 = ({ title }) => {
    return (
        <button className="kintaro-button-reset kintaro-button-1 button-w100" title={title}>
            {title}
        </button>
    );
};

const KintaroIconButton1 = ({ title, icon, onClick }) => {
    return (
        <button className="kintaro-button-reset kintaro-icon-button-1" onClick={onClick} title={title}>
            {icon}
            {title}
        </button>
    );
};

const KintaroIconButton2 = ({ title, icon, onClick }) => {
    return (
        <button className="kintaro-button-reset kintaro-icon-button-2 " onClick={onClick} title={title}>
            {icon}
            {title}
        </button>
    );
};

const KintaroAccentButton = ({ title, onClick }) => {
    return (
        <button className="kintaro-button-reset kintaro-accent-button" onClick={onClick} title={title}>
            {title}
        </button>
    );
};

const KintaroAccentButtonW100 = ({ title, type }) => {
    return (
        <button className="kintaro-button-reset kintaro-accent-button button-w100" type={type} title={title}>
            {title}
        </button>
    );
};

const KintaroTextButton1 = ({ title, onClick }) => {
    return (
        <button className="kintaro-button-reset kintaro-text-button-1" onClick={onClick} title={title}>
            {title}
        </button>
    );
};

const KintaroAccentTextButton = ({ title, onClick }) => {
    return (
        <button className="kintaro-button-reset kintaro-accent-text-button" onClick={onClick} title={title}>
            {title}
        </button>
    );
};

const KintaroErrorButton = ({ title, onClick }) => {
    return (
        <button className="kintaro-button-reset kintaro-error-button" onClick={onClick} title={title}>
            {title}
        </button>
    );
};

const KintaroErrorTextButton = ({ title, onClick }) => {
    return (
        <button className="kintaro-button-reset kintaro-error-text-button" onClick={onClick} title={title}>
            {title}
        </button>
    );
};

const KintaroOnlyIconButton = ({ onClick, title, icon }) => {
    return (
        <button className="kintaro-button-reset kintaro-only-icon-button" onClick={onClick} title={title}>
            {icon}
        </button>
    );
};


const KintaroCloseButton = ({ onClick, title }) => {
    return (
        <IoIosClose className="kintaro-button-reset kintaro-close-button" onClick={onClick} title={title} />
    );
};

export { KintaroButton1, KintaroButton2, KintaroButton1W100, KintaroIconButton1, KintaroIconButton2, KintaroAccentButton, KintaroAccentButtonW100, KintaroOnlyIconButton, KintaroTextButton1, KintaroAccentTextButton, KintaroErrorButton, KintaroErrorTextButton, KintaroCloseButton };