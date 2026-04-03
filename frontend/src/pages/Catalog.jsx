import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import AddProject from '../components/AddProjectButton';
import ProjectTable from '../components/ProjectTable';

function Catalog() {
  const sampleProjects = [
    {
      number: "1",
      bookNumber: "B001",
      title: "AI-Powered Learning Platform",
      names: "John Smith, Jane Doe",
      adviser: "Dr. Robert Johnson",
      coordinator: "Dr. Maria Garcia",
      date: "2024-04-03"
    },
    {
      number: "2",
      bookNumber: "B002",
      title: "Mobile Health Tracking App",
      names: "Michael Chen, Sarah Williams",
      adviser: "Dr. James Lee",
      coordinator: "Dr. Patricia Brown",
      date: "2024-03-28"
    },
    {
      number: "3",
      bookNumber: "B003",
      title: "Sustainable Energy Management System",
      names: "David Martinez, Emily Davis",
      adviser: "Dr. Thomas Wilson",
      coordinator: "Dr. Angela Rodriguez",
      date: "2024-03-15"
    }
  ];

  return (
    <>
      <main className="catalog-main">
        <div className="catalog-header">
          <div className="catalog-search">
            <SearchBar />
          </div>
          <div className="catalog-actions">
            <AddProject />
          </div>
        </div>

        <ProjectTable projects={sampleProjects} />

      </main>

      <style>{`
        .catalog-main {
          padding: 0.5rem 2rem;
        }

        .catalog-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
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