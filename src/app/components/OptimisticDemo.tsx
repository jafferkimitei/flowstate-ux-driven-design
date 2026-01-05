"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  optimistic?: boolean;
}

  const MotionButton = motion.button as any;
  const MotionDiv = motion.div as any;
  const MotionSvg = motion.svg as any;

export function OptimisticDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Instant UI update", completed: false },
    { id: 2, text: "Network request in background", completed: false },
    { id: 3, text: "Silent success confirmation", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleTask = (id: number) => {

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );


    setTimeout(() => {

      console.log("Task updated successfully");
    }, 500);
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      optimistic: true,
    };


    setTasks((prev) => [...prev, newTask]);
    setInputValue("");


    setTimeout(() => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === newTask.id ? { ...task, optimistic: false } : task
        )
      );
    }, 600);
  };

  const removeTask = (id: number) => {

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div
      className="rounded-lg p-8"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      <h3 className="text-xl mb-6">Optimistic UI</h3>

      <form onSubmit={addTask} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-3 rounded-md border outline-none transition-all duration-200"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--hairline)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent-blue)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--hairline)";
            }}
          />
          <MotionButton
            type="submit"
            className="px-6 py-3 rounded-md"
            style={{
              backgroundColor: "var(--accent-blue)",
              color: "#ffffff",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            Add
          </MotionButton>
        </div>
      </form>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <MotionDiv
              key={task.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{
                opacity: task.optimistic ? 0.6 : 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                x: -100,
                transition: { duration: 0.2, ease: [0.32, 0, 0.1, 1] },
              }}
              transition={{
                layout: { duration: 0.3, ease: [0.32, 0, 0.1, 1] },
                opacity: { duration: 0.2 },
              }}
              className="flex items-center gap-3 p-4 rounded-md border group"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--hairline)",
              }}
            >
              <MotionButton
                onClick={() => toggleTask(task.id)}
                className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200"
                style={{
                  borderColor: task.completed
                    ? "var(--accent-blue)"
                    : "var(--hairline)",
                  backgroundColor: task.completed
                    ? "var(--accent-blue)"
                    : "transparent",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {task.completed && (
                  <MotionSvg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2, ease: [0.32, 0, 0.1, 1] }}
                  >
                    <motion.path
                      d="M2 6L5 9L10 3"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </MotionSvg>
                )}
              </MotionButton>

              <span
                className="flex-1 transition-all duration-200"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed
                    ? "var(--muted-text)"
                    : "var(--foreground)",
                }}
              >
                {task.text}
              </span>

              <MotionButton
                onClick={() => removeTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-1"
                style={{ color: "var(--muted-text)" }}
                whileHover={{ color: "var(--accent-blue)" }}
              >
                Remove
              </MotionButton>
            </MotionDiv>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-sm mt-6" style={{ color: "var(--muted-text)" }}>
        Changes happen instantly. Network requests resolve silently.
      </p>
    </div>
  );
}
