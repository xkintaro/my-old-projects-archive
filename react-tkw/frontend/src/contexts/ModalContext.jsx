import { createContext, useContext, useState, useEffect } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {

    const [activeModal, setActiveModal] = useState(null);
    const [modalTask, setModalTask] = useState(null);

    const openModal = (modalName, task = null) => {
        setActiveModal(modalName);
        setModalTask(task);
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalTask(null);
    };

    useEffect(() => {
        if (activeModal) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
        }

        return () => {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
        };
    }, [activeModal]);

    const value = {
        activeModal,
        openModal,
        closeModal,
        modalTask,
        setModalTask
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}
