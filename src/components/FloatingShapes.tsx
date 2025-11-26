import { useEffect, useState } from "react";

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "circle" | "square" | "triangle";
  color: string;
}

const FloatingShapes = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(147, 51, 234, 0.1)",
      "rgba(236, 72, 153, 0.1)",
      "rgba(6, 182, 212, 0.1)",
    ];
    
    const shapeTypes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];

    const generatedShapes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 50,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setShapes(generatedShapes);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
          }}
        >
          {shape.type === "circle" && (
            <div
              className="w-full h-full rounded-full backdrop-blur-3xl"
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === "square" && (
            <div
              className="w-full h-full rotate-45 backdrop-blur-3xl"
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === "triangle" && (
            <div
              className="w-0 h-0 border-l-[75px] border-r-[75px] border-b-[130px] border-l-transparent border-r-transparent backdrop-blur-3xl"
              style={{ borderBottomColor: shape.color }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingShapes;
