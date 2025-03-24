import React from 'react';

const UserIcon = ({
  width = 36,
  height = 36,
  bgColor = '#64748b',
  fillColor = '#e2e8f0',
  strokeColor = '#e2e8f0',
  className = '',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" fill={bgColor} />
      <path
        d="M18 15C20.2091 15 22 13.2091 22 11C22 8.79086 20.2091 7 18 7C15.7909 7 14 8.79086 14 11C14 13.2091 15.7909 15 18 15Z"
        fill={fillColor}
      />
      <path
        d="M26 29V27C26 23.6863 23.3137 21 20 21H16C12.6863 21 10 23.6863 10 27V29"
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};

export default UserIcon;
