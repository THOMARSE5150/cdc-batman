import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

// Modern 2025 transitions that are subtle but effective
const pageVariants = {
  initial: {
    opacity: 0,
    y: 5,
    filter: "blur(5px)",
    scale: 0.99,
  },
  in: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic-bezier for natural feel
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  out: {
    opacity: 0,
    y: -5,
    filter: "blur(5px)",
    scale: 1.01,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0],
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

// For staggered children animations within a page
export const itemVariants = {
  initial: { opacity: 0, y: 15 },
  in: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  out: { 
    opacity: 0, 
    y: -15,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
};

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const [location] = useLocation();
  
  // Use location as a key to ensure fresh animation on route change
  return (
    <motion.div
      key={location}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}