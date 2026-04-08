import React, { useState, useEffect, useRef } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";

function ProjectTable({ projects = [], onEdit, onDelete }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "-";
    return date
      .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      .toUpperCase();
  };

  const formatYear = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "-";
    return String(date.getFullYear());
  };

  const renderNumberedList = (value) => {
    if (!value) return "-";
    const items = value
      .split(',')
      .map(item => item.trim())
      .filter(item => item);

    if (items.length === 0) return "-";

    return items.map((item, idx) => (
      <div key={idx}>{idx + 1}. {item}</div>
    ));
  };

  const renderMultiLine = (value) => {
    if (!value) return "-";
    const items = value
      .split(',')
      .map(item => item.trim())
      .filter(item => item);

    if (items.length === 0) return "-";

    return items.map((item, idx) => (
      <div key={idx}>{item}</div>
    ));
  };

  const renderAuthors = (names) => renderNumberedList(names);

  const handleRowClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (projectId, event) => {
    event.stopPropagation();
    setActiveMenu((current) => (current === projectId ? null : projectId));
  };

  const handleEdit = (project, event) => {
    event.stopPropagation();
    setActiveMenu(null);
    onEdit?.(project);
  };

  const handleDelete = (project, event) => {
    event.stopPropagation();
    setActiveMenu(null);
    onDelete?.(project);
  };

  return (
    <>
      <table className="project-table">
        <thead>
          <tr>
            <th className="project-table__num" scope="col" aria-label="No."></th>
            <th>Book #</th>
            <th>Title</th>
            <th className="project-table__col-author">Author</th>
            <th className="project-table__col-adviser">Adviser</th>
            <th className="project-table__col-coordinator">Coordinator</th>
            <th className="project-table__col-date">
              <span className="project-table__head-full">Date</span>
              <span className="project-table__head-year">Year</span>
            </th>
            <th className="project-table__col-actions" aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr
                key={project.id || index}
                className="clickable-row"
                onClick={() => handleRowClick(project)}
                style={{ cursor: "pointer" }}
              >
                <td className="project-table__num">{index + 1}</td>
                <td>{project.bookNumber || "-"}</td>
                <td>{project.title || "-"}</td>
                <td className="authors-cell project-table__col-author">{renderAuthors(project.names)}</td>
                <td className="project-table__col-adviser">{project.adviser || "-"}</td>
                <td className="project-table__col-coordinator">{renderMultiLine(project.coordinator)}</td>
                <td className="project-table__col-date">
                  <span className="project-table__date-full">
                    {project.date ? formatDate(project.date) : "-"}
                  </span>
                  <span className="project-table__date-year">
                    {project.date ? formatYear(project.date) : "-"}
                  </span>
                </td>
                <td
                  className="project-table__col-actions"
                  onClick={(e) => e.stopPropagation()}
                  ref={activeMenu === project.id ? menuRef : null}
                >
                  <div className="action-menu">
                    <button
                      type="button"
                      className="action-menu-button"
                      onClick={(e) => handleMenuToggle(project.id, e)}
                      aria-label="Open actions"
                    >
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </button>

                    {activeMenu === project.id && (
                      <div className="action-menu-popup">
                        <button
                          type="button"
                          className="action-menu-item edit"
                          onClick={(e) => handleEdit(project, e)}
                        >
                          <img src={editIcon} alt="Edit" className="item-icon" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="action-menu-item delete"
                          onClick={(e) => handleDelete(project, e)}
                        >
                          <img src={deleteIcon} alt="Delete" className="item-icon" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onDelete={onDelete}
      />

      <style>{`
        .project-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background-color: #ffffff;
          font-family: 'Inter', sans-serif;
          border-radius: 0.2rem;
          overflow: hidden;
          table-layout: auto;
          word-wrap: break-word;
        }

        .project-table thead {
          background-color: #686d752a;
          color: #1f2937;
          position: sticky;
          top: 0;
        }

        .project-table th {
          padding: 0.4rem 0.4rem;
          text-align: left;
          font-family: 'Inter', serif;
          font-weight: 600;
          font-size: 0.65rem;
          letter-spacing: 0.01em;
          border-top: 1px solid #babfca59;
          border-bottom: 1px solid #babfcab9;
          word-wrap: break-word;
        }

        .project-table th:first-child {
          border-left: 1px solid #babfcab9;
          border-top-left-radius: 0.5rem;
        }

        .project-table th:last-child {
          border-right: 1px solid #babfcab9;
          border-top-right-radius: 0.5rem;
        }

        .project-table tbody tr {
          border-bottom: 1px solid #babfca;
          transition: background-color 0.2s ease;
        }


        .project-table tbody tr.clickable-row:hover {
          background-color: #e4e6e853;
        }

        .project-table td {
          padding: 0.4rem 0.6rem;
          font-size: 0.65rem;
          color: #2d3b4e;
          border-bottom: 1px solid #babfca4e;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .authors-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          word-wrap: break-word;
        }

        .project-table th.project-table__num,
        .project-table td.project-table__num {
          text-align: center;
          vertical-align: middle;
          width: 2.75rem;
          min-width: 2.75rem;
          max-width: 3.25rem;
          padding-left: 0.65rem;
          padding-right: 0.65rem;
          box-sizing: border-box;
        }

        .project-table th:nth-child(3),
        .project-table td:nth-child(3) {
          width: 30%;
          min-width: 220px;
        }

        .project-table__col-actions {
          width: 4.5rem;
          min-width: 4.5rem;
          text-align: center;
        }

        .action-menu {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .action-menu-button {
          border: none;
          background: transparent;
          cursor: pointer;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          width: 13px;
          height: 13px;
          padding: 0;
          border-radius: 999px;
          transition: background-color 0.15s ease;
        }

        .action-menu-button:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .action-menu-button .dot {
          width: 2.5px;
          height: 2.5px;
          background: #334155;
          border-radius: 50%;
          display: inline-block;
        }

        .action-menu-popup {
          position: absolute;
          right: 15px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
          min-width: 4.5rem;
          z-index: 10;
        }

        .action-menu-item {
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          padding: 0.30rem 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .item-icon {
          width: .95rem;
          height: .80rem;
          object-fit: contain;
        }

        .action-menu-item:hover {
          background: #f8fafc;
        }

        .action-menu-item.delete {
          color: #b91c1c;
        }

        .action-menu-item.edit {
          color: #1FB141;
        }

        .item-icon {
          font-size: 0.95rem;
          line-height: 1;
        }

        .project-table td.project-table__num {
          font-weight: 500;
          color: #1B212D;
          font-variant-numeric: tabular-nums;
        }

        .project-table__head-year,
        .project-table__date-year {
          display: none;
        }

        .project-table__head-full,
        .project-table__date-full {
          display: inline;
        }

        /* Tablet portrait & phone landscape: No., Book #, Title, Author, Year */
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait),
          (orientation: landscape) and (max-width: 932px) and (max-height: 500px) {
          .project-table__col-adviser,
          .project-table__col-coordinator {
            display: none !important;
          }

          .project-table__head-full,
          .project-table__date-full {
            display: none !important;
          }

          .project-table__head-year,
          .project-table__date-year {
            display: inline !important;
          }
        }

        /* Phone portrait: No., Title only */
        @media (max-width: 767px) and (orientation: portrait) {
          .project-table th:nth-child(2),
          .project-table td:nth-child(2),
          .project-table__col-author,
          .project-table__col-adviser,
          .project-table__col-coordinator,
          .project-table__col-date {
            display: none !important;
          }

          /* Fix header styling for visible columns on mobile */
          .project-table th:nth-child(3) {
            border-right: 1px solid #babfcab9;
            border-top-right-radius: 0.5rem;
            padding: 0.4rem 0.4rem;
          }
        }

        .no-data {
          text-align: center;
          color: #6b7280;
          font-style: italic;
          padding: 2rem 1rem !important;
        }

        @media (max-width: 1024px) {
          .project-table th:not(.project-table__num),
          .project-table td:not(.project-table__num) {
            padding: 0.5rem 0.6rem;
            font-size: 0.75rem;
          }
          .project-table th.project-table__num,
          .project-table td.project-table__num {
            font-size: 0.75rem;
            padding-left: 0.7rem;
            padding-right: 0.7rem;
          }
        }

        @media (max-width: 768px) {
          .project-table th:not(.project-table__num),
          .project-table td:not(.project-table__num) {
            padding: 0.5rem 0.6rem;
            font-size: 0.85rem;
          }

          .project-table thead {
            font-size: 0.75rem;
          }

          .project-table th.project-table__num,
          .project-table td.project-table__num {
            font-size: 0.85rem;
            padding-left: 0.6rem;
            padding-right: 0.6rem;
          }
        }

        @media (max-width: 600px) {
          .project-table th:not(.project-table__num),
          .project-table td:not(.project-table__num) {
            padding: 0.45rem 0.5rem;
            font-size: 0.78rem;
          }

          .project-table thead {
            font-size: 0.72rem;
          }

          .project-table th.project-table__num,
          .project-table td.project-table__num {
            font-size: 0.78rem;
            padding-left: 0.55rem;
            padding-right: 0.55rem;
            min-width: 2.5rem;
          }

          .no-data {
            font-size: 0.78rem;
            padding: 1.25rem 0.5rem !important;
          }
        }
      
      `}</style>
    </>
  );
}

export default ProjectTable;
