import React from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: "r-analysis-01",
    type: "Data & Analysis",
    title: "Predictive Analytics & RStudio Engine",
    description: "Statistical modeling and output data frames executed via RStudio.",
    links: { pdf: "/docs/report.pdf", code: "https://github.com" },
    techStack: ["RStudio", "R Markdown", "ggplot2"]
  },
  {
    id: "ai-app-02",
    type: "AI Application",
    title: "Intelligent Assistant Prototype",
    description: "Designed system prompts and logic frameworks inside Google AI Studio, productionized using the Gemini API.",
    links: { liveApp: "/ai-agent", promptSpecs: "https://github.com" },
    techStack: ["Google AI Studio", "React", "Gemini API"]
  }
];

export default function Projects() {
  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>Project Portfolio</h1>
        <p className="projects-subtitle">A showcase of advanced data analysis, RStudio outputs, and engineered AI Studio prototypes.</p>
      </header>

      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <div key={project.id} className="project-card">
            <div className="card-badge-row">
              <span className={`project-type-badge ${project.type === 'AI Application' ? 'badge-ai' : 'badge-data'}`}>
                {project.type}
              </span>
              <span className="project-id">{project.id}</span>
            </div>
            
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            
            <div className="tech-stack-tags">
              {project.techStack?.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div className="project-action-links">
              {project.links.pdf && (
                <a href={project.links.pdf} target="_blank" rel="noopener noreferrer" className="action-btn btn-secondary">
                  View PDF Report
                </a>
              )}
              {project.links.code && (
                <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="action-btn btn-primary">
                  Source Code
                </a>
              )}
              {project.links.liveApp && (
                <a href={project.links.liveApp} className="action-btn btn-accent">
                  Launch App
                </a>
              )}
              {project.links.promptSpecs && !project.links.code && (
                <a href={project.links.promptSpecs} target="_blank" rel="noopener noreferrer" className="action-btn btn-primary">
                  Prompt Specs
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}