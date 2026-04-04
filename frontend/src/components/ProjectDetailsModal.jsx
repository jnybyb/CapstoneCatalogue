import React from "react";

function ProjectDetailsModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="document-preview">

          {/* TITLE */}
          <h2 className="doc-title">
            {project.title || "-"}
          </h2>

          {/* DATE */}
          <div className="doc-date">
            {project.date
              ? new Date(project.date).toLocaleDateString(
                  "en-US",
                  { month: "long", year: "numeric" }
                )
              : "-"}
          </div>

          {/* AUTHORS */}
          <div className="doc-authors">
            {project.names || "-"}
          </div>

          {/* ADVISER / PANEL / COORDINATOR */}
          <div className="doc-staff">
            <div>
              <strong>Adviser:</strong>
              <div>{project.adviser || "-"}</div>
            </div>

            <div>
              <strong>Panel:</strong>
              <div>{project.panel || "-"}</div>
            </div>

            <div>
              <strong>Coordinator:</strong>
              <div>{project.coordinator || "-"}</div>
            </div>
          </div>

          {/* ABSTRACT BOX */}
          <div className="doc-abstract">
            <div className="abstract-label">
              Abstract
            </div>

            <div className="abstract-text">
              {project.abstract || "No abstract available."}
            </div>
          </div>

        </div>
      </div>

      <style>{`

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: #f3f4f6;
          border-radius: 8px;
          padding: 1.5rem;
          width: 90vw;
          max-width: 850px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .modal-close {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* DOCUMENT STYLE */

        .document-preview {
          background: #ffffff;
          padding: 2rem;
          border: 1px solid #ccc;
        }

        .doc-title {
          text-align: center;
          font-size: 1.4rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .doc-date {
          text-align: center;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .doc-authors {
          text-align: center;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .doc-staff {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
        }

        .doc-staff > div {
          width: 30%;
        }

        .doc-abstract {
          border: 1px solid #999;
          padding: 1rem;
          min-height: 300px;
        }

        .abstract-label {
          text-align: center;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .abstract-text {
          font-size: 0.85rem;
          text-align: justify;
          line-height: 1.5;
        }

        /* MOBILE RESPONSIVE */

        @media (max-width: 600px) {

          .doc-staff {
            flex-direction: column;
            gap: 10px;
          }

          .doc-staff > div {
            width: 100%;
          }

          .doc-title {
            font-size: 1.1rem;
          }

          .abstract-text {
            font-size: 0.8rem;
          }

        }

      `}</style>
    </div>
  );
}

export default ProjectDetailsModal;