import { FileText } from "lucide-react";
import { DATA } from "../../data";

import "../styles/AnimatedThemeToggler.css";

export const ResumeButton = ({ className }: { className?: string }) => {
    const handleClick = () => {
        window.open(DATA.personal.resume, "_blank", "noopener,noreferrer");
    };

    return (
        <button
            onClick={handleClick}
            aria-label="View Resume"
            className={`theme-toggle-btn ${className || ""}`}
            type="button"
        >
            <span className="icon-wrapper">
                <FileText size={18} className="theme-icon" />
            </span>
        </button>
    );
};
