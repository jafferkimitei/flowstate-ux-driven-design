"use client";

import gsap from "gsap";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useRef, useState } from "react";

// biome-ignore lint/suspicious/noExplicitAny: Framer Motion type compatibility
const MotionDiv = motion.div as React.ComponentType<any>;
// biome-ignore lint/suspicious/noExplicitAny: Framer Motion type compatibility
const MotionButton = motion.button as React.ComponentType<any>;

interface ContentItem {
  id: number;
  title: string;
  description: string;
}

export function SkeletonDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  const skeletonRef = useRef<HTMLDivElement>(null);

  const loadContent = () => {
    setIsLoading(true);
    setContent([]);

    if (skeletonRef.current) {
      const shimmerElements = skeletonRef.current.querySelectorAll(".shimmer");
      gsap.fromTo(
        shimmerElements,
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        },
      );
    }

    setTimeout(() => {
      const mockData: ContentItem[] = [
        {
          id: 1,
          title: "Temporal smoothing",
          description:
            "Skeleton persists just long enough to avoid jarring swaps.",
        },
        {
          id: 2,
          title: "Predictive layout",
          description: "Content shape is known before data arrives.",
        },
        {
          id: 3,
          title: "Perceived speed",
          description: "System feels faster by communicating intention.",
        },
      ];

      setTimeout(() => {
        setContent(mockData);
        setIsLoading(false);
      }, 100);
    }, 2000);
  };

  return (
    <div
      className="rounded-lg p-8"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl">Skeleton Timing</h3>
        <MotionButton
          onClick={loadContent}
          disabled={isLoading}
          className="px-6 py-2 rounded-md transition-all duration-200"
          style={{
            backgroundColor: isLoading
              ? "var(--accent-blue-dim)"
              : "var(--accent-blue)",
            color: "#ffffff",
          }}
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {isLoading ? "Loading..." : "Load Content"}
        </MotionButton>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <div ref={skeletonRef}>
            <MotionDiv
              key="skeleton"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-md"
                  style={{ backgroundColor: "var(--background)" }}
                >
                  <div
                    className="shimmer h-5 w-2/3 rounded mb-3"
                    style={{ backgroundColor: "var(--hairline)" }}
                  />
                  <div
                    className="shimmer h-4 w-full rounded mb-2"
                    style={{ backgroundColor: "var(--hairline)" }}
                  />
                  <div
                    className="shimmer h-4 w-4/5 rounded"
                    style={{ backgroundColor: "var(--hairline)" }}
                  />
                </div>
              ))}
            </MotionDiv>
          </div>
        ) : content.length > 0 ? (
          <MotionDiv
            key="content"
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0, 0.1, 1] }}
          >
            {content.map((item, index) => (
              <MotionDiv
                key={item.id}
                className="p-4 rounded-md border"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--hairline)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.32, 0, 0.1, 1],
                }}
              >
                <h4 className="mb-2">{item.title}</h4>
                <p style={{ color: "var(--muted-text)" }}>{item.description}</p>
              </MotionDiv>
            ))}
          </MotionDiv>
        ) : (
          <MotionDiv
            key="empty"
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p style={{ color: "var(--muted-text)" }}>Click to load content</p>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}
