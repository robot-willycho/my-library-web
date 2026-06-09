import React from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: "r-analytics-01",
    type: "Data & Analysis",
    title: "Housing Market Predictive Modeling",
    description: "A comprehensive statistical analysis executed in RStudio. Utilized multivariate regression models to forecast urban housing price trends, complete with data cleaning pipelines and ggplot2 visualizations.",
    links: { 
      pdf: "/docs/xxx.pdf", // Place this file inside your public/docs/ folder
      code: "https://github.com/robot-willycho/xxx" 
    },
    techStack: ["RStudio", "R Markdown", "ggplot2", "dplyr", "Predictive Modeling"]
  },
  {
    id: "excel-automation-02",
    type: "Data & Analysis",
    title: "Financial Dashboard & Portfolio Tracking Pipeline",
    description: "Advanced macro-enabled Excel sheet designed to track investment allocations. Features automated pivot tables, dynamic charts, and automated cleaning structures for raw CSV data extracts.",
    links: { 
      pdf: "/docs/financial_dashboard_spec.pdf",
      code: "https://github.com/yourusername/excel-finance-pipeline"
    },
    techStack: ["Excel", "VBA Macros", "Data Warehousing", "Financial Analytics"]
  },
  {
    id: "library-manager-ai-03",
    type: "AI Application",
    title: "Personal Library Manager Data Pipeline",
    description: "An operational data integration engine engineered in Google AI Studio. It automates library cataloging by parsing raw book parameters, auto-mapping Dewey Decimal classifications, and streaming records in real-time to a connected Google Spreadsheet and Google Drive storage ecosystem.",
    links: { 
      liveApp: "/library", // Routes directly to your own live website Library tab!
      code: "https://github.com/robot-willycho/my-library-web" 
    },
    techStack: ["Google AI Studio", "Google Sheets API", "React.js", "Data Pipelines"]
  },
  {
    id: "playbox-hub-ai-04",
    type: "AI Application",
    title: "Playbox Hub: AI Mini-Game Suite",
    description: "An interactive gaming dashboard featuring classic modules like Tic-Tac-Toe (engineered with a minimax state algorithm) and Retro Snake. Developed as an AI prototyping sandbox to evaluate real-time component rendering and state updates via prompt-driven UI structures.",
    links: { 
      liveApp: "#", // We can add a custom modal or markdown code block popup later
      code: "https://github.com/robot-willycho/my-library-web" 
    },
    techStack: ["Google AI Studio", "React Hooks", "Web Audio API", "State Architecture"]
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
              <span className={`project-type-badge ${
                    project.type === 'AI Application' ? 'badge-ai' : 
                    project.type === 'Data & Analysis' ? 'badge-data' : 'badge-web'
                    }`}>
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