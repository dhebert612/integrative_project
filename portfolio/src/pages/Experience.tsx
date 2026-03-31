type SkillGroup = {
  title: string;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Summary",
    items: [
      "Graduating Computer Science Technology student at Dawson College (Montréal, expected May 2026).",
      "Built full-stack web apps, realtime systems (WebSockets/MQTT), and C# simulations.",
    ],
  },
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C#", "Java", "SQL", "Bash"],
  },
  {
    title: "Frontend",
    items: ["React", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: ["Flask", "Express", "REST APIs", "WebSockets", "JWT Auth"],
  },
  {
    title: "Databases & Caching",
    items: ["PostgreSQL", "MongoDB",],
  },
  {
    title: "Realtime / Messaging",
    items: ["MQTT", "Pub/Sub", "Event-driven systems"],
  },
  {
    title: "DevOps & Tooling",
    items: ["Docker", "Git", "GitLab CI/CD", "Linux"],
  },
  {
    title: "Testing & Quality",
    items: ["Pytest", "unit test", "ESLint"],
  },
  {
    title: "Concepts",
    items: [
      "OOP",
      "Design Patterns",
      "Networking Fundamentals",
      "Auth (JWT)",
      "Performance Profiling",
    ],
  },
];

export function Experience() {
  return (
    <div className="page-container">
      <h1>Experience</h1>
      <p>
        Graduating Computer Science Technology student at Dawson College (Montréal,
        expected May 2026). Focused on full-stack development, backend systems, and
        realtime apps.
      </p>

      {skillGroups
        .filter((g) => g.title !== "Summary")
        .map((group) => (
          <section key={group.title} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 8, fontWeight: 600 }}>{group.title}:</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {group.items.map((item) => (
                <span key={item} className="tech-tag">
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
