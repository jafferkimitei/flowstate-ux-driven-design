"use client"

import { useState} from "react";
import { motion } from "framer-motion";


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

interface Component {
  id: number;
  name: string;
  hydrated: boolean;
  priority: "critical" | "secondary" | "lazy";
  delay: number;
}

export function HydrationDemo() {
  const [isHydrating, setIsHydrating] = useState(false);
  const [components, setComponents] = useState<Component[]>([
    {
      id: 1,
      name: "Hero Section",
      hydrated: false,
      priority: "critical",
      delay: 0,
    },
    {
      id: 2,
      name: "Navigation",
      hydrated: false,
      priority: "critical",
      delay: 100,
    },
    {
      id: 3,
      name: "Main Content",
      hydrated: false,
      priority: "critical",
      delay: 200,
    },
    {
      id: 4,
      name: "Sidebar",
      hydrated: false,
      priority: "secondary",
      delay: 800,
    },
    { id: 5, name: "Comments", hydrated: false, priority: "lazy", delay: 1500 },
    { id: 6, name: "Footer", hydrated: false, priority: "lazy", delay: 2000 },
  ]);

  const MotionButton = motion.button as any;
  const MotionDiv = motion.div as any;

  const startHydration = () => {
    setIsHydrating(true);
    setComponents((prev) => prev.map((c) => ({ ...c, hydrated: false })));

    // Progressive hydration based on priority
    components.forEach((component) => {
      setTimeout(() => {
        setComponents((prev) =>
          prev.map((c) =>
            c.id === component.id ? { ...c, hydrated: true } : c
          )
        );
      }, component.delay);
    });

    setTimeout(() => {
      setIsHydrating(false);
    }, 2500);
  };

  const getPriorityColor = (priority: string, hydrated: boolean) => {
    if (!hydrated) return "var(--hairline)";
    switch (priority) {
      case "critical":
        return "var(--accent-blue)";
      case "secondary":
        return "rgba(107, 127, 255, 0.6)";
      case "lazy":
        return "rgba(107, 127, 255, 0.3)";
      default:
        return "var(--hairline)";
    }
  };

  return (
    <div
      className="rounded-lg p-8"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl">Progressive Hydration</h3>
        <MotionButton
          onClick={startHydration}
          disabled={isHydrating}
          className="px-6 py-2 rounded-md transition-all duration-200"
          style={{
            backgroundColor: isHydrating
              ? "var(--accent-blue-dim)"
              : "var(--accent-blue)",
            color: "#ffffff",
          }}
          whileHover={!isHydrating ? { scale: 1.02 } : undefined}
          whileTap={!isHydrating ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {isHydrating ? "Hydrating..." : "Start Hydration"}
        </MotionButton>
      </div>

      <MotionDiv className="space-y-3 mb-6" variants={container} initial="hidden" animate="show">
        {components.map((component, index) => (
          <MotionDiv
            key={component.id}
            className="relative overflow-hidden"
            variants={item}
          >
            <div
              className="p-4 rounded-md border flex items-center justify-between relative"
              style={{
                backgroundColor: component.hydrated
                  ? "var(--background)"
                  : "transparent",
                borderColor: getPriorityColor(
                  component.priority,
                  component.hydrated
                ),
              }}
            >
              <div className="flex items-center gap-3">
                <MotionDiv
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: getPriorityColor(
                      component.priority,
                      component.hydrated
                    ),
                  }}
                  animate={{
                    scale: component.hydrated ? [1, 1.4, 1] : 1,
                    opacity: component.hydrated ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.4, ease: [0.32, 0, 0.1, 1] }}
                />
                <div>
                  <div className="font-medium">{component.name}</div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--muted-text)" }}
                  >
                    {component.priority} priority
                  </div>
                </div>
              </div>

              {component.hydrated && (
                <MotionDiv
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: "backOut" }}
                  className="text-sm"
                  style={{ color: getPriorityColor(component.priority, true) }}
                >
                  Ready
                </MotionDiv>
              )}

              {/* Hydration wave effect */}
              {component.hydrated && (
                <MotionDiv
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${getPriorityColor(
                      component.priority,
                      true
                    )}20, transparent)`,
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              )}
            </div>
            </MotionDiv>
        ))}
      </MotionDiv>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Critical", color: "var(--accent-blue)" },
          { label: "Secondary", color: "rgba(107, 127, 255, 0.6)" },
          { label: "Lazy", color: "rgba(107, 127, 255, 0.3)" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm" style={{ color: "var(--muted-text)" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-sm" style={{ color: "var(--muted-text)" }}>
        Components wake up in layers. Critical elements first, then secondary,
        then lazy-loaded. The page becomes interactive progressively, not all at
        once.
      </p>
    </div>
  );
}
