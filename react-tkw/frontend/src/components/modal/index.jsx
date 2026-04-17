import { useEffect } from "react";
import { useModal } from "../../contexts/ModalContext";

const Modal = ({ name, title, width, children }) => {
    const { activeModal, closeModal } = useModal();
    
    useEffect(() => {
        if (activeModal === name) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [activeModal, name]);

    if (activeModal !== name) return null;

    return (
        <div className="z-[var(--popup-z)] fixed inset-0 flex justify-center items-center w-full h-screen">
            <div
                className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-xs"
                onClick={closeModal}
            />

            <div
                className="absolute bg-[var(--bg-2)] rounded-lg shadow-sm w-[95%] max-w-xl max-h-[90vh] overflow-auto flex flex-col"
                style={{ maxWidth: width }}
            >
                <div className="py-3.5 px-4 flex justify-between items-center border-solid border-b border-[var(--border)]">
                    <h1 className="text-[var(--text-1)] text-lg font-semibold">
                        {title}
                    </h1>
                    <button
                        onClick={closeModal}
                        title="close"
                        className="bg-transparent text-[var(--text-1)] transition cursor-pointer border-none outline-none hover:text-[var(--text-2)]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;