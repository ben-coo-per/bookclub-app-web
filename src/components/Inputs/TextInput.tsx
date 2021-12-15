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
}: TextInputProps) => {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <label className="font-sans text-md text-subtleText ml-0.5">
        {label}
      </label>
      <input
        name={name}
        className="bg-background p-2.5 text-darkBlue border-2 border-darkBlue rounded-md font-serif text-md w-full"
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
