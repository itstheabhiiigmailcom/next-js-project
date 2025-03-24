'use client';
import { useEffect, useRef, useState } from 'react';

export default function RightCurveLineWithDot({ className = '' }) {
  // const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const pathRef = useRef(null);

  useEffect(() => {
    setAnimate(true);
    // setMounted(true);
    const timer = setTimeout(() => {
      setAnimate(false); // Start disappearing animation after 7.5s
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      className={`curve-line compliance-dashboard absolute ${className} ${animate ? '' : 'disappear'}`}
      width="700"
      height="150"
      viewBox="0 0 250 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M 432 1 H 236.106 C 213.933 1 192.442 8.6759 175.286 22.7238 L 81.7968 106.2762 C 64.6407 120.324 43.1507 128 20.977 128 H -207"
        stroke="#FF0833"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* {mounted && (
        <circle
          cx="0"
          cy="0"
          r="8"
          fill="#059669"
          stroke="#fff"
          strokeWidth="2"
          className={`${animate ? 'opacity-0' : 'right-curve-dot-animation'}`}
        />
      )} */}
    </svg>
  );
}
