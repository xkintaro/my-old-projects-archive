import { useState } from 'react';
import { EyeClosed, Eye, Mail, Lock, Phone } from "lucide-react";

const TextBox1 = ({
    icon,
    className = '',
    type = 'text',
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const renderLeftIcon = () => {
        if (icon) {
            return icon;
        }
        switch (type) {
            case 'email':
                return <Mail size={18} />;
            case 'password':
                return <Lock size={18} />;
            case 'tel':
                return <Phone size={18} />;
            default:
                return null;
        }
    };

    const leftIcon = renderLeftIcon();

    return (
        <div className={`relative ${className}`}>
            {leftIcon && (
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <span className="text-[var(--placeholder)] text-lg">
                        {leftIcon}
                    </span>
                </div>
            )}

            <input
                {...props}
                autoComplete="off"
                type={isPassword ? (showPassword ? 'text' : 'password') : type}
                className={`textbox-1 ${leftIcon ? 'ps-10' : ''} ${isPassword ? 'pr-10' : ''} ${className}`}
            />

            {isPassword && (
                <div
                    className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                    <span className="text-[var(--placeholder)] text-lg">
                        {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                    </span>
                </div>
            )}
        </div>
    );
};

export { TextBox1 };