import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Settings, LogOut, Plus, Database, User } from 'lucide-react';
import { useModal } from "../../../contexts/ModalContext";
import { useCurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { openModal } = useModal();
    const { currentUser, loading } = useCurrentUserContext();


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

    return (
        <>
            {!loading && currentUser && (
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg transition-colors duration-200 hover:bg-[var(--bg-3)]"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="relative">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_USER_PROFILES_DIR}/${currentUser.image}`}
                                alt={currentUser.username}
                                className="w-8 h-8 rounded-full border-2 border-solid border-[var(--accent)]"
                            />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-2)]"></div>
                        </div>

                        <div className="hidden sm:flex flex-col">
                            <span className="text-[var(--text-1)] text-sm font-semibold leading-tight">
                                {currentUser.username}
                            </span>
                            <span className="text-[var(--text-3)] text-xs">Online</span>
                        </div>

                        <ChevronDown
                            size={16}
                            className={`text-[var(--text-2)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--bg-3)] border border-solid border-[var(--border)] rounded-lg shadow-lg overflow-hidden z-50">
                            <div className="p-4 border-b border-solid border-[var(--border)]">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_USER_PROFILES_DIR}/${currentUser.image}`}
                                        alt={currentUser.username}
                                        className="w-10 h-10 rounded-full border-2 border-solid border-[var(--accent)]"
                                    />
                                    <div>
                                        <h3 className="text-[var(--text-1)] text-lg font-semibold">
                                            {currentUser.username}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="py-2">
                                <Link
                                    to={"/profile"}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center px-4 py-2 text-[var(--text-2)] hover:bg-[var(--bg-4)] cursor-pointer transition-colors"
                                >
                                    <User size={18} className="mr-3" />
                                    <span>Profile</span>
                                </Link>

                                <div
                                    onClick={() => {
                                        setIsOpen(false);
                                        openModal("update-user");
                                    }}
                                    className="flex items-center px-4 py-2 text-[var(--text-2)] hover:bg-[var(--bg-4)] cursor-pointer transition-colors">
                                    <Settings size={18} className="mr-3" />
                                    <span>Settings</span>
                                </div>

                                <div
                                    onClick={() => {
                                        setIsOpen(false);
                                        openModal("servers");
                                    }}
                                    className="flex items-center px-4 py-2 text-[var(--text-2)] hover:bg-[var(--bg-4)] cursor-pointer transition-colors"
                                >
                                    <Database size={18} className="mr-3" />
                                    <span>My Servers</span>
                                </div>

                                <div className="flex items-center px-4 py-2 text-[var(--text-2)] hover:bg-[var(--bg-4)] cursor-pointer transition-colors">
                                    <Plus size={18} className="mr-3" />
                                    <span>Create Server</span>
                                </div>
                            </div>

                            <div className="p-2 border-t border-solid border-[var(--border)]">
                                <div
                                    onClick={() => {
                                        setIsOpen(false);
                                        openModal("user-logout");
                                    }}
                                    className="flex items-center px-2 py-2 text-red-500 hover:bg-[var(--bg-4)] rounded cursor-pointer transition-colors">
                                    <LogOut size={18} className="mr-3" />
                                    <span>Log Out</span>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div >
            )
            }
        </>
    );
};