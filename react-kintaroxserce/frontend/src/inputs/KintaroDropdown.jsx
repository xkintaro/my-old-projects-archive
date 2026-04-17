import  { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const KintaroDropdown1 = ({ options, placeholder = "Select an option", onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect && onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="kintaro-dropdown-container" ref={dropdownRef}>
            <div
                className={`kintaro-dropdown-trigger ${isOpen ? 'kintaro-dropdown-open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`kintaro-dropdown-placeholder ${selectedOption ? 'kintaro-dropdown-selected' : ''}`}>
                    {selectedOption?.label || placeholder}
                </span>
                <FiChevronDown
                    className={`kintaro-dropdown-icon ${isOpen ? 'kintaro-dropdown-icon-open' : ''}`}
                />
            </div>

            {isOpen && (
                <div className="kintaro-dropdown-menu">
                    <div className="kintaro-dropdown-menu-inner">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`kintaro-dropdown-item ${selectedOption?.value === option.value ? 'kintaro-dropdown-item-selected' : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                <span>{option.label}</span>
                                {selectedOption?.value === option.value && (
                                    <FiCheck className="kintaro-dropdown-check-icon" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export { KintaroDropdown1 };