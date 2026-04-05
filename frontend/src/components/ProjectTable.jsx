import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

function ProjectTable({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatYear = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "-";
    return String(date.getFullYear());
  };

  const renderAuthors = (names) => {
    if (!names) return "-";
    return names.split(',').map((name, idx) => (
      <div key={idx}>{idx + 1}. {name.trim()}</div>
    ));
  };

  const handleRowClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
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
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr
                key={index}
                className="clickable-row"
                onClick={() => handleRowClick(project)}
                style={{ cursor: "pointer" }}
              >
                <td className="project-table__num">{project.number || "-"}</td>
                <td>{project.bookNumber || "-"}</td>
                <td>{project.title || "-"}</td>
                <td className="authors-cell project-table__col-author">{renderAuthors(project.names)}</td>
                <td className="project-table__col-adviser">{project.adviser || "-"}</td>
                <td className="project-table__col-coordinator">{project.coordinator || "-"}</td>
                <td className="project-table__col-date">
                  <span className="project-table__date-full">
                    {project.date ? formatDate(project.date) : "-"}
                  </span>
                  <span className="project-table__date-year">
                    {project.date ? formatYear(project.date) : "-"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
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
