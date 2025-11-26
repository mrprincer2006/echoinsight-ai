import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.1,
}: ScrollRevealProps) => {
  const { elementRef, isVisible } = useScrollReveal({ threshold });

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(60px)";
      case "down":
        return "translateY(-60px)";
      case "left":
        return "translateX(60px)";
      case "right":
        return "translateX(-60px)";
      default:
        return "translateY(60px)";
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getTransform(),
        transition: `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
