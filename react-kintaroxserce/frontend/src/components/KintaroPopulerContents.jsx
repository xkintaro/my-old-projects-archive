import  { useRef } from 'react';
import { KintaroTitle1 } from "../components/KintaroTitle";
import { KintaroContentBox4 } from "../components/KintaroContentBox";
import { KintaroDescription } from "../components/KintaroDescription";

function KintaroPopulerContents() {
    const contentsRef = useRef(null);

    const contents = [
        {
            id: 1,
            image: "https://image.openanime.net/t/p/w300/oGmNWwV3wgp1DZXTOLSAYZZgh3X.jpg",
            title: "Ragna Crimson",
            rating: 7.5,
            redirectLink: "/content-info"
        },
        {
            id: 2,
            image: "https://image.openanime.net/t/p/w300/hk9joSlfsrVTmcoYzQ7rFg028Fq.jpg",
            title: "The Case Study of Vanitas",
            rating: 7.4,
            redirectLink: "/content-info"
        },
        {
            id: 3,
            image: "https://image.openanime.net/t/p/w300/jQb1ztdko9qc4aCdnMXShcIHXRG.jpg",
            title: "That Time I Got Reincarnated as a Slime",
            rating: 7.4,
            redirectLink: "/content-info"
        },
        {
            id: 4,
            image: "https://image.openanime.net/t/p/w300/4zPtA0NGIIpLauwuSN1KBBxSVka.jpg",
            title: "Akame ga Kill!",
            rating: 7.4,
            redirectLink: "/content-info"
        },
        {
            id: 5,
            image: "https://image.openanime.net/t/p/w300/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
            title: "Mushoku Tensei: Jobless Reincarnation",
            rating: 7.8,
            redirectLink: "/content-info"
        },
        {
            id: 6,
            image: "https://image.openanime.net/t/p/w300/61EwFPqc0r1uJo6la49J55F8bQ8.jpg",
            title: "Violet Evergarden",
            rating: 7.4,
            redirectLink: "/content-info"
        },
        {
            id: 7,
            image: "https://image.openanime.net/t/p/w300/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
            title: "Attack on Titan",
            rating: 9.1,
            redirectLink: "/content-info"
        },
        {
            id: 8,
            image: "https://image.openanime.net/t/p/w300/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
            title: "Jujutsu Kaisen",
            rating: 7.4,
            redirectLink: "/content-info"
        }
    ];

    const scrollLeft = () => {
        if (contentsRef.current) {
            contentsRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (contentsRef.current) {
            contentsRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className='kintaro-populer-contents'>
            <div className="kintaro-populer-contents-head">
                <KintaroTitle1 title={"Popüler"} />
                <div className="kintaro-populer-contents-navigation">
                    <button className="kintaro-populer-contents-navigation-button" onClick={scrollLeft}>
                        &lt;
                    </button>
                    <button className="kintaro-populer-contents-navigation-button" onClick={scrollRight}>
                        &gt;
                    </button>
                </div>
            </div>

            <div className="kintaro-content-box-4-container" ref={contentsRef}>
                {contents.length === 0 ? (
                    <KintaroDescription text={"Popüler içerik yok."} maxLength={"999"} showToggleButton={false} />
                ) : (
                    contents.map((content) => (
                        <KintaroContentBox4 key={`${content.id}-${content.title}`} content={content} />
                    ))
                )}
            </div>
        </div>
    );
}

export default KintaroPopulerContents;