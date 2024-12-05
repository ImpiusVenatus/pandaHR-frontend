import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  strokeColor?: string;
}

const DepartmentsIcon: React.FC<IconProps> = ({
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
      <circle cx="6" cy="4" r="2" stroke={strokeColor} strokeWidth="1.5" />
      <ellipse cx="6" cy="8" rx="3" ry="2" stroke={strokeColor} strokeWidth="1.5" />
      <circle cx="18" cy="16" r="2" stroke={strokeColor} strokeWidth="1.5" />
      <path
        d="M22 12C22 6.47715 17.5228 2 12 2M12 22C6.47715 22 2 17.5228 2 12"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="18" cy="20" rx="3" ry="2" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
};

export default DepartmentsIcon;
