import React from "react";

function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = [];

  // Generate page numbers - show all pages if 5 or fewer
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show first page
    pages.push(1);
    
    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (startPage > 2) pages.push("...");
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages - 1) pages.push("...");
    
    // Show last page
    pages.push(totalPages);
  }

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing {startItem}-{endItem} of {totalItems}
      </div>

      <div className="pagination-wrapper">
        <button
          className="pagination-back"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Back
        </button>

        <div className="pagination-controls">
          {pages.map((page, idx) => (
            <button
              key={idx}
              className={`pagination-number ${page === currentPage ? "active" : ""}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination-next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>

      <style>{`
        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 1rem 0.2rem;
          background: none;
          border-radius: 0.375rem;
          margin-top: 0.3rem;
          flex-wrap: wrap;
          position: sticky;
          bottom: 0;
          z-index: 50;
          border-top: 1px solid #e5e7eb;
        }

        .pagination-info {
          font-size: 0.75rem;
          color: #1f2937;
          font-weight: 500;
        }

        .pagination-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pagination-back {
          min-width: fit-content;
          height: 32px;
          padding: 0 0.8rem;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 500;
          color: #1E293B;
          transition: all 0.2s;
          border-radius: 0.25rem;
        }

        .pagination-back:hover:not(:disabled) {
          background: rgba(59, 131, 246, 0.07);
        }

        .pagination-back:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-controls {
          display: flex;
          gap: 0.3rem;
          align-items: center;
        }

        .pagination-number {
          min-width: 32px;
          height: 30px;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 450;
          color: #1f2937;
          transition: all 0.2s;
          border-radius: 0.25rem;
        }

        .pagination-number:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.05);
        }

        .pagination-number.active {
          font-weight: 600;
          color: white;
          background: #1E293B;
        }

        .pagination-number:disabled {
          cursor: default;
          color: #9ca3af;
        }

        .pagination-next {
          min-width: fit-content;
          height: 32px;
          padding: 0 0.8rem;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 500;
          color: #1E293B;
          transition: all 0.2s;
          border-radius: 0.25rem;
        }

        .pagination-next:hover:not(:disabled) {
          background: rgba(59, 130, 246, 0.1);
        }

        .pagination-next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .pagination {
            gap: 0.25rem;
            flex-direction: column;
            align-items: flex-start;
            padding: 0.75rem 0.2rem;
          }

          .pagination-info {
            font-size: 0.7rem;
          }

          .pagination-wrapper {
            width: 100%;
            gap: 0.25rem;
          }

          .pagination-back,
          .pagination-next {
            font-size: 0.75rem;
            padding: 0 0.6rem;
          }

          .pagination-number {
            font-size: 0.75rem;
          }

          .pagination-controls {
            gap: 0.2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Pagination;
