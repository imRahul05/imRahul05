import React, { useState } from 'react';
import { DATA } from '../../data';
import { SectionTitle } from '../SectionTitle';
import { TypewriterText } from '../TypewriterText';
import { ChevronDown } from 'lucide-react';

interface EducationItemProps {
    institution: string;
    degree: string;
    period: string;
    description: string;
    image?: string;
    tags?: string[];
}

const EducationItem: React.FC<EducationItemProps> = ({
    institution,
    degree,
    period,
    description,
    image,
    tags
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div
            className="education-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {image && (
                <div className="education-icon">
                    {!isImageLoaded && <div className="skeleton education-icon-skeleton" />}
                    <img
                        src={image}
                        alt={institution}
                        className={`education-icon-img ${!isImageLoaded ? 'hidden' : ''}`}
                        onLoad={() => setIsImageLoaded(true)}
                        style={!isImageLoaded ? { display: 'none' } : {}}
                    />
                </div>
            )}
            <div className="education-content">
                <div className="education-header">
                    <div className="education-title-row">
                        <h3 className="education-institution">{institution}</h3>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="education-toggle-btn"
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
                    <p className="education-degree">{degree}</p>
                    <span className="education-period">{period}</span>
                </div>
                {isOpen && (
                    <div className="education-details">
                        <p className="education-description">
                            <TypewriterText text={description} speed={5} />
                        </p>
                        {tags && tags.length > 0 && (
                            <div className="education-tags">
                                {tags.map((tag, index) => (
                                    <span key={index} className="education-tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export const Education: React.FC = () => {
    return (
        <section className="section">
            <SectionTitle>Education</SectionTitle>
            <div className="section-content">
                {DATA.education.map((edu, index) => (
                    <EducationItem
                        key={index}
                        institution={edu.institution}
                        degree={edu.degree}
                        period={edu.period}
                        description={edu.description}
                        image={edu.image}
                        tags={edu.tags}
                    />
                ))}
            </div>
        </section>
    );
};
