import { useState, useRef, useEffect } from 'react';

const Select = ({
    options,
    onSelect,
    placeholder = "Select an option",
    disabled = false,
    className = ""
}) => {
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

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                className={`select-1  ${className}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                type="button"
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className={`absolute z-10 w-full mt-1 bg-[var(--bg-4)] border-[var(--border)] border border-solid rounded-md shadow-lg overflow-hidden`}>
                    <ul className="py-1 max-h-60 overflow-auto">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                  ${selectedOption?.value === option.value
                                        ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                                        : 'hover:bg-[var(--accent)]/10 text-[var(--text-1)]'
                                    }
                `}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export { Select };