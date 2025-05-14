import { FC } from "react";

interface ChambifyLogoProps {
  size?: "sm" | "md" | "lg";
}

const ChambifyLogo: FC<ChambifyLogoProps> = ({ size = "md" }) => {
  const sizes = {
    sm: "h-10",
    md: "h-12",
    lg: "h-16",
  };

  return (
    <div className="flex items-center">
      <img
        src="/images/logochambifyletrasazules.webp"
        alt="Chambify Logo"
        className={`${sizes[size]} object-contain`}
        style={{ aspectRatio: 'auto' }}
      />
    </div>
  );
};

export default ChambifyLogo;
