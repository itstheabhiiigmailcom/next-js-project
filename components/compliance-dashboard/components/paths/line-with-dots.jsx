import React from 'react';

const LineWithDot = ({
  mounted,
  top,
  left,
  right,
  bottom,
  width,
  height,
  transform,
  className = '',
}) => {
  // Construct dynamic styles only for the given position props
  const positionStyles = {
    ...(top !== undefined && { top: `${top}%` }),
    ...(left !== undefined && { left: `${left}%` }),
    ...(right !== undefined && { right: `${right}%` }),
    ...(bottom !== undefined && { bottom: `${bottom}%` }),
    transform,
    position: 'absolute',
  };

  return (
    <svg
      className="absolute -translate-x-1/2 -translate-y-1/2 transform"
      width={width}
      height={height}
      viewBox="0 0 220 120"
      style={positionStyles}
    >
      <g className={` ${className}`}>
        <path
          d="M 38 59 H 136"
          fill="none"
          stroke="#059669"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        {mounted && (
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="#059669"
            stroke="#fff"
            strokeWidth="2"
            className="dot-animation-1"
          />
        )}
      </g>
    </svg>
  );
};

export default LineWithDot;
