import { BookIcon } from "../../icons/BookIcon";

interface ButtonProps {
  variant?: "solid" | "outline" | "link";
  tailwindClasses?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  variant = "solid",
  tailwindClasses,
  children,
  type,
  onClick,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  if (variant === "outline") {
    return (
      <div>
        <button
          type={type}
          onClick={onClick}
          disabled={disabled || loading}
          className={`p-2 border-2 border-midnightBlue text-midnightBlue rounded-md disabled:opacity-50 font-semibold font-serif tracking-wider ${tailwindClasses}`}
        >
          <div className="flex flex-row gap-1 items-end">
            {loading && (
              <BookIcon className="animate-bounce" size="24" color="blue" />
            )}
            {children}
          </div>
        </button>
      </div>
    );
  }

  if (variant === "link") {
    return (
      <div>
        <button
          type={type}
          onClick={onClick}
          disabled={disabled || loading}
          className={`text-midnightBlue underline rounded-md disabled:opacity-50 text-left text-sm font-semibold font-serif  ${tailwindClasses}`}
        >
          {children}
        </button>
      </div>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`p-2 border-2 shadow-md border-midnightBlue bg-midnightBlue text-white disabled:opacity-75 rounded-md font-semibold font-serif tracking-wider  ${tailwindClasses}`}
    >
      <div className="flex flex-row gap-3 items-end">
        {loading && <BookIcon className="animate-spin" size="24" color="red" />}
        {children}
      </div>
    </button>
  );
};
