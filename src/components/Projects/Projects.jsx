import React, { useEffect, useState } from "react";
import "./Projects.css";
import projectsData from "../../assets/projects-data/Projects/projectsData.json";

const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAll, setShowAll] = useState(false); // tracks if projects are expanded
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1000);

  // ✅ Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Animate project cards when visible
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visibleCount, showAll, isLargeScreen]);

  // ✅ Handle "View More"
  const handleViewMore = () => {
    if (!isLargeScreen) {
      setShowAll(true);
      setVisibleCount(projectsData.length);
    } else {
      setVisibleCount((prev) => Math.min(prev + 4, projectsData.length));
    }
  };

  // ✅ Handle "Show Less"
  const handleShowLess = () => {
    if (!isLargeScreen) {
      setShowAll(false);
      setVisibleCount(4);
    } else {
      setVisibleCount(4);
    }
  };

  return (
    <section className="projects-section" id="projects">
      {/* Heading */}
      {(isLargeScreen || showAll) && (
        <h2 className="projects-title animate-title">
          <span className="title-brackets">{"<"}</span>
          <span className="title-more">More </span>
          <span className="title-projects">Projects</span>
          <span className="title-brackets">{">"}</span>
        </h2>
      )}

      {/* Projects Grid */}
      {(isLargeScreen || showAll) && (
        <div className="projects-container">
          {projectsData.slice(0, visibleCount).map((project, index) => (
            <div
              className={`project-card ${!project.img ? "no-image" : ""}`}
              key={index}
            >
              {/* ✅ Image or Placeholder */}
              {project.img ? (
                <div className="project-image">
                  <img
                    src={project.img_url}
                    alt={`${project.title} preview`}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="project-placeholder">
                  <span>{project.title}</span>
                </div>
              )}

              {/* Title & Description */}
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              {/* Tech Stack */}
              <div className="tech-stack">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="project-links">
                {/* GitHub Button */}
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn github-btn"
                  >
                    GitHub
                  </a>
                )}

                {/* Live Demo Button — only if Live is true */}
                {project.Live && project.livedemo_link && (
                  <a
                    href={
                      project.livedemo_link.startsWith("http")
                        ? project.livedemo_link
                        : `https://${project.livedemo_link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn live-btn"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons for View More / Show Less */}
      <div className="projects-buttons">
        {(!isLargeScreen && !showAll) || visibleCount < projectsData.length ? (
          <button className="btn view-more-btn" onClick={handleViewMore}>
            View More Projects
          </button>
        ) : (
          projectsData.length > 4 && (
            <button className="btn show-less-btn" onClick={handleShowLess}>
              Show Less
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default Projects;
