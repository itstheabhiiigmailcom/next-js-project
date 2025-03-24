'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import ProgressBar from '../components/paths/progress-bar';

const ProgressTracker = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 1000);
  }, []);

  return (
    <div className="progress-tracker-container">
      <svg
        viewBox="0 0 800 1200"
        className="progress-tracker-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle - Fully drawn */}
        <circle
          cx="400"
          cy="400"
          r="350"
          className="tracker-circle-outer"
          fill="none"
          stroke="#999999"
          strokeWidth="2"
          strokeDasharray="2200"
          strokeDashoffset="0" // Fully drawn
        />

        {/* Inner circle - Animated */}
        <circle
          cx="400"
          cy="400"
          r="320"
          className={`tracker-circle-inner ${animate ? 'progress-animation' : ''}`}
          fill="none"
          stroke="#999999"
          strokeWidth="2"
          strokeDasharray="2000"
          strokeDashoffset="2000"
        />

        {/* Center progress circle */}
        <g className={` ${animate ? 'progress-animation' : ''}`}>
          <foreignObject x="62" y="73" width="250" height="250">
            <ProgressBar
              radius={120}
              strokeWidth={10}
              progressColor="#2a7d7d"
              backgroundColor="#2a2a2a"
              duration={1}
              delay={0}
              percentage={50}
            />
          </foreignObject>
        </g>

        {/* City skyline illustration */}
        <g
          className={`city-illustration ${animate ? 'progress-animation' : ''}`}
        >
          <path
            d="M400,520 L400,440 L410,440 L410,430 L420,430 L420,410 L430,410 L430,390 L440,390 L440,450 L450,450 L450,520 Z"
            fill="#2a7d7d"
          />
          <path
            d="M450,520 L450,470 L460,470 L460,450 L470,450 L470,440 L480,440 L480,520 Z"
            fill="#2a7d7d"
          />
          <path
            d="M370,520 L370,480 L380,480 L380,460 L390,460 L390,440 L400,440 L400,520 Z"
            fill="#2a7d7d"
          />
          <path
            d="M340,520 L340,490 L350,490 L350,470 L360,470 L360,450 L370,450 L370,520 Z"
            fill="#2a7d7d"
          />
          <path d="M310,520 L310,480 L340,480 L340,520 Z" fill="#2a7d7d" />
          {/* Statue of Liberty */}
          <path
            d="M290,520 L290,490 L295,490 L295,470 L300,470 L300,450 L305,450 L305,440 L310,440 L310,450 L315,450 L315,470 L320,470 L320,490 L325,490 L325,520 Z"
            fill="#2a7d7d"
          />
          <path d="M305,440 L305,430 L310,430 L310,440 Z" fill="#2a7d7d" />
          <line
            x1="280"
            y1="520"
            x2="520"
            y2="520"
            stroke="#2a7d7d"
            strokeWidth="2"
          />
        </g>

        {/* Task cards */}
        <g
          className={`task-card task-card-1 ${animate ? 'progress-animation' : ''}`}
        >
          <rect
            x="600"
            y="140"
            width="300" // Increased width
            height="125" // Increased height
            rx="10" // Increased border radius
            fill="#eafaf1"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text x="610" y="170" className="task-title" fontSize="20">
            {' '}
            Report New Hires to the NY
          </text>
          <text x="610" y="200" className="task-title" fontSize="20">
            {' '}
            {/* Increased font size */}
            Online Reporting Center
          </text>
          <rect
            x="610"
            y="220"
            width="120" // Increased button size
            height="40" // Increased button size
            rx="20" // Increased border radius
            fill="#e6f4ea"
          />
          <text x="640" y="245" className="task-status-completed" fontSize="18">
            {' '}
            {/* Increased font size */}
            Completed
          </text>
        </g>

        <g
          className={`task-card task-card-2 ${animate ? 'progress-animation' : ''}`}
        >
          <rect
            x="579"
            y="501"
            width="300"
            height="130"
            rx="10"
            fill="#eafaf1"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text x="589" y="531" className="task-title" fontSize="20">
            Implement a Paid Sick Leave
          </text>
          <text x="589" y="561" className="task-title" fontSize="20">
            Policy
          </text>
          <rect
            x="589"
            y="581"
            width="100"
            height="40"
            rx="20"
            fill="#fce8e6"
          />
          <text x="619" y="606" className="task-status-todo" fontSize="18">
            To Do
          </text>
        </g>

        <g
          className={`task-card task-card-3 ${animate ? 'progress-animation' : ''}`}
        >
          <rect
            x="-83"
            y="501"
            width="300"
            height="125"
            rx="10"
            fill="#eafaf1"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text x="-77" y="528" className="task-title" fontSize="20">
            File Form
          </text>
          <text x="-77" y="558" className="task-subtitle" fontSize="18">
            (Foreign Qualify in New York)
          </text>
          <rect
            x="-77"
            y="578"
            width="120"
            height="40"
            rx="20"
            fill="#e6f4ea"
          />
          <text x="-47" y="603" className="task-status-completed" fontSize="18">
            Completed
          </text>
        </g>

        <g
          className={`task-card task-card-4 ${animate ? 'progress-animation' : ''}`}
        >
          <rect
            x="74"
            y="306"
            width="150" // Increased width
            height="70" // Increased height
            rx="10" // Increased border radius
            fill="#eafaf1"
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
};

export default ProgressTracker;
