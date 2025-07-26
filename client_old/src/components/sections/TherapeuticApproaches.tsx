import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Sparkles, 
  CloudRain, 
  Lightbulb 
} from 'lucide-react';
import { therapeuticApproaches } from '@/lib/data';

export default function TherapeuticApproaches() {
  // Define the icons and their colors for each approach
  const approachIcons = [
    { icon: <Brain className="h-6 w-6 text-blue-500" />, bgColor: "bg-blue-50" },
    { icon: <Heart className="h-6 w-6 text-green-500" />, bgColor: "bg-green-50" },
    { icon: <Sparkles className="h-6 w-6 text-purple-500" />, bgColor: "bg-purple-50" },
    { icon: <CloudRain className="h-6 w-6 text-amber-500" />, bgColor: "bg-amber-50" },
    { icon: <Lightbulb className="h-6 w-6 text-teal-500" />, bgColor: "bg-teal-50" }
  ];

  // Define gradient backgrounds for the cards with modern 2025 aesthetic
  const gradients = [
    "from-[#e0f2fe] to-white border-blue-200",
    "from-[#dcfce7] to-white border-green-200",
    "from-[#f3e8ff] to-white border-purple-200", 
    "from-[#fff7ed] to-white border-orange-200",
    "from-[#ecfeff] to-white border-teal-200"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-5 py-2 bg-white/40 backdrop-blur-sm text-primary border border-primary/20 rounded-full text-sm font-medium shadow-sm mb-4"
          >
            My Approach
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-text-primary mb-4"
          >
            I draw on a range of evidence-based therapeutic approaches
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-text-secondary max-w-3xl mx-auto"
          >
            I am an Accredited Mental Health Social Worker and feel deeply passionate about supporting 
            people to create positive change in their lives. I provide a non-judgmental, safe space for 
            all people to feel heard and understood. I carefully attune to the person and help them achieve 
            their goals for therapy.
          </motion.p>
        </div>
        
        {/* Modern 2025 CSS Grid layout with perfect centering */}
        <div className="w-full max-w-6xl mx-auto">
          {/* Unified grid approach for consistent layout across all screen sizes */}
          <div className="grid grid-flow-row gap-6 place-items-center">
            {/* First row: 3 cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {therapeuticApproaches.slice(0, 3).map((approach, index) => (
                <motion.div
                  key={`approach-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-b ${gradients[index]} rounded-3xl p-6 shadow-sm hover:shadow-md
                    transition-all duration-300 border group h-full w-full`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 ${approachIcons[index].bgColor} rounded-2xl flex items-center justify-center mb-4 
                      shadow-sm group-hover:shadow transition-all duration-300`}>
                      {approachIcons[index].icon}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-3">{approach.name}</h3>
                    <p className="text-text-secondary">{approach.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Second row: 2 cards perfectly centered */}
            <div className="flex justify-center w-full">
              <div className="inline-grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 w-full">
                {therapeuticApproaches.slice(3).map((approach, index) => {
                  const actualIndex = index + 3; // Adjust index for proper icon mapping
                  return (
                    <motion.div
                      key={`approach-${actualIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * actualIndex }}
                      viewport={{ once: true }}
                      className={`bg-gradient-to-b ${gradients[actualIndex]} rounded-3xl p-6 shadow-sm hover:shadow-md 
                        transition-all duration-300 border group h-full w-full`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-14 h-14 ${approachIcons[actualIndex].bgColor} rounded-2xl flex items-center justify-center mb-4 
                          shadow-sm group-hover:shadow transition-all duration-300`}>
                          {approachIcons[actualIndex].icon}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-text-primary mb-3">{approach.name}</h3>
                        <p className="text-text-secondary">{approach.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}