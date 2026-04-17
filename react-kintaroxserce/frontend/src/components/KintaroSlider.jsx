import  { useState, useEffect, useRef, useMemo } from 'react';
import '../assets/css/kintaroSlider.css';

const slides = [
    { image: '/anime/blue-lock.jpg', title: 'Anime 1', description: 'Açıklama 1', rated: '8.1' },
    { image: '/anime/chainsaw-man.jpg', title: 'Anime 2', description: 'Açıklama 2', rated: '8.1' },
    { image: '/anime/code-geass.jpg', title: 'Anime 3', description: 'Açıklama 3', rated: '8.1' },
    { image: '/anime/death-note.jpg', title: 'Anime 4', description: 'Açıklama 4', rated: '8.1' },
    { image: '/anime/demon-slayer.jpg', title: 'Anime 5', description: 'Açıklama 5', rated: '8.1' },
    { image: '/anime/dxd.jpg', title: 'Anime 6', description: 'Açıklama 6', rated: '8.1' },
    { image: '/anime/jujutsu-kaisen.jpg', title: 'Anime 7', description: 'Açıklama 7', rated: '8.1' },
    { image: '/anime/kage-no.jpg', title: 'Anime 8', description: 'Açıklama 8', rated: '8.1' },
    { image: '/anime/nanatsu-no-taizai.jpg', title: 'Anime 9', description: 'Açıklama 9', rated: '8.1' },
    { image: '/anime/steins-gate.jpg', title: 'Anime 10', description: 'Açıklama 10', rated: '8.1' },
    { image: '/anime/tokyo-ghoul.jpg', title: 'Anime 11', description: 'Açıklama 11', rated: '8.1' },
    { image: '/anime/vinland-saga.jpg', title: 'Anime 12', description: 'Açıklama 12', rated: '8.1' }
];

function getRandomSlides(array, num) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function KintaroSlider() {
    const selectedSlides = useMemo(() => getRandomSlides(slides, 10), []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const navRef = useRef(null);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        let observer;

        const startSlider = () => {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedSlides.length);
                }, 5000);
            }
        };

        const stopSlider = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startSlider();
                } else {
                    stopSlider();
                }
            });
        };

        if (sliderRef.current) {
            observer = new IntersectionObserver(handleIntersection, {
                threshold: 0 
            });
            observer.observe(sliderRef.current);
        }

        return () => {
            if (observer && sliderRef.current) {
                observer.unobserve(sliderRef.current);
            }
            stopSlider();
        };
    }, [selectedSlides]);

    useEffect(() => {
        if (navRef.current && sliderRef.current) {
            const sliderRect = sliderRef.current.getBoundingClientRect();
            const isSliderVisible = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;
            if (isSliderVisible) {
                const activeNavItem = navRef.current.children[currentIndex];
                if (activeNavItem) {
                    activeNavItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }
        }
    }, [currentIndex]);

    const handleNavItemClick = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        const deltaX = Math.abs(touchStartX - touchEndX);
        if (deltaX > 50) {
            if (touchStartX > touchEndX) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedSlides.length);
            } else {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedSlides.length) % selectedSlides.length);
            }
        }
        setTouchStartX(0);
        setTouchEndX(0);
    };

    return (
        <div className="kintaro-slider-container">
            <div
                className="kintaro-slider"
                ref={sliderRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {selectedSlides.map((slide, index) => (
                    <div key={index} className={`kintaro-slider-item ${index === currentIndex ? 'active' : ''}`}>
                        <div className="kintaro-slider-item-image-overlay"></div>
                        <img src={slide.image} className="kintaro-slider-item-image" alt={slide.title} />
                        <div className="kintaro-slider-item-elements">
                            <h1 className="kintaro-slider-item-title">{slide.title}</h1>
                            <span className="kintaro-slider-item-rated">{slide.rated} Değerlendirme</span>
                            <p className="kintaro-slider-item-text">
                                {slide.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni quam dolorem nobis, sed harum fugit dignissimos, cumque ducimus doloremque non officia, et ea praesentium rerum modi debitis adipisci itaque. Distinctio!
                            </p>
                            <button className="kintaro-slider-item-button">Animeyi incele</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="kintaro-slider-nav-container">
                <div className="kintaro-slider-nav" ref={navRef}>
                    {selectedSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`kintaro-slider-nav-item ${index === currentIndex ? 'nav-active' : ''}`}
                            onClick={() => handleNavItemClick(index)}
                        >
                            <div className="kintaro-slider-nav-item-image-overlay"></div>
                            <img src={slide.image} className="kintaro-slider-nav-item-image" alt="thumbnail" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default KintaroSlider;