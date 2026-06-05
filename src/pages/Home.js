import React from 'react';
import './Home.css';

// --- CUSTOMIZE YOUR RESUME DATA HERE ---

const PROFILE = {
  name: "Willy",
  title: "Your Professional Role (e.g., Software Engineer / UI/UX Designer)",
  subtitle: "A short, 2-3 sentence summary of your core expertise, career goals, and what value you bring to projects.",
  github: "https://github.com/your-username",       // Replace with your actual GitHub link
  linkedin: "https://linkedin.com/in/your-profile", // Replace with your actual LinkedIn link
  email: "your.email@example.com"                   // Replace with your actual contact email
};

const SKILLS = [
  { 
    category: "Languages & Frameworks", 
    items: ["React.js", "JavaScript", "HTML5", "CSS3", "Node.js"] // Add your technical languages
  },
  { 
    category: "Libraries & Architecture", 
    items: ["React Router", "REST APIs", "Data Pipelines", "Responsive Design"] 
  },
  { 
    category: "Tools & Platforms", 
    items: ["Git", "GitHub", "VS Code", "Google Cloud/Drive Integration"] 
  }
];

const TIMELINE = [
  {
    period: "2024 - Present",
    role: "Your Current Role or Target Title",
    company: "Company Name or 'Freelance / Self-Directed'",
    description: "Describe your recent achievements here. (Example: Built a dynamic portfolio application featuring real-time Google Sheets database streaming and responsive design elements)."
  },
  {
    period: "2022 - 2024",
    role: "Previous Job Title",
    company: "Previous Company Name",
    description: "Detail your responsibilities, the technologies you utilized, and quantifiable results or impacts you achieved during this time."
  },
  {
    period: "Graduation Year",
    role: "Degree Earned (e.g., B.S. in Computer Science)",
    company: "University / School Name",
    description: "Mention relevant coursework, academic honors, capstone projects, or major foundational technical skill sets developed."
  }
];

function Home() {
  return (
    <div className="home-container">
      
      {/* Hero Header Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Available for Opportunities</span>
          <h1>Hi, I'm <span className="highlight">{PROFILE.name}</span></h1>
          <h2>{PROFILE.title}</h2>
          <p>{PROFILE.subtitle}</p>
          <div className="hero-cta-group">
            <a href={`mailto:${PROFILE.email}`} className="cta-primary">Contact Me</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="cta-secondary">GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="cta-secondary">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Technical Skill Matrix */}
      <section className="skills-section">
        <h3 className="section-title">Core Competencies</h3>
        <div className="skills-grid">
          {SKILLS.map((stack, idx) => (
            <div key={idx} className="skills-card">
              <h4>{stack.category}</h4>
              <div className="skills-badges">
                {stack.items.map((skill, i) => (
                  <span key={i} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Resume Timeline */}
      <section className="timeline-section">
        <h3 className="section-title">Professional Experience</h3>
        <div className="timeline-container">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-meta">
                <span className="timeline-period">{item.period}</span>
                <span className="timeline-company">{item.company}</span>
              </div>
              <div className="timeline-body">
                <h4>{item.role}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;