import Header from '../components/Header';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import AddProject from '../components/AddProjectButton';
import ProjectTable from '../components/ProjectTable';
import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import noDataIcon from '../assets/no data.png';

function Catalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(14);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableSlotRef = useRef(null);

  useEffect(() => {
    const calculateRowsPerPage = () => {
      if (!tableSlotRef.current) return;

      const viewportHeight = window.innerHeight;
      const headerEstimate = 120; // Header + search + margin
      const paginationEstimate = 60; // Pagination height + margin
      const rowHeight = window.innerWidth <= 600 ? 85 : window.innerWidth <= 768 ? 95 : 70; // Responsive row height

      const availableHeight = viewportHeight - headerEstimate - paginationEstimate;
      const calculatedRows = Math.max(4, Math.floor(availableHeight / rowHeight));

      setItemsPerPage(calculatedRows);
      setCurrentPage(1);
    };

    calculateRowsPerPage();
    window.addEventListener('resize', calculateRowsPerPage);
    return () => window.removeEventListener('resize', calculateRowsPerPage);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = async (projectData) => {
    try {
      await api.addProject(projectData);
      // Refresh the projects list after adding
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error adding project:', err);
      // You might want to show an error message to the user here
    }
  };

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentProjects = projects.slice(startIdx, endIdx);

  return (
    <>
      <div className="catalog-main">
        <div className="catalog-header">
          <div className="catalog-search">
            <SearchBar />
          </div>
          <div className="catalog-actions">
            <AddProject onAdd={handleAddProject} />
          </div>
        </div>

        <div className="catalog-table-slot" ref={tableSlotRef}>
          {loading ? (
            <div className="loading-state">Loading projects...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : projects.length === 0 ? (
            <div className="no-data-state">
              <img src={noDataIcon} alt="No data" className="no-data-icon" />
              <p className="no-data-text">No data available</p>
            </div>
          ) : (
            <ProjectTable projects={currentProjects} />
          )}
        </div>

        {projects.length > 0 && (
          <div className="catalog-pagination-host">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={projects.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

      </div>

      <style>{`
        .catalog-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0 2rem;
        }

        .catalog-table-slot {
          flex: 1;
          overflow-y: auto;
        }

        .catalog-pagination-host {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          margin-top: auto;
        }

        .loading-state, .error-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #64748b;
        }

        .error-state {
          color: #dc2626;
        }

        .no-data-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          gap: .2rem;
        }

        .no-data-icon {
          width: 35px;
          height: 35px;
          opacity: 0.7;
        }

        .no-data-text {
          font-family: DM Serif Display, serif;
          font-size: 0.85rem;
          color: #202d3f9f;
          margin: 0;
          font-weight: 700;
        }

        .catalog-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          justify-content: space-between;
          flex-wrap: nowrap;
        }

        .catalog-search {
          flex: 1 1 auto;
          min-width: 250px;
          max-width: 720px;
        }

        .catalog-actions {
          flex: 0 0 auto;
          display: flex;
          justify-content: flex-end;
        }

        .catalog-projects {
          background: #ffffff;
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .catalog-projects h2 {
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .catalog-main {
            padding: 0.8rem 0.75rem;
          }

          .catalog-table-slot {
            flex: 1;
            overflow-y: auto;
          }

          .catalog-header {
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .catalog-search {
            flex: 1 1 auto;
            max-width: 65%;
          }

          .catalog-actions {
            flex: 0 0 auto;
          }

          .catalog-projects {
            padding: 1.25rem;
          }
        }

        @media (max-width: 600px) {
          .catalog-main {
            padding: 0.75rem 0.75rem;
          }

          .catalog-table-slot {
            flex: 1;
            overflow-y: auto;
          }

          .catalog-header {
            gap: 0.7rem;
            margin-bottom: 0.75rem;
          }

          .catalog-search {
            flex: 1 1 auto;
            max-width: none;
            min-width: 200px;
          }

          .catalog-actions {
            flex: 0 0 auto;
          }

          .catalog-projects {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default Catalog;