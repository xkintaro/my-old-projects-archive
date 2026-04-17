import  { useRef } from 'react';
import { KintaroButton1, KintaroButton2, KintaroIconButton2 } from "../inputs/KintaroButton";
import { KintaroTitle1, KintaroTitle2 } from "../components/KintaroTitle";
import { KintaroDropdown1 } from "../inputs/KintaroDropdown";
import { KintaroDescription } from "../components/KintaroDescription";
import { KintaroRating } from "../components/KintaroRating";
import { KintaroContentBox2 } from "../components/KintaroContentBox";
import { FaRegBookmark } from "react-icons/fa";

function KintaroContentInfo() {

    const options = [
        { value: 'Sezon1', label: 'Sezon 1' },
        { value: 'Sezon2', label: 'Sezon 2' },
        { value: 'Sezon3', label: 'Sezon 3' },
    ];

    const handleSelect = (selected) => {
        console.log('Seçilen:', selected);
    };

    const contentsRef = useRef(null);

    const contents = [
        {
            id: 1,
            image: "https://image.openanime.net/t/p/w300/oGmNWwV3wgp1DZXTOLSAYZZgh3X.jpg",
            episode: "1",
            title: "Ragna Crimson",
            description: "Ejderhalara karşı ölümüne bir savaş! Güç, fedakârlıkla kazanılır.",
            date: "21/08/2024",
            redirectLink: "/content-page"
        },
        {
            id: 2,
            image: "https://image.openanime.net/t/p/w300/hk9joSlfsrVTmcoYzQ7rFg028Fq.jpg",
            episode: "2",
            title: "The Case Study of Vanitas",
            description: "Parizyen gotik bir dünyada, lanetli vampirleri iyileştiren gizemli bir kitap.",
            date: "12/09/2024",
            redirectLink: "/content-page"
        },
        {
            id: 3,
            image: "https://image.openanime.net/t/p/w300/jQb1ztdko9qc4aCdnMXShcIHXRG.jpg",
            episode: "3",
            title: "That Time I Got Reincarnated as a Slime",
            description: "Bir slime olarak yeniden doğan adamın fantastik krallık kurma hikayesi.",
            date: "05/10/2024",
            redirectLink: "/content-page"
        },
        {
            id: 4,
            image: "https://image.openanime.net/t/p/w300/4zPtA0NGIIpLauwuSN1KBBxSVka.jpg",
            episode: "4",
            title: "Akame ga Kill!",
            description: "Adalet için savaşan bir grup suikastçının acımasız hikayesi.",
            date: "14/10/2024",
            redirectLink: "/content-page"
        },
        {
            id: 5,
            image: "https://image.openanime.net/t/p/w300/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
            episode: "5",
            title: "Mushoku Tensei: Jobless Reincarnation",
            description: "Başarısız bir hayatın ardından büyülü bir dünyada yeni bir başlangıç.",
            date: "27/10/2024",
            redirectLink: "/content-page"
        },
        {
            id: 6,
            image: "https://image.openanime.net/t/p/w300/61EwFPqc0r1uJo6la49J55F8bQ8.jpg",
            episode: "6",
            title: "Violet Evergarden",
            description: "Savaş sonrası duygularını anlamaya çalışan bir kızın dokunaklı mektup yolculuğu.",
            date: "04/11/2024",
            redirectLink: "/content-page"
        },
        {
            id: 7,
            image: "https://image.openanime.net/t/p/w300/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
            episode: "7",
            title: "Attack on Titan",
            description: "İnsanlık ile devler arasındaki hayatta kalma savaşı, sırlarla dolu bir dünya.",
            date: "18/11/2024",
            redirectLink: "/content-page"
        },
        {
            id: 8,
            image: "https://image.openanime.net/t/p/w300/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
            episode: "8",
            title: "Jujutsu Kaisen",
            description: "Lanetten kurtulmak için ölümcül dövüş sanatlarını öğrenen bir öğrencinin hikayesi.",
            date: "02/12/2024",
            redirectLink: "/content-page"
        }
    ];

    return (

        <div className='kintaro-content-info'>

            <div className="kintaro-content-info-header">

                <div className="kintaro-content-info-header-background">

                    <img
                        className="kintaro-content-info-header-background-image"
                        src="https://image.openanime.net/t/p/w300/oGmNWwV3wgp1DZXTOLSAYZZgh3X.jpg"
                        alt="content image"
                    />

                    <div className="kintaro-content-info-header-background-image-overlay"></div>

                </div>

                <div className="kintaro-content-info-header-main">

                    <KintaroTitle1 title={"Ragna Crimson"} />

                    <div className="kintaro-content-info-header-main-buttons">

                        <KintaroButton2 title={"Aksion"} />
                        <KintaroButton2 title={"Komedi"} />
                        <KintaroButton2 title={"Bilim Kurgu"} />

                    </div>

                    <KintaroRating content={"6.5"} />
                    <KintaroDescription text={"description"} maxLength={150} showToggleButton={true} />
                    <KintaroIconButton2 icon={<FaRegBookmark />} title={"Favorilere ekle"} />
                </div>

            </div>

            <div className="kintaro-content-info-main">

                <div className="kintaro-content-info-main-contents">

                    <div className="kintaro-content-info-main-contents-head">

                        <KintaroTitle2 title={"Bölümler"} />

                        <KintaroDropdown1
                            options={options}
                            placeholder="Sezon Seç"
                            onSelect={handleSelect}
                        />

                    </div>

                    <div className="kintaro-content-box-2-container" ref={contentsRef}>



                        {contents.length === 0 ? (

                            <KintaroDescription text={"Mevcut Bölüm Yok."} maxLength={"999"} showToggleButton={false} />

                        ) : (

                            contents.map((content) => (

                                <KintaroContentBox2 key={content.id} content={content} />

                            ))
                        )}


                    </div>

                    <div className="kintaro-content-info-main-contents-xxxxxxx">

                        <KintaroButton1 title={"Daha Fazla Bölüm Göster"} />

                    </div>

                </div>



            </div>


        </div>

    )
}

export default KintaroContentInfo