import { FileText } from "lucide-react";
import { DATA } from "../../data/data";
import { FloatingButton } from "./FloatingButton";

export const ResumeButton = ({ className }: { className?: string }) => {
    const handleClick = () => {
        window.open(DATA.personal.resume, "_blank", "noopener,noreferrer");
    };

    return (
        <FloatingButton
            icon={FileText}
            label="Resume"
            onClick={handleClick}
            className={className}
            ariaLabel="View Resume"
        />
    );
};
