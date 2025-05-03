import React from "react";

export type ButtonProps = {
  href: string;
  className?: string;
  platform: "twitter" | "google" | "github";
  icon: React.ElementType;
};

export const SocialButton: React.FC<ButtonProps> = ({
  href,
  className = "",
  platform = "twitter",
  icon: Icon,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center
        px-3 h-9 rounded-xl
        bg-black/100
        border border-gray-500/30
        text-gray-100
        shadow-none
        transition-all duration-200
        font-medium
        select-none
        text-sm
        hover:bg-black/300
        hover:text-gray-50

        ${className}
      `}
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <Icon className="mr-2 w-4 h-4 text-gray-100" />
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </a>
  );
};
