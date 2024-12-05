import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  strokeColor?: string;
}

const AttendanceIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  strokeColor = "#16151C",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2V5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M9 15L10.7528 16.4023C11.1707 16.7366 11.7777 16.6826 12.1301 16.2799L15 13"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9H21"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AttendanceIcon;
