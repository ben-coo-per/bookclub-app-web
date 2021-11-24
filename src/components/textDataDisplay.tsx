import React from "react";

interface TextDataDisplayProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  truncate?: boolean;
  darkMode?: boolean;
}

export const TextDataDisplay = ({
  label,
  children,
  className,
  truncate = true,
  darkMode = false,
}: TextDataDisplayProps) => {
  if (truncate) {
    return (
      <div className={`flex flex-col py-2 ${className}`}>
        <label
          className={`${
            darkMode ? "text-champagne" : "text-subtleText"
          } text-s font-serif font-normal`}
        >
          {label}
        </label>
        <p
          className={`${
            darkMode ? "text-white" : "text-darkBlue"
          } truncate font-bold `}
        >
          {children}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col py-2 ${className} ${
        darkMode ? "text-white" : "text-darkBlue"
      } font-bold`}
    >
      <label
        className={`${
          darkMode ? "text-champagne" : "text-subtleText"
        } text-s font-serif font-normal`}
      >
        {label}
      </label>
      {children}
    </div>
  );
};
