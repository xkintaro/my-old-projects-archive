import { useState, useEffect } from 'react';
import axios from 'axios';
import { KintaroConfirmationDialog } from "../components/KintaroPopup";
import {
  KintaroAccentButtonW100,
  KintaroAccentTextButton,
  KintaroErrorTextButton
} from "../inputs/KintaroButton";
import { KintaroTextBox1 } from "../inputs/KintaroTextBox";
import { KintaroTitle2 } from "../components/KintaroTitle";
import { KintaroDescription } from "../components/KintaroDescription";
import {
  KintaroErrorMessage1,
  KintaroSuccessMessage1
} from "../components/KintaroSystemMessages";
import { CiFileOn } from "react-icons/ci";
import { IoMdDownload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DownloadItem = ({ file, onDelete }) => {
  return (
    <div className="kintaro-download-item">
      <CiFileOn className="kintaro-download-icon" />
      <div className="kintaro-download-info">
        <KintaroDescription
          text={file.name}
          maxLength={30}
          showToggleButton={false}
        />
        <span className="kintaro-download-size">{formatFileSize(file.size)}</span>
      </div>
      <div className="kintaro-download-actions">
        <button
          className="kintaro-delete-button"
          title="Delete"
          onClick={() => onDelete(file.name)}
        >
          <MdDelete />
        </button>
        <a
          href={file.url}
          download
          className="kintaro-download-button"
          title="Download"
        >
          <IoMdDownload />
        </a>
      </div>
    </div>
  );
};

const EmptyDownloadsState = () => (
  <div className="kintaro-empty-downloads">
    <CiFileOn className="kintaro-empty-icon" />
    <KintaroDescription
      text={"No downloads yet. Videos you download will appear here."}
      maxLength={999}
      showToggleButton={false}
    />
  </div>
);

const DownloadsSummary = ({ downloads }) => (
  <div className="kintaro-downloads-summary">
    {downloads.length} item{downloads.length !== 1 ? 's' : ''} •
    Total: {formatFileSize(downloads.reduce((acc, file) => acc + file.size, 0))}
  </div>
);

function KintaroDownloader() {
  const [url, setUrl] = useState('');
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const fetchDownloads = async () => {
    try {
      const response = await axios.get('/downloads');
      setDownloads(response.data.reverse());
      setVisibleCount(5);
    } catch (err) {
      console.error('Error fetching downloads:', err);
      setError('Failed to fetch downloads');
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDownloadInfo(null);

    if (!url) {
      setError('Please enter a video URL');
      return;
    }

    try {
      setLoading(true);
      const infoResponse = await axios.post('/download', { url });
      setDownloadInfo(infoResponse.data);

      const fileResponse = await axios.get(infoResponse.data.downloadUrl, {
        responseType: 'blob'
      });

      const blob = new Blob([fileResponse.data], { type: 'video/mp4' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', infoResponse.data.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      fetchDownloads();
      setUrl('');
    } catch (err) {
      console.error('Download error:', err);
      setError(err.response?.data?.error || 'Failed to download video');
    } finally {
      setLoading(false);
    }
  };

  const handleClearDownloads = async () => {
    try {
      await axios.delete('/downloads');
      fetchDownloads();
      setClearDialogOpen(false);
    } catch (err) {
      console.error('Failed to delete downloads:', err);
      setError('Failed to delete downloads');
    }
  };

  const handleDeleteFile = async (filename) => {
    try {
      const encodedFilename = encodeURIComponent(filename);
      await axios.delete(`/downloads/${encodedFilename}`);
      fetchDownloads();
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error('Failed to delete file:', err);
      setError('Failed to delete file');
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const visibleDownloads = downloads.slice(0, visibleCount);
  const canLoadMore = downloads.length > visibleCount;

  return (
    <div className="kintaro-xahzy">
      <div className="kintaro-downloader-box">
        <KintaroConfirmationDialog
          isOpen={clearDialogOpen}
          onClose={() => setClearDialogOpen(false)}
          onConfirm={handleClearDownloads}
          title="İşlemi Onayla"
          message="Tüm indirilenleri silmek istediğinizden emin misiniz?"
          confirmText="Onayla"
          cancelText="Vazgeç"
        />

        <KintaroConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={() => handleDeleteFile(fileToDelete)}
          title="Dosyayı Sil"
          message="Bu dosyayı silmek istediğinizden emin misiniz?"
          confirmText="Sil"
          cancelText="Vazgeç"
        />

        <div className="kintaro-downloader-box-header">
          <KintaroTitle2 title="Kintaro Downloader" />
        </div>

        <div className="kintaro-downloader-box-main">
          <form onSubmit={handleSubmit} className="kintaro-downloader-box-form">
            <KintaroDescription
              text={"Download videos from any platform"}
              maxLength={999}
              showToggleButton={true}
            />
            <KintaroTextBox1
              type={"text"}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              title={"Enter the video URL"}
            />
            <KintaroAccentButtonW100
              type="submit"
              disabled={loading}
              title={loading ? 'Downloading...' : 'Download'}
            />
            {loading && <KintaroDescription text={"Downloading..."} maxLength={999} showToggleButton={false} />}
            {error && <KintaroErrorMessage1 message={error} autoDismiss={true} />}
            {downloadInfo && (
              <KintaroSuccessMessage1 message={"Download complete!"} autoDismiss={true} />
            )}
          </form>

          {downloads.length === 0 ? (
            <EmptyDownloadsState />
          ) : (
            <div className="kintaro-downloads-list-container">
              <div className="kintaro-download-list">
                {visibleDownloads.map((file, index) => (
                  <DownloadItem
                    key={index}
                    file={file}
                    onDelete={(filename) => {
                      setFileToDelete(filename);
                      setDeleteDialogOpen(true);
                    }}
                  />
                ))}

                <div className="kintaro-downloader-show-more">
                  {canLoadMore && (
                    <KintaroAccentTextButton
                      onClick={handleLoadMore}
                      title="Show More"
                    />
                  )}
                  <KintaroErrorTextButton
                    onClick={() => setClearDialogOpen(true)}
                    title={"Delete All Downloads"}
                  />
                </div>
              </div>

              <DownloadsSummary downloads={downloads} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default KintaroDownloader;