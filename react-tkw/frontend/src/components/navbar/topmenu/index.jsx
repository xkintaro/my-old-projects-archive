import { menuLinks, moreButton } from '../../../data/routes';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button1 } from '../../button';
import { motion } from 'framer-motion';
import { useModal } from '../../../contexts/ModalContext';
import { useAuth } from '../../../contexts/AuthContext';
import ProfileMenu from '../profilemenu';

export default function TopMenu() {

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    const { openModal, setModalTask } = useModal();
    const { token } = useAuth();

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
        <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='h-[var(--navbar-h)] px-4 fixed top-0 left-0 z-[var(--navbar-z)] w-full flex justify-center items-center bg-[var(--bg-1)]/50 backdrop-blur-sm'
        >
            <div className="flex justify-between items-center mx-auto container">
                <Link to="/">
                    <img src="/assets/logo.webp" alt="logo" className='w-12 h-fit' />
                </Link>

                <nav className='hidden lg:flex items-center gap-6'>
                    {mainLinks.map((link, i) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={i}
                                to={link.path}
                                className={`flex items-center gap-1 text-[var(--text-2)] text-sm transition uppercase font-semibold hover:text-[var(--text-1)] ${location.pathname === link.path ? '!text-[var(--text-1)]' : ''
                                    }`}
                            >
                                {Icon && <Icon size={16} />}
                                {link.name}
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
                                {moreButton.name}
                            </button>

                            {showDropdown && (
                                <div className="absolute top-full right-0 mt-5 min-w-48 w-fit bg-[var(--bg-3)] rounded-md overflow-hidden shadow-lg border border-solid border-[var(--border)] py-1 z-10">
                                    {extraLinks.map((link, i) => {
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={i}
                                                to={link.path}
                                                className={`flex items-center gap-2 px-4 py-2 text-[var(--text-2)] text-sm hover:text-[var(--text-1)] hover:bg-[var(--bg-hover)] ${location.pathname === link.path ? '!text-[var(--text-1)]' : ''
                                                    }`}
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

                <div className="flex gap-2.5 items-center">

                    {token ? (
                        <ProfileMenu />
                    ) : (
                        <>
                            <Button1
                                className="bg-transparent"
                                onClick={() => {
                                    openModal("auth");
                                    setModalTask("register");
                                }}
                            >
                                Register
                            </Button1>

                            <Button1
                                className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
                                onClick={() => {
                                    openModal("auth");
                                    setModalTask("login");
                                }}
                            >
                                Login
                            </Button1>
                        </>
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
        </motion.div >
    );
}
