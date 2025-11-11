import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./projects-highlights.css";
import projectsData from "../../assets/projects-data/highlighted-projects/projectsData.json";

const ProjectsHighlights = () => {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const itemRefs = useRef([]);
  const projectRefs = useRef([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      mirror: true,
      once: false,
    });

    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Optional: Intersection Observer (auto close on scroll out)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (window.innerWidth > 1000 && !entry.isIntersecting) {
            setActiveIndexes((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const toggleProject = (index) => {
    const isOpen = activeIndexes.includes(index);

    if (isOpen) {
      // Close
      setActiveIndexes([]);
    } else {
      // Open only this project
      setActiveIndexes([index]);
    }

    // Refresh AOS for animation
    setTimeout(() => AOS.refresh(), 300);
  };

  return (
    <section className="steps _padd_top-bott80" id="ProjectsHighlights">
      <div className="wrapp-content">
        <div className="content">
          {/* Section Title */}
          <div className="about__title">
            <h2 className="about__title-h2 heading-hover">
              <span
                className="projects-text"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-once="false"
              >
                Projects
              </span>
              <span
                className="highlights-text"
                data-aos="fade-left"
                data-aos-delay="300"
                data-aos-once="false"
              >
                Highlights
              </span>
            </h2>
          </div>

          {/* Projects List */}
          <div className="steps__wrapp">
            {projectsData.map((project, index) => {
              const isOpen = activeIndexes.includes(index);

              return (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className={`steps__item ${isOpen ? "active" : ""}`}
                >
                  {/* Project Header — Click anywhere to toggle */}
                  <div
                    className="steps__head"
                    onClick={() => toggleProject(index)}
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-once="false"
                  >
                    {/* Left-aligned number */}
                    <span className="steps__num">
                      /{String(index + 1).padStart(3, "0")}
                    </span>

                    {/* Right side: title + toggle button */}
                    <div className="steps__head-right">
                      <h3 className="steps__title_project">{project.title}</h3>
                      <button
                        className="toggle-btn"
                        aria-label={
                          isOpen ? "Collapse project" : "Expand project"
                        }
                      >
                        {isOpen ? "−" : "+"}
                      </button>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div
                    className={`steps__descript ${isOpen ? "open" : ""}`}
                    ref={(el) => (projectRefs.current[index] = el)}
                    style={{
                      maxHeight: isOpen
                        ? `${projectRefs.current[index]?.scrollHeight}px`
                        : "0px",
                    }}
                  >
                    <div className="steps__descript-wrapp">
                      {/* Text Content */}
                      <div className="steps__descript-txt">
                        <div className="steps__desc-card">
                          <p className="steps__description-text">
                            {project.description}
                          </p>

                          <div className="steps__meta">
                            {project.date && (
                              <span className="steps__date">
                                {project.date}
                              </span>
                            )}
                            {project.tags?.map((tag, i) => (
                              <span key={i} className="steps__tag-pill">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="steps__tech-box">
                            {project.tech?.map((tech, i) => (
                              <span key={i} className="steps__tech-pill">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="steps__links-box">
                            {project.github_link && (
                              <a
                                href={project.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-link"
                              >
                                GitHub
                              </a>
                            )}
                            {project.livedemo_link && (
                              <a
                                href={project.livedemo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-link live"
                              >
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="divider-line"></div>

                      {/* Image */}
                      <div className="steps__descript-img">
                        <div className="image-box">
                          {project.img_url1 && (
                            <img src={project.img_url1} alt={project.title} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsHighlights;
