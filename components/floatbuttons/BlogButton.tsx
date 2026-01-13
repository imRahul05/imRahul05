import { BookOpen } from "lucide-react";
import { FloatingButton } from "./FloatingButton";

interface BlogButtonProps {
  className?: string;
  onClick: () => void;
}

export const BlogButton: React.FC<BlogButtonProps> = ({ className, onClick }) => {
  return (
    <FloatingButton
      icon={BookOpen}
      label="Blogs"
      onClick={onClick}
      className={className}
      ariaLabel="View Blog"
    />
  );
};
