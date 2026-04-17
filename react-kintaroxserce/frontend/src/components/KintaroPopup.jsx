import { KintaroTextButton1, KintaroAccentButton, KintaroCloseButton } from "../inputs/KintaroButton";
import { KintaroTitle2 } from "./KintaroTitle";
import { KintaroDescription } from "./KintaroDescription";

const KintaroConfirmationDialog = ({
    isOpen = false,
    onClose,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    showCancel = true
}) => {

    if (!isOpen) return null;

    return (
        <div className="kintaro-confirmation-dialog">

            <div
                className="kintaro-confirmation-dialog-overlay"
                onClick={onClose}
            />

            <div className="kintaro-confirmation-dialog-box">

                <div className="kintaro-confirmation-dialog-header">
                    <KintaroTitle2 title={title} />
                    <KintaroCloseButton onClick={onClose} />
                </div>

                <div className="kintaro-confirmation-dialog-content">
                    <KintaroDescription text={message} maxLength={999} showToggleButton={true} />
                </div>

                <div className="kintaro-confirmation-dialog-footer">

                    {showCancel && (
                        <KintaroTextButton1
                            title={cancelText}
                            onClick={onClose}
                        />
                    )}

                    <KintaroAccentButton
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        title={confirmText}
                    />

                </div>
            </div>
        </div >
    );
};

export { KintaroConfirmationDialog };