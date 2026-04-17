import { useEffect, useState } from "react";
import { useModal } from "../../../../contexts/ModalContext";
import { TextBox1 } from "../../../textbox";
import { Button1 } from "../../../button";
import RegisterPoster from "/assets/register.webp";
import LoginPoster from "/assets/login.webp";
import { User } from "lucide-react";
import { userRegister, userLogin } from "../../../../api/auth";
import { useAuth } from "../../../../contexts/AuthContext";
import { X } from "lucide-react";

const GoogleIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 48 48" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

const DiscordIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
    </svg>
);

function SocialButtons() {
    return (
        <div className="flex w-full items-center gap-2">
            <Button1 className="flex-1 bg-transparent hover:bg-[var(--bg-4)]">
                <GoogleIcon /> Google
            </Button1>
            <Button1 className="flex-1 bg-transparent hover:bg-[var(--bg-4)]">
                <DiscordIcon /> Discord
            </Button1>
        </div>
    );
}

export default function AuthModal() {
    const { token } = useAuth();
    const { activeModal, closeModal, modalTask, setModalTask } = useModal();

    const [formData, setFormData] = useState({ username: "", mail: "", password: "" });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (token) closeModal();
    }, [token]);

    useEffect(() => {
        setMessage(null);
        setFormData({ username: "", mail: "", password: "" });
    }, [modalTask]);

    if (activeModal !== "auth") return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("Yükleniyor...");
        try {
            const data = await userRegister(formData);
            setMessage(`Kayıt başarılı! Hoşgeldiniz ${data.user.username}`);
            setFormData({ username: "", mail: "", password: "" });
        } catch (err) {
            setMessage(err.message || "Kayıt başarısız");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("Yükleniyor...");
        try {
            const data = await userLogin({ mail: formData.mail, password: formData.password });
            setMessage(`Hoşgeldiniz ${data.user.username}`);
            setFormData({ username: "", mail: "", password: "" });
        } catch (err) {
            setMessage(err.message || "Giriş başarısız");
        }
    };

    return (
        <div className="z-[var(--popup-z)] fixed inset-0 flex justify-center items-center w-full h-screen">
            <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-xs" onClick={closeModal} />

            <div className="absolute bg-[var(--bg-2)] rounded-lg shadow-sm w-[95%] border border-solid border-[var(--border)] max-w-[800px] max-h-[90vh] overflow-auto">
                <div className="relative w-full flex">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-20"></div>

                    <button
                        onClick={closeModal}
                        title="close"
                        className="absolute z-10 top-5 right-5 bg-[var(--bg-4)] cursor-pointer flex items-center justify-center p-1 w-8 h-8 rounded-md text-[var(--text-1)] hover:text-[var(--text-2)] hover:bg-[var(--bg-4)]/70 transition"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex-1 min-h-[600px] relative hidden lg:block">
                        <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={modalTask === "register" ? RegisterPoster : LoginPoster}
                            alt="poster"
                        />
                        <div className="absolute w-full flex justify-center items-center bottom-0 pb-8">
                            <h1 className="text-[var(--text-1)] text-3xl font-semibold text-shadow-lg">
                                Deep<span className="text-[var(--accent)]">Glitch</span>.com
                            </h1>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[600px] relative">
                        <div className="px-4 md:px-10 flex flex-col items-center justify-center w-full h-full">
                            {modalTask === "register" ? (
                                <>
                                    <div className="flex flex-col">
                                        <h1 className="text-[var(--text-1)] font-semibold text-3xl mb-2 text-center">Create Account</h1>
                                        <p className="text-[var(--text-2)] text-sm text-center">
                                            Already have an Account?{" "}
                                            <span className="text-[var(--accent)] cursor-pointer" onClick={() => setModalTask("login")}>
                                                Login
                                            </span>
                                        </p>
                                    </div>

                                    <form onSubmit={handleRegister} className="flex flex-col gap-3.5 w-full my-7">
                                        <TextBox1 name="username" value={formData.username} onChange={handleChange} placeholder="Username" autoComplete="off" type="text" required icon={<User size={18} />} />
                                        <TextBox1 name="mail" value={formData.mail} onChange={handleChange} placeholder="Email address" autoComplete="off" type="email" required />
                                        <TextBox1 name="password" value={formData.password} onChange={handleChange} placeholder="Password" autoComplete="off" type="password" required />
                                        <Button1 type="submit" className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-[var(--text-1)] font-semibold" required>
                                            Create Account
                                        </Button1>
                                        {message && <p className="text-[var(--text-2)] text-sm">{message}</p>}
                                    </form>

                                    <div className="flex w-full mb-7 items-center justify-center gap-4">
                                        <div className="flex-1 h-0.5 bg-[var(--text-2)]/20" />
                                        <span className="text-[var(--text-2)]/50 text-sm">OR</span>
                                        <div className="flex-1 h-0.5 bg-[var(--text-2)]/20" />
                                    </div>

                                    <SocialButtons />

                                    <div className="w-90% px-6 mt-4">
                                        <p className="text-[var(--text-2)] text-sm text-center">
                                            By continuing, you agree to our{" "}
                                            <span className="text-[var(--text-1)]/90 cursor-pointer">Terms of Use</span> and{" "}
                                            <span className="text-[var(--text-1)]/90 cursor-pointer">Privacy Policy</span>.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col">
                                        <h1 className="text-[var(--text-1)] font-semibold text-3xl mt-10 mb-2 text-center">Welcome Back</h1>
                                        <p className="text-[var(--text-2)] text-sm text-center">
                                            Don’t have an account?{" "}
                                            <span className="text-[var(--accent)] cursor-pointer" onClick={() => setModalTask("register")}>
                                                Register
                                            </span>
                                        </p>
                                    </div>

                                    <form onSubmit={handleLogin} className="flex flex-col gap-3.5 w-full my-7">
                                        <TextBox1 name="mail" value={formData.mail} onChange={handleChange} placeholder="Email address" type="email" autoComplete="off" />
                                        <TextBox1 name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" autoComplete="off" />
                                        <Button1 type="submit" className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-[var(--text-1)] font-semibold">
                                            Login
                                        </Button1>
                                        {message && <p className="text-[var(--text-2)] text-sm">{message}</p>}
                                    </form>

                                    <div className="flex w-full mb-7 items-center justify-center gap-4">
                                        <div className="flex-1 h-0.5 bg-[var(--text-2)]/20" />
                                        <span className="text-[var(--text-2)]/50 text-sm">OR</span>
                                        <div className="flex-1 h-0.5 bg-[var(--text-2)]/20" />
                                    </div>

                                    <SocialButtons />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
