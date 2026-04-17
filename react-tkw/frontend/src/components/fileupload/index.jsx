import React, { useRef, useState, useCallback } from 'react';
import { ImageUp } from 'lucide-react';

const FileUpload = ({ onFilesSelected, accept, multiple = true }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (files) => {
        const fileList = Array.from(files);
        if (onFilesSelected) {
            onFilesSelected(fileList);
        }
    };

    const handleInputChange = (e) => {
        if (e.target.files.length > 0) {
            handleFileChange(e.target.files);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files);
        }
    }, [onFilesSelected]);

    return (
        <div
            className={`bg-[var(--bg-4)] border-2 border-dashed w-full min-h-[150px] rounded-lg p-8 text-center transition-colors duration-200 cursor-pointer ${isDragging
                ? 'border-[var(--accent)] bg-[var(--bg-3)]'
                : 'border-[var(--border)]'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleInputChange}
                accept={accept}
                multiple={multiple}
                className="hidden"
            />

            <div className="flex flex-col items-center justify-center gap-2">
                <ImageUp
                    className='text-[var(--text-2)]'
                    size={54}
                />

                <p className="text-[var(--text-2)] text-lg">
                    <span className="text-[var(--text-1)] font-medium">Dosyaları yükle</span> veya sürükle bırak
                </p>

                <p className="text-sm text-[var(--text-3)]">
                    PNG, JPG, GIF kadar dosyalar yükleyebilirsiniz
                </p>
            </div>
        </div>
    );
};

export default FileUpload;