import { useEffect } from "react";
import { Link } from "wouter";
import { Eye } from "lucide-react";

import { motion } from "framer-motion";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData } from "@/lib/structuredData";

export default function EMDRTherapy() {
  useEffect(() => {
    // Add specialized EMDR service structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalTherapy",
      "name": "EMDR Therapy - Eye Movement Desensitization and Reprocessing",
      "description": "Professional EMDR therapy in Brunswick and Coburg Melbourne. Specialized trauma treatment using Eye Movement Desensitization and Reprocessing.",
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
      "medicalSpecialty": "Trauma Treatment",
      "availableService": [
        "EMDR Trauma Processing",
        "PTSD Treatment",
        "Complex Trauma Therapy",
        "Single Incident Trauma",
        "Childhood Trauma Recovery"
      ]
    };
    addStructuredData(structuredData);
  }, []);

  return (
    <>
      <SEO
        title="EMDR Therapy Brunswick & Coburg | Trauma Treatment Melbourne"
        description="Professional EMDR therapy in Brunswick and Coburg Melbourne. Specialized trauma treatment using Eye Movement Desensitization and Reprocessing. Medicare rebates available."
        canonicalPath="/emdr-therapy"
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
              <Eye className="mr-2 h-4 w-4" />
              EMDR Trauma Therapy
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              EMDR Therapy in Brunswick & Coburg
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto"
            >
              Evidence-based EMDR therapy for trauma recovery. Specialized treatment using Eye Movement Desensitization and Reprocessing to help process traumatic memories safely.
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
                Book EMDR Consultation
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

      {/* What is EMDR */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                What is EMDR Therapy?
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Eye Movement Desensitization and Reprocessing (EMDR) is an evidence-based therapy that helps the brain process traumatic memories.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">
                  How EMDR Works
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="h-6 w-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                    <p className="text-text-secondary">
                      Uses bilateral stimulation to help the brain reprocess traumatic memories naturally
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Eye className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-text-secondary">
                      Involves guided eye movements while recalling distressing memories
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="h-6 w-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    <p className="text-text-secondary">
                      Reduces the emotional charge of traumatic memories without losing important details
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-text-primary mb-4">
                  EMDR is Effective For:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Post-Traumatic Stress Disorder (PTSD)",
                    "Complex Trauma",
                    "Childhood Trauma",
                    "Single Incident Trauma",
                    "Anxiety and Phobias",
                    "Depression related to trauma"
                  ].map((condition) => (
                    <li key={condition} className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-text-secondary">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMDR Process */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                The EMDR Process
              </h2>
              <p className="text-lg text-text-secondary">
                EMDR follows a structured 8-phase protocol to ensure safe and effective trauma processing.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  phase: "Phases 1-2",
                  title: "Preparation & History",
                  description: "Building therapeutic relationship and learning coping strategies"
                },
                {
                  phase: "Phase 3",
                  title: "Assessment",
                  description: "Identifying target memories and establishing baseline measurements"
                },
                {
                  phase: "Phases 4-7",
                  title: "Processing",
                  description: "Active EMDR processing using bilateral stimulation techniques"
                },
                {
                  phase: "Phase 8",
                  title: "Reevaluation",
                  description: "Reviewing progress and ensuring treatment goals are met"
                }
              ].map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                      {index + 1}
                    </div>
                    <span className="text-sm text-primary font-medium">{phase.phase}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-text-secondary">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Effectiveness */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Evidence-Based Trauma Treatment
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              EMDR is recognized by leading health organizations worldwide as an effective treatment for trauma.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-text-primary mb-2">WHO Endorsed</h3>
                <p className="text-text-secondary text-sm">Recommended by World Health Organization for PTSD treatment</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Research Backed</h3>
                <p className="text-text-secondary text-sm">Extensive clinical research supporting effectiveness</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Safe Process</h3>
                <p className="text-text-secondary text-sm">Structured protocol ensures client safety throughout</p>
              </div>
            </div>
            
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-medium transition-colors inline-flex items-center"
            >
              Start Your EMDR Journey
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}