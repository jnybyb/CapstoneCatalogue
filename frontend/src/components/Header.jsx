import logo from "../assets/gradcap.png";

function Header() {
  return (
    <>
      <header className="app-header">
        <div className="header-content">

          <div className="brand">
            <img
              src={logo}
              alt="Capstone Catalogue Logo"
              className="brand-logo"
            />

            <div className="brand-text">
              <h1>Capstone Catalogue</h1>
              <p className="subtitle">
                Browse, Organize, and Manage Academic Capstone Project Records
              </p>
            </div>

          </div>

        </div>
      </header>

      <style>{`
        .app-header {
          background: #fcfcfd;
          color: #1B212D;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
        }

        .header-content {
          width: 100%;
          margin: 0;
          padding: 0.8rem 2rem 0.35rem 2rem;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          justify-content: space-between;
        }

        @media (max-width: 600px) {
          .header-content {
            padding: 0.25rem 0.8rem;
            justify-content: flex-start;
          }
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .brand-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border-radius: 6px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .brand-text h1 {
          margin: 0;
          font-family: 'DM Serif Display', serif;
          font-size: 1.8rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .subtitle {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          color: #6A7181;
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          width: 100%;
        }

        @media (max-width: 600px) {
          .brand {
            gap: 0.35rem;
          }

          .brand-logo {
            width: 50px;
            height: 50px;
          }

          .brand-text h1 {
            font-size: 1.6rem;
            margin-bottom: 0.1rem;
          }

          .subtitle {
            font-size: 0.5rem;
            max-width: 240px;
            margin: 0;
            line-height: 1.1;
          }
        }

      `}</style>
    </>
  );
}

export default Header;