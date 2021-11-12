interface SkeletonProps {
  children?: React.ReactNode;
  isLoaded?: boolean;
  isError?: boolean;
  height?: number;
  width?: number;
}

interface SkeletonTextProps extends SkeletonProps {
  fontStyles?: string;
  errorFontStyles?: string;
}

export const SkeletonText = ({
  children,
  isLoaded = false,
  isError = false,
  fontStyles,
  errorFontStyles,
}: SkeletonTextProps) => {
  if (isError) {
    return <p className={errorFontStyles}>Error loading content</p>;
  }
  if (isLoaded) {
    return <p className={fontStyles}>{children}</p>;
  }

  return <div className="h-4 w-full rounded-full bg-champagne animate-pulse" />;
};

export const Skeleton = ({
  children,
  isLoaded = false,
  isError = false,
  height,
  width,
}: SkeletonProps) => {
  if (isLoaded) {
    return <div>{children}</div>;
  }

  return (
    <div
      className={`h-${height ? height : "full"} w-${
        width ? width : "full"
      } rounded-md bg-champagne animate-pulse`}
    />
  );
};
