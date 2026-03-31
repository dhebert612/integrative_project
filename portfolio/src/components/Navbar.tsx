
import "../style/navbar.css";


function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <button className="nav-link" aria-label="Home" onClick={() => scrollToSection("home")}> 
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" />
        </svg>
        <span className="nav-label">Home</span>
      </button>

      <button className="nav-link" aria-label="Projects" onClick={() => scrollToSection("projects")}> 
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 7a1 1 0 0 1 1-1h4l2 2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" />
        </svg>
        <span className="nav-label">Projects</span>
      </button>

      <button className="nav-link" aria-label="Experience" onClick={() => scrollToSection("experience")}> 
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="13" rx="2" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
        </svg>
        <span className="nav-label">Experience</span>
      </button>

      <button className="nav-link" aria-label="Contact" onClick={() => scrollToSection("contact")}> 
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 7.5l9 6 9-6" />
          <path d="M21 18H3v-8" />
        </svg>
        <span className="nav-label">Contact</span>
      </button>
    </nav>
  );
}
