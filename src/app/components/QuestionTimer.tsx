// components/QuestionTimer.tsx
"use client";

import React, { useEffect, useState } from "react";

interface QuestionTimerProps {
  duration: number; // duration in seconds
  onTimeUp: () => void; // callback when time is up
  running: boolean; // whether the timer is active
}

export default function QuestionTimer({
  duration,
  onTimeUp,
  running,
}: QuestionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer whenever duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Timer countdown logic
  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, onTimeUp]);

  return (
    <div className="text-gray-700 font-medium mt-2">Time Left: {timeLeft}s</div>
  );
}
