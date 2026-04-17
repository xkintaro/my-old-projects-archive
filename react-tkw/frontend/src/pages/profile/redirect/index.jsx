import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUserContext } from '../../../contexts/CurrentUserContext';
import { MascotMessageBox } from '../../../components/system-messages';
import { Bubbles } from 'lucide-react';

export default function ProfileRedirect() {
    const navigate = useNavigate();
    const { currentUser, loading } = useCurrentUserContext();

    useEffect(() => {
        if (loading) {
            return;
        }

        if (currentUser && currentUser._id) {
            navigate(`/profile/${currentUser._id}`, { replace: true });
        } else {
            navigate('/', { replace: true });
        }
    }, [currentUser, loading, navigate]);

    return (
        <div className="w-full flex flex-col justify-center items-center py-24 px-4 bg-[radial-gradient(#8882_1px,transparent_1px)] [background-size:16px_16px]">
            <MascotMessageBox message={"Loading..."} icon={<Bubbles size={52} />} />
        </div>
    );
}