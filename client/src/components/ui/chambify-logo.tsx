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
      <div className={`${sizes[size]} aspect-square bg-primary rounded-lg flex items-center justify-center text-white font-bold overflow-hidden`}>
        <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5L33 25H7L20 5Z" fill="white"/>
          <path d="M15 22H25V35H15V22Z" fill="white"/>
        </svg>
      </div>
      <div className="ml-2">
        <h1 className="font-poppins font-bold text-xl text-primary">Chambify</h1>
        <p className="text-xs text-secondary font-medium italic">Speed is the key</p>
      </div>
    </div>
  );
};

export default ChambifyLogo;
