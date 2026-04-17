import { Link } from 'react-router-dom';
import { KintaroTitle1 } from "../components/KintaroTitle";
import { KintaroAccentTextButton } from "../inputs/KintaroButton";

function KintaroAbout() {
    return (
        <div className='kintaro-about'>

            <div className="kintaro-about-content">

                <KintaroTitle1 title={"DeepAnime"} />

                <p className="kintaro-about-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quam delectus, numquam minima
                    illo eum. Impedit eligendi ex aliquid laudantium incidunt officiis doloremque voluptatem error
                    sit sint, itaque dolor sed. sit sint, itaque dolor sed. sit sint, itaque dolor sed.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quam delectus, numquam minima
                    illo eum. Impedit eligendi ex aliquid laudantium incidunt officiis doloremque voluptatem error
                    sit sint, itaque dolor sed. sit sint, itaque dolor sed. sit sint, itaque dolor sed.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quam delectus, numquam minima
                    illo eum. Impedit eligendi ex aliquid laudantium incidunt officiis doloremque voluptatem error
                    sit sint, itaque dolor sed. sit sint, itaque dolor sed. sit sint, itaque dolor sed.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quam delectus, numquam minima
                    illo eum. Impedit eligendi ex aliquid laudantium incidunt officiis doloremque voluptatem error
                    sit sint, itaque dolor sed. sit sint, itaque dolor sed. sit sint, itaque dolor sed.
                </p>

                <p className="kintaro-about-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quam delectus, numquam minima
                    illo eum. Impedit eligendi ex aliquid laudantium incidunt officiis doloremque voluptatem error
                    sit sint, itaque dolor sed. sit sint, itaque dolor sed. sit sint, itaque dolor sed.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quam delectus, numquam minima
                    illo eum. Impedit eligendi ex aliquid laudantium incidunt officiis doloremque voluptatem error
                </p>

                <div className="kintaro-about-links">

                    <Link to='/under-construction'>
                        <KintaroAccentTextButton title={"Gizlilik Politikası"} />
                    </Link>

                    <Link to='/under-construction'>
                        <KintaroAccentTextButton title={"Kullanım Şartları"} />
                    </Link>

                    <Link to='/under-construction'>
                        <KintaroAccentTextButton title={"Çerez Politikası"} />
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default KintaroAbout;