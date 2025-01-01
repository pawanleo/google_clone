import React from 'react';

const UploadIcon = ({ width = 24, height = 24, className = "", color = "currentColor" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      focusable="false"
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m4.41-7.59L11 7.83V16h2V7.83l2.59 2.59L17 9l-5-5-5 5 1.41 1.41z"></path>
    </svg>
  );
};

export default UploadIcon;
