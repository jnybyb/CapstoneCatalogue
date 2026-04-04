import Header from '../components/Header';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import AddProject from '../components/AddProjectButton';
import ProjectTable from '../components/ProjectTable';
import { useState, useLayoutEffect, useRef, useCallback } from 'react';

function getViewportHeight() {
  if (typeof window === 'undefined') return 800;
  return window.visualViewport?.height ?? window.innerHeight;
}

/** Fallback row height when no data rows are rendered yet (multi-line author cells). */
const FALLBACK_ROW_HEIGHT_PX = 78;

function parsePx(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function Catalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const lastItemsPerPageRef = useRef(null);
  const catalogMainRef = useRef(null);
  const catalogHeaderRef = useRef(null);
  const paginationHostRef = useRef(null);

  const recalcItemsPerPage = useCallback(() => {
    const vh = getViewportHeight();

    const appHeader = document.querySelector('.app-header');
    const headerH = appHeader?.offsetHeight ?? 0;

    const mainEl = catalogMainRef.current?.closest('main');
    let mainPadY = 0;
    if (mainEl) {
      const st = getComputedStyle(mainEl);
      mainPadY = parsePx(st.paddingTop) + parsePx(st.paddingBottom);
    }

    const catMain = catalogMainRef.current;
    let catPadY = 0;
    if (catMain) {
      const st = getComputedStyle(catMain);
      catPadY = parsePx(st.paddingTop) + parsePx(st.paddingBottom);
    }

    const toolbar = catalogHeaderRef.current;
    const toolbarH = toolbar?.offsetHeight ?? 0;
    const toolbarMb = toolbar ? parsePx(getComputedStyle(toolbar).marginBottom) : 0;

    const pagEl = document.querySelector('.catalog-pagination-host .pagination');
    let paginationBlockH = 0;
    if (pagEl) {
      const st = getComputedStyle(pagEl);
      const rect = pagEl.getBoundingClientRect();
      paginationBlockH =
        rect.height + parsePx(st.marginTop) + parsePx(st.marginBottom);
    } else {
      paginationBlockH = 72;
    }

    const theadEl = document.querySelector('.project-table thead');
    const theadH = theadEl?.offsetHeight ?? 46;

    const rowEl = document.querySelector('.project-table tbody tr.clickable-row');
    const rowH = Math.max(
      36,
      Math.ceil(rowEl?.getBoundingClientRect().height ?? FALLBACK_ROW_HEIGHT_PX)
    );

    const fudge = 6;
    const used =
      headerH +
      mainPadY +
      catPadY +
      toolbarH +
      toolbarMb +
      theadH +
      paginationBlockH +
      fudge;

    let available = vh - used;
    if (available < rowH) available = rowH;

    let rows = Math.max(1, Math.floor(available / rowH));

    if (lastItemsPerPageRef.current !== null && lastItemsPerPageRef.current !== rows) {
      setCurrentPage(1);
    }
    lastItemsPerPageRef.current = rows;

    setItemsPerPage((prev) => (prev === rows ? prev : rows));
  }, []);

  useLayoutEffect(() => {
    const run = () => {
      recalcItemsPerPage();
      requestAnimationFrame(() => recalcItemsPerPage());
    };

    run();
    const timer = setTimeout(run, 50);

    window.addEventListener('resize', run);
    window.addEventListener('orientationchange', run);
    window.visualViewport?.addEventListener('resize', run);

    const roTargets = [catalogHeaderRef.current, paginationHostRef.current, catalogMainRef.current].filter(
      Boolean
    );
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(run) : null;
    roTargets.forEach((el) => ro?.observe(el));
    const appHeader = document.querySelector('.app-header');
    if (appHeader) ro?.observe(appHeader);
    const pagInner = document.querySelector('.catalog-pagination-host .pagination');
    if (pagInner) ro?.observe(pagInner);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', run);
      window.removeEventListener('orientationchange', run);
      window.visualViewport?.removeEventListener('resize', run);
      ro?.disconnect();
    };
  }, [recalcItemsPerPage, itemsPerPage]);
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
      names: "Jennifer Taylor, Daniel Moore",
      adviser: "Dr. Steven White",
      coordinator: "Dr. Rachel Green",
      date: "2024-02-10"
    },
    {
      number: "9",
      bookNumber: "B009",
      title: "Machine Learning Recommendation Engine",
      names: "Christopher Allen, Victoria Martinez",
      adviser: "Dr. Mark Lewis",
      coordinator: "Dr. Jennifer Clark",
      date: "2024-01-30"
    },
    {
      number: "10",
      bookNumber: "B010",
      title: "Smart Traffic Management System",
      names: "Matthew Walker, Nicole Rodriguez",
      adviser: "Dr. George Hall",
      coordinator: "Dr. Patricia Lewis",
      date: "2024-01-25"
    },
    {
      number: "11",
      bookNumber: "B011",
      title: "Real-Time Language Translation Tool",
      names: "Anthony Young, Karen King",
      adviser: "Dr. Edward Wright",
      coordinator: "Dr. Betty Scott",
      date: "2024-01-20"
    },
    {
      number: "12",
      bookNumber: "B012",
      title: "Automated Document Processing System",
      names: "Steven Garcia, Nancy Hill",
      adviser: "Dr. Charles Green",
      coordinator: "Dr. Sandra Adams",
      date: "2024-01-15"
    },
    {
      number: "13",
      bookNumber: "B013",
      title: "Predictive Maintenance IoT Platform",
      names: "Brian Nelson, Donna Baker",
      adviser: "Dr. Daniel Carter",
      coordinator: "Dr. Deborah Miller",
      date: "2024-01-10"
    },
    {
      number: "14",
      bookNumber: "B014",
      title: "Augmented Reality Shopping Application",
      names: "Ronald Jones, Carol Davis",
      adviser: "Dr. Kenneth Phillips",
      coordinator: "Dr. Barbara Campbell",
      date: "2024-01-05"
    },
    {
      number: "15",
      bookNumber: "B015",
      title: "Advanced Computer Vision System",
      names: "George Taylor, Dorothy Evans",
      adviser: "Dr. Ronald Jackson",
      coordinator: "Dr. Susan Rogers",
      date: "2023-12-30"
    },
    {
      number: "16",
      bookNumber: "B016",
      title: "Quantum Computing Simulator",
      names: "Paul Anderson, Judith Roberts",
      adviser: "Dr. Joseph Harris",
      coordinator: "Dr. Brenda Murphy",
      date: "2023-12-25"
    },
    {
      number: "17",
      bookNumber: "B017",
      title: "Neural Network Optimization Framework",
      names: "Mark Thompson, Mary Peterson",
      adviser: "Dr. Thomas Anderson",
      coordinator: "Dr. Helen Mitchell",
      date: "2023-12-20"
    },
  ];

  const totalPages = Math.ceil(sampleProjects.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentProjects = sampleProjects.slice(startIdx, endIdx);

  return (
    <>
      <div className="catalog-main" ref={catalogMainRef}>
        <div className="catalog-header" ref={catalogHeaderRef}>
          <div className="catalog-search">
            <SearchBar />
          </div>
          <div className="catalog-actions">
            <AddProject />
          </div>
        </div>

        <div className="catalog-table-slot">
          <ProjectTable projects={currentProjects} />
        </div>

        <div className="catalog-pagination-host" ref={paginationHostRef}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sampleProjects.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

      </div>

      <style>{`
        .catalog-main {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0 2rem;
        }

        .catalog-table-slot {
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        .catalog-pagination-host {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
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