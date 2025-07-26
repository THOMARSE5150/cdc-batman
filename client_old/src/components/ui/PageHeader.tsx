import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative pt-40 pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7f7] to-white -z-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Decorative circles removed as requested */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center mb-4 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium relative group overflow-hidden hover:bg-primary/15 transition-colors duration-300"
            style={{
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer-slow"></div>
            {/* This shows the page section */}
            {title === "How I Can Help" ? "Professional Services" : 
             title === "Client Diversity" ? "Inclusive Counselling" : 
             title.includes("Meet Celia") ? "Accredited Mental Health Social Worker" : 
             title === "Frequently Asked Questions" ? "Your Questions Answered" : 
             title === "Contact Me" ? "Your Questions Answered" : 
             title.split(' ')[0]}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-text-secondary max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>
          )}
          
          {/* Decorative element */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-1 bg-primary/30 rounded-full mt-12"
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
