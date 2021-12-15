import { BookIcon } from "../../icons/BookIcon";

interface ButtonProps {
  variant?: "solid" | "outline" | "link";
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeType;
}

type SizeType = "sm" | "md" | "lg";

function sizeMapper(size: SizeType) {
  if (size === "sm") {
    return "16";
  }
  if (size === "md") {
    return "20";
  }
  if (size === "lg") {
    return "24";
  }
}

export const Button = ({
  variant = "solid",
  className,
  children,
  type,
  onClick,
  disabled = false,
  loading = false,
  size = "md",
}: ButtonProps) => {
  if (variant === "outline") {
    return (
      <div>
        <button
          type={type}
          onClick={onClick}
          disabled={disabled || loading}
          className={`p-2 border-2 border-midnightBlue text-midnightBlue rounded-md disabled:opacity-50 font-semibold font-serif tracking-wider ${className}`}
        >
          <div className={`flex flex-row gap-1 items-end text-${size}`}>
            {loading && (
              <BookIcon
                className="animate-bounce"
                size={sizeMapper(size)}
                color="blue"
              />
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
          className={`text-midnightBlue underline rounded-md disabled:opacity-50 text-left text-sm font-semibold font-serif  ${className}`}
        >
          {children}
        </button>
      </div>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`p-2 border-2 shadow-md border-midnightBlue bg-midnightBlue text-white disabled:opacity-75 rounded-md font-semibold font-serif tracking-wider  ${className}`}
    >
      <div className="flex flex-row gap-3 items-end">
        {loading && <BookIcon className="animate-spin" size="24" color="red" />}
        {children}
      </div>
    </button>
  );
};
