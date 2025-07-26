import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";
import { 
  Users, 
  Sparkles, 
  Globe, 
  Brain, 
  CloudLightning, 
  Sun, 
  ShieldCheck, 
  Heart, 
  Star, 
  Calendar,
  Lightbulb,
  CheckCircle,
  Target
} from "@/components/icons";


export default function ServicesPreview() {
  // Service icons mapping using centralized icon system
  const serviceIcons: Record<string, JSX.Element> = {
    "anxiety": <CloudLightning className="h-6 w-6 text-blue-500" />,
    "depression": <Sun className="h-6 w-6 text-green-500" />,
    "trauma": <ShieldCheck className="h-6 w-6 text-amber-500" />,
    "emotion-regulation": <Heart className="h-6 w-6 text-purple-500" />,
    "interpersonal": <Users className="h-6 w-6 text-teal-500" />,
    "self-esteem": <Star className="h-6 w-6 text-rose-500" />,
    "eating": <Globe className="h-6 w-6 text-indigo-500" />,
    "perfectionism": <CheckCircle className="h-6 w-6 text-fuchsia-500" />,
    "grief": <Calendar className="h-6 w-6 text-stone-500" />,
    "life-transitions": <Lightbulb className="h-6 w-6 text-cyan-500" />
  };

  // Background gradient colors for each service
  const gradientClasses: Record<string, string> = {
    "anxiety": "from-blue-50 via-blue-50 to-white",
    "depression": "from-green-50 via-green-50 to-white",
    "trauma": "from-amber-50 via-amber-50 to-white",
    "emotion-regulation": "from-purple-50 via-purple-50 to-white",
    "interpersonal": "from-teal-50 via-teal-50 to-white",
    "self-esteem": "from-rose-50 via-rose-50 to-white",
    "eating": "from-indigo-50 via-indigo-50 to-white",
    "perfectionism": "from-fuchsia-50 via-fuchsia-50 to-white",
    "grief": "from-stone-50 via-stone-50 to-white",
    "life-transitions": "from-cyan-50 via-cyan-50 to-white"
  };

  // Border colors for each service
  const borderColors: Record<string, string> = {
    "anxiety": "border-blue-200",
    "depression": "border-green-200",
    "trauma": "border-amber-200",
    "emotion-regulation": "border-purple-200",
    "interpersonal": "border-teal-200",
    "self-esteem": "border-rose-200",
    "eating": "border-indigo-200",
    "perfectionism": "border-fuchsia-200",
    "grief": "border-stone-200",
    "life-transitions": "border-cyan-200"
  };

  // Display all services directly
  return (
    <section className="py-8 md:py-20 bg-gradient-to-b from-secondary-light to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-5 py-2 bg-white/40 backdrop-blur-sm text-primary border border-primary/20 rounded-full text-sm font-medium shadow-sm mb-4"
          >
            Professional Services
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-text-primary mb-4"
          >
            How I Can Help
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Discover how I can support you to wellness, treating the following difficulties through counselling
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 md:mb-12">
          {services.map((service, index) => (
            <Link 
              key={service.id} 
              to={`/services#service-${service.id}`}
              className="block w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.33rem)]"
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${gradientClasses[service.id] || 'from-gray-50 to-white'} 
                  p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 
                  hover:scale-[1.02] border ${borderColors[service.id] || 'border-gray-100'} 
                  group relative overflow-hidden w-full h-full cursor-pointer`}
              >
                {/* Background decorative circle */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full 
                  bg-gradient-to-br from-white/0 to-white/80 opacity-40 transition-all 
                  duration-700 group-hover:scale-150"></div>
                
                {/* Service icon with color-matched background */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-white shadow-md mb-6 
                    flex items-center justify-center transform transition-transform 
                    duration-500 group-hover:rotate-6`}>
                    {serviceIcons[service.id] || 
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">{service.title[0]}</span>
                      </div>
                    }
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-3">{service.title}</h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.shortDescription || service.description}
                  </p>
                  
                  {/* Service card learn more indicator */}
                  <div className="flex items-center text-primary font-medium text-sm opacity-0 
                    transform translate-x-2 transition-all duration-300 group-hover:opacity-100 
                    group-hover:translate-x-0 cursor-pointer">
                    <span>Learn more</span>
                    <svg className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-white px-10 py-6 rounded-full
                hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl 
                hover:shadow-primary/20 font-medium text-lg group"
            >
              Explore All Services
              <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}