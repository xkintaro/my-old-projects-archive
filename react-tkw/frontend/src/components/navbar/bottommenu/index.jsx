import { menuLinks, moreButton } from '../../../data/routes';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomMenu() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const mainLinks = menuLinks.length <= 4 ? menuLinks : menuLinks.slice(0, 3);
    const extraLinks = menuLinks.length <= 4 ? [] : menuLinks.slice(3);

    const MoreIcon = moreButton.icon;

    return (
        <div className='flex lg:hidden h-[var(--navbar-h)] fixed bottom-0 left-0 z-[var(--navbar-z)] w-full bg-[var(--bg-1)]/50 backdrop-blur-sm justify-center items-center'>

            <div className="flex justify-around items-center mx-auto container px-4">

                <nav className='flex items-center gap-6 justify-around w-full'>
                    {mainLinks.map((link, i) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={i}
                                to={link.path}
                                className={`flex items-center gap-1 text-[var(--text-2)] text-sm transition uppercase font-semibold rounded-full p-3 hover:text-[var(--text-1)] ${location.pathname === link.path ? '!text-[var(--text-1)]' : ''
                                    }`}
                            >
                                {Icon && <Icon size={20} />}
                            </Link>
                        );
                    })}
                    {extraLinks.length > 0 && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className='flex items-center gap-1 text-[var(--text-2)] text-sm transition uppercase font-semibold hover:text-[var(--text-1)]'
                            >
                                {MoreIcon && <MoreIcon size={16} />}
                            </button>

                            {showDropdown && (
                                <div className="absolute bottom-full right-0 mb-5 min-w-48 w-fit bg-[var(--bg-3)] rounded-md overflow-hidden shadow-lg border border-solid border-[var(--border)] py-1 z-10">
                                    {extraLinks.map((link, i) => {
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={i}
                                                to={link.path}
                                                className={`flex items-center gap-2 px-4 py-2 text-[var(--text-2)] text-sm hover:text-[var(--text-1)] hover:bg-[var(--bg-hover)] ${location.pathname === link.path ? '!text-[var(--text-1)]' : ''}`}
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                {Icon && <Icon size={16} />}
                                                {link.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </nav>

            </div>

            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

        </div>
    );
}