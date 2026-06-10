import React, { useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: "r-analytics-01",
    type: "Data & Analysis",
    title: "Housing Market Predictive Modeling",
    description: "A comprehensive statistical analysis executed in RStudio. Utilized multivariate regression models to forecast urban housing price trends, complete with data cleaning pipelines and ggplot2 visualizations.",
    links: { 
      pdf: "/docs/xxx.pdf", 
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
      liveApp: "/library", 
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
      isModalTrigger: true, // Tagged to intercept default anchor link behavior
      code: "https://github.com/robot-willycho/my-library-web" 
    },
    techStack: ["Google AI Studio", "React Hooks", "Web Audio API", "State Architecture"]
  }
];

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>Project Portfolio</h1>
        <p className="projects-subtitle">A showcase of data analysis models and modular AI implementations.</p>
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
              {project.techStack.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div className="project-action-links">
              {project.links.pdf && (
                <a href={project.links.pdf} className="action-btn btn-secondary">
                  View PDF
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
              {project.links.isModalTrigger && (
                <button onClick={() => setIsModalOpen(true)} className="action-btn btn-accent modal-trigger-btn">
                  Launch Blueprint
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- PLAYBOX MODAL OVERLAY --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            
            <div className="modal-inner-layout">
              <div className="modal-graphic-pane">
                <div className="mock-game-screen">
                  <h3>🎮 PLAYBOX HUB ENGINE</h3>
                  <p>System Workspace Prototype Active</p>
                  <div className="mock-grid-visual">
                    <span>[X]</span><span>[O]</span><span>[X]</span>
                    <span>[ ]</span><span>[X]</span><span>[ ]</span>
                    <span>[O]</span><span>[ ]</span><span>[O]</span>
                  </div>
                </div>
              </div>

              <div className="modal-text-pane">
                <span className="modal-badge">AI Blueprint Showcase</span>
                <h2>Playbox Hub Architecture</h2>
                <p className="modal-meta-desc">
                  Since raw Google AI Studio links require external Cloud login credentials, this engine view details the underlying prompt parameters driving the interactive code generation.
                </p>

                <div className="blueprint-section">
                  <h4>🧠 System Instructions (Prompt Logic)</h4>
                  <pre className="code-block-snippet">
{`You are a senior React developer specializing in retro games.
Your task is to generate complete, functional game scripts.
- Enforce rigid minimax validation arrays for Tic-Tac-Toe.
- Inject seamless requestAnimationFrame loops for Snake snake ticks.
- Outputs must avoid external assets and render entirely on canvas/CSS.`}
                  </pre>
                </div>

                <div className="blueprint-section">
                  <h4>⚙️ Model Profile Configuration</h4>
                  <table className="specs-table">
                    <tbody>
                      <tr><td><strong>Prototype Core:</strong></td><td>Gemini 2.5 Flash (AI Studio Sandbox)</td></tr>
                      <tr><td><strong>Temperature:</strong></td><td>0.2 (Optimized for rigid script syntax)</td></tr>
                      <tr><td><strong>State Management:</strong></td><td>React Hooks (useState, useEffect)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}