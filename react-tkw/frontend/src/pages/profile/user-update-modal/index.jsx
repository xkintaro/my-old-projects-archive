import { useEffect, useState } from "react";
import { useModal } from "../../../contexts/ModalContext";
import { TextBox1 } from "../../../components/textbox";
import { Button1 } from "../../../components/button";
import { useAuth } from "../../../contexts/AuthContext";
import { X, User, Mail, Lock, Globe, Trash2, Highlighter, } from "lucide-react";
import Theme from "../../../components/theme";
import { getCurrentUser, updateUser } from "../../../api/user";
import SystemMessage from "../../../components/system-messages";

import { useCurrentUserContext } from "../../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

export default function UserUpdateModal() {

    const navigate = useNavigate();

    const { token } = useAuth();
    const { activeModal, closeModal, modalTask, setModalTask } = useModal();

    const { refetch: refetchCurrentUser } = useCurrentUserContext();

    const [formData, setFormData] = useState({
        username: "",
        mail: "",
        description: "",
        password: "",
        newPassword: "",
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!token && activeModal === 'update-user') {
            closeModal();
        }
    }, [token, activeModal, closeModal]);

    useEffect(() => {
        if (activeModal === 'update-user' && !modalTask) {
            setModalTask('profile');
        }
    }, [activeModal, modalTask, setModalTask]);


    useEffect(() => {
        if (activeModal === 'update-user' && token) {
            const fetchAndSetUserData = async () => {
                try {
                    const currentUserData = await getCurrentUser(token);
                    setFormData(prev => ({
                        ...prev,
                        username: currentUserData.username,
                        mail: currentUserData.mail,
                        description: currentUserData.description,
                    }));
                } catch (error) {
                    console.error("Kullanıcı verileri alınamadı:", error);
                    setMessage({ success: false, text: "Kullanıcı bilgileri yüklenirken bir hata oluştu." });
                }
            };

            fetchAndSetUserData();
        }
    }, [activeModal, token]);

    useEffect(() => {
        setMessage(null);
        setFormData(prev => ({
            ...prev,
            password: "",
            newPassword: "",
        }));
    }, [modalTask]);


    if (activeModal !== "update-user") return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const res = await updateUser(formData, token);
            setMessage({ success: res.success, text: res.message });

            if (res.success) {
                setTimeout(() => {
                    refetchCurrentUser();
                    navigate("/profile");
                    closeModal();
                }, 1500);
            }

        } catch (err) {
            setMessage({ success: false, text: err.message || "Bir şeyler ters gitti!" });
        }
    };

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'account', label: 'Account', icon: Mail },
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'appearance', label: 'Appearance', icon: Globe },
        { id: 'delete', label: 'Delete Account', icon: Trash2, danger: true },
    ];

    const renderContent = () => {
        switch (modalTask) {
            case 'profile':
                return (
                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-[var(--text-1)] mb-6">Profile Settings</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                            <TextBox1
                                placeholder="Username"
                                name="username"
                                type="text"
                                icon={<User size={18} />}
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <TextBox1
                                placeholder="Hakkımda"
                                name="description"
                                type="text"
                                icon={<Highlighter size={18} />}
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <Button1 className="w-fit" type="submit">Update Profile</Button1>
                        </form>
                    </div>
                );
            case 'account':
                return (
                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-[var(--text-1)] mb-6">Account Settings</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                            <TextBox1
                                placeholder="Email Adress"
                                name="mail"
                                type="email"
                                value={formData.mail}
                                onChange={handleChange}
                                required
                            />
                            <Button1 className="w-fit" type="submit">Update Email Adress</Button1>
                        </form>
                    </div>
                );
            case 'password':
                return (
                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-[var(--text-1)] mb-6">Change Password</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                            <TextBox1
                                placeholder="Current Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <TextBox1
                                placeholder="New Password"
                                name="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                            <span className="text-[var(--text-2)] text-base cursor-pointer w-fit hover:underline">Forgot Password?</span>
                            <Button1 className="w-fit" type="submit">Update Password</Button1>
                        </form>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-[var(--text-1)] mb-6">Appearance Settings</h2>
                        <h3 className="text-[var(--text-1)] text-lg font-semibold mb-1.5">Theme</h3>
                        <Theme />
                    </div>
                );
            case 'delete':
                return (
                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-[var(--text-1)] mb-6">Delete Account</h2>
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-6">
                            <p className="text-red-400">Warning: This action is permanent and cannot be undone. All your data will be erased.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <TextBox1
                                label="Enter your password to confirm"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <div className="pt-4">
                                <Button1 type="submit" variant="danger">Permanently Delete Account</Button1>
                            </div>
                        </form>
                    </div>
                );
        }
    };

    return (
        <div className="z-[var(--popup-z)] fixed inset-0 flex justify-center items-center w-full h-screen">
            <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-xs" onClick={closeModal} />

            <div className="absolute bg-[var(--bg-2)] rounded-lg shadow-sm w-[95%] border border-solid border-[var(--border)] max-w-[900px] max-h-[90vh] overflow-auto">
                <div className="relative w-full flex flex-col lg:flex-row">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-20"></div>

                    <button
                        onClick={closeModal}
                        title="close"
                        className="absolute z-10 top-5 right-5 bg-[var(--bg-4)] cursor-pointer flex items-center justify-center p-1 w-8 h-8 rounded-md text-[var(--text-1)] hover:text-[var(--text-2)] hover:bg-[var(--bg-4)]/70 transition"
                    >
                        <X size={18} />
                    </button>

                    <div className="w-full lg:w-64 min-h-[500px] lg:min-h-[600px] relative bg-[var(--bg-3)] lg:border-r border-[var(--border)] p-4 lg:p-6">
                        <div className="sticky top-6">
                            <h3 className="text-lg font-semibold text-[var(--text-1)] mb-6 pl-2">Settings</h3>
                            <nav className="space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setModalTask(item.id)}
                                            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${modalTask === item.id
                                                ? item.danger
                                                    ? 'bg-red-500/10 text-red-400'
                                                    : 'bg-[var(--accent)]/10 text-[var(--accent)]'
                                                : 'text-[var(--text-2)] hover:bg-[var(--bg-4)]'}`}
                                        >
                                            <Icon size={18} className={item.danger ? 'text-red-400' : ''} />
                                            <span className={item.danger ? 'text-red-400' : ''}>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[500px] lg:min-h-[600px] relative">
                        <div className="p-6 flex flex-col items-center w-full h-full overflow-auto">

                            {renderContent()}

                            {message && (
                                <SystemMessage message={message.text} success={message.success} className={"mt-3"} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}