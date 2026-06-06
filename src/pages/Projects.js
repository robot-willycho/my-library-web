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
    id: "ai-prototype-02",
    type: "AI Application",
    title: "Intelligent Customer Support Routing Agent",
    description: "An AI agent prototype designed in Google AI Studio to classify user intent and generate context-aware replies. Includes full prompt engineering specifications, temperature calibrations, and multi-turn system instructions.",
    links: { 
      liveApp: "#", // Can link to a live wrapper later if you connect the Gemini API SDK
      promptSpecs: "https://github.com/yourusername/ai-routing-agent" // Link to a markdown file showing your prompt logic
    },
    techStack: ["Google AI Studio", "Prompt Engineering", "Gemini Pro", "System Instructions"]
  },
  {
    id: "excel-automation-03",
    type: "Data & Analysis",
    title: "Financial Dashboard & Portfolio Tracking Pipeline",
    description: "Advanced macro-enabled Excel sheet designed to track investment allocations. Features automated pivot tables, dynamic charts, and automated cleaning structures for raw CSV data extracts.",
    links: { 
      pdf: "/docs/financial_dashboard_spec.pdf",
      code: "https://github.com/yourusername/excel-finance-pipeline"
    },
    techStack: ["Excel", "VBA Macros", "Data Warehousing", "Financial Analytics"]
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