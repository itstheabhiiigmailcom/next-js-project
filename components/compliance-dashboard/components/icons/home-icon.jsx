import React from 'react';

const HomeIcon = ({
  width = 120,
  height = 120,
  strokeColor = '#0f766e',
  fillColor = '#0f766e',
  className = '',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 20V10M40 30H30M90 30H80M85 85H35V45L60 30L85 45V85Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 85V65H70V85M35 55H85M35 65H85M35 75H85"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 45H70V55H50V45Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="40" y="85" width="40" height="10" fill={fillColor} />
    </svg>
  );
};

export default HomeIcon;
