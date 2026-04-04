import Header from '../components/Header';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import AddProject from '../components/AddProjectButton';
import ProjectTable from '../components/ProjectTable';
import { useState, useEffect, useRef } from 'react';

function Catalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const catalogHeaderRef = useRef(null);
  const paginationRef = useRef(null);
  const projectTableRef = useRef(null);

  // Calculate items per page based on actual screen height
  useEffect(() => {
    const calculateItemsPerPage = () => {
      // Get the viewport height
      const viewportHeight = window.innerHeight;
      
      // Get Header height (approximately 60-70px typically)
      const headerElement = document.querySelector('header') || document.querySelector('[role="banner"]');
      const headerHeight = headerElement?.offsetHeight || 60;
      
      // Get actual heights of measured elements
      const catalogHeaderHeight = catalogHeaderRef.current?.offsetHeight || 50;
      const paginationHeight = paginationRef.current?.offsetHeight || 70;
      
      // Estimate table header height
      const tableHeaderHeight = 45;
      
      // Estimate single row height (should match actual row height in ProjectTable)
      const rowHeight = 50;
      
      // Calculate available height for table rows
      const totalFixedHeight = headerHeight + catalogHeaderHeight + tableHeaderHeight + paginationHeight;
      const availableHeight = viewportHeight - totalFixedHeight;
      
      // Calculate how many complete rows can fit
      const calculatedRows = Math.max(5, Math.floor(availableHeight / rowHeight));
      
      setItemsPerPage(calculatedRows);
      setCurrentPage(1); // Reset to first page when items per page changes
      
      console.log(`Viewport: ${viewportHeight}px | Header: ${headerHeight}px | Catalog Header: ${catalogHeaderHeight}px | Pagination: ${paginationHeight}px | Available: ${availableHeight}px | Rows: ${calculatedRows}`);
    };

    // Small delay to ensure DOM is fully rendered and ref is available
    const timer = setTimeout(calculateItemsPerPage, 100);

    // Recalculate on window resize
    window.addEventListener('resize', calculateItemsPerPage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateItemsPerPage);
    };
  }, []);
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
    },
    {
      number: "4",
      bookNumber: "B004",
      title: "IoT Smart Home Hub",
      names: "Lisa Anderson, Christopher Lee",
      adviser: "Dr. Elizabeth Martinez",
      coordinator: "Dr. Daniel Garcia",
      date: "2024-03-10"
    },
    {
      number: "5",
      bookNumber: "B005",
      title: "Cloud-Based Data Analytics Platform",
      names: "James Wilson, Amanda Chen",
      adviser: "Dr. Richard Taylor",
      coordinator: "Dr. Susan White",
      date: "2024-02-28"
    },
    {
      number: "6",
      bookNumber: "B006",
      title: "Cybersecurity Threat Detection System",
      names: "Robert Brown, Jessica Davis",
      adviser: "Dr. Kevin Johnson",
      coordinator: "Dr. Michelle Rodriguez",
      date: "2024-02-20"
    },
    {
      number: "7",
      bookNumber: "B007",
      title: "Virtual Reality Training Simulator",
      names: "Thomas Harris, Emily Wilson",
      adviser: "Dr. Paul Anderson",
      coordinator: "Dr. Lisa Thompson",
      date: "2024-02-15"
    },
    {
      number: "8",
      bookNumber: "B008",
      title: "Blockchain Supply Chain Tracker",
      names: "Daniel Miller, Sarah Johnson",
      adviser: "Dr. Christopher Lee",
      coordinator: "Dr. Jennifer Davis",
      date: "2024-02-10"
    },
    {
      number: "9",
      bookNumber: "B009",
      title: "Natural Language Processing Chatbot",
      names: "Andrew Garcia, Nicole Martinez",
      adviser: "Dr. Mark Wilson",
      coordinator: "Dr. Amanda Garcia",
      date: "2024-01-28"
    },
    {
      number: "10",
      bookNumber: "B010",
      title: "Machine Learning Recommendation Engine",
      names: "Steven Clark, Emily White",
      adviser: "Dr. Joseph Brown",
      coordinator: "Dr. Patricia Lee",
      date: "2024-01-20"
    },
    {
      number: "11",
      bookNumber: "B011",
      title: "Autonomous Vehicle Navigation System",
      names: "Matthew Lewis, Rachel Martinez",
      adviser: "Dr. James Taylor",
      coordinator: "Dr. Karen Anderson",
      date: "2024-01-15"
    },
    {
      number: "12",
      bookNumber: "B012",
      title: "Quantum Computing Simulator",
      names: "David Chen, Lisa Anderson",
      adviser: "Dr. Richard Thompson",
      coordinator: "Dr. Maria Garcia",
      date: "2024-01-10"
    },
    {
      number: "13",
      bookNumber: "B013",
      title: "Augmented Reality Navigation App",
      names: "Kevin Zhang, Jessica Brown",
      adviser: "Dr. Charles Davis",
      coordinator: "Dr. Nicole Martinez",
      date: "2023-12-28"
    },
    {
      number: "14",
      bookNumber: "B014",
      title: "Robotic Process Automation Suite",
      names: "Michael Johnson, Emily Garcia",
      adviser: "Dr. Edward Wilson",
      coordinator: "Dr. Sarah Lee",
      date: "2023-12-20"
    },
    {
      number: "15",
      bookNumber: "B015",
      title: "AI-Powered Code Review System",
      names: "James Martin, Amanda Davis",
      adviser: "Dr. George Martinez",
      coordinator: "Dr. Rebecca Taylor",
      date: "2023-12-15"
    },
    {
      number: "16",
      bookNumber: "B016",
      title: "Serverless Computing Framework",
      names: "Robert Taylor, Jennifer White",
      adviser: "Dr. Frank Johnson",
      coordinator: "Dr. Linda Anderson",
      date: "2023-12-10"
    },
    {
      number: "17",
      bookNumber: "B017",
      title: "Edge Computing Resource Manager",
      names: "William Garcia, Nicole Johnson",
      adviser: "Dr. Stephen Lee",
      coordinator: "Dr. Karen Brown",
      date: "2023-12-05"
    },
    {
      number: "18",
      bookNumber: "B018",
      title: "Distributed Ledger Platform",
      names: "Joseph Brown, Elizabeth Martinez",
      adviser: "Dr. Henry Davis",
      coordinator: "Dr. Mary Wilson",
      date: "2023-11-28"
    },
    {
      number: "19",
      bookNumber: "B019",
      title: "Quantum Key Distribution System",
      names: "Charles Miller, Patricia Anderson",
      adviser: "Dr. Peter Rodriguez",
      coordinator: "Dr. Susan Johnson",
      date: "2023-11-20"
    },
    {
      number: "20",
      bookNumber: "B020",
      title: "Neural Network Compression Tool",
      names: "Daniel Wilson, Sarah Lee",
      adviser: "Dr. Michael Garcia",
      coordinator: "Dr. Jennifer Davis",
      date: "2023-11-15"
    },
    {
      number: "21",
      bookNumber: "B021",
      title: "Real-Time Data Streaming Platform",
      names: "Mark Anderson, Elizabeth White",
      adviser: "Dr. Daniel Martinez",
      coordinator: "Dr. Jessica Garcia",
      date: "2023-11-10"
    },
    {
      number: "22",
      bookNumber: "B022",
      title: "Multi-Cloud Orchestration Engine",
      names: "Steven Davis, Amanda Johnson",
      adviser: "Dr. Thomas Wilson",
      coordinator: "Dr. Amanda Brown",
      date: "2023-11-05"
    },
    {
      number: "23",
      bookNumber: "B023",
      title: "Personalized Learning Analytics Dashboard",
      names: "Benjamin Martinez, Jennifer Lee",
      adviser: "Dr. Thomas Anderson",
      coordinator: "Dr. Lisa Taylor",
      date: "2023-10-28"
    },
    {
      number: "24",
      bookNumber: "B024",
      title: "Predictive Maintenance System",
      names: "Lucas Garcia, Michelle Davis",
      adviser: "Dr. Andrew Johnson",
      coordinator: "Dr. Rachel Martinez",
      date: "2023-10-20"
    },
    {
      number: "25",
      bookNumber: "B025",
      title: "Smart Grid Energy Optimization",
      names: "Oliver Wilson, Emily Anderson",
      adviser: "Dr. Kevin Brown",
      coordinator: "Dr. Diane Lee",
      date: "2023-10-15"
    },
    {
      number: "26",
      bookNumber: "B026",
      title: "Sentiment Analysis API",
      names: "Alexander Taylor, Victoria Johnson",
      adviser: "Dr. Paul Davis",
      coordinator: "Dr. Patricia Wilson",
      date: "2023-10-10"
    },
    {
      number: "27",
      bookNumber: "B027",
      title: "Recommendation Engine v2",
      names: "Michael Anderson, Sophie Martinez",
      adviser: "Dr. Stephen Garcia",
      coordinator: "Dr. Helen Brown",
      date: "2023-10-05"
    },
    {
      number: "28",
      bookNumber: "B028",
      title: "Cross-Platform Mobile SDK",
      names: "Christopher Davis, Grace Lee",
      adviser: "Dr. Richard Thompson",
      coordinator: "Dr. Margaret Taylor",
      date: "2023-09-28"
    },
    {
      number: "29",
      bookNumber: "B029",
      title: "Voice Recognition System",
      names: "David Johnson, Hannah White",
      adviser: "Dr. George Wilson",
      coordinator: "Dr. Catherine Davis",
      date: "2023-09-20"
    },
    {
      number: "30",
      bookNumber: "B030",
      title: "Traffic Flow Prediction Model",
      names: "James Garcia, Isabella Johnson",
      adviser: "Dr. Charles Martinez",
      coordinator: "Dr. Sophia Garcia",
      date: "2023-09-15"
    },
    {
      number: "31",
      bookNumber: "B031",
      title: "Gesture Recognition Interface",
      names: "Robert Martinez, Olivia Davis",
      adviser: "Dr. Edward Anderson",
      coordinator: "Dr. Victoria Lee",
      date: "2023-09-10"
    },
    {
      number: "32",
      bookNumber: "B032",
      title: "Financial Risk Assessment Tool",
      names: "William Wilson, Ava Martinez",
      adviser: "Dr. Frank Johnson",
      coordinator: "Dr. Julia Wilson",
      date: "2023-09-05"
    },
    {
      number: "33",
      bookNumber: "B033",
      title: "Environmental Monitoring Network",
      names: "Joseph Lee, Emma Garcia",
      adviser: "Dr. Stephen Davis",
      coordinator: "Dr. Priya Brown",
      date: "2023-08-28"
    },
    {
      number: "34",
      bookNumber: "B034",
      title: "Medical Image Analysis AI",
      names: "Charles Anderson, Charlotte Johnson",
      adviser: "Dr. Henry Martinez",
      coordinator: "Dr. Nora Lee",
      date: "2023-08-20"
    },
    {
      number: "35",
      bookNumber: "B035",
      title: "Cyber Threat Intelligence Platform",
      names: "Daniel Brown, Sophie Wilson",
      adviser: "Dr. Peter Johnson",
      coordinator: "Dr. Megan Taylor",
      date: "2023-08-15"
    },
    {
      number: "36",
      bookNumber: "B036",
      title: "Social Network Analysis Tool",
      names: "Matthew Garcia, Emma Lee",
      adviser: "Dr. Michael Rodriguez",
      coordinator: "Dr. Lauren Davis",
      date: "2023-08-10"
    },
    {
      number: "37",
      bookNumber: "B037",
      title: "Anomaly Detection Engine",
      names: "Mark Wilson, Isla Martinez",
      adviser: "Dr. Daniel Anderson",
      coordinator: "Dr. Zara Johnson",
      date: "2023-08-05"
    },
    {
      number: "38",
      bookNumber: "B038",
      title: "Time Series Forecasting Model",
      names: "Steven Davis, Ivy Garcia",
      adviser: "Dr. Thomas Thompson",
      coordinator: "Dr. Yasmine Wilson",
      date: "2023-07-28"
    },
    {
      number: "39",
      bookNumber: "B039",
      title: "Distributed Cache Manager",
      names: "Benjamin Garcia, Hannah Davis",
      adviser: "Dr. Thomas Johnson",
      coordinator: "Dr. Xander Lee",
      date: "2023-07-20"
    },
    {
      number: "40",
      bookNumber: "B040",
      title: "API Gateway System",
      names: "Lucas Wilson, Scarlett Martinez",
      adviser: "Dr. Andrew Garcia",
      coordinator: "Dr. Warren Taylor",
      date: "2023-07-15"
    },
    {
      number: "41",
      bookNumber: "B041",
      title: "Microservices Mesh",
      names: "Oliver Martinez, Grace Lee",
      adviser: "Dr. Kevin Davis",
      coordinator: "Dr. Violet Johnson",
      date: "2023-07-10"
    },
    {
      number: "42",
      bookNumber: "B042",
      title: "WebSocket Communication Protocol",
      names: "Alexander Garcia, Hazel Anderson",
      adviser: "Dr. Paul Wilson",
      coordinator: "Dr. Ulysses Davis",
      date: "2023-07-05"
    },
    {
      number: "43",
      bookNumber: "B043",
      title: "Container Orchestration Platform",
      names: "Michael Wilson, Lily Johnson",
      adviser: "Dr. Stephen Martinez",
      coordinator: "Dr. Thomas Lee",
      date: "2023-06-28"
    },
    {
      number: "44",
      bookNumber: "B044",
      title: "Load Balancing Algorithm",
      names: "Christopher Davis, Rose Garcia",
      adviser: "Dr. Richard Garcia",
      coordinator: "Dr. Silas Brown",
      date: "2023-06-20"
    },
    {
      number: "45",
      bookNumber: "B045",
      title: "Database Query Optimizer",
      names: "David Johnson, Daisy Martinez",
      adviser: "Dr. George Johnson",
      coordinator: "Dr. Samuel Wilson",
      date: "2023-06-15"
    },
    {
      number: "46",
      bookNumber: "B046",
      title: "Security Compliance Framework",
      names: "James Garcia, Lily Davis",
      adviser: "Dr. Charles Brown",
      coordinator: "Dr. Rowan Anderson",
      date: "2023-06-10"
    },
    {
      number: "47",
      bookNumber: "B047",
      title: "Performance Monitoring Tool",
      names: "Robert Martinez, Violet Lee",
      adviser: "Dr. Edward Martinez",
      coordinator: "Dr. Quinn Taylor",
      date: "2023-06-05"
    },
    {
      number: "48",
      bookNumber: "B048",
      title: "Logging and Observability Platform",
      names: "William Wilson, Poppy Johnson",
      adviser: "Dr. Frank Anderson",
      coordinator: "Dr. Parker Davis",
      date: "2023-05-28"
    },
    {
      number: "49",
      bookNumber: "B049",
      title: "Version Control Integration",
      names: "Joseph Lee, Ivy Garcia",
      adviser: "Dr. Stephen Johnson",
      coordinator: "Dr. Oscar Wilson",
      date: "2023-05-20"
    },
    {
      number: "50",
      bookNumber: "B050",
      title: "Continuous Integration/Deployment Pipeline",
      names: "Charles Anderson, Emma Lee",
      adviser: "Dr. Henry Davis",
      coordinator: "Dr. Noah Martinez",
      date: "2023-05-15"
    }
  ];

  const totalPages = Math.ceil(sampleProjects.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentProjects = sampleProjects.slice(startIdx, endIdx);

  return (
    <>
      <main className="catalog-main">
        <div className="catalog-header" ref={catalogHeaderRef}>
          <div className="catalog-search">
            <SearchBar />
          </div>
          <div className="catalog-actions">
            <AddProject />
          </div>
        </div>

        <ProjectTable projects={currentProjects} ref={projectTableRef} />

        <div ref={paginationRef}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sampleProjects.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

      </main>

      <style>{`
        .catalog-main {
          padding: 0 2rem;
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