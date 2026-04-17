import {  useState } from 'react';

const KintaroDescription = ({
    text,
    maxLength,
    showToggleButton = true
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldTruncate = text?.length > maxLength;
    const displayedText = isExpanded || !shouldTruncate
        ? text
        : `${text.slice(0, maxLength)}...`;

    return (
        <div className="kintaro-description">
            <p className="kintaro-description-text">
                {displayedText}
            </p>
            {showToggleButton && shouldTruncate && (
                <button
                    title={isExpanded ? "Daha Az Göster" : "Daha Fazla Göster"}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="kintaro-description-button"
                >
                    {isExpanded ? "Daha Az Göster" : "Daha Fazla Göster"}
                </button>
            )}
        </div>
    );
};

export { KintaroDescription }