import React from "react";

interface CheckboxProps {
  className?: string;
  name: string;
  checked?: boolean;
  onCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  className,
  name,
  checked = false,
  onCheck,
}: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onCheck}
      className={`${className} rounded text-midnightBlue w-5 h-5 cursor-pointer focus:ring-midnightBlue bg-none border-darkBlue border-2`}
    />
  );
};

export { Checkbox };
