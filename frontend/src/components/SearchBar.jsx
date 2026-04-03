import { useState } from "react";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Add search logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <svg
          className="search-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search titles, authors, or keywords..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </form>

      <style>{`

        .search-form {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1.5px solid #1E293B;
          border-radius: 0.5rem;
          padding: 0.5rem 0.7rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          max-width: 600px;
          min-width: 120px;
        }

        .search-form:focus-within {
          border-color: #1e5abb;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-icon {
          width: 17px;
          height: 17px;
          color: #6b7280;
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: #1f2937;
          background: transparent;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        @media (max-width: 768px) {
          .search-form {
            max-width: 450px;
            padding: 0.5rem 0.6rem;
          }

          .search-input {
            font-size: 0.88rem;
          }

          .search-icon {
            width: 16px;
            height: 16px;
          }
        }

        @media (max-width: 600px) {
          .search-form {
            max-width: 350px;
            min-width: 160px;
            padding: 0.45rem 0.5rem;
          }

          .search-input {
            font-size: 0.78rem;
          }

          .search-input::placeholder {
            font-size: 0.76rem;
          }

          .search-icon {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default SearchBar;
