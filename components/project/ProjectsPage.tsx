import React, { useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DATA } from '../../data';
import { ProjectItem } from './ProjectItem';
import { AnimatedThemeToggler } from '../floatbuttons/AnimatedThemeToggler';

interface ProjectsPageProps {
    onBack: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack }) => {
    const handleBackClick = useCallback(() => {
        onBack();
    }, [onBack]);

    return (
        <div className="container projects-page">
            <header className="projects-page-header">
                <button
                    className="back-button"
                    onClick={handleBackClick}
                    aria-label="Go back to home"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <h1>All Projects</h1>
            </header>

            <section className="section">
                <div className="projects-grid">
                    {DATA.projects.map((project, index) => (
                        <ProjectItem
                            key={index}
                            {...project}
                        />
                    ))}
                </div>
            </section>

            <div className="floating-dock">
                <AnimatedThemeToggler />
            </div>
        </div>
    );
};
