import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
}

const HolidaysIcon: React.FC<IconProps> = ({
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
        d="M17 13H11M17 9H11M17 17H11M16 2V5M8 2V5M7 22H17C19.2091 22 21 20.2091 21 18V7.5C21 5.29086 19.2091 3.5 17 3.5H7C4.79086 3.5 3 5.29086 3 7.5V18C3 20.2091 4.79086 22 7 22Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.5 9C8.5 9.55228 8.05228 10 7.5 10C6.94772 10 6.5 9.55228 6.5 9C6.5 8.44772 6.94772 8 7.5 8C8.05228 8 8.5 8.44772 8.5 9Z"
        fill={strokeColor}
      />
      <path
        d="M8.5 13C8.5 13.5523 8.05228 14 7.5 14C6.94772 14 6.5 13.5523 6.5 13C6.5 12.4477 6.94772 12 7.5 12C8.05228 12 8.5 12.4477 8.5 13Z"
        fill={strokeColor}
      />
      <path
        d="M8.5 17C8.5 17.5523 8.05228 18 7.5 18C6.94772 18 6.5 17.5523 6.5 17C6.5 16.4477 6.94772 16 7.5 16C8.05228 16 8.5 16.4477 8.5 17Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default HolidaysIcon;