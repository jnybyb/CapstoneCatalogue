import React from "react";

export const UploadingLoader = ({ isVisible, fileName = "Uploading" }) => {
  if (!isVisible) return null;

  return (
    <div className="uploading-loader-overlay">
      <div className="uploading-loader-container">
        <div className="spinner-animation">
          <div className="spinner"></div>
        </div>
        <p className="uploading-text">Uploading to Google Drive...</p>
        {fileName && <p className="file-name">{fileName}</p>}
      </div>

      <style>{`
        .uploading-loader-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(2px);
        }

        .uploading-loader-container {
          background: white;
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          min-width: 250px;
          max-width: 350px;
        }

        .spinner-animation {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
        }

        .spinner {
          width: 45px;
          height: 45px;
          border: 4px solid #f0f0f0;
          border-top: 4px solid #4285f4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .uploading-text {
          font-size: .85rem;
          font-weight: 500;
          color: #333;
          margin: 0;
          text-align: center;
        }

        .file-name {
          font-size: 0.85rem;
          color: #666;
          margin: 0;
          text-align: center;
          word-break: break-word;
          max-width: 100%;
        }

        @media (max-width: 768px) {
          .uploading-loader-container {
            padding: 2rem;
            min-width: 200px;
          }

          .spinner {
            width: 30px;
            height: 30px;
            border-width: 3px;
          }

          .uploading-text {
            font-size: 0.85rem;
          }

          .file-name {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

// Alternative compact loader that can be used inline
export const CompactUploadingLoader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="compact-loader">
      <div className="compact-spinner"></div>
      <span className="compact-text">Uploading...</span>

      <style>{`
        .compact-loader {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #f0f0f0;
          border-radius: 6px;
          font-size: 0.9rem;
          color: #333;
        }

        .compact-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid #e0e0e0;
          border-top: 2px solid #4285f4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .compact-text {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

// Success message component
export const UploadSuccessMessage = ({ isVisible, fileName = "File" }) => {
  if (!isVisible) return null;

  return (
    <div className="upload-success-container">
      <div className="success-icon">✓</div>
      <p className="success-text">Successfully uploaded!</p>
      {fileName && <p className="success-file-name">{fileName}</p>}

      <style>{`
        .upload-success-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: #e8f5e9;
          border: 1px solid #4caf50;
          border-radius: 8px;
          text-align: center;
        }

        .success-icon {
          width: 40px;
          height: 40px;
          background: #4caf50;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .success-text {
          font-size: 0.95rem;
          color: #2e7d32;
          font-weight: 500;
          margin: 0;
        }

        .success-file-name {
          font-size: 0.85rem;
          color: #558b2f;
          margin: 0;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
};

// Error message component
export const UploadErrorMessage = ({ isVisible, errorMessage = "Upload failed" }) => {
  if (!isVisible) return null;

  return (
    <div className="upload-error-container">
      <div className="error-icon">✕</div>
      <p className="error-text">{errorMessage}</p>

      <style>{`
        .upload-error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: #ffebee;
          border: 1px solid #f44336;
          border-radius: 8px;
          text-align: center;
        }

        .error-icon {
          width: 40px;
          height: 40px;
          background: #f44336;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .error-text {
          font-size: 0.95rem;
          color: #c62828;
          font-weight: 500;
          margin: 0;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
};

export default {
  UploadingLoader,
  CompactUploadingLoader,
  UploadSuccessMessage,
  UploadErrorMessage,
};
