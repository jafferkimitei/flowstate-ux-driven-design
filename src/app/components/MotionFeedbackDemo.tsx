"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function MotionFeedbackDemo() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [successButton, setSuccessButton] = useState<string | null>(null);

  const buttons = [
    {
      id: "hover",
      label: "Hover Response",
      description: "1-frame visual feedback",
    },
    {
      id: "press",
      label: "Press Feedback",
      description: "Scale + haptic feel",
    },
    {
      id: "success",
      label: "Success State",
      description: "Confident confirmation",
    },
  ];

  // biome-ignore lint/suspicious/noExplicitAny: Framer Motion type compatibility
  const MotionButton = motion.button as any;
  // biome-ignore lint/suspicious/noExplicitAny: Framer Motion type compatibility
  const MotionDiv = motion.div as any;
  // biome-ignore lint/suspicious/noExplicitAny: Framer Motion type compatibility
  const MotionSvg = motion.svg as any;

  const handleButtonPress = (id: string) => {
    setPressedButton(id);
    setTimeout(() => {
      setPressedButton(null);
      if (id === "success") {
        setSuccessButton(id);
        setTimeout(() => setSuccessButton(null), 1500);
      }
    }, 200);
  };

  return (
    <div
      className="rounded-lg p-8"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      <h3 className="text-xl mb-6">Motion as Feedback</h3>
      <p className="mb-8" style={{ color: "var(--muted-text)" }}>
        Every interaction returns a response within 100ms.
      </p>

      <div className="space-y-6">
        {buttons.map((button) => (
          <div key={button.id}>
            <MotionButton
              onMouseEnter={() => setHoveredButton(button.id)}
              onMouseLeave={() => setHoveredButton(null)}
              onMouseDown={() => handleButtonPress(button.id)}
              className="w-full px-6 py-4 rounded-md border transition-all duration-100 text-left relative overflow-hidden"
              style={{
                backgroundColor:
                  successButton === button.id
                    ? "var(--accent-blue)"
                    : hoveredButton === button.id
                      ? "var(--background)"
                      : "transparent",
                borderColor:
                  successButton === button.id
                    ? "var(--accent-blue)"
                    : hoveredButton === button.id
                      ? "var(--accent-blue)"
                      : "var(--hairline)",
                color:
                  successButton === button.id ? "#ffffff" : "var(--foreground)",
              }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.1, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.05, ease: "easeIn" },
              }}
            >
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <div className="font-medium mb-1">{button.label}</div>
                  <div
                    className="text-sm"
                    style={{
                      color:
                        successButton === button.id
                          ? "rgba(255, 255, 255, 0.8)"
                          : "var(--muted-text)",
                    }}
                  >
                    {successButton === button.id
                      ? "Action confirmed"
                      : button.description}
                  </div>
                </div>

                <MotionDiv
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      successButton === button.id
                        ? "rgba(255, 255, 255, 0.2)"
                        : "var(--accent-blue-dim)",
                  }}
                  animate={{
                    scale: pressedButton === button.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3, ease: [0.32, 0, 0.1, 1] }}
                >
                  {successButton === button.id ? (
                    <MotionSvg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, ease: "backOut" }}
                    >
                      <path
                        d="M4 10L8 14L16 6"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </MotionSvg>
                  ) : (
                    <MotionDiv
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "var(--accent-blue)" }}
                      animate={{
                        scale: hoveredButton === button.id ? 1.3 : 1,
                      }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </MotionDiv>
              </div>

              {/* Ripple effect on press */}
              {pressedButton === button.id && (
                <MotionDiv
                  className="absolute inset-0 rounded-md"
                  style={{ backgroundColor: "var(--accent-blue-dim)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
            </MotionButton>
          </div>
        ))}
      </div>

      <div
        className="mt-8 p-4 rounded-md"
        style={{ backgroundColor: "var(--background)" }}
      >
        <p className="text-sm" style={{ color: "var(--muted-text)" }}>
          <strong>Timeline control:</strong> Motion is timed with GSAP
          precision. State changes drive visual feedback. No animation happens
          without purpose.
        </p>
      </div>
    </div>
  );
}
