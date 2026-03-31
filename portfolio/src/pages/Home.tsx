import "../style/home.css";

export function Home() {

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="intro-block">
          <h1 className="home-title">
            <span className="name-line name-line-1">David Alexandre</span>
            <span className="name-line name-line-2">Hebert Aguilar</span>
          </h1>

          <p className="home-subtitle">
            Computer Science student focused on full stack web development and performance, ensuring clean and responsive websites.
          </p>

          <div className="home-links">
            <a href="https://gitlab.com/dhebert01" target="_blank" rel="noreferrer">
              Gitlab
            </a>
            <a href="https://www.linkedin.com/in/david-hebert-377590383/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:davidalexandre612@gmail.com">Email</a>
          </div>
          <div>
            <a href="../static/DavidCv.docx" download className="download-resume-button">
              Download Resume
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
