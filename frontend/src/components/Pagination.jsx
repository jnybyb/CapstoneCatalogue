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

      <div className="pagination-wrapper pagination-desktop-nav">
        <button
          className="pagination-back"
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Back
        </button>

        <div className="pagination-controls">
          {pages.map((page, idx) => (
            <button
              key={idx}
              type="button"
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
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>

      <div className="pagination-mobile-nav" aria-label="Page navigation">
        <button
          className="pagination-mobile-chevron"
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages < 1}
          aria-label="Previous page"
        >
          &lt;
        </button>
        <span className="pagination-mobile-current" aria-current="page">
          {totalPages < 1 ? "—" : currentPage}
        </span>
        <button
          className="pagination-mobile-chevron"
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages < 1}
          aria-label="Next page"
        >
          &gt;
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
          margin-top: 1.3rem;
          flex-wrap: wrap;
          position: sticky;
          bottom: 0;
          z-index: 50;
          border-top: 1px solid #e5e7eb;
        }

        .pagination-info {
          font-size: 0.85rem;
          color: #1f2937;
          font-weight: 500;
          flex-shrink: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pagination-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pagination-mobile-nav {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .pagination-mobile-chevron {
          min-width: 2rem;
          height: 32px;
          padding: 0 0.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          color: #1e293b;
          transition: background 0.2s;
          border-radius: 0.25rem;
          line-height: 1;
        }

        .pagination-mobile-chevron:hover:not(:disabled) {
          background: rgba(59, 131, 246, 0.08);
        }

        .pagination-mobile-chevron:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .pagination-mobile-current {
          min-width: 2rem;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: #fff;
          background: #1e293b;
          border-radius: 0.25rem;
          padding: 0 0.5rem;
          font-variant-numeric: tabular-nums;
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

        @media (max-width: 767px) {
          .pagination {
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            padding: 0.75rem 0.2rem;
          }

          .pagination-info {
            font-size: 0.68rem;
            flex: 1 1 auto;
            min-width: 0;
          }

          .pagination-desktop-nav {
            display: none !important;
          }

          .pagination-mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Pagination;
