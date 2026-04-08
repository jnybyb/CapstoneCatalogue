import React, { useState } from "react";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import adviserIcon from "../assets/adviser.png";
import panelsIcon from "../assets/panels.png";
import coordinatorIcon from "../assets/coordinator.png";
import programHeadIcon from "../assets/program head.png";
import deanIcon from "../assets/Dean.png";

function ProjectDetailsModal({ project, isOpen, onClose }) {

  useBodyScrollLock(Boolean(isOpen && project));

  // Extract fileId from Google Drive link and construct image URL
  const getImageUrlFromDriveLink = (driveLink) => {
    console.log("AbstractLink received:", driveLink);
    
    if (!driveLink) {
      console.log("No driveLink provided");
      return null;
    }
    
    // Extract fileId from: https://drive.google.com/file/d/{fileId}/view
    const fileIdMatch = driveLink.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Use backend proxy endpoint that serves with CORS headers
      const proxyUrl = `/api/projects/image/${fileId}`;
      console.log("Generated proxy URL:", proxyUrl);
      return {
        url: proxyUrl,
        fileId: fileId,
        driveLink: driveLink
      };
    }
    
    console.log("Could not extract fileId from link:", driveLink);
    return null;
  };

  const imageUrl = project ? getImageUrlFromDriveLink(project.abstractLink || project.abstract_link) : null;
  console.log("Final imageUrl object:", imageUrl);

  const renderAbstractImage = () => {
    if (!imageUrl) {
      return <div className="abstract-text">No abstract available.</div>;
    }

    return (
      <div className="abstract-image-container">
        <img 
          src={imageUrl.url}
          alt="Abstract" 
          className="abstract-image"
          onError={(e) => {
            console.error("Failed to load image from proxy:", imageUrl.url);
            
            // If proxy fails, show a Google Drive link
            const container = e.target.parentElement;
            container.innerHTML = `
              <div class="abstract-fallback">
                <p class="abstract-fallback-text">Unable to load abstract image.</p>
                <a href="${imageUrl.driveLink}" target="_blank" rel="noopener noreferrer" class="view-drive-link">
                  View Abstract on Google Drive →
                </a>
              </div>
            `;
          }}
        />
      </div>
    );
  };

  return (
    <>
      {isOpen && project && (
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="document-preview">

                <button 
                  className="modal-close-btn"
                  onClick={onClose}
                  aria-label="Close"
                >
                  ×
                </button>
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
                          <img src={adviserIcon} alt="Adviser" className="staff-icon" />
                          <strong>Adviser</strong>
                        </div>
                        <div className="staff-value">
                          <span>{project.adviser || "-"}</span>
                        </div>
                      </div>

                      <div className="staff-item">
                        <div className="staff-label">
                          <img src={panelsIcon} alt="Panels" className="staff-icon" />
                          <strong>Panels</strong>
                        </div>
                        <div className="staff-value">
                          <div>
                            <span>{project.chairPanel || "-"}</span>
                          </div>
                          {project.panelMembers
                            ? project.panelMembers.split(",").map((member, idx) => (
                                <div key={idx} className="staff-value">
                                  <span>{member.trim()}</span>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>

                    <div className="staff-column right-column">
                      <div className="staff-item">
                        <div className="staff-label">
                          <img src={coordinatorIcon} alt="Coordinator" className="staff-icon" />
                          <strong>Coordinator</strong>
                        </div>
                        <div className="staff-value">
                          <span>{project.coordinator || "-"}</span>
                        </div>
                      </div>

                      <div className="staff-item">
                        <div className="staff-label">
                          <img src={programHeadIcon} alt="Program Head" className="staff-icon" />
                          <strong>Program Head</strong>
                        </div>
                        <div className="staff-value">
                          <span>{project.programHead || "-"}</span>
                        </div>
                      </div>

                      <div className="staff-item">
                        <div className="staff-label">
                          <img src={deanIcon} alt="Dean" className="staff-icon" />
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
                    {renderAbstractImage()}
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
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

        .modal-close-btn {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #374151;
          padding: 0;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .modal-close-btn:hover {
          color: #111827;
        }

        .document-preview {
          padding: 2.42rem 1.5rem;
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
          font-size: 0.75rem;
          margin-bottom: 0;
          font-weight: 700;
          font-family: 'DM Serif Display', serif;
          letter-spacing: 0.02em;
        }

        .doc-staff {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
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
          gap: 0.1rem;
        }

        .staff-icon {
          width: 0.75rem;
          height: 0.75rem;
          object-fit: contain;
        }

        .staff-value {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          color: #15253c;
          font-family: 'Inter', sans-serif;
          font-size: .65rem;
          font-weight: 800;
        }

        .staff-item strong {
          font-weight: 700;
          color: #75757bc5;
          font-size: 0.55rem;
        }

        .panel-list {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .panel-member {
          display: block;
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

        .abstract-image-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .abstract-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          gap: 1rem;
        }

        .abstract-fallback-text {
          font-size: 0.85rem;
          color: #666;
          text-align: center;
          margin: 0;
        }

        .view-drive-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: #4f46e5;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background 0.2s ease;
          cursor: pointer;
          font-family: inherit;
        }

        .view-drive-link:hover {
          background: #4338ca;
        }

        /* MOBILE LANDSCAPE */

        @media (max-height: 600px) and (orientation: landscape) {
          .modal-content {
            width: 75vw;
            max-width: 80%;
            max-height: 95vh;
            max-height: 95dvh;
            min-height: 85vh;
            padding: 0.05rem 0.5rem;
          }

          .document-preview {
            padding: 0.8rem 0.75rem;
          }

          .doc-title {
            font-size: 1.1rem;
            margin-bottom: 0.2rem;
          }

          .doc-date {
            font-size: 0.65rem;
            margin-bottom: 0.6rem;
          }

          .doc-authors {
            font-size: 0.8rem;
            margin-bottom: 0.4rem;
          }

          .doc-staff {
            gap: 0.8rem;
            margin-bottom: 0.4rem;
            font-size: 0.7rem;
          }

          .staff-value {
            font-size: 0.75rem;
          }

          .staff-item strong {
            font-size: 0.55rem;
          }

          .panel-member {
            font-size: 0.7rem;
          }

          .doc-abstract {
            min-height: 80px;
          }
        }

        /* TABLET RESPONSIVE */

        @media (max-width: 1024px) and (min-width: 601px) {
          .modal-content {
            width: calc(100vw - 38vw);
            height: calc(100vh - 30vw);
          }
        }

        /* DESKTOP STYLES */

        @media (min-width: 1025px) {
          .modal-content {
            width: calc(100vw - 64vw);
            height: calc(100vh - 10vh);
          }
        }

        /* MOBILE RESPONSIVE */

        @media (max-width: 600px) {

          .modal-content {
            width: 85vw;
            max-height: min(95vh, calc(100vh - 1vh));
            max-height: min(95dvh, calc(100dvh - 1dvh));
            padding: 0.1rem 0.75rem;
          }

          .document-preview {
            padding: 2.42rem 1rem;
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
    </>
  
  );
}


export default ProjectDetailsModal;