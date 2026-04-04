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
        Item {startItem}-{endItem} of {totalItems}
      </div>

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

        <button
          className="pagination-next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      <style>{`
        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: #e8eef5;
          border-radius: 0.375rem;
          margin-top: 1rem;
        }

        .pagination-info {
          font-size: 0.85rem;
          color: #1f2937;
          font-weight: 500;
        }

        .pagination-controls {
          display: flex;
          gap: 0.3rem;
          align-items: center;
        }

        .pagination-number {
          min-width: 32px;
          height: 32px;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          color: #1f2937;
          transition: all 0.2s;
          border-radius: 0.25rem;
        }

        .pagination-number:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.05);
        }

        .pagination-number.active {
          font-weight: 700;
          color: #1f2937;
        }

        .pagination-number:disabled {
          cursor: default;
          color: #9ca3af;
        }

        .pagination-next {
          min-width: 32px;
          height: 32px;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1f2937;
          transition: all 0.2s;
          border-radius: 0.25rem;
        }

        .pagination-next:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.05);
        }

        .pagination-next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .pagination {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }

          .pagination-info {
            font-size: 0.8rem;
          }

          .pagination-controls {
            width: 100%;
          }

          .pagination-number {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Pagination;
