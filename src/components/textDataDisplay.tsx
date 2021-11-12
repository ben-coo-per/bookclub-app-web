import React from "react";

interface TextDataDisplayProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

export const TextDataDisplay = ({
  label,
  children,
  className,
}: TextDataDisplayProps) => {
  return (
    <div className={`flex flex-col py-2 ${className}`}>
      <label className="text-sm text-subtleText text-sans">{label}</label>
      {children}
    </div>
  );
};
