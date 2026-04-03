function ProjectTable({ projects = [] }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderAuthors = (names) => {
    if (!names) return "-";
    return names.split(',').map((name, idx) => (
      <div key={idx}>{idx + 1}. {name.trim()}</div>
    ));
  };

  return (
    <>
      <table className="project-table">
        <thead>
          <tr>
            <th></th>
            <th>Book #</th>
            <th>Title</th>
            <th>Author</th>
            <th>Adviser</th>
            <th>Coordinator</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr key={index}>
                <td>{project.number || "-"}</td>
                <td>{project.bookNumber || "-"}</td>
                <td>{project.title || "-"}</td>
                <td className="authors-cell">{renderAuthors(project.names)}</td>
                <td>{project.adviser || "-"}</td>
                <td>{project.coordinator || "-"}</td>
                <td>{project.date ? formatDate(project.date) : "-"}</td>
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

      <style>{`
        .project-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background-color: #ffffff;
          font-family: 'Inter', sans-serif;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .project-table thead {
          background-color: #686d7551;
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
          border-top: 1px solid #babfca;
          border-bottom: 1px solid #babfca;
        }

        .project-table th:first-child {
          border-left: 1px solid #babfca;
          border-top-left-radius: 0.5rem;
        }

        .project-table th:last-child {
          border-right: 1px solid #babfca;
          border-top-right-radius: 0.5rem;
        }

        .project-table tbody tr {
          border-bottom: 1px solid #e2e8f0;
          transition: background-color 0.2s ease;
        }

        .project-table tbody tr:hover {
          background-color: #e4e6e8;
        }

        .project-table td {
          padding: 0.3rem 0.6rem;
          font-size: 0.65rem;
          color: #2d3b4e;
        }

        .authors-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .project-table td:first-child {
          font-weight: 500;
          color: #1B212D;
        }

        .no-data {
          text-align: center;
          color: #6b7280;
          font-style: italic;
          padding: 2rem 1rem !important;
        }

        @media (max-width: 1024px) {
          .project-table th,
          .project-table td {
            padding: 0.5rem 0.6rem;
            font-size: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .project-table th,
          .project-table td {
            padding: 0.4rem 0.5rem;
            font-size: 0.7rem;
          }

          .project-table thead {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 600px) {
          .project-table th,
          .project-table td {
            padding: 0.35rem 0.4rem;
            font-size: 0.65rem;
          }

          .project-table thead {
            font-size: 0.6rem;
          }

          .no-data {
            font-size: 0.65rem;
            padding: 1rem 0.4rem !important;
          }
        }
      `}</style>
    </>
  );
}

export default ProjectTable;
