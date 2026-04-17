import Modal from '../../../components/modal'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Button1 } from '../../../components/button';
import { useModal } from '../../../contexts/ModalContext';

export default function UserLogoutModal() {

    const navigate = useNavigate();
    const { logout } = useAuth();
    const { closeModal } = useModal();


    const handleLogout = () => {
        logout();
        navigate("/");
        closeModal();
    };

    return (
        <Modal
            name={"user-logout"}
            title={"Çıkış Yapmak Üzeresiniz"}
        >
            <p className="p-4 text-base text-[var(--text-2)]">
                Çıkış yapmak istediğinizden emin misiniz?
            </p>

            <div className='w-full flex justify-end gap-2 p-4'>
                <Button1 className='bg-transparent' onClick={closeModal}>Vazgeç</Button1>
                <Button1 className='bg-red-800' onClick={handleLogout}>Onayla</Button1>
            </div>
        </Modal>
    )
}