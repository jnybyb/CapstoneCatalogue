import React, { useState } from "react";

export const DeleteConfirmationModal = ({
  isVisible,
  projectTitle = "Project",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isVisible) return null;

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-modal">
        <div className="delete-header">
          <div className="delete-icon">⚠️</div>
          <h2 className="delete-title">Delete Project?</h2>
        </div>

        <div className="delete-content">
          <p className="delete-message">
            Are you sure you want to delete <strong>"{projectTitle}"</strong>?
          </p>
          <p className="delete-warning">
            This action cannot be undone. All associated data will be permanently removed.
          </p>
        </div>

        <div className="delete-actions">
          <button
            className="delete-cancel-btn"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="delete-confirm-btn"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="delete-spinner"></span>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>

      <style>{`
        .delete-confirmation-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(3px);
        }

        .delete-confirmation-modal {
          background: white;
          border-radius: 8px;
          padding: 2rem;
          max-width: 350px;
          width: 90%;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
          animation: slideIn 0.2s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .delete-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .delete-icon {
          font-size: 2.5rem;
          line-height: 1;
        }

        .delete-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: #dc2626;
          text-align: center;
          font-family: 'DM Serif Display', serif;
        }

        .delete-content {
          margin-bottom: 2rem;
        }

        .delete-message {
          font-size: 0.75rem;
          color: #374151;
          margin: 0 0 0.75rem 0;
          line-height: 1.5;
          text-align: center;
        }

        .delete-message strong {
          color: #111827;
          word-break: break-word;
        }

        .delete-warning {
          font-size: 0.65rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.4;
          text-align: center;
          background: #fef2f2;
          padding: 0.75rem;
          border-radius: 6px;
          border-left: 3px solid #dc2626;
        }

        .delete-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .delete-cancel-btn,
        .delete-confirm-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          flex: 1;
        }

        .delete-cancel-btn {
          background: #ffffff;
          border: 1px solid #dc2626;
        }

        .delete-cancel-btn:hover:not(:disabled) {
          background: #e8eef8;
          color: #111827;
        }

        .delete-confirm-btn {
          background: #dc2626;
          color: white;
        }

        .delete-confirm-btn:hover:not(:disabled) {
          background: #b91c1c;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }

        .delete-cancel-btn:disabled,
        .delete-confirm-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .delete-spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 600px) {
          .delete-confirmation-modal {
            padding: 1.5rem;
            width: 85%;
          }

          .delete-title {
            font-size: 1.25rem;
          }

          .delete-message {
            font-size: 0.9rem;
          }

          .delete-warning {
            font-size: 0.8rem;
            padding: 0.6rem;
          }

          .delete-actions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .delete-cancel-btn,
          .delete-confirm-btn {
            width: 100%;
            padding: 0.85rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmationModal;
