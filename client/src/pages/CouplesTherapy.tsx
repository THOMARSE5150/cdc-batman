import { useEffect } from "react";
import { Link } from "wouter";

import { motion } from "framer-motion";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData } from "@/lib/structuredData";
import { MessageCircle, Users, Heart, ChevronRight } from "@/components/icons";

export default function CouplesTherapy() {
  useEffect(() => {
    // Add specialized couples therapy service structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalTherapy",
      "name": "Couples Therapy & Relationship Counselling",
      "description": "Professional couples therapy in Brunswick and Coburg Melbourne. Relationship counselling to improve communication and strengthen partnerships.",
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
      "medicalSpecialty": "Relationship Counselling",
      "availableService": [
        "Couples Communication Therapy",
        "Pre-marital Counselling",
        "Relationship Conflict Resolution",
        "Intimacy Counselling",
        "Separation Support"
      ]
    };
    addStructuredData(structuredData);
  }, []);

  return (
    <>
      <SEO
        title="Couples Therapy Brunswick & Coburg | Relationship Counselling Melbourne"
        description="Professional couples therapy in Brunswick and Coburg Melbourne. Relationship counselling to improve communication, resolve conflicts, and strengthen partnerships. Medicare rebates available."
        canonicalPath="/couples-therapy"
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
              <Heart className="mr-2 h-4 w-4" />
              Relationship Counselling
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              Couples Therapy in Brunswick & Coburg
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto"
            >
              Professional relationship counselling to strengthen your partnership, improve communication, and navigate challenges together with compassionate support.
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
                Book Couples Consultation
                <ChevronRight className="ml-2 h-5 w-5" />
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

      {/* Relationship Issues Addressed */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Relationship Challenges We Address
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Professional support for the common challenges that couples face in their relationships.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Communication Problems",
                  description: "Learning to express needs and listen effectively",
                  icon: MessageCircle
                },
                {
                  title: "Conflict Resolution",
                  description: "Healthy ways to navigate disagreements and disputes",
                  icon: Users
                },
                {
                  title: "Trust Issues",
                  description: "Rebuilding trust after betrayal or breach of confidence",
                  icon: Heart
                },
                {
                  title: "Intimacy Concerns",
                  description: "Reconnecting emotionally and physically in your relationship",
                  icon: Heart
                },
                {
                  title: "Life Transitions",
                  description: "Navigating major changes like marriage, parenting, or career shifts",
                  icon: Users
                },
                {
                  title: "Pre-marital Preparation",
                  description: "Building a strong foundation before marriage",
                  icon: MessageCircle
                }
              ].map((issue, index) => (
                <motion.div
                  key={issue.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <issue.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {issue.title}
                  </h3>
                  <p className="text-text-secondary">
                    {issue.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Therapeutic Approach */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                My Approach to Couples Therapy
              </h2>
              <p className="text-lg text-text-secondary">
                Evidence-based relationship counselling techniques to strengthen your partnership.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  title: "Emotionally Focused Therapy (EFT)",
                  description: "Helping couples identify and express their underlying emotions to create secure attachment bonds."
                },
                {
                  title: "Communication Skills Training",
                  description: "Learning practical techniques for active listening, expressing needs, and resolving conflicts constructively."
                },
                {
                  title: "Gottman Method Principles",
                  description: "Research-based strategies to build love maps, manage conflict, and create shared meaning in relationships."
                },
                {
                  title: "Narrative Therapy Approaches",
                  description: "Exploring the stories you tell about your relationship and co-creating more positive narratives together."
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

      {/* What to Expect */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                What to Expect in Couples Therapy
              </h2>
              <p className="text-lg text-text-secondary">
                A safe, non-judgmental space for both partners to explore and strengthen your relationship.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">
                  First Session
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-text-secondary">Assessment of relationship history and current challenges</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-text-secondary">Understanding each partner's perspective and goals</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-text-secondary">Establishing therapeutic goals and treatment plan</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">
                  Ongoing Sessions
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-text-secondary">Skill-building exercises and communication practice</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-text-secondary">Processing emotions and improving emotional connection</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-text-secondary">Homework assignments to practice new skills between sessions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Booking CTA */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Strengthen Your Relationship Today
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Convenient locations in Brunswick and Coburg for couples therapy sessions. Take the first step toward a stronger partnership.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Brunswick</h3>
                <p className="text-text-secondary">503 Sydney Road, Brunswick VIC 3056</p>
                <p className="text-sm text-primary mt-2">Evening appointments available</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Coburg</h3>
                <p className="text-text-secondary">81B Bell Street, Coburg VIC 3058</p>
                <p className="text-sm text-primary mt-2">Weekend sessions by arrangement</p>
              </div>
            </div>
            
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-medium transition-colors inline-flex items-center"
            >
              Book Your Couples Consultation
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}