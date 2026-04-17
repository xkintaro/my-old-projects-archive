import { Link } from 'react-router-dom';
import { KintaroRating } from "../components/KintaroRating";
import { KintaroAccentTextButton } from "../inputs/KintaroButton";
import { KintaroTitle3 } from "../components/KintaroTitle";
import { KintaroDescription } from "../components/KintaroDescription";

const KintaroContentBox1 = ({ content }) => {
    return (
        <Link key={content.id} className="kintaro-content-box-1" to={content.redirectLink}>

            <img
                src={content.image}
                alt={content.title}
                className="kintaro-content-box-1-image"
            />

            <div className="kintaro-content-box-1-overlay-zone">

                <div className="kintaro-content-box-1-overlay"></div>
                <img
                    src={content.image}
                    alt={content.title}
                    className="kintaro-content-box-1-overlay-image"
                />

            </div>

            <div className="kintaro-content-box-1-elements">
                <p className="kintaro-content-box-1-title">{content.title}</p>
                <KintaroRating content={content.rating} />
            </div>

        </Link>
    );
};

const KintaroContentBox2 = ({ content }) => {
    return (
        <Link key={content.id} className="kintaro-content-box-2" to={content.redirectLink}>

            <div className="kintaro-content-box-2-image-zone">

                <div className="kintaro-content-box-2-image-zone-overlay"></div>

                <img
                    src={content.image}
                    className='kintaro-content-box-2-image-zone-image'
                    alt={content.title}
                />

            </div>

            <div className="kintaro-content-box-2-main">
                <div className="kintaro-content-box-2-main-head">
                    <KintaroAccentTextButton title={"Bölüm " + content.episode} />
                    <KintaroDescription text={content.date} maxLength={100} showToggleButton={false} />
                </div>
                <KintaroTitle3 title={content.title} />
                <KintaroDescription text={content.description} maxLength={100} showToggleButton={false} />
            </div>

        </Link>
    );
};

const KintaroContentBox3 = ({ content }) => {
    return (
        <Link className="kintaro-content-box-3" key={content.id} to={content.redirectLink}>

            <img
                src={content.image}
                alt={content.title}
                className="kintaro-content-box-3-image" />

            <div className="kintaro-content-box-3-main">
                <KintaroTitle3 title={"Bölüm " + content.episode} />
                <KintaroDescription text={content.title} maxLength={"50"} showToggleButton={false} />
            </div>

        </Link>
    );
};


const KintaroContentBox4 = ({ content }) => {
    return (
        <Link key={content.id} className="kintaro-content-box-4" to={content.redirectLink}>

            <img
                src={content.image}
                alt={content.title}
                className="kintaro-content-box-4-image"
            />

            <div className="kintaro-content-box-4-overlay-zone">

                <div className="kintaro-content-box-4-overlay"></div>
                <img
                    src={content.image}
                    alt={content.title}
                    className="kintaro-content-box-4-overlay-image"
                />

            </div>

            <div className="kintaro-content-box-4-elements">
                <p className="kintaro-content-box-4-title">{content.title}</p>
                <KintaroRating content={content.rating} />
            </div>

        </Link>
    );
};

export { KintaroContentBox1, KintaroContentBox2, KintaroContentBox3, KintaroContentBox4 };