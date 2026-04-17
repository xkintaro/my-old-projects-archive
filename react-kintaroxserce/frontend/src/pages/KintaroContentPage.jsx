import  { useRef } from 'react';
import { KintaroVideoPlayer1 } from "../components/KintaroVideoPlayer";
import { KintaroTitle1, KintaroTitle2, KintaroTitle3 } from "../components/KintaroTitle";
import { KintaroDescription } from "../components/KintaroDescription";
import { KintaroButton2, KintaroIconButton2, KintaroTextButton1, KintaroOnlyIconButton, KintaroAccentTextButton } from "../inputs/KintaroButton";
import { KintaroContentBox3 } from "../components/KintaroContentBox";
import { KintaroCommentBox1 } from "../components/KintaroCommentBox";

function KintaroContentPage() {

    const adsadasd = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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

    const commentsRef = useRef(null);

    const comments = [
        {
            id: 1,
            image: "https://image.openanime.net/t/p/w300/oGmNWwV3wgp1DZXTOLSAYZZgh3X.jpg",
            reply: 1,
            username: "Ragna Crimson",
            commentText: "Ejderhalara karşı ölümüne bir savaş! Güç, fedakârlıkla kazanılır.",
            date: "21/08/2024",
            like: 14,
            dislike: 2,
            redirectLink: "/profile"
        },
        {
            id: 2,
            image: "https://image.openanime.net/t/p/w300/hk9joSlfsrVTmcoYzQ7rFg028Fq.jpg",
            reply: 0,
            username: "The Case Study of Vanitas",
            commentText: "Parizyen gotik bir dünyada, lanetli vampirleri iyileştiren gizemli bir kitap." + adsadasd,
            date: "12/09/2024",
            like: 14,
            dislike: 2,
            redirectLink: "/profile"
        },
        {
            id: 3,
            image: "https://image.openanime.net/t/p/w300/jQb1ztdko9qc4aCdnMXShcIHXRG.jpg",
            reply: 3,
            username: "That Time I Got Reincarnated as a Slime",
            commentText: "Bir slime olarak yeniden doğan adamın fantastik krallık kurma hikayesi.",
            date: "05/10/2024",
            like: 14,
            dislike: 2,
            redirectLink: "/profile"
        },
        {
            id: 4,
            image: "https://image.openanime.net/t/p/w300/4zPtA0NGIIpLauwuSN1KBBxSVka.jpg",
            reply: 4,
            username: "Akame ga Kill!",
            commentText: "Adalet için savaşan bir grup suikastçının acımasız hikayesi.",
            date: "14/10/2024",
            like: 14,
            dislike: 2,
            redirectLink: "/profile"
        },
        {
            id: 5,
            image: "https://image.openanime.net/t/p/w300/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
            reply: 0,
            username: "Mushoku Tensei: Jobless Reincarnation",
            commentText: "Başarısız bir hayatın ardından büyülü bir dünyada yeni bir başlangıç.",
            date: "27/10/2024",
            like: 14,
            dislike: 2,
            redirectLink: "/profile"
        },
        {
            id: 6,
            image: "https://image.openanime.net/t/p/w300/61EwFPqc0r1uJo6la49J55F8bQ8.jpg",
            reply: 0,
            username: "Violet Evergarden",
            commentText: "Savaş sonrası duygularını anlamaya çalışan bir kızın dokunaklı mektup yolculuğu.",
            date: "04/11/2024",
            like: 14,
            dislike: 2,
            redirectLink: "/profile"
        },
        {
            id: 7,
            image: "https://image.openanime.net/t/p/w300/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
            reply: 7,
            username: "Attack on Titan",
            commentText: "İnsanlık ile devler arasındaki hayatta kalma savaşı, sırlarla dolu bir dünya.",
            date: "18/11/2024",
            like: 14,
            dislike: 2,
            redirectLink: "/profile"
        },
        {
            id: 8,
            image: "https://image.openanime.net/t/p/w300/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
            reply: 0,
            username: "Jujutsu Kaisen",
            commentText: "Lanetten kurtulmak için ölümcül dövüş sanatlarını öğrenen bir öğrencinin hikayesi.",
            date: "02/12/2024",
            like: 14,
            dislike: 2,
            redirectLink: "/profile"
        }
    ];

    return (
        <div className="kintaro-content-page">

            <div className="kintaro-content-page-left">

                <div className="kintaro-content-page-main">

                    <div className="kintaro-content-video-player-container">
                        <KintaroVideoPlayer1
                            source="/video.mp4"
                            poster="/image.jpg"
                        />
                    </div>

                    <div className="kintaro-content-page-main-all">

                        <div className="kintaro-content-page-main-head">

                            <KintaroTitle1 title="Bölüm 1" />
                            <div className="kintaro-content-page-main-head-buttons">

                                <KintaroButton2 title={"Önceki Bölüm"} />
                                <KintaroButton2 title={"Sonraki Bölüm"} />

                            </div>

                        </div>

                        <div className="kintaro-content-page-uploader">
                            <img src="/user-profile/1.jpg" alt="Uploader" className="kintaro-content-page-uploader-image" />
                            <KintaroTitle3 title="Kintaro" />
                            <KintaroDescription text={"Tarafından Yüklenmiştir."} maxLength={"999"} showToggleButton={false} />
                        </div>

                        <KintaroDescription text={"5482 Görüntüleme • 21.08.2025"} maxLength={"999"} showToggleButton={false} />

                        <div className="kintaro-content-page-description">
                            <KintaroTitle3 title="Attack on Titan Başlangıç" />
                            <KintaroDescription text={"description"} maxLength={"300"} showToggleButton={true} />
                        </div>

                        <div className="kintaro-content-page-commnets">
                            <div className="kintaro-content-page-commnets-header">
                                <KintaroTitle2 title={"Yorumlar - " + comments.length} />
                            </div>

                            <div className="kintaro-commnet-box-1-container" ref={commentsRef}>

                                {comments.length === 0 ? (

                                    <KintaroDescription text={"Hiç Yorum yok."} maxLength={"999"} showToggleButton={false} />

                                ) : (

                                    comments.map((comment) => (

                                        <KintaroCommentBox1 key={comment.id} comment={comment} />


                                    ))
                                )}

                            </div>

                            {comments.length > 0 && (
                                <div className="kintaro-content-page-commnets-button-container">
                                    <KintaroButton2 title={"Daha Fazla Yorum Görüntüle"} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="kintaro-content-page-right">

                <div className="kintaro-content-page-right-header">
                    <KintaroTitle3 title="Diğer Bölümler" />
                </div>

                <div className="kintaro-content-box-3-container" ref={contentsRef}>

                    {contents.length === 0 ? (

                        <KintaroDescription text={"Başka Bölüm yok."} maxLength={"999"} showToggleButton={false} />

                    ) : (

                        contents.map((content) => (

                            <KintaroContentBox3 key={content.id} content={content} />

                        ))
                    )}

                </div>

                <div className="kintaro-content-page-commnets-button-container">
                    <KintaroButton2 title={"Daha Fazla Bölüm Görüntüle"} />
                </div>
            </div>


        </div>
    )
}

export default KintaroContentPage