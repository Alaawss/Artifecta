import { projects } from "../../constants/site";

export default function WorkSection() {
  return (
    <section id="work" className="w-full px-8 py-20" style={{ background: "#a9c2d8" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          className="font-unbounded font-bold mb-10 text-center"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#142638" }}
        >
          Our Work
        </h2>

        <div className="work-grid">
          {projects.slice(0, 2).map((project) => (
            <article
              key={project.title}
              className="project-card relative overflow-hidden"
              style={{
                background: project.gradient,
                borderRadius: "20px",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "32px",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"
                style={{ zIndex: 1 }}
              />
              <div style={{ zIndex: 2, position: "relative" }}>
                <h3
                  className="font-unbounded font-bold text-white mb-3"
                  style={{ fontSize: "1.8rem" }}
                >
                  {project.title}
                </h3>
                <div className="flex gap-4 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs font-medium"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          <article
            className="project-card relative overflow-hidden work-grid-featured"
            style={{
              background: projects[2].gradient,
              borderRadius: "20px",
              minHeight: "480px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "40px",
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"
              style={{ zIndex: 1 }}
            />
            <div style={{ zIndex: 2, position: "relative" }}>
              <h3
                className="font-unbounded font-bold text-white mb-4"
                style={{ fontSize: "2rem" }}
              >
                {projects[2].title}
              </h3>
              <div className="flex gap-4 flex-wrap">
                {projects[2].tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
