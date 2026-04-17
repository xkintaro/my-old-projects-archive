import React, { useState, useEffect, useRef } from 'react';
import {
    FaPlay,
    FaPause,
    FaStepForward,
    FaStepBackward,
    FaVolumeUp,
    FaVolumeMute,
    FaList,
    FaMinus,
    FaRedo,
    FaMusic,
    FaRandom
} from 'react-icons/fa';
import { KintaroTitle3 } from "../components/KintaroTitle";

const audioBasePath = '/audio-player/audio/';
const imageBasePath = '/audio-player/image/';

function KintaroAudioPlayer() {
    const songs = [
        { id: 1, title: 'nanatsu no taizai', file: '1.mp3', image: '1.jpg' },
        { id: 2, title: 'dont care', file: '2.mp3', image: '2.jpg' },
        { id: 3, title: 'saccharine ', file: '3.mp4', image: '' },
    ];

    const audioRef = useRef(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [audioError, setAudioError] = useState(false);

    const savedTime = useRef(0);
    const previousVolume = useRef(volume);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = `${audioBasePath}${songs[currentSongIndex].file}`;

            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentSongIndex]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.loop = isLooping;
        }
    }, [volume, isLooping]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        if (isPlaying && audioRef.current && !isSeeking) {
            audioRef.current.currentTime = savedTime.current;
            audioRef.current.play();
        } else if (!isPlaying && audioRef.current) {
            savedTime.current = audioRef.current.currentTime;
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        setImageError(false);
        setAudioError(false);
    }, [currentSongIndex]);

    const updateTime = () => {
        if (!audioRef.current || isSeeking) return;
        const duration = audioRef.current.duration;
        const currentTime = audioRef.current.currentTime;
        if (!isNaN(duration) && duration > 0) {
            setDuration(duration);
            setCurrentTime(currentTime);
            setProgress((currentTime / duration) * 100);
        }
    };

    const handleEnded = () => {
        savedTime.current = 0;
        if (!isLooping) {
            if (isShuffled) {
                handleShuffle();
            } else {
                handleNext();
            }
        }
    };

    const handleProgressChange = (e) => {
        if (!audioRef.current || !duration) return;
        const newTime = (e.target.value / 100) * duration;
        setProgress(e.target.value);
        setCurrentTime(newTime);
        savedTime.current = newTime;
    };

    const handleSeekStart = () => {
        setIsSeeking(true);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const handleSeekEnd = () => {
        setIsSeeking(false);
        if (audioRef.current) {
            audioRef.current.currentTime = savedTime.current;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    };

    const handleNext = () => {
        savedTime.current = 0;
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    };

    const handlePrevious = () => {
        savedTime.current = 0;
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    };

    const handleShuffle = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentSongIndex && songs.length > 1);
        savedTime.current = 0;
        setCurrentSongIndex(newIndex);
    };

    const selectSong = (index) => {
        savedTime.current = 0;
        setCurrentSongIndex(index);
        setIsPlaying(true);
        setShowPlaylist(false);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const togglePlayer = () => {
        setIsPlayerVisible(!isPlayerVisible);
    };

    const handlePlayerVisibility = () => {
        setIsPlayerVisible(true);
    };

    const handleMinimizePlayer = () => {
        setIsPlayerVisible(false);
    };

    return (
        <div className="kintaro-audio-player">
            <audio
                ref={audioRef}
                onTimeUpdate={updateTime}
                onEnded={handleEnded}
                onLoadedMetadata={updateTime}
                onError={() => setAudioError(true)}
            />
            {!isPlayerVisible && (
                <div className="kintaro-audio-player-button" onClick={handlePlayerVisibility}>
                    <FaMusic />
                </div>
            )}
            {isPlayerVisible && (
                <div className="kintaro-audio-player-container">
                    <div className="kintaro-audio-player-container-header">
                        <KintaroTitle3 title={"DeepAnime Music Player"} />
                        <button
                            onClick={handleMinimizePlayer}
                            className="kintaro-audio-player-control-button"
                            title="Küçült"
                        >
                            <FaMinus size={14} />
                        </button>
                    </div>
                    <div className="kintaro-audio-player-container-main">
                        <div className="kintaro-audio-player-container-main-left">
                            <div className="kintaro-audio-player-logo">
                                {!imageError ? (
                                    <img
                                        src={`${imageBasePath}${songs[currentSongIndex].image}`}
                                        alt={songs[currentSongIndex].title}
                                        className="kintaro-audio-player-album-image"
                                        onError={() => setImageError(true)}
                                    />

                                ) : (
                                    <FaMusic size={32} />
                                )}
                            </div>
                            <div className="kintaro-audio-player-playlist-toggle">
                                <button
                                    onClick={() => setShowPlaylist(!showPlaylist)}
                                    className="kintaro-audio-player-playlist-button"
                                >
                                    <FaList size={16} /> Playlist
                                </button>
                            </div>
                        </div>
                        <div className="kintaro-audio-player-container-main-right">
                            <div className="kintaro-audio-player-song-info">
                                <div className="kintaro-audio-player-song-info-details">
                                    <KintaroTitle3 title={songs[currentSongIndex].title} />
                                    <p className="song-artist">Unknown Artist</p>
                                </div>
                                <div className="kintaro-audio-player-extra-controls">
                                    <button
                                        onClick={() => setIsShuffled(!isShuffled)}
                                        className={`kintaro-audio-player-control-button ${isShuffled ? 'active' : ''}`}
                                        title="Rastgele çal"
                                    >
                                        <FaRandom size={16} />
                                    </button>
                                    <button
                                        onClick={() => setIsLooping(!isLooping)}
                                        className={`kintaro-audio-player-control-button ${isLooping ? 'active' : ''}`}
                                        title="Döngü"
                                    >
                                        <FaRedo size={16} />
                                    </button>
                                </div>
                            </div>

                            {audioError && (
                                <div className="kintaro-audio-player-error-message">
                                    Bu ses dosyası yüklenemedi. Lütfen farklı bir şarkı seçin.
                                </div>
                            )}

                            <div className="kintaro-audio-player-progress-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress}
                                    onChange={handleProgressChange}
                                    onMouseDown={handleSeekStart}
                                    onMouseUp={handleSeekEnd}
                                    onTouchStart={handleSeekStart}
                                    onTouchEnd={handleSeekEnd}
                                    className="kintaro-audio-player-progress-input"
                                />
                                <div className="kintaro-audio-player-progress-time-display">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>
                            <div className="kintaro-audio-player-controls">
                                <div className="kintaro-audio-player-volume-container">
                                    <button
                                        onClick={() => {
                                            if (isMuted) {
                                                setVolume(previousVolume.current || 0.5);
                                            } else {
                                                previousVolume.current = volume;
                                                setVolume(0);
                                            }
                                            setIsMuted(!isMuted);
                                        }}
                                        className="kintaro-audio-player-control-button"
                                        title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                                    >
                                        {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(e) => {
                                            const newVolume = parseFloat(e.target.value);
                                            setVolume(newVolume);
                                            if (newVolume === 0) {
                                                setIsMuted(true);
                                            } else {
                                                setIsMuted(false);
                                                previousVolume.current = newVolume;
                                            }
                                        }}
                                        className="kintaro-audio-player-volume-slider"
                                    />
                                </div>
                                <div className="kintaro-audio-player-controls-main">
                                    <button
                                        onClick={handlePrevious}
                                        className="kintaro-audio-player-control-button"
                                        title="Önceki şarkı"
                                    >
                                        <FaStepBackward size={18} />
                                    </button>
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="kintaro-audio-player-play-pause-button"
                                        title={isPlaying ? 'Durdur' : 'Oynat'}
                                    >
                                        {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                                    </button>
                                    <button
                                        onClick={isShuffled ? handleShuffle : handleNext}
                                        className="kintaro-audio-player-control-button"
                                        title="Sonraki şarkı"
                                    >
                                        <FaStepForward size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showPlaylist && (
                        <div className="kintaro-audio-player-playlist-container">
                            {songs.map((song, index) => (
                                <div
                                    key={song.id}
                                    onClick={() => selectSong(index)}
                                    className="kintaro-audio-player-playlist-item"
                                >
                                    <span className="kintaro-audio-player-playlist-item-number">{index + 1}</span>
                                    <span className="kintaro-audio-player-playlist-item-title">{song.title}</span>
                                    {currentSongIndex === index && isPlaying && (
                                        <span className="kintaro-audio-player-playlist-item-indicator"></span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default KintaroAudioPlayer;