"use client"

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { SkeletonDemo } from "./components/SkeletonDemo";
import { OptimisticDemo } from "./components/OptimisticDemo";
import { MotionFeedbackDemo } from "./components/MotionFeedbackDemo";
import { HydrationDemo } from "./components/HydrationDemo";
import { FlowVisualization } from "./components/FlowVisualization";

const acts = [
  {
    id: "anticipation",
    title: "Anticipation",
    statement: "Speed is a feeling.",
    description: "Motion hints that the system is already working.",
  },
  {
    id: "illusion",
    title: "Illusion",
    statement: "Perception beats precision.",
    description: "Skeletons and predictive layouts appear before data.",
  },
  {
    id: "control",
    title: "Control",
    statement: "Feedback creates trust.",
    description:
      "Every interaction responds immediately with visual confirmation.",
  },
  {
    id: "flow",
    title: "Flow",
    statement: "When latency disappears.",
    description: "The interface feels frictionless, almost invisible.",
  },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAct, setActiveAct] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  useEffect(() => {
    // GSAP timeline for initial page load animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-title", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
    })
      .from(
        ".hero-subtitle",
        {
          y: 40,
          opacity: 0,
          duration: 1,
        },
        "-=0.6"
      )
      .from(
        ".hero-description",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        ".scroll-indicator",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3"
      );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const actIndex = Math.floor(scrollTop / windowHeight);

      if (actIndex !== activeAct && actIndex >= 0 && actIndex < acts.length) {
        setActiveAct(actIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeAct]);

  const MotionSection = motion.section as any;
  const MotionDiv = motion.div as any;
  const MotionButton = motion.button as any;

  return (
    <div ref={containerRef} className="grain min-h-screen">
      {/* Hero Section */}
      <MotionSection
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <div className="absolute inset-0">
          <FlowVisualization />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <h1 className="hero-title mb-6">FlowState</h1>
          <p
            className="hero-subtitle text-3xl mb-4"
            style={{ color: "var(--muted-text)" }}
          >
            Performance as UX
          </p>
          <p
            className="hero-description text-lg max-w-2xl mx-auto"
            style={{ color: "var(--muted-text)" }}
          >
            Frontend Systems · Perceived Performance
          </p>

          <div className="scroll-indicator absolute bottom-20 left-1/2 -translate-x-1/2">
            <MotionDiv
              className="w-px h-16"
              style={{ backgroundColor: "var(--hairline)" }}
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </MotionSection>

      {/* Act Navigator */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-2">
        {acts.map((act, i) => (
          <MotionButton
            key={act.id}
            onClick={() => {
              const target = window.innerHeight * (i + 1);
              window.scrollTo({ top: target, behavior: "smooth" });
            }}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                activeAct === i ? "var(--accent-blue)" : "var(--hairline)",
            }}
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        ))}
      </div>

      {/* Act I: Anticipation - Skeleton Demo */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ backgroundColor: "var(--hairline)" }}
        />
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-sm uppercase tracking-wider mb-4"
                style={{ color: "var(--muted-text)" }}
              >
                Act I — {acts[0].title}
              </p>
              <h2 className="mb-6">{acts[0].statement}</h2>
              <p style={{ color: "var(--muted-text)" }}>
                {acts[0].description}
              </p>
            </div>
            <SkeletonDemo />
          </div>
        </div>
      </section>

      {/* Act II: Illusion - Optimistic UI */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ backgroundColor: "var(--hairline)" }}
        />
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <OptimisticDemo />
            </div>
            <div className="order-1 lg:order-2">
              <p
                className="text-sm uppercase tracking-wider mb-4"
                style={{ color: "var(--muted-text)" }}
              >
                Act II — {acts[1].title}
              </p>
              <h2 className="mb-6">{acts[1].statement}</h2>
              <p style={{ color: "var(--muted-text)" }}>
                {acts[1].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Act III: Control - Motion Feedback */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ backgroundColor: "var(--hairline)" }}
        />
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-sm uppercase tracking-wider mb-4"
                style={{ color: "var(--muted-text)" }}
              >
                Act III — {acts[2].title}
              </p>
              <h2 className="mb-6">{acts[2].statement}</h2>
              <p style={{ color: "var(--muted-text)" }}>
                {acts[2].description}
              </p>
            </div>
            <MotionFeedbackDemo />
          </div>
        </div>
      </section>

      {/* Act IV: Flow - Hydration Visualization */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ backgroundColor: "var(--hairline)" }}
        />
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <HydrationDemo />
            </div>
            <div className="order-1 lg:order-2">
              <p
                className="text-sm uppercase tracking-wider mb-4"
                style={{ color: "var(--muted-text)" }}
              >
                Act IV — {acts[3].title}
              </p>
              <h2 className="mb-6">{acts[3].statement}</h2>
              <p style={{ color: "var(--muted-text)" }}>
                {acts[3].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ backgroundColor: "var(--hairline)" }}
        />
        <div className="max-w-4xl mx-auto px-8 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.32, 0, 0.1, 1] }}
            viewport={{ once: true }}
          >
            <p
              className="text-2xl mb-12"
              style={{ color: "var(--muted-text)" }}
            >
              Waiting is a design choice.
            </p>
            <div
              className="h-px w-32 mx-auto mb-12"
              style={{ backgroundColor: "var(--hairline)" }}
            />
            <p className="text-lg" style={{ color: "var(--muted-text)" }}>
              Fast is silent.
              <br />
              Latency is emotional.
              <br />
              Feedback creates flow.
            </p>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
