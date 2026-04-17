
import { useState, useEffect, useRef } from 'react';
import { Music, ListMusic, Repeat, Shuffle, Volume2, VolumeX, StepBack, StepForward, Play, Pause, Minus } from 'lucide-react';
import './style.css'

export default function AudioPlayer({
    playerTitle = "Kintaro Player",
    audioBasePath,
    imageBasePath,
    songs = []
}) {

    const audioRef = useRef(null);
    const savedTime = useRef(0);
    const previousVolume = useRef(0.5);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    const toggleLooping = () => {
        if (!isLooping) {
            setIsLooping(true);
            setIsShuffled(false);
        } else {
            setIsLooping(false);
        }
    };

    const toggleShuffled = () => {
        if (!isShuffled) {
            setIsShuffled(true);
            setIsLooping(false);
        } else {
            setIsShuffled(false);
        }
    };

    useEffect(() => {
        if (audioRef.current && songs.length > 0) {
            audioRef.current.src = `${audioBasePath}${songs[currentSongIndex]?.file}`;
            audioRef.current.load();
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                playPromise?.catch(error => {
                    console.error("Playback failed:", error);
                    setAudioError(true);
                });
            }
        }
    }, [currentSongIndex, songs]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.loop = isLooping;
        }
    }, [volume, isLooping]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.muted = isMuted;
    }, [isMuted]);

    useEffect(() => {
        if (!audioRef.current || songs.length === 0) return;

        if (isPlaying && !isSeeking) {
            const playPromise = audioRef.current.play();
            playPromise?.catch(error => {
                console.error("Playback failed:", error);
                setAudioError(true);
                setIsPlaying(false);
            });
        } else if (!isPlaying) {
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
            isShuffled ? handleShuffle() : handleNext();
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
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
        }
    };

    const handleSeekEnd = () => {
        setIsSeeking(false);
        if (audioRef.current) {
            audioRef.current.currentTime = savedTime.current;
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                playPromise?.catch(error => {
                    console.error("Playback failed:", error);
                    setAudioError(true);
                    setIsPlaying(false);
                });
            }
        }
    };

    const handleNext = () => {
        if (songs.length === 0) return;
        savedTime.current = 0;
        setCurrentSongIndex(prev => (prev + 1) % songs.length);
    };

    const handlePrevious = () => {
        if (songs.length === 0) return;
        savedTime.current = 0;
        setCurrentSongIndex(prev => (prev - 1 + songs.length) % songs.length);
    };

    const handleShuffle = () => {
        if (songs.length < 2) return;
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentSongIndex && songs.length > 1);
        savedTime.current = 0;
        setCurrentSongIndex(newIndex);
    };

    const selectSong = (index) => {
        if (index < 0 || index >= songs.length) return;
        savedTime.current = 0;
        setCurrentSongIndex(index);
        setIsPlaying(true);
        setShowPlaylist(false);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const togglePlayer = () => setIsPlayerVisible(!isPlayerVisible);

    const handlePlayerVisibility = () => setIsPlayerVisible(true);

    const handleMinimizePlayer = () => {
        setIsPlayerVisible(false);
        setShowPlaylist(false);
    }

    useEffect(() => {
        if (isPlayerVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isPlayerVisible]);

    return (
        <div className={`fixed right-0 bottom-0 w-auto h-auto z-[var(--audio-player-z)] ${isPlayerVisible ? 'inset-0 w-full h-screen flex items-center justify-center' : ''}`}>
            <audio
                ref={audioRef}
                onTimeUpdate={updateTime}
                onEnded={handleEnded}
                onLoadedMetadata={updateTime}
                onError={() => setAudioError(true)}
            />

            {!isPlayerVisible && (
                <button className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-[var(--text-1)] absolute right-5 bottom-5 shadow-sm transition flex items-center justify-center cursor-pointer w-12 h-12 rounded-full hover:scale-95"
                    onClick={handlePlayerVisibility}>
                    <Music size={20} />
                </button>
            )}

            {isPlayerVisible && (
                <>
                    <div className="absolute inset-0 w-full h-screen bg-black/50 backdrop-blur-xs" onClick={handleMinimizePlayer}></div>
                    <div className="bg-[var(--bg-2)] absolute bottom-5 right-5 rounded-lg text-[var(--text-1)] shadow-sm border border-solid border-[var(--border)]/50 overflow-hidden w-[calc(100%-2*20px)] md:w-lg">
                        <div className="border-solid border-b border-[var(--border)]/50 flex justify-between items-center py-3 px-4">
                            <h1 className='text-transparent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-lg font-semibold'>{playerTitle}</h1>
                            <button
                                onClick={handleMinimizePlayer}
                                className="w-8 h-8 min-w-8 min-h-8 p-1 transition text-[var(--text-2)] bg-transparent cursor-pointer flex items-center justify-center rounded-full hover:text-[var(--text-1)] hover:bg-[var(--bg-4)]"
                                title="Close"
                            >
                                <Minus size={18} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:p-4 md:items-center">
                            <div className="w-full h-48 relative flex items-center overflow-hidden md:h-32 md:border-solid md:border md:border-[var(--border)]/50 justify-center md:rounded-md md:w-32">
                                {!imageError && songs[currentSongIndex]?.image ? (
                                    <img
                                        src={`${imageBasePath}${songs[currentSongIndex].image}`}
                                        alt={songs[currentSongIndex].title}
                                        className="w-full h-full object-cover brightness-75 md:brightness-100"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <Music size={48} />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-2)] to-transparent pointer-events-none"></div>
                            </div>
                            <div className="flex flex-col flex-1 gap-1 p-4 pt-0 md:p-0">
                                <div className='flex justify-between items-center gap-5'>
                                    <div className="flex flex-col flex-1 overflow-hidden">
                                        <h1 className='text-sm font-semibold text-transparent bg-gradient-to-r from-[var(--text-1)] to-[var(--text-1)]/50 bg-clip-text' >{songs[currentSongIndex]?.title || 'Unknown Song'}</h1>
                                        <p className="text-xs text-transparent bg-gradient-to-r from-[var(--text-2)] to-[var(--text-2)]/50 bg-clip-text">
                                            {songs[currentSongIndex]?.artist || 'Unknown Artist'}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center justify-end">
                                        <button
                                            onClick={toggleShuffled}
                                            className={`w-8 h-8 p-1 transition text-[var(--text-2)] bg-transparent cursor-pointer flex items-center justify-center rounded-full hover:text-[var(--text-1)] hover:bg-[var(--bg-4)] ${isShuffled ? '!text-[var(--accent)]' : ''}`}
                                            title="Random"
                                        >
                                            <Shuffle size={20} />
                                        </button>
                                        <button
                                            onClick={toggleLooping}
                                            className={`w-8 h-8 p-1 transition text-[var(--text-2)] bg-transparent cursor-pointer flex items-center justify-center rounded-full hover:text-[var(--text-1)] hover:bg-[var(--bg-4)] ${isLooping ? '!text-[var(--accent)]' : ''}`}
                                            title="Loop"
                                        >
                                            <Repeat size={20} />
                                        </button>
                                        <button
                                            onClick={() => setShowPlaylist(!showPlaylist)}
                                            className={`w-8 h-8 p-1 transition text-[var(--text-2)] bg-transparent cursor-pointer flex items-center justify-center rounded-full hover:text-[var(--text-1)] hover:bg-[var(--bg-4)] ${showPlaylist ? '!text-[var(--accent)]' : ''}`}
                                            title="List"
                                        >
                                            <ListMusic size={20} />
                                        </button>
                                    </div>
                                </div>
                                {audioError && (
                                    <div className="flex p-4 rounded-lg bg-red-300 text-red-900 text-sm">
                                        This audio file could not be loaded. Please choose a different song.
                                    </div>
                                )}
                                <div className="py-2.5 px-0 select-none">
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
                                        className="slider w-full h-1.5 rounded-sm cursor-pointer bg-[var(--bg-4)]"
                                    />
                                    <div className="text-xs text-[var(--text-2)] flex justify-between select-none">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="w-32 flex items-center gap-1.5">
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
                                            className="`w-8 h-8 min-w-8 min-h-8 p-1 transition text-[var(--text-2)] bg-transparent cursor-pointer flex items-center justify-center rounded-full hover:text-[var(--text-1)] hover:bg-[var(--bg-4)]"
                                            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                                        >
                                            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
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
                                            className="slider flex-1 w-full h-1 rounded-sm cursor-pointer bg-[var(--bg-4)]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={handlePrevious}
                                            className="w-8 h-8 min-w-8 min-h-8 p-1 transition text-[var(--text-2)] bg-transparent cursor-pointer flex items-center justify-center rounded-full hover:text-[var(--text-1)] hover:bg-[var(--bg-4)]"
                                            title="Previous Song"
                                            disabled={songs.length === 0}
                                        >
                                            <StepBack size={22} />
                                        </button>
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-[var(--text-1)] shadow-sm transition flex items-center justify-center cursor-pointer w-12 h-12 rounded-full hover:scale-95"
                                            title={isPlaying ? 'Pause' : 'Play'}
                                            disabled={songs.length === 0}
                                        >
                                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                                        </button>
                                        <button
                                            onClick={isShuffled ? handleShuffle : handleNext}
                                            className="w-8 h-8 min-w-8 min-h-8 p-1 transition text-[var(--text-2)] bg-transparent cursor-pointer flex items-center justify-center rounded-full hover:text-[var(--text-1)] hover:bg-[var(--bg-4)]"
                                            title="Next Song"
                                            disabled={songs.length === 0}
                                        >
                                            <StepForward size={22} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {showPlaylist && (
                            <div className="overflow-y-auto max-h-56 border-solid border-t border-[var(--border)]">
                                {songs.map((song, index) => (
                                    <div
                                        key={index}
                                        onClick={() => selectSong(index)}
                                        className={`transition flex justify-between items-center cursor-pointer py-3 px-4 hover:bg-[var(--bg-2)] ${index === currentSongIndex ? 'active' : ''}`}
                                    >
                                        <div className='flex gap-1.5 items-center'>
                                            <span className="text-base text-[var(--text-2)]">{index + 1}</span>
                                            <span className="text-base text-[var(--text-1)]">{song.title}</span>
                                        </div>
                                        {index === currentSongIndex && isPlaying && (
                                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}