import React, { useEffect, useRef, useState } from 'react';
import { Mail, Globe, Github } from 'lucide-react';
import { DATA } from './data';
import { IconWrapper } from './components/IconWrapper';
import { SectionTitle } from './components/SectionTitle';
import { EntryItem } from './components/EntryItem';
import { ProjectItem } from './components/ProjectItem';
import { SocialLink } from './components/SocialLink';
import { AnimatedThemeToggler } from './components/AnimatedThemeToggler';
import { ResumeButton } from './components/ResumeButton';
import { XIcon } from './components/XIcon';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const scrollLockRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Wider hysteresis avoids a feedback loop where the header resizing changes
    // layout enough to nudge scrollY across a tight threshold.
    //
    // On mobile browsers, scrollY can fluctuate as the browser UI shows/hides.
    // To prevent the header from flipping layouts while scrolling down, we only
    // allow expanding again when we're very close to the top.
    const getThresholds = () => {
      const isMobile = window.matchMedia('(max-width: 639px)').matches;
      return isMobile
        ? { shrinkAt: 80, expandAt: 10 }
        : { shrinkAt: 120, expandAt: 60 };
    };

    const computeAndSet = () => {
      rafRef.current = null;
      if (scrollLockRef.current) return;

      const scrollY = window.scrollY;
      const { shrinkAt, expandAt } = getThresholds();
      setIsScrolled((prev) => {
        const next = scrollY > shrinkAt ? true : scrollY < expandAt ? false : prev;
        if (next === prev) return prev;

        // Prevent a feedback loop where changing header height nudges scrollY
        // back across the threshold and immediately toggles again.
        scrollLockRef.current = true;
        if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = window.setTimeout(() => {
          scrollLockRef.current = false;
        }, 350);

        return next;
      });
    };

    const handleScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(computeAndSet);
    };

    // Initialize on mount (covers reload at a scrolled position)
    computeAndSet();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
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
          <SocialLink href={`https://${DATA.personal.github}`} icon={Github} label="GitHub" />
          <SocialLink href={`https://${DATA.personal.X}`} icon={XIcon} label="X" />
        </div>
        <p className="text-xs text-muted mt-8">
          © {new Date().getFullYear()} {DATA.personal.name}. Built with React, TypeScript, and Plain CSS.
        </p>
      </footer>

      <div className="floating-dock">
        <AnimatedThemeToggler />
        <ResumeButton />
      </div>

    </div>
  );
}