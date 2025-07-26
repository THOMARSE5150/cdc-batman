import { useEffect } from "react";
import { Link } from "wouter";
import { Brain, Heart, Shield } from "lucide-react";

import { motion } from "framer-motion";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData } from "@/lib/structuredData";

export default function AnxietyTherapy() {
  useEffect(() => {
    // Add specialized service structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalTherapy",
      "name": "Anxiety Therapy & Treatment",
      "description": "Professional anxiety therapy services in Brunswick and Coburg Melbourne. Evidence-based treatments for anxiety disorders, panic attacks, and social anxiety.",
      "provider": {
        "@type": "Person",
        "name": "Celia Dunsmore",
        "jobTitle": "Accredited Mental Health Social Worker"
      },
      "location": [
        {
          "@type": "Place",
          "name": "Brunswick",
          "address": "503 Sydney Road, Brunswick VIC 3056"
        },
        {
          "@type": "Place", 
          "name": "Coburg",
          "address": "81B Bell Street, Coburg VIC 3058"
        }
      ],
      "medicalSpecialty": "Anxiety Disorders",
      "availableService": [
        "Generalized Anxiety Disorder Treatment",
        "Panic Disorder Therapy",
        "Social Anxiety Treatment",
        "Phobia Treatment",
        "Anxiety Management Techniques"
      ]
    };
    addStructuredData(structuredData);
  }, []);

  return (
    <>
      <SEO
        title="Anxiety Therapy Brunswick & Coburg | Anxiety Treatment Melbourne"
        description="Professional anxiety therapy in Brunswick and Coburg Melbourne. Specialized treatment for anxiety disorders, panic attacks, and social anxiety. Medicare rebates available."
        canonicalPath="/anxiety-therapy"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Specialized Anxiety Treatment
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              Anxiety Therapy in Brunswick & Coburg
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto"
            >
              Professional anxiety treatment using evidence-based therapies to help you manage anxiety, reduce panic attacks, and regain control of your life.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center"
              >
                Book Anxiety Assessment
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link
                href="/meet-celia"
                className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-medium transition-colors"
              >
                About Your Therapist
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Anxiety Conditions Treated */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Anxiety Conditions I Treat
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Specialized treatment for various anxiety disorders using evidence-based therapeutic approaches.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Generalized Anxiety Disorder",
                  description: "Persistent worry and anxiety about everyday situations",
                  icon: Brain
                },
                {
                  title: "Panic Disorder",
                  description: "Sudden episodes of intense fear and physical symptoms",
                  icon: Heart
                },
                {
                  title: "Social Anxiety",
                  description: "Fear of social situations and being judged by others",
                  icon: Shield
                },
                {
                  title: "Specific Phobias",
                  description: "Intense fear of specific objects or situations",
                  icon: Brain
                },
                {
                  title: "Work-Related Anxiety",
                  description: "Anxiety affecting workplace performance and relationships",
                  icon: Shield
                },
                {
                  title: "Health Anxiety",
                  description: "Excessive worry about health and physical symptoms",
                  icon: Heart
                }
              ].map((condition, index) => (
                <motion.div
                  key={condition.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <condition.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {condition.title}
                  </h3>
                  <p className="text-text-secondary">
                    {condition.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                My Approach to Anxiety Treatment
              </h2>
              <p className="text-lg text-text-secondary">
                Evidence-based therapies tailored to your specific anxiety symptoms and goals.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  title: "Cognitive Behavioral Therapy (CBT)",
                  description: "Learn to identify and change negative thought patterns that contribute to anxiety."
                },
                {
                  title: "Mindfulness-Based Approaches",
                  description: "Develop present-moment awareness to reduce anxiety and improve emotional regulation."
                },
                {
                  title: "Exposure Therapy",
                  description: "Gradual, safe exposure to anxiety triggers to reduce fear responses over time."
                },
                {
                  title: "Relaxation Techniques",
                  description: "Learn practical tools like deep breathing and progressive muscle relaxation."
                }
              ].map((approach, index) => (
                <motion.div
                  key={approach.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <svg className="h-6 w-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {approach.title}
                    </h3>
                    <p className="text-text-secondary">
                      {approach.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Booking CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Start Your Anxiety Recovery Journey
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Convenient locations in Brunswick and Coburg, plus telehealth options. Medicare rebates available with Mental Health Care Plan.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Brunswick</h3>
                <p className="text-text-secondary">503 Sydney Road, Brunswick VIC 3056</p>
                <p className="text-sm text-primary mt-2">Excellent public transport access</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Coburg</h3>
                <p className="text-text-secondary">81B Bell Street, Coburg VIC 3058</p>
                <p className="text-sm text-primary mt-2">Fortnightly appointments available</p>
              </div>
            </div>
            
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-medium transition-colors inline-flex items-center"
            >
              Book Your Anxiety Assessment Today
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}