'use client';

import { useEffect, useState, useRef } from 'react';

export default function ProgressBar({
  radius = 80,
  strokeWidth = 8,
  progressColor = '#B0BEC5',
  backgroundColor = '#1E1E1E',
  duration = 2,
  delay = 0,
  percentage = 27,
  label = 'Register with Secretary of State something',
}) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(() =>
    typeof window !== 'undefined' ? 0 : percentage,
  );
  const circleRef = useRef(null);
  const circumference = 2 * Math.PI * radius;
  const center = radius + strokeWidth;
  const viewBoxSize = (radius + strokeWidth) * 2;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Prevent animation until hydration is complete

    let startTime;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = (timestamp - startTime) / 1000; // Convert to seconds

      if (elapsedTime < delay) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const progressTime = elapsedTime - delay;
      if (progressTime <= duration) {
        setProgress(
          Math.min(percentage, (progressTime / duration) * percentage),
        );
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgress(percentage);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted, percentage, duration, delay]);

  if (!mounted) return null; // Prevent SSR-client mismatch

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={circleRef}
      className="relative flex h-[200px] w-[200px] items-center justify-center"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="-rotate-90 transform"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill={backgroundColor}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out"
        />
      </svg>

      <div className="absolute flex w-[80%] flex-col items-center text-center">
        <p className="text-xl text-gray-400">In progress</p>
        <p className="text-3xl font-bold text-white">{Math.round(progress)}%</p>
        <p className="max-w-[90%] text-lg leading-tight break-words text-gray-400 md:text-sm">
          {label}
        </p>
      </div>
    </div>
  );
}
