import React, { useEffect, useRef, useState } from "react";
import "./AboutSection.css";

const AboutSection = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentContainer) observer.observe(currentContainer);

    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  }, []);

  return (
    <section id="skills">
      <section id="about">
        <section
          ref={containerRef}
          className={`about-section ${isVisible ? "fade-in" : "hidden"}`}
        >
          <div className="about-container">
            <h2>About Me</h2>
            <p>
              I'm a passionate Software Engineer from Kerala, India, with
              expertise in building modern software that makes a difference. I
              enjoy crafting elegant code, designing scalable systems, and
              exploring new technologies to solve real-world problems.
            </p>

            <ul className="about-features">
              <li>Building innovative web and mobile applications.</li>
              <li>Always exploring new technologies and frameworks.</li>
              <li>Writing maintainable and readable code.</li>
              <li>Solving real-world problems through software solutions.</li>
            </ul>

            {/* Resume Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a
                href="https://drive.google.com/file/d/1z5zhtpATjAfdthcRVYm117r0fz5-IpTY/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  width: "100%",
                  maxWidth: "200px",
                  padding: "12px 0px",
                  backgroundColor: "#ff5d00",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(255, 93, 0, 0.4)",
                  textAlign: "center",
                }}
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="skills-container">
            <h2>Skills</h2>

            {/* Frontend Skills */}
            <div className="skills-group">
              <h4>Frontend</h4>
              <div className="skills-tags animated-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>React</span>{" "}
              </div>
            </div>

            {/* Backend Skills */}
            <div className="skills-group">
              <h4>Backend</h4>
              <div className="skills-tags animated-tags">
                <span>Django</span>
                <span>Flask</span>
                {/* <span>.NET</span> */}
              </div>
            </div>

            {/* Programming Languages */}
            <div className="skills-group">
              <h4>Programming Languages</h4>
              <div className="skills-tags animated-tags">
                <span>Python</span>
                <span>C</span>
                <span>C#</span>
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="skills-group">
              <h4>Cloud & DevOps</h4>
              <div className="skills-tags animated-tags">
                {/* <span>AWS</span> */}
                <span>GCP</span>
                <span>Firebase</span>
                <span>Docker</span>
                <span>Git</span>
              </div>
            </div>

            {/* Database Skills */}
            <div className="skills-group">
              <h4>Database</h4>
              <div className="skills-tags animated-tags">
                <span>MySQL</span>
                <span>PostgreSQL</span>
                <span>MongoDB</span>
                <span>Redis</span>
              </div>
            </div>

            {/* Machine Learning / Data Science */}
            <div className="skills-group">
              <h4>Machine Learning / AI</h4>
              <div className="skills-tags animated-tags">
                <span>PyTorch</span>
                <span>Scikit-learn</span>
                <span>Numpy</span>
                <span>Pandas</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default AboutSection;
