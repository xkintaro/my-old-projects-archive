import  { useState, useEffect } from "react";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import "../assets/css/kintaroNavbarSearch.css";

function KintaroNavbarSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [overlayActive, setOverlayActive] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth >= 768) {
                setOverlayActive(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    const openOverlay = () => {
        setOverlayActive(true);
    };

    const closeOverlay = () => {
        setOverlayActive(false);
        setSearchTerm("");
    };

    const renderSearchBar = () => (
        <div className={`kintaro-search-bar-container ${isFocused ? "kintaro-focused" : ""}`}>
            {isMobile && overlayActive && (
                <button className="kintaro-back-button" onClick={closeOverlay}>
                    <FiArrowLeft size={20} />
                </button>
            )}
            <input
                type="text"
                placeholder="Ara..."
                className="kintaro-search-input"
                value={searchTerm}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus={isMobile && overlayActive}
            />
            {searchTerm && (
                <button className="kintaro-clear-button" onClick={clearSearch}>
                    <IoMdClose />
                </button>
            )}
            <button className="kintaro-search-button">
                <FiSearch />
            </button>
        </div>
    );

    if (isMobile && !overlayActive) {
        return (
            <FiSearch className="kintaro-mobile-search-button" onClick={openOverlay} />
        );
    }

    return (
        <>
            {isMobile && overlayActive && (
                <div className="kintaro-overlay">
                    {renderSearchBar()}
                </div>
            )}
            {!isMobile && renderSearchBar()}
        </>
    );
}

export default KintaroNavbarSearch;