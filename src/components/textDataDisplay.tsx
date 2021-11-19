import React from "react";

interface TextDataDisplayProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  truncate?: boolean;
}

export const TextDataDisplay = ({
  label,
  children,
  className,
  truncate = true,
}: TextDataDisplayProps) => {
  if (truncate) {
    return (
      <div className={`flex flex-col py-2 ${className}`}>
        <label className="text-sm text-subtleText font-serif font-normal">
          {label}
        </label>
        <p className="truncate font-bold text-darkBlue">{children}</p>
      </div>
    );
  }
  return (
    <div className={`flex flex-col py-2 ${className} text-darkBlue font-bold`}>
      <label className="text-sm text-subtleText font-serif font-normal">
        {label}
      </label>
      {children}
    </div>
  );
};
