
import { Home } from "../pages/Home";
import { Project } from "../pages/Project";
import { Experience } from "../pages/Experience";
import { Contact } from "../pages/Contact";
import { Navbar } from "../components/Navbar";
import "../style/App.css";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <section id="home">
        <div style={{ height: "36vh" }} />
          <Home />
        </section>
        <div style={{ height: "36vh" }} />
        <section id="projects">
        <div style={{ height: "12vh" }} />
          <Project />
        </section>
        <div style={{ height: "36vh" }} />
        <section id="experience">
        <div style={{ height: "12vh" }} />
          <Experience />
        </section>
        <div style={{ height: "36vh" }} />
        <section id="contact">
          <Contact />
        </section>
        <div style={{ height: "40vh" }} />
      </div>
    </div>
  );
}
