import React, { useState, useRef, useCallback } from 'react';
import { Play, X, Globe, Github } from 'lucide-react';

interface ProjectCardProps {
    name: string;
    period?: string;
    description: string;
    tech: string[];
    link: string;
    sourceUrl?: string;
    image?: string;
    video?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    name,
    period,
    description,
    tech,
    link,
    sourceUrl,
    image,
    video
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (video) {
            setIsVideoModalOpen(true);
        }
    }, [video]);

    const handleCloseModal = useCallback(() => {
        setIsVideoModalOpen(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, []);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    }, [handleCloseModal]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleCloseModal();
        }
    }, [handleCloseModal]);

    return (
        <>
            <div
                className="project-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Section */}
                <div className="project-card-image-wrapper">
                    {!isImageLoaded && image && <div className="skeleton project-card-skeleton" />}
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className={`project-card-image ${!isImageLoaded ? 'hidden' : ''}`}
                            onLoad={() => setIsImageLoaded(true)}
                            style={!isImageLoaded ? { display: 'none' } : {}}
                        />
                    ) : (
                        <div className="project-card-placeholder" />
                    )}
                    {video && (
                        <button
                            className={`project-card-play-btn ${isHovered ? 'visible' : ''}`}
                            onClick={handlePlayClick}
                            aria-label={`Play ${name} video`}
                        >
                            <Play size={28} fill="currentColor" />
                        </button>
                    )}
                </div>

                {/* Content Section */}
                <div className="project-card-content">
                    <h3 className="project-card-title">{name}</h3>
                    {period && <p className="project-card-period">{period}</p>}
                    <p className="project-card-description">{description}</p>

                    {/* Tech Stack Badges */}
                    <div className="project-card-tech">
                        {tech.map((t) => (
                            <span key={t} className="project-card-tech-badge">{t}</span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="project-card-actions">
                        <a
                            href={link}
                            className="project-card-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Globe size={14} />
                            Website
                        </a>
                        {sourceUrl && (
                            <a
                                href={sourceUrl}
                                className="project-card-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github size={14} />
                                Source
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Fullscreen Video Modal */}
            {isVideoModalOpen && video && (
                <div
                    className="video-modal-backdrop"
                    onClick={handleBackdropClick}
                    onKeyDown={handleKeyDown}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${name} video player`}
                    tabIndex={-1}
                >
                    <div className="video-modal-content">
                        <button
                            className="video-modal-close"
                            onClick={handleCloseModal}
                            aria-label="Close video"
                        >
                            <X size={24} />
                        </button>
                        <video
                            ref={videoRef}
                            src={video}
                            controls
                            autoPlay
                            className="video-modal-player"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </>
    );
};
