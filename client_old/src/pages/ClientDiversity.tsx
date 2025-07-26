import React, { useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { clientGroups } from "@/lib/data";
import { CheckIcon, UserIcon, HeartIcon, BrainIcon, UsersIcon, User2Icon, SparklesIcon, CircleIcon } from "lucide-react";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData, generateProfessionalServiceStructuredData } from "@/lib/structuredData";

// Import custom icons
import CulturalSensitivityIcon from "@/components/ui/diversity-icons/CulturalSensitivityIcon";
import LGBTQIAIcon from "@/components/ui/diversity-icons/LGBTQIAIcon";
import NeurodivergentIcon from "@/components/ui/diversity-icons/NeurodivergentIcon";
import TraumaInformedIcon from "@/components/ui/diversity-icons/TraumaInformedIcon";

export default function ClientDiversity() {
  useEffect(() => {
    const url = window.location.href;
    const structuredData = generateProfessionalServiceStructuredData({ 
      url,
      name: "Inclusive Counselling Services",
      description: "Inclusive counselling services for diverse clients including LGBTQIA+, culturally diverse, and neurodivergent individuals."
    });
    addStructuredData(structuredData);
  }, []);

  return (
    <>
      <SEO 
        title="Inclusive Counselling Services | Celia Dunsmore Counselling"
        description="Inclusive and culturally sensitive counselling services for diverse clients including LGBTQIA+, culturally diverse, and neurodivergent individuals in Geelong."
        canonicalPath="/client-diversity"
      />
      <PageHeader 
        title="Client Diversity" 
        description="Inclusive counselling services for people from all walks of life"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-text-secondary mb-4 max-w-2xl mx-auto leading-relaxed">
              I warmly welcome clients from all backgrounds and walks of life. My approach is deeply rooted
              in understanding each person's unique story and creating a safe space where you feel truly heard
              and respected.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Young Adults Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center mb-5">
              <div className="rounded-full w-14 h-14 flex items-center justify-center">
                <CircleIcon className="h-12 w-12 text-blue-500" strokeWidth={1} />
                <UserIcon className="h-6 w-6 text-blue-500 absolute" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2 text-center">Young Adults</h3>
            <p className="text-text-secondary text-center text-sm">
              Supportive counselling for emerging adults navigating identity, independence, and life transitions.
            </p>
          </motion.div>
          
          {/* Adults Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-green-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center mb-5">
              <div className="rounded-full w-14 h-14 flex items-center justify-center">
                <CircleIcon className="h-12 w-12 text-green-500" strokeWidth={1} />
                <UserIcon className="h-6 w-6 text-green-500 absolute" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2 text-center">Adults</h3>
            <p className="text-text-secondary text-center text-sm">
              Professional support for adults addressing work-life balance, relationships, and personal growth.
            </p>
          </motion.div>
          
          {/* Seniors Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-amber-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center mb-5">
              <div className="rounded-full w-14 h-14 flex items-center justify-center">
                <CircleIcon className="h-12 w-12 text-amber-500" strokeWidth={1} />
                <User2Icon className="h-6 w-6 text-amber-500 absolute" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2 text-center">Seniors</h3>
            <p className="text-text-secondary text-center text-sm">
              Supportive care for older adults navigating life transitions, loss, and finding ongoing meaning.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* LGBTQIA+ Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-purple-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center mb-5">
              <div className="rounded-full w-14 h-14 flex items-center justify-center">
                <CircleIcon className="h-12 w-12 text-purple-500" strokeWidth={1} />
                <HeartIcon className="h-6 w-6 text-purple-500 absolute" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2 text-center">LGBTQIA+ Affirming & Informed</h3>
            <p className="text-text-secondary text-center text-sm">
              Affirming and inclusive support for the diverse experiences of LGBTQIA+ individuals.
            </p>
          </motion.div>
          
          {/* Neurodivergent Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-teal-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center mb-5">
              <div className="rounded-full w-14 h-14 flex items-center justify-center">
                <CircleIcon className="h-12 w-12 text-teal-500" strokeWidth={1} />
                <BrainIcon className="h-6 w-6 text-teal-500 absolute" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2 text-center">Neurodivergent Affirming & Informed</h3>
            <p className="text-text-secondary text-center text-sm">
              Understanding and supportive approach for neurodivergent individuals including ADHD, autism, and sensory processing differences.
            </p>
          </motion.div>
          
          {/* ATSI Friendly Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-red-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center mb-5">
              <div className="rounded-full w-14 h-14 flex items-center justify-center">
                <CircleIcon className="h-12 w-12 text-red-500" strokeWidth={1} />
                <SparklesIcon className="h-6 w-6 text-red-500 absolute" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2 text-center">ATSI Friendly</h3>
            <p className="text-text-secondary text-center text-sm">
              Culturally sensitive counselling respecting Aboriginal and Torres Strait Islander perspectives and experiences.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-medium text-text-primary mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">My Approach to Diversity</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cultural Sensitivity Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] transition-all duration-300"
            >
              <div className="flex gap-6 items-start mb-4">
                <div className="flex-shrink-0">
                  {/* Import and use Custom SVG icon */}
                  <div className="w-16 h-16">
                    <CulturalSensitivityIcon />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-text-primary mb-2">Cultural Sensitivity</h3>
                  <p className="text-text-secondary leading-relaxed">
                    I recognise the important role that cultural background plays in shaping our experiences and perspectives. I strive to understand each person's cultural identity and how it influences their approach to the counselling process, honouring our differences.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* LGBTQIA+ Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] transition-all duration-300"
            >
              <div className="flex gap-6 items-start mb-4">
                <div className="flex-shrink-0">
                  {/* Import and use Custom SVG icon */}
                  <div className="w-16 h-16">
                    <LGBTQIAIcon />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-text-primary mb-2">LGBTQIA+ Affirming & Informed</h3>
                  <p className="text-text-secondary leading-relaxed">
                    I provide affirming and knowledgeable support for individuals of all gender identities and sexual orientations. I understand the unique challenges that may arise and create a safe space where you can explore these freely.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Neurodivergent Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] transition-all duration-300"
            >
              <div className="flex gap-6 items-start mb-4">
                <div className="flex-shrink-0">
                  {/* Import and use Custom SVG icon */}
                  <div className="w-16 h-16">
                    <NeurodivergentIcon />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-text-primary mb-2">Neurodivergent Affirming & Informed</h3>
                  <p className="text-text-secondary leading-relaxed">
                    I recognise and value neurodiversity, adapting my approach to accommodate different thinking styles, sensory needs, and communication preferences. My goal is to create an environment where neurodivergent individuals feel understood and supported.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Trauma-Informed Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] transition-all duration-300"
            >
              <div className="flex gap-6 items-start mb-4">
                <div className="flex-shrink-0">
                  {/* Import and use Custom SVG icon */}
                  <div className="w-16 h-16">
                    <TraumaInformedIcon />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-text-primary mb-2">Trauma-Informed</h3>
                  <p className="text-text-secondary leading-relaxed">
                    My practice is trauma informed, ensuring a strong therapeutic alliance and safe space is established before traumatic past experiences are reprocessed for integration and healing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        

      </div>
    </>
  );
}
