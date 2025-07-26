import React from 'react';

export default function AASWBadge() {
  return (
    <div className="aasw-badge w-full h-full">
      <svg viewBox="0 0 300 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {/* Badge shape */}
        <path 
          d="M150,10 C230,30 280,100 290,150 C300,200 280,260 240,310 C200,360 180,380 150,390 C120,380 100,360 60,310 C20,260 0,200 10,150 C20,100 70,30 150,10 Z" 
          fill="#0c1f33" 
        />
        <path 
          d="M150,20 C220,38 270,100 278,150 C286,200 266,250 230,295 C194,340 180,365 150,375 C120,365 106,340 70,295 C34,250 14,200 22,150 C30,100 80,38 150,20 Z" 
          fill="white" 
        />
        <path 
          d="M160,30 C230,45 280,106 285,155 C290,205 265,255 230,300 C195,345 170,370 145,380 C115,370 95,345 60,300 C25,255 0,205 5,155 C10,106 60,45 130,30 C140,28 150,28 160,30 Z" 
          fill="#f8f9fa" 
        />
        
        {/* Blue shadow */}
        <path 
          d="M285,155 C290,205 265,255 230,300 C195,345 170,370 145,380 L150,390 C180,380 200,360 240,310 C280,260 300,200 290,150 L285,155 Z" 
          fill="#2a7ea5" 
          opacity="0.3"
        />
        
        {/* Logo Diamond - Moved higher up to prevent overlap with text */}
        <g transform="translate(110, 95)">
          {/* Left teal arrow */}
          <path d="M0,35 L35,0 L35,40 L17.5,57.5 L0,40 Z" fill="#0078a0" />
          
          {/* Right red arrow */}
          <path d="M40,0 L75,35 L57.5,52.5 L40,35 L40,0 Z" fill="#b2304e" />
          
          {/* Bottom red arrow */}
          <path d="M40,40 L57.5,57.5 L40,75 L22.5,57.5 Z" fill="#b2304e" />
        </g>
        
        {/* Registered trademark */}
        <circle cx="195" cy="100" r="5" fill="#b2304e" />
        <text x="195" y="102" fontSize="8" textAnchor="middle" fill="white">®</text>
        
        {/* Text - Increased spacing and adjusted positions */}
        <text x="150" y="205" fontSize="28" fontWeight="bold" textAnchor="middle" fill="#b2304e">AASW</text>
        <line x1="120" y1="215" x2="180" y2="215" stroke="#b2304e" strokeWidth="1" strokeDasharray="2,2" />
        
        <text x="150" y="245" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#b2304e">Accredited</text>
        <text x="150" y="270" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#b2304e">Mental Health</text>
        <text x="150" y="295" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#b2304e">Social Worker</text>
      </svg>
    </div>
  );
}