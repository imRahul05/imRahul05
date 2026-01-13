import { Home } from "lucide-react";
import { FloatingButton } from "./FloatingButton";

interface HomeButtonProps {
  className?: string;
  onClick: () => void;
}

export const HomeButton: React.FC<HomeButtonProps> = ({ className, onClick }) => {
  return (
    <FloatingButton
      icon={Home}
      label="Home"
      onClick={onClick}
      className={className}
      ariaLabel="Go to Home"
    />
  );
};
