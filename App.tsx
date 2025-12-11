import React, { useState, useEffect } from 'react';
import { Mail, Globe } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { VscGithubInverted } from "react-icons/vsc";
import { DATA } from './data';
import { IconWrapper } from './components/IconWrapper';
import { SectionTitle } from './components/SectionTitle';
import { EntryItem } from './components/EntryItem';
import { ProjectItem } from './components/ProjectItem';
import { SocialLink } from './components/SocialLink';
import { AnimatedThemeToggler } from './components/AnimatedThemeToggler';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Hysteresis: shrink when > 50, expand when < 30.
      // Gap prevents flicker at the boundary.
      if (scrollY > 50) {
        setIsScrolled(true);
      } else if (scrollY < 30) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">

      {/* HEADER */}
      <header className={`header sticky-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-content">
          <h1>{DATA.personal.name}</h1>
          <p className="text-sm text-secondary mb-4">
            {DATA.personal.title}
          </p>
          <div className="header-meta text-xs text-muted">
            <IconWrapper icon={Globe} />
            {DATA.personal.location}
          </div>
        </div>

        <div className="header-image">
          {!isImageLoaded && <div className="skeleton profile-img"></div>}
          <img
            src={DATA.personal.image}
            alt={DATA.personal.name}
            className={`profile-img ${!isImageLoaded ? 'hidden' : ''}`}
            onLoad={() => setIsImageLoaded(true)}
            style={!isImageLoaded ? { display: 'none' } : {}}
          />
        </div>
      </header>

      {/* BIO */}
      <section className="section">
        <p className="text-sm leading-relaxed text-secondary" style={{ maxWidth: '400px' }}>
          {DATA.personal.bio}
        </p>
      </section>

      {/* SKILLS (Badges Style) */}
      <section className="section">
        <div className="skills-list">
          {DATA.skills.map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section">
        <SectionTitle>Experience</SectionTitle>
        <div className="section-content">
          {DATA.experience.map((job, index) => (
            <EntryItem
              key={index}
              title={job.company}
              subtitle={job.role}
              meta={job.period}
              description={job.description}
            />
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section">
        <SectionTitle>Education</SectionTitle>
        <div className="section-content">
          {DATA.education.map((edu, index) => (
            <EntryItem
              key={index}
              title={edu.institution}
              subtitle={edu.degree}
              meta={edu.period}
              description={edu.description}
            />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <SectionTitle>Projects</SectionTitle>
        <div className="section-content">
          {DATA.projects.map((project, index) => (
            <ProjectItem
              key={index}
              {...project}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          {/* Note: Email is a placeholder as it wasn't strictly provided, but fits the layout */}
          <SocialLink href={`mailto:${DATA.personal.email}`} icon={Mail} label="Email" />
          <SocialLink href={`https://${DATA.personal.github}`} icon={VscGithubInverted} label="GitHub" />
          <SocialLink href={`https://${DATA.personal.X}`} icon={FaXTwitter} label="Twitter" />
        </div>
        <p className="text-xs text-muted mt-8">
          © {new Date().getFullYear()} {DATA.personal.name}. Built with React, TypeScript, and Plain CSS.
        </p>
      </footer>

      <div className="floating-dock">
        <AnimatedThemeToggler />
      </div>

    </div>
  );
}