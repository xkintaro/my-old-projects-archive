import { useState } from 'react'
import Theme from '../../theme'
import { Button3 } from '../../button'
import { Palette } from 'lucide-react'
import Modal from '../../modal'
import { useModal } from "../../../contexts/ModalContext";

export default function SelectTheme() {
    const { openModal } = useModal();
    return (
        <>
            <div className="hidden">
                <Theme />
            </div>
            <Modal
                name={"theme"}
                title={"Select Theme"}
            >
                <div className='w-full p-4'>
                    <Theme />
                </div>
            </Modal>
            <Button3
                className='w-8 h-8 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]'
                onClick={() => openModal("theme")}
                title="Select Theme"
            >
                <Palette size={16} />
            </Button3>
        </>
    )
}