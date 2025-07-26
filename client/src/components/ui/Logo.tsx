// Use public folder paths for reliable production builds
const headerLogoImg = '/images/header_logo.png';
const cdcHighResLogoImg = '/images/cdc_high_res_logo.png';

interface LogoProps {
  variant?: "default" | "light" | "circular";
  className?: string;
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  // Use different logos based on variant
  let selectedLogo = headerLogoImg;
  let imgClass = "logo-header-sm md:logo-header-md lg:logo-header-lg"; // 20% smaller header logo
  let containerClass = "flex items-center";

  if (variant === "circular") {
    // For circular variant, use the circular footer logo
    selectedLogo = cdcHighResLogoImg;
    imgClass = "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"; // Much larger footer logo
    containerClass = "flex items-center justify-center";
  }

  return (
    <div className={`${containerClass} ${className}`}>
      <img 
        src={selectedLogo} 
        alt="Celia Dunsmore Counselling" 
        className={`${imgClass} object-contain transition-all duration-300 hover:opacity-90`}
      />
    </div>
  );
}