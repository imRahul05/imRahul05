import React, { useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DATA } from '../../data/data';
import { ProjectItem } from './ProjectItem';
import { AnimatedThemeToggler } from '../floatbuttons/AnimatedThemeToggler';
import { HomeButton } from '../floatbuttons/HomeButton';
import { ResumeButton } from '../floatbuttons/ResumeButton';

interface ProjectsPageProps {
    onBack: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack }) => {
    const handleBackClick = useCallback(() => {
        onBack();
    }, [onBack]);

    const pinnedTopOrder = [
        'MarkDown Previewer',
        'FinSage AI',
        'School Management System',
        'PillPal AI',
        'Movie Stream',
        'Billing and Management App',
        'Community Care',
    ] as const;

    const smallProjectsOrder = [
        'SnapDigest',
        'TypeFast - Competitive Typing Speed Game',
    ] as const;

    const pinnedTopProjects = pinnedTopOrder
        .map((name) => DATA.projects.find((p) => p.name === name))
        .filter(Boolean);

    const smallProjects = smallProjectsOrder
        .map((name) => DATA.projects.find((p) => p.name === name))
        .filter(Boolean);

    const excludedNames = new Set<string>([
        ...pinnedTopOrder,
        ...smallProjectsOrder,
    ]);

    const remainingProjects = DATA.projects.filter((p) => !excludedNames.has(p.name));

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
                    {pinnedTopProjects.map((project) => (
                        <ProjectItem
                            key={project!.name}
                            {...project!}
                        />
                    ))}

                    {pinnedTopProjects.length > 0 && smallProjects.length > 0 && (
                        <hr className="projects-divider" />
                    )}

                    {smallProjects.length > 0 && (
                        <div className="projects-section-label">Small Projects</div>
                    )}

                    {smallProjects.map((project) => (
                        <ProjectItem
                            key={project!.name}
                            {...project!}
                        />
                    ))}



                    {remainingProjects.map((project, index) => (
                        <ProjectItem
                            key={`${project.name}-${index}`}
                            {...project}
                        />
                    ))}
                </div>
            </section>

            <div className="floating-dock">
                <AnimatedThemeToggler />
                <HomeButton onClick={onBack} />
                <ResumeButton />
            </div>
        </div>
    );
};
