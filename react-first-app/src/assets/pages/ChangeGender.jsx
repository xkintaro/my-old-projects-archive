import { useState, useEffect, useRef } from "react";
import "../css/settings.css";
import GenderSecret from "../icons/question.webp";
import GenderMale from "../icons/male.webp";
import GenderFemale from "../icons/female.webp";
import GenderHelicopter from "../icons/army.webp";

function ChangeGender() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);
    const dropdownRef = useRef(null);

    const genders = [
        { id: 1, name: "Belirtmek istemiyorum", icon: GenderSecret },
        { id: 2, name: "Erkek", icon: GenderMale },
        { id: 3, name: "Kadın", icon: GenderFemale },
        { id: 4, name: "Atak helikopteri", icon: GenderHelicopter },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (gender) => {
        setSelectedGender(gender);
        setIsOpen(false);
    };

    return (
        <div className="settings-box-main-change-flag">
            <div className="settings-box-main-change-flag-component">
                <h3 className="settings-box-main-change-flag-component-title">Cinsiyet seç</h3>
                <div className="dropdown-container" ref={dropdownRef}>
                    <button className="dropdown-button" onClick={toggleDropdown}>
                        {selectedGender ? (
                            <>
                                <img
                                    src={selectedGender.icon}
                                    alt={selectedGender.name}
                                    style={{ width: "20px", marginRight: "8px" }}
                                />
                                {selectedGender.name}
                            </>
                        ) : (
                            "Cinsiyet seçin"
                        )}
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {genders.map((gender) => (
                                <li
                                    key={gender.id}
                                    className="dropdown-item"
                                    onClick={() => handleSelect(gender)}
                                >
                                    <img
                                        src={gender.icon}
                                        alt={gender.name}
                                        style={{ width: "20px", marginRight: "8px" }}
                                    />
                                    {gender.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="user-settings-buttons">
                <button className='user-settings-button'>İptal</button>
                <button className='user-settings-button'>Kaydet</button>
            </div>

        </div>
    )
}

export default ChangeGender