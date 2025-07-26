import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface SocialMediaLinksProps {
  variant?: 'header' | 'footer';
  className?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  variant = 'footer', 
  className = '' 
}) => {
  const baseClasses = variant === 'header' 
    ? 'flex items-center space-x-3' 
    : 'flex items-center justify-center space-x-4';

  const iconClasses = variant === 'header'
    ? 'w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors duration-200'
    : 'w-6 h-6 text-gray-500 hover:text-teal-600 transition-colors duration-200';

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/celiadunsmooreCounselling',
      icon: Facebook,
      ariaLabel: 'Visit Celia Dunsmore Counselling on Facebook'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/celiadunsmooreCounselling',
      icon: Instagram,
      ariaLabel: 'Follow Celia Dunsmore Counselling on Instagram'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/celia-dunsmore',
      icon: Linkedin,
      ariaLabel: 'Connect with Celia Dunsmore on LinkedIn'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/celiadunsmore',
      icon: Twitter,
      ariaLabel: 'Follow Celia Dunsmore on Twitter'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@celiadunsmooreCounselling',
      icon: Youtube,
      ariaLabel: 'Subscribe to Celia Dunsmore Counselling on YouTube'
    }
  ];

  return (
    <div className={`${baseClasses} ${className}`}>
      {variant === 'footer' && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 text-center">Follow us on social media</p>
        </div>
      )}
      <div className="flex items-center space-x-4">
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="group"
            >
              <IconComponent 
                className={`${iconClasses} group-hover:scale-110 transform transition-transform duration-200`}
              />
            </a>
          );
        })}
      </div>
      {variant === 'footer' && (
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Connect with us for mental health tips and updates
          </p>
        </div>
      )}
    </div>
  );
};

export default SocialMediaLinks;