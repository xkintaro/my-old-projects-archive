import { Link } from 'react-router-dom';
import { KintaroTitle3 } from "../components/KintaroTitle";
import { KintaroDescription } from "../components/KintaroDescription";
import { KintaroTextButton1, KintaroOnlyIconButton, KintaroAccentTextButton } from "../inputs/KintaroButton";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

const KintaroCommentBox1 = ({ comment }) => {

    return (
        <div className="kintaro-commnet-box-1" key={comment.id}>

            <img src={comment.image} alt={comment.username} className="kintaro-commnet-box-1-image" />

            <div className="kintaro-commnet-box-1-main">

                <div className="kintaro-commnet-box-1-head">
                    <Link to={comment.redirectLink}  >
                        <KintaroTitle3 title={comment.username} />
                    </Link>
                    <KintaroDescription text={comment.date} maxLength={"999"} showToggleButton={false} />
                </div>

                <KintaroDescription text={comment.commentText} maxLength={"300"} showToggleButton={true} />

                <div className="kintaro-commnet-box-1-buttons">

                    <div className="kintaro-commnet-box-1-buttons-item">
                        <KintaroOnlyIconButton title={"Beğen"} icon={<AiOutlineLike />} />
                        <p className="kintaro-commnet-box-1-buttons-item-count">{comment.like}</p>
                    </div>
                    <div className="kintaro-commnet-box-1-buttons-item">
                        <KintaroOnlyIconButton title={"Beğenme"} icon={<AiOutlineDislike />} />
                        <p className="kintaro-commnet-box-1-buttons-item-count">{comment.dislike}</p>
                    </div>
                    <KintaroTextButton1 title={"Yanıtla"} />

                </div>

                {comment.reply > 0 && (
                    <KintaroAccentTextButton title={comment.reply + " Yanıtı Görüntüle"} />
                )}
            </div>

        </div>
    );
};

export { KintaroCommentBox1 };