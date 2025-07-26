import { motion } from "framer-motion";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-4 relative">
        {title}
        <span className="absolute left-0 bottom-0 w-20 h-1 bg-primary"></span>
      </h1>
      {subtitle && (
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}