import React from "react";
import logoImage from "../../assets/images/header_logo.png";
import logoCircular from "../../assets/images/footer_logo.png";

interface LogoProps {
  variant?: "default" | "light" | "circular";
  className?: string;
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  // Use different logos based on variant
  let selectedLogo = logoImage;
  let imgClass = "h-12 md:h-16"; // Slightly smaller on mobile
  let containerClass = "flex items-center";
  
  if (variant === "circular") {
    // For circular variant, use the circular footer logo
    selectedLogo = logoCircular;
    imgClass = "h-24 sm:h-28"; // Slightly larger size as in the original
    containerClass = "flex items-center justify-center"; // Center it as in the original
  }
  
  return (
    <div className={`${containerClass} ${className}`}>
      <img 
        src={selectedLogo} 
        alt="Celia Dunsmore Counselling" 
        className={`${imgClass} ${variant === 'circular' ? 'transition-all duration-300' : ''}`}
      />
    </div>
  );
}
