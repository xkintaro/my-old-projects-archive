import { FaStar } from "react-icons/fa";

const KintaroRating = ({ content }) => {
    return (
        <div className="kintaro-rating">
            <FaStar className='kintaro-rating-icon' />
            <p className="kintaro-rating-text">{content}</p>
        </div>
    );
};

export { KintaroRating };