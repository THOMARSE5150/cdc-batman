import React from 'react';

// Icon component props
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// Base icon component
const Icon: React.FC<IconProps> = ({ size = 24, className = '', children, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
    {...props}
  >
    {children}
  </svg>
);

// Icon definitions
export const ChevronUp: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polyline points="18 15 12 9 6 15" />
  </Icon>
);

export const ChevronDown: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polyline points="6 9 12 15 18 9" />
  </Icon>
);

export const ChevronLeft: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polyline points="15 18 9 12 15 6" />
  </Icon>
);

export const ChevronRight: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polyline points="9 18 15 12 9 6" />
  </Icon>
);

export const Mail: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </Icon>
);

export const MapPin: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

export const Phone: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

export const Clock: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);

export const Check: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

export const X: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

export const Menu: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

export const Calendar: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon>
);

export const User: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const Users: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const Star: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icon>
);

export const Heart: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Icon>
);

export const Brain: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M9.5 2C7.5 2 5.9 3.6 5.9 5.6c0 .5.1 1 .3 1.4A5.5 5.5 0 0 0 2 12.5C2 15.5 4.5 18 7.5 18c.5 0 1-.1 1.5-.2V22h6v-4.2c.5.1 1 .2 1.5.2 3 0 5.5-2.5 5.5-5.5 0-2.3-1.4-4.3-3.4-5.1.2-.4.3-.9.3-1.4 0-2-1.6-3.6-3.6-3.6-1.2 0-2.3.6-3 1.6-.7-1-1.8-1.6-3-1.6z" />
  </Icon>
);

export const Shield: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Icon>
);

export const Globe: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Icon>
);

export const CloudRain: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="16" y1="13" x2="16" y2="21" />
    <line x1="8" y1="13" x2="8" y2="21" />
    <line x1="12" y1="15" x2="12" y2="23" />
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
  </Icon>
);

export const Lightbulb: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.05 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </Icon>
);

export const Quote: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 0-1 1v3z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </Icon>
);

export const ArrowDown: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19,12 12,19 5,12" />
  </Icon>
);

export const ArrowDownCircle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12 12 16 16 12" />
    <line x1="12" y1="8" x2="12" y2="16" />
  </Icon>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </Icon>
);

export const Car: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 10c-.4-.2-.8-.3-1.2-.3H6.8c-.4 0-.8.1-1.2.3L3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </Icon>
);

export const Navigation: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </Icon>
);

export const MessageCircle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </Icon>
);

export const GraduationCap: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.7 3.3 3 6 3s6-1.3 6-3v-5" />
  </Icon>
);

export const Sparkles: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z" />
    <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
  </Icon>
);

export const ShieldCheck: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 12 15 16 10" />
  </Icon>
);

export const Info: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </Icon>
);

export const Circle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
  </Icon>
);

export const Leaf: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </Icon>
);

export const Flower: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
  </Icon>
);

export const CloudLightning: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" />
    <path d="m13 12-3 5h4l-3 5" />
  </Icon>
);

export const Sun: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34l1.41-1.41M16.24 16.24l1.41-1.41" />
  </Icon>
);

export const CheckCircle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </Icon>
);

export const Target: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </Icon>
);

export const AlertTriangle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Icon>
);

export const Send: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2z" />
  </Icon>
);

// Common aliases for compatibility
export const ChevronUpIcon = ChevronUp;
export const ChevronDownIcon = ChevronDown;
export const ChevronLeftIcon = ChevronLeft;
export const ChevronRightIcon = ChevronRight;
export const MailIcon = Mail;
export const MapPinIcon = MapPin;
export const PhoneIcon = Phone;
export const ClockIcon = Clock;
export const CheckIcon = Check;
export const XIcon = X;
export const MenuIcon = Menu;
export const CalendarIcon = Calendar;
export const UserIcon = User;
export const UsersIcon = Users;
export const StarIcon = Star;
export const HeartIcon = Heart;
export const BrainIcon = Brain;
export const ShieldIcon = Shield;
export const GlobeIcon = Globe;
export const CloudRainIcon = CloudRain;
export const LightbulbIcon = Lightbulb;
export const QuoteIcon = Quote;
export const ArrowDownIcon = ArrowDown;
export const ArrowDownCircleIcon = ArrowDownCircle;
export const ArrowRightIcon = ArrowRight;
export const CarIcon = Car;
export const NavigationIcon = Navigation;
export const MessageCircleIcon = MessageCircle;
export const GraduationCapIcon = GraduationCap;
export const SparklesIcon = Sparkles;
export const ShieldCheckIcon = ShieldCheck;
export const InfoIcon = Info;
export const CircleIcon = Circle;
export const LeafIcon = Leaf;
export const FlowerIcon = Flower;
export const CloudLightningIcon = CloudLightning;
export const SunIcon = Sun;
export const CheckCircleIcon = CheckCircle;
export const TargetIcon = Target;
export const AlertTriangleIcon = AlertTriangle;
export const SendIcon = Send;

// Export all icons as an object for easier access
export const Icons = {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  Check,
  X,
  Menu,
  Calendar,
  User,
  Users,
  Star,
  Heart,
  Brain,
  Shield,
  Globe,
  CloudRain,
  Lightbulb,
  Quote,
  ArrowDown,
  ArrowDownCircle,
  ArrowRight,
  Car,
  Navigation,
  MessageCircle,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Info,
  Circle,
  Leaf,
  Flower,
  CloudLightning,
  Sun,
  CheckCircle,
  Target,
  AlertTriangle,
  Send,
  // Aliases
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  CheckIcon,
  XIcon,
  MenuIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
  StarIcon,
  HeartIcon,
  BrainIcon,
  ShieldIcon,
  GlobeIcon,
  CloudRainIcon,
  LightbulbIcon,
  QuoteIcon,
  ArrowDownIcon,
  ArrowDownCircleIcon,
  ArrowRightIcon,
  CarIcon,
  NavigationIcon,
  MessageCircleIcon,
  GraduationCapIcon,
  SparklesIcon,
  ShieldCheckIcon,
  InfoIcon,
  CircleIcon,
  LeafIcon,
  FlowerIcon,
  CloudLightningIcon,
  SunIcon,
  CheckCircleIcon,
  TargetIcon,
  AlertTriangleIcon,
  SendIcon,
};

export default Icons;