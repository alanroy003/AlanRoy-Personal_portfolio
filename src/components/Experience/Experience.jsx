import React from "react";
import "./Experience.css";

const experiences = [
  {
    year: "Jan 2025 – June 2025",
    title: "Intern – Software Engineer | Triaxia Infotech Pvt Ltd",
    description:
      "Developed backend APIs using Django and optimized relational databases. Built Angular-based admin dashboards for internal use. Participated in the full Agile SDLC process, including requirements gathering, coding, testing, and deployment. Supported Azure Data Factory pipeline integration for seamless data flow across systems.",
    skills: [
      "Django",
      "React",
      "Azure Data Factory",
      "REST APIs",
      "Agile",
      "PostgreSQL",
      "UI/UX",
    ],
  },
  {
    year: "Jan 2023 – April 2023",
    title: "Intern – Python Developer | ReverTech IT Solution",
    description:
      "Developed APIs in Flask for data services and integrated them with a React front-end to enhance dashboard interactivity. Improved backend-to-frontend communication, performed unit testing, and optimized performance for better user experience.",
    skills: ["Python", "Flask", "React", "APIs", "Unit Testing"],
  },
];

const ExperienceTimeline = () => {
  return (
    <section className="timeline-section" id="experience">
      <h2 className="timeline-heading">Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-content">
              <span className="timeline-year">{exp.year}</span>
              <h3 className="timeline-title">{exp.title}</h3>
              <p className="timeline-description">{exp.description}</p>
              <div className="timeline-skills">
                {exp.skills.map((skill, i) => (
                  <span key={i} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
