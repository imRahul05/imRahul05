import React, { useState } from 'react';
import { DATA } from '../../data/data';
import { SectionTitle } from '../SectionTitle';
import { TypewriterText } from '../TypewriterText';
import { ChevronDown } from 'lucide-react';

interface ExperienceItemProps {
    company: string;
    role: string;
    period: string;
    description: string;
    image?: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
    company,
    role,
    period,
    description,
    image
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div
            className="experience-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsOpen(!isOpen)}
            style={{ cursor: 'pointer' }}
        >
            {image && (
                <div className="experience-icon">
                    {!isImageLoaded && <div className="skeleton experience-icon-skeleton" />}
                    <img
                        src={image}
                        alt={company}
                        className={`experience-icon-img ${!isImageLoaded ? 'hidden' : ''}`}
                        onLoad={() => setIsImageLoaded(true)}
                        style={!isImageLoaded ? { display: 'none' } : {}}
                    />
                </div>
            )}
            <div className="experience-content">
                <div className="experience-header">
                    <div className="experience-title-row">
                        <h3 className="experience-company">{company}</h3>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="experience-toggle-btn"
                            style={{
                                opacity: isHovered || isOpen ? 1 : 0,
                            }}
                            aria-label={isOpen ? "Collapse details" : "Expand details"}
                        >
                            <ChevronDown
                                size={14}
                                className="text-muted"
                                style={{
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease-in-out'
                                }}
                            />
                        </button>
                    </div>
                    <p className="experience-role">{role}</p>
                    <span className="experience-period">{period}</span>
                </div>
                {isOpen && (
                    <p className="experience-description">
                        <TypewriterText text={description} speed={5} />
                    </p>
                )}
            </div>
        </div>
    );
};

export const Experience: React.FC = () => {
    return (
        <section className="section">
            <SectionTitle>Experience</SectionTitle>
            <div className="section-content">
                {DATA.experience.map((job, index) => (
                    <ExperienceItem
                        key={index}
                        company={job.company}
                        role={job.role}
                        period={job.period}
                        description={job.description}
                        image={job.image}
                    />
                ))}
            </div>
        </section>
    );
};
