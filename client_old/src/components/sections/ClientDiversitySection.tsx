import { motion } from "framer-motion";
import { clientGroups } from "@/lib/data";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  HeartHandshake, 
  Brain, 
  Shield
} from "lucide-react";

export default function ClientDiversitySection() {
  // Use all client groups
  const diversityApproaches = [
    {
      title: "Cultural Sensitivity",
      description: "I recognise the important role that cultural background plays in shaping our experiences and perspectives. I strive to understand each person's cultural identity and how it influences their approach to the counselling process, honouring our differences.",
      icon: Globe,
      color: "bg-gradient-to-br from-emerald-50 to-teal-100",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200"
    },
    {
      title: "LGBTQIA+ Affirming & Informed",
      description: "I provide affirming and knowledgeable support for individuals of all gender identities and sexual orientations. I understand the unique challenges that may arise and create a safe space where you can explore these freely.",
      icon: HeartHandshake,
      color: "bg-gradient-to-br from-purple-50 to-violet-100",
      iconColor: "text-violet-600",
      borderColor: "border-violet-200"
    },
    {
      title: "Neurodivergent Affirming & Informed",
      description: "I recognise and value neurodiversity, adapting my approach to accommodate different thinking styles and needs.",
      icon: Brain,
      color: "bg-gradient-to-br from-blue-50 to-sky-100",
      iconColor: "text-sky-600",
      borderColor: "border-sky-200"
    },
    {
      title: "Trauma-Informed",
      description: "My practice is trauma informed, ensuring a strong therapeutic alliance and safe space is established before traumatic past experiences are reprocessed for integration and healing.",
      icon: Shield,
      color: "bg-gradient-to-br from-amber-50 to-orange-100",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-text-primary mb-4 relative inline-block">
            My Approach to Diversity
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-light to-primary rounded-full"></span>
          </h2>
          <p className="text-text-secondary text-lg mt-4">
            Creating an inclusive and safe environment for clients aged 16 and up
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {diversityApproaches.map((approach, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border ${approach.borderColor} hover:translate-y-[-4px] group`}
            >
              <div className="flex items-start p-6 gap-4">
                <div className={`rounded-xl p-3 ${approach.color} group-hover:scale-110 transition-transform duration-300`}>
                  <approach.icon className={`h-7 w-7 ${approach.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-text-primary mb-2 group-hover:text-primary transition-colors">{approach.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{approach.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/client-diversity">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 hover:shadow-lg transition-all hover:scale-105 group"
            >
              Learn More
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
