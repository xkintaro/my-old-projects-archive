import { MascotMessageBox } from "../../components/system-messages";
import { SearchX, Camera, Bubbles } from "lucide-react";
import { Button2 } from "../../components/button";
import UserImageModal from "./user-image-modal";
import { useModal } from "../../contexts/ModalContext";
import { motion } from "framer-motion";

import { useUserContext } from "../../contexts/UserContext";
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';

export default function ProfilePage() {

    const { openModal, setModalTask } = useModal();
    const { user, loading, error } = useUserContext();
    const { currentUser } = useCurrentUserContext();

    return (
        <div className="w-full flex flex-col justify-center items-center py-24 px-4 bg-[radial-gradient(#8882_1px,transparent_1px)] [background-size:16px_16px]">

            {loading && <MascotMessageBox message={"Loading..."} icon={<Bubbles size={52} />} />}

            {error && <MascotMessageBox message={error} icon={<SearchX size={52} />} />}

            {!loading && !error && user && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="container flex flex-col gap-8 mx-auto">

                    <div className="flex gap-5 items-center w-full flex-col md:flex-row">

                        <div className="group w-40 aspect-square relative overflow-hidden rounded-full border border-solid border-[var(--border)] shadow-md flex justify-center items-center">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_USER_PROFILES_DIR}/${user.image}`}
                                alt={user.username}
                                className="absolute w-full h-full inset-0 rounded-full object-cover"
                            />

                            {currentUser && user._id === currentUser._id && (
                                <>
                                    <div className="absolute w-full h-full inset-0 bg-[var(--bg-3)]/50 transition opacity-0 group-hover:opacity-100"></div>

                                    <Camera
                                        className="absolute pointer-events-none select-none text-[var(--text-1)] transition opacity-0 group-hover:opacity-100"
                                        size={64}
                                    />

                                    <button
                                        className="absolute w-full h-full inset-0 rounded-full opacity-0 cursor-pointer"
                                        onClick={() => openModal("update-user-image")}
                                    ></button>

                                    <UserImageModal />
                                </>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col w-full items-center md:items-start">
                            <h3 className="text-[var(--text-1)] text-3xl mb-3">
                                {user.username}
                            </h3>

                            <div className="flex flex-wrap gap-1.5 mb-3.5">
                                {currentUser && user._id === currentUser._id ? (
                                    <>
                                        <Button2
                                            onClick={() => {
                                                openModal("update-user");
                                                setModalTask("profile");
                                            }}
                                            className="text-sm h-10 text-[var(--text-1)] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)]"
                                        >
                                            Profili Düzenle
                                        </Button2>
                                    </>
                                ) : (
                                    <>
                                        <Button2 className="text-sm h-10 text-[var(--text-2)]">Arkadaş Ekle</Button2>
                                        <Button2 className="text-sm h-10 text-[var(--text-2)]">Mesaj</Button2>
                                    </>
                                )}
                                <Button2 className="text-sm h-10 text-[var(--text-2)]">Paylaş</Button2>
                            </div>

                            <div className="flex flex-wrap gap-3.5 ">
                                <p className="text-[var(--text-2)] text-sm text-shadow-xs">
                                    0 Takipçi
                                </p>
                                <p className="text-[var(--text-2)] text-sm text-shadow-xs">
                                    0 Takip Edilen
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

                    <div className="flex flex-col w-full">
                        <div className="flex gap-2 items-center mb-3">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_USER_PROFILES_DIR}/${user.image}`}
                                alt={user.username}
                                className="w-8 h-8 object-cover rounded-full border border-solid border-[var(--border)]"
                            />
                            <img
                                src="/gender/male.webp"
                                alt="gender"
                                className="w-8 h-8 object-cover rounded-full border border-solid border-[var(--border)]"
                            />
                            <img
                                src="/flag/tr.webp"
                                alt="country"
                                className="w-8 h-8 object-cover rounded-full border border-solid border-[var(--border)]"
                            />
                        </div>

                        {currentUser && user._id === currentUser._id ? (
                            <h4 className="text-[var(--text-1)]/90 text-xl">Hakkımda</h4>
                        ) : (
                            <h4 className="text-[var(--text-1)]/90 text-xl">Hakkında</h4>
                        )}

                        <p className="text-[var(--text-2)] text-base">
                            {user.description ? user.description : "Hakkımda bilgisi belirtilmemiş."}
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}