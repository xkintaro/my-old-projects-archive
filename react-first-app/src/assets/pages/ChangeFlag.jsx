import { useState, useEffect, useRef } from "react";
import "../css/settings.css";
import FlagTR from "../icons/tr.webp";
import FlagAZE from "../icons/aze.webp";
import FlagUSA from "../icons/usa.webp";
import FlagARAB from "../icons/arab.webp";
import FlagITALY from "../icons/italy.webp";

function ChangeFlag() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const dropdownRef = useRef(null);

    const countries = [
        { id: 1, name: "Türkiye", icon: FlagTR },
        { id: 2, name: "Azerbaycan", icon: FlagAZE },
        { id: 3, name: "Amerika", icon: FlagUSA },
        { id: 4, name: "Arabistan", icon: FlagARAB },
        { id: 5, name: "İtalya", icon: FlagITALY },
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

    const handleSelect = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
    };

    return (
        <div className="settings-box-main-change-flag">
            <div className="settings-box-main-change-flag-component">
                <h3 className="settings-box-main-change-flag-component-title">Bayrak seç</h3>
                <div className="dropdown-container" ref={dropdownRef}>
                    <button className="dropdown-button" onClick={toggleDropdown}>
                        {selectedCountry ? (
                            <>
                                <img
                                    src={selectedCountry.icon}
                                    alt={selectedCountry.name}
                                    style={{ width: "20px", marginRight: "8px" }}
                                />
                                {selectedCountry.name}
                            </>
                        ) : (
                            "Bayrak seçin"
                        )}
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {countries.map((country) => (
                                <li
                                    key={country.id}
                                    className="dropdown-item"
                                    onClick={() => handleSelect(country)}
                                >
                                    <img
                                        src={country.icon}
                                        alt={country.name}
                                        style={{ width: "20px", marginRight: "8px" }}
                                    />
                                    {country.name}
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

export default ChangeFlag
