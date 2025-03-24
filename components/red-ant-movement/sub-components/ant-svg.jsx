import { forwardRef } from 'react';
import '../index.scss';

const AntSVG = forwardRef(({ className }, ref) => {
  return (
    <svg
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      ref={ref}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Head with gradient */}
      <path
        d="M300 100 L375 150 L375 250 L300 300 L225 250 L225 150 Z"
        fill="url(#headGradient)"
      />

      {/* Eyes */}
      <circle cx="270" cy="180" r="15" fill="white" />
      <circle cx="330" cy="180" r="15" fill="white" />
      <circle cx="270" cy="180" r="8" fill="black" />
      <circle cx="330" cy="180" r="8" fill="black" />

      {/* Antennae */}
      <path
        className="ant-antenna"
        d="M260 120 Q240 90 230 70 M340 120 Q360 90 370 70"
        stroke="#E30000"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Body with gradient */}
      <path
        d="M300 500 L375 550 L375 650 L300 700 L225 650 L225 550 Z"
        fill="url(#bodyGradient)"
      />

      {/* Left legs with joints */}
      <path
        d="M225 200 Q175 175 125 150 Q100 175 75 200 M125 150 Q100 125 75 100"
        className="ant-leg left-leg front"
        stroke="#E30000"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M225 350 Q175 375 125 400 Q100 375 75 350"
        className="ant-leg left-leg middle"
        stroke="#E30000"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M225 600 Q175 625 125 650 Q100 625 75 600 M125 650 Q100 675 75 700"
        className="ant-leg left-leg back"
        stroke="#E30000"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Right legs with joints */}
      <path
        d="M375 200 Q425 175 475 150 Q500 175 525 200 M475 150 Q500 125 525 100"
        className="ant-leg right-leg front"
        stroke="#E30000"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M375 350 Q425 375 475 400 Q500 375 525 350"
        className="ant-leg right-leg middle"
        stroke="#E30000"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M375 600 Q425 625 475 650 Q500 625 525 600 M475 650 Q500 675 525 700"
        className="ant-leg right-leg back"
        stroke="#E30000"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Middle connector with more realistic shape */}
      <path
        d="M300 300 C300 350, 300 450, 300 500 
           M225 250 C175 300, 150 350, 225 550 
           M375 250 C425 300, 450 350, 375 550"
        stroke="#8B0000"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {/* Highlights */}
      <path
        d="M290 130 L340 160"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M290 530 L340 560"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Gradients definitions */}
      <defs>
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="100%" stopColor="#E30000" />
        </linearGradient>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E30000" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
      </defs>
    </svg>
  );
});

AntSVG.displayName = 'AntSVG';

export default AntSVG;
