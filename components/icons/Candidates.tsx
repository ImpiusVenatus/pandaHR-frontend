import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
}

const CandidatesIcon: React.FC<IconProps> = ({
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
      <ellipse
        cx="10"
        cy="17.5"
        rx="7"
        ry="3.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="7"
        r="4"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0448 10.2498C14.7228 10.7487 14.3288 11.1968 13.8774 11.5793C14.2319 11.6904 14.609 11.7502 15.0001 11.7502C17.0712 11.7502 18.7501 10.0713 18.7501 8.00024C18.7501 6.04446 17.2529 4.43838 15.3421 4.26562C15.6083 4.78459 15.8011 5.34742 15.9068 5.94039C16.6979 6.28911 17.2501 7.08019 17.2501 8.00024C17.2501 9.22794 16.2668 10.226 15.0448 10.2498Z"
        fill={strokeColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.9997 17.5565C18.9896 18.1707 18.8148 18.7608 18.5009 19.3111C18.8693 19.2097 19.2144 19.0923 19.5312 18.9603C20.1284 18.7115 20.6606 18.3961 21.055 18.0076C21.452 17.6165 21.7501 17.1066 21.7501 16.5002C21.7501 15.8938 21.452 15.3839 21.055 14.9928C20.6606 14.6043 20.1284 14.2889 19.5312 14.0401C18.5086 13.614 17.1907 13.3396 15.7495 13.2686C16.7517 13.7776 17.5702 14.4172 18.1351 15.1445C18.4329 15.2277 18.7072 15.3218 18.9543 15.4247C19.443 15.6283 19.7894 15.8517 20.0023 16.0614C20.2125 16.2685 20.2501 16.4163 20.2501 16.5002C20.2501 16.5841 20.2125 16.7319 20.0023 16.939C19.7961 17.1421 19.4645 17.3581 18.9997 17.5565Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default CandidatesIcon;
