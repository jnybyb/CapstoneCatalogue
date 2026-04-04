import React from "react";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

function ProjectDetailsModal({ project, isOpen, onClose }) {
  useBodyScrollLock(Boolean(isOpen && project));

  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="document-preview">

          <div className="document-preview__header">
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
          </div>

          <div className="document-preview__scroll">
          {/* ADVISER / PANEL / COORDINATOR / PROGRAM HEAD / DEAN */}
          <div className="doc-staff">
            <div className="staff-column left-column">
              <div className="staff-item">
                <div className="staff-label">
                  <strong>Adviser</strong>
                </div>
                <div className="staff-value">
                  <span>{project.adviser || "-"}</span>
                </div>
              </div>

              <div className="staff-item">
                <div className="staff-label">
                  <strong>Panel</strong>
                </div>
                <div className="panel-list">
                  {project.panel
                    ? project.panel.split(",").map((member, idx) => (
                        <div key={idx} className="panel-member">
                          <span>{member.trim()}</span>
                        </div>
                      ))
                    : "-"}
                </div>
              </div>
            </div>

            <div className="staff-column right-column">
              <div className="staff-item">
                <div className="staff-label">
                  <strong>Coordinator</strong>
                </div>
                <div className="staff-value">
                  <span>{project.coordinator || "-"}</span>
                </div>
              </div>

              <div className="staff-item">
                <div className="staff-label">
                  <strong>Program Head</strong>
                </div>
                <div className="staff-value">
                  <span>{project.programHead || "-"}</span>
                </div>
              </div>

              <div className="staff-item">
                <div className="staff-label">
                  <strong>Dean</strong>
                </div>
                <div className="staff-value">
                  <span>{project.dean || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ABSTRACT BOX */}
          <div className="doc-abstract">
            {project.abstract ? (
              <img src={project.abstract} alt="Abstract" className="abstract-image" />
            ) : (
              <div className="abstract-text">No abstract available.</div>
            )}
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
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          overscroll-behavior: contain;
        }

        .modal-content {
          background: #f3f4f6;
          border-radius: 6px;
          padding: 0.1rem 1rem;
          width: 40vw;
          max-width: 850px;
          max-height: min(90vh, calc(100vh - 2rem));
          max-height: min(90vh, calc(100dvh - 2rem));
          min-height: 0;
          position: relative;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .modal-close {
          display: none;
        }

        .document-preview {
          padding: 2.5rem 1.5rem;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .document-preview__header {
          flex-shrink: 0;
          background: #f3f4f6;
          position: relative;
          z-index: 1;
          padding-bottom: 0.35rem;
        }

        .document-preview__scroll {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-top: 0.35rem;
        }

        .document-preview__scroll::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .doc-title {
          text-align: center;
          font-size: 1.4rem;
          font-weight: 900;
          margin-bottom: 0.7rem;
          font-family: 'DM Serif Display', serif;
        }

        .doc-date {
          text-align: center;
          font-size: 0.75rem;
          margin-bottom: 2.3rem;
          font-family: 'DM Serif Display', serif;
          font-style: italic;
        }

        .doc-authors {
          text-align: center;
          font-size: 0.9rem;
          margin-bottom: 0;
          font-weight: 600;
          font-family: 'DM Serif Display', serif;
          letter-spacing: 0.02em;
        }

        .doc-staff {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 1rem;
          font-size: 0.85rem;
        }

        .staff-column {
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }

        .staff-item {
          display: flex;
          flex-direction: column;
        }

        .staff-label {
          display: flex;
          align-items: center;
        }

        .staff-value {
          display: flex;
          align-items: center;
          color: #15253c;
          font-family: 'DM Serif Display', serif;
          font-size: .9rem;
        }

        .staff-item strong {
          font-weight: 500;
          color: #57575ab0;
          font-size: 0.6rem;
        }

        .panel-list {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .panel-member {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4b5563;
          font-size: 0.85rem;
          font-family: 'DM Serif Display', serif;
        }

        .doc-abstract {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #cbced4;
          padding: 0.5rem;
          margin-top: 0.5rem;
        }

        .abstract-image {
          max-width: 100%;
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .abstract-text {
          font-size: 0.85rem;
          color: #4b5563;
        }

        /* MOBILE RESPONSIVE */

        @media (max-width: 600px) {

          .modal-content {
            width: 85vw;
            max-height: min(85vh, calc(100vh - 1.5rem));
            max-height: min(85dvh, calc(100dvh - 1.5rem));
            padding: 0.1rem 0.75rem;
          }

          .document-preview {
            padding: 1.5rem 1rem;
          }

          .doc-staff {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .doc-title {
            font-size: 1.25rem;
          }

          .abstract-text {
            font-size: 1rem;
          }

        }

      `}</style>
    </div>
  );
}

export default ProjectDetailsModal;