import React, { useState } from "react";
import AddProjectModal from "./NewProjectModal";

function AddProject() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddProject = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAdd = (projectData) => {
    // You can handle the new project data here (e.g., send to API or update state)
    // For now, just log it
    console.log("New Project Data:", projectData);
  };

  return (
    <>
      <button className="add-project-btn" onClick={handleAddProject}>
        <span className="plus-icon">+</span>
        <span className="btn-text">Add Project</span>
      </button>

      <AddProjectModal isOpen={modalOpen} onClose={handleCloseModal} onAdd={handleAdd} />

      <style>{`
        .add-project-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 1.2rem;
          background: #1e293b;
          color: #ffffff;
          border: none;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          min-height: 30px;
        }

        .add-project-btn:hover {
          background: #0f172a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 41, 59, 0.3);
        }

        .add-project-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(30, 41, 59, 0.2);
        }

        .plus-icon {
          font-size: 0.75rem;
          font-weight: 400;
        }

        .btn-text {
          display: inline;
        }

        @media (max-width: 768px) {
          .add-project-btn {
            padding: 0.52rem 1.3rem;
            font-size: 0.75rem;
            min-height: 34px;
          }

          .plus-icon {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 600px) {
          .add-project-btn {
            padding: 0.4rem 1.3rem;
            font-size: 0.66rem;
            min-height: 30px;
            gap: 0.35rem;
          }

          .plus-icon {
            font-size: 0.68rem;
          }

          .btn-text {
            font-size: 0.66rem;
            max-width: none;
            overflow: visible;
          }
        }
      `}</style>
    </>
  );
}

export default AddProject;
