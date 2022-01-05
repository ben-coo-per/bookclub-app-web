import { ErrorMessage } from "formik";
import { ChangeEvent } from "react";

type onChangeType = {
  (e: ChangeEvent<any>): void;
  <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
    ? void
    : (e: string | ChangeEvent<any>) => void;
};

// Being Lazy
type onBlurType = any;

interface TextInputProps {
  placeholder?: string;
  label?: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: onChangeType;
  onBlur?: onBlurType;
  name: string;
  size?: "md" | "sm" | "lg";
}

export const TextInput = ({
  placeholder,
  label,
  className,
  type = "text",
  value,
  onChange,
  onBlur,
  name,
  size = "md",
}: TextInputProps) => {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <label className={`font-sans text-${size} text-subtleText ml-0.5`}>
        {label}
      </label>
      <input
        name={name}
        className={`bg-background p-${
          size == "sm" ? "1" : "2.5"
        } border-opacity-50 text-darkBlue border-2 border-darkBlue rounded-md font-serif text-${size} w-full`}
        placeholder={placeholder ? placeholder : ""}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-royalRed font-sans text-md ml-0.5"
      />
    </div>
  );
};
