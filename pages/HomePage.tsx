import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Github, ArrowRight, Linkedin, BookOpen } from 'lucide-react';
import { DATA } from '../data/data';
import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/project/ProjectCard';
import { Education } from '../components/education/Education';
import { Experience } from '../components/experience/Experience';
import { SocialLink } from '../components/SocialLink';
import { DigitalClock } from '../components/DigitalClock';
import { AnimatedThemeToggler } from '../components/floatbuttons/AnimatedThemeToggler';
import { ResumeButton } from '../components/floatbuttons/ResumeButton';
import { BlogButton } from '../components/floatbuttons/BlogButton';
import { XIcon } from '../components/XIcon';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const scrollLockRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
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

    computeAndSet();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const featuredProjects = DATA.projects.filter(p => p.image).slice(0, 2);

  const handleViewAllProjects = () => {
    navigate('/projects');
    window.scrollTo(0, 0);
  };

  const handleViewBlogs = () => {
    navigate('/blogs');
    window.scrollTo(0, 0);
  };

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
            <MapPin size={14} style={{ color: '#3b82f6' }} />
            {DATA.personal.location}
          </div>
          <div className="building-status text-xs">
            <span className="building-dot" />
            <span>Building{' '}
              <span className="arthion-wrapper">
                <a
                  href={DATA.personal.currentlyBuilding.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arthion-brand"
                >
                  {DATA.personal.currentlyBuilding.name}
                </a>
                <span className="arthion-preview">
                  <img
                    src={DATA.personal.currentlyBuilding.previewImage}
                    alt={DATA.personal.currentlyBuilding.name}
                  />
                </span>
              </span>
            </span>
          </div>
        </div>

        <div className="header-image">
          <div className={`profile-flip-container ${isImageLoaded && isVideoReady ? 'flip-animation' : ''}`}>
            {/* Front Side - Profile Image */}
            <div className="profile-flip-face profile-flip-front">
              {!isImageLoaded && <div className="skeleton profile-img"></div>}
              <img
                src={DATA.personal.image}
                alt={DATA.personal.name}
                className={`profile-img ${!isImageLoaded ? 'hidden' : ''}`}
                onLoad={() => setIsImageLoaded(true)}
                style={!isImageLoaded ? { display: 'none' } : {}}
              />
            </div>
            {/* Back Side - Video */}
            <div className="profile-flip-face profile-flip-back">
              <video
                className="profile-video"
                src={DATA.personal.profileVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlayThrough={() => setIsVideoReady(true)}
              />
            </div>
          </div>
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
      <Experience />

      {/* EDUCATION */}
      <Education />

      {/* FEATURED PROJECTS */}
      <section className="section">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="featured-projects-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="view-all-projects-btn"
            onClick={handleViewAllProjects}
          >
            View All Projects
            <ArrowRight size={16} />
          </button>
          <button
            className="view-all-projects-btn"
            onClick={handleViewBlogs}
          >
            <BookOpen size={16} />
            Read Blog
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <SocialLink href={`mailto:${DATA.personal.email}`} icon={Mail} label="Email" />
          <SocialLink href={`https://${DATA.personal.github}`} icon={Github} label="GitHub" />
          <SocialLink href={`https://${DATA.personal.linkedin}`} icon={Linkedin} label="LinkedIn" />
          <SocialLink href={`https://${DATA.personal.X}`} icon={XIcon} label="X" />
          <DigitalClock />
        </div>
        <p className="text-xs text-muted mt-8">
          © {new Date().getFullYear()} {DATA.personal.name}. Built with React, TypeScript, and Plain CSS.
        </p>
      </footer>

      <div className="floating-dock">
        <AnimatedThemeToggler />
        <BlogButton onClick={handleViewBlogs} />
        <ResumeButton />
      </div>
    </div>
  );
};

export default HomePage;
