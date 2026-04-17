const KintaroProgressBar1 = ({ progress, title }) => {
  return (
    <div className="kintaro-progress-bar-container">
      <div className="kintaro-progress-title">
        <span>{title}</span>
        <span>{progress}%</span>
      </div>
      <div className="kintaro-progress-bar">
        <div 
          className={`kintaro-progress-fill ${progress > 0 && progress < 100 ? 'animated' : ''}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export { KintaroProgressBar1 };