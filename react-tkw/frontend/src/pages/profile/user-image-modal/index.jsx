import { useState, useEffect } from 'react';
import Modal from '../../../components/modal';
import FileUpload from '../../../components/fileupload';
import { useModal } from '../../../contexts/ModalContext';
import { Button1 } from '../../../components/button';
import { updateUserImage } from '../../../api/user';
import SystemMessage from '../../../components/system-messages';

import { useUserContext } from "../../../contexts/UserContext";
import { useCurrentUserContext } from '../../../contexts/CurrentUserContext';

export default function UserImageModal() {
  const { activeModal, closeModal } = useModal();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isImageFile, setIsImageFile] = useState(true);

  const { refetch: refetchProfileUser } = useUserContext();
  const { refetch: refetchCurrentUser } = useCurrentUserContext();

  useEffect(() => {
    if (activeModal !== 'update-user-image') {
      setSelectedImage(null);
      setPreviewUrl(null);
      setMessage({ success: false, text: "" });
      setIsImageFile(true);
    }
  }, [activeModal]);

  const handleFilesSelected = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      setMessage({ success: false, text: "" });

      const isImage = file.type.startsWith('image/');
      setIsImageFile(isImage);

      if (isImage) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null);
        setMessage({ success: false, text: "Lütfen sadece görüntü dosyası seçin." });
      }
    }
  };

  const handleSave = async () => {
    if (!selectedImage || !isImageFile) {
      setMessage({ success: false, text: "Lütfen geçerli bir görüntü dosyası seçin." });
      return;
    }

    try {
      setLoading(true);
      setMessage({ success: false, text: "" });

      const token = localStorage.getItem("token");
      const res = await updateUserImage(selectedImage, token);

      setMessage({ success: res.success, text: res.message });

      if (res.success) {
        setTimeout(() => {
          refetchProfileUser();
          refetchCurrentUser();
          closeModal();
        }, 1500);
      }

    } catch (err) {
      setMessage({ success: false, text: err.response?.data?.message || err.message || "Resim yüklenemedi." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      name={"update-user-image"}
      title={"Yeni Profil Resmi"}
    >
      <div className='w-full p-4 flex flex-col gap-2'>
        {previewUrl && isImageFile && (
          <img
            src={previewUrl}
            alt="Profil önizleme"
            className="mx-auto object-cover w-40 h-40 rounded-full border border-solid border-[var(--border)]"
          />
        )}

        <SystemMessage success={message.success} message={message.text} />

        <FileUpload
          onFilesSelected={handleFilesSelected}
          accept="image/*"
          multiple={false}
        />

        {selectedImage && isImageFile && (
          <Button1
            className='w-full'
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Yükleniyor..." : "Kaydet"}
          </Button1>
        )}
      </div>
    </Modal>
  );
}