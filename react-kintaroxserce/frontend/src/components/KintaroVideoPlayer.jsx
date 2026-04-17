const KintaroVideoPlayer1 = ({ source, poster }) => {

    return (
        <div className="kintaro-video-player-container">

            <video className="kintaro-video-player" controls poster={poster}  >
                <source src={source} type="video/mp4" />
            </video>


        </div>
    );
};


export { KintaroVideoPlayer1 };

