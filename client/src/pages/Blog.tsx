import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { SEO } from "@/components/ui/SEO";
import PageHeader from "@/components/ui/PageHeader";
import SimpleBreadcrumb from "@/components/ui/SimpleBreadcrumb";
import { addStructuredData } from "@/lib/structuredData";
import { useEffect } from "react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: string;
  featured: boolean;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "anxiety-management-melbourne",
    title: "5 Evidence-Based Anxiety Management Techniques for Melbourne Residents",
    excerpt: "Discover practical anxiety management strategies specifically tailored for the unique stressors of living in Melbourne's inner north.",
    publishDate: "2025-01-20",
    readTime: "8 min read",
    category: "Anxiety Support",
    featured: true,
    image: "/images/blog/anxiety-management.webp"
  },
  {
    slug: "trauma-recovery-guide-melbourne",
    title: "Understanding Trauma Recovery: A Comprehensive Guide for Melbourne Communities",
    excerpt: "Learn about trauma-informed care approaches and recovery resources available in Brunswick, Coburg, and surrounding areas.",
    publishDate: "2025-01-18",
    readTime: "12 min read",
    category: "Trauma Recovery",
    featured: true,
    image: "/images/blog/trauma-recovery.webp"
  },
  {
    slug: "emdr-therapy-explained",
    title: "EMDR Therapy Explained: How Eye Movement Therapy Helps Process Trauma",
    excerpt: "Understanding how EMDR (Eye Movement Desensitization and Reprocessing) therapy works and what to expect from sessions.",
    publishDate: "2025-01-15",
    readTime: "10 min read",
    category: "Therapy Approaches",
    featured: false
  },
  {
    slug: "melbourne-mental-health-resources",
    title: "Complete Guide to Mental Health Resources in Melbourne's Inner North",
    excerpt: "A comprehensive directory of mental health services, support groups, and crisis resources in Brunswick, Coburg, and surrounding suburbs.",
    publishDate: "2025-01-12",
    readTime: "15 min read",
    category: "Resources",
    featured: false
  },
  {
    slug: "seasonal-depression-melbourne",
    title: "Managing Seasonal Depression in Melbourne: Understanding Winter Mental Health",
    excerpt: "How Melbourne's unique climate affects mental health and strategies for managing seasonal affective symptoms.",
    publishDate: "2025-01-10",
    readTime: "7 min read",
    category: "Depression Support",
    featured: false
  },
  {
    slug: "workplace-stress-inner-north",
    title: "Workplace Stress in Melbourne's Inner North: Identification and Management",
    excerpt: "Addressing work-related stress and burnout specific to professionals in Brunswick, Fitzroy, and Coburg areas.",
    publishDate: "2025-01-08",
    readTime: "9 min read",
    category: "Workplace Wellbeing",
    featured: false
  }
];

export default function Blog() {
  useEffect(() => {
    // Add Blog structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Celia Dunsmore Counselling Blog",
      "description": "Mental health insights, therapy guides, and wellness resources from Accredited Mental Health Social Worker Celia Dunsmore in Melbourne.",
      "url": "https://celiadunsmorecounselling.com.au/blog",
      "author": {
        "@type": "Person",
        "name": "Celia Dunsmore",
        "jobTitle": "Accredited Mental Health Social Worker"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Celia Dunsmore Counselling",
        "url": "https://celiadunsmorecounselling.com.au"
      },
      "mainEntity": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "url": `https://celiadunsmorecounselling.com.au/blog/${post.slug}`,
        "datePublished": post.publishDate,
        "author": {
          "@type": "Person",
          "name": "Celia Dunsmore"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Celia Dunsmore Counselling"
        }
      }))
    };
    addStructuredData(structuredData);
  }, []);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <SEO
        title="Mental Health Blog | Professional Insights & Resources | Celia Dunsmore Counselling"
        description="Expert mental health insights, therapy guides, and wellness resources from Celia Dunsmore, Accredited Mental Health Social Worker in Melbourne's inner north."
        canonicalPath="/blog"
      />
      
      <PageHeader 
        title="Mental Health Blog & Resources" 
        description="Expert insights, practical guides, and wellness resources to support your mental health journey"
      />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <SimpleBreadcrumb />
        
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-text-primary mb-8"
            >
              Featured Articles
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.image && (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <div className="text-center text-text-secondary">
                        <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Featured Article</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishDate).toLocaleDateString('en-AU')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-text-secondary mb-4">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}
        
        {/* All Posts Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-text-primary mb-8"
          >
            All Articles
          </motion.h2>
          
          <div className="grid gap-6">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishDate).toLocaleDateString('en-AU')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-text-secondary mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="md:ml-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        
        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Stay Updated with Mental Health Insights
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Get the latest articles, mental health tips, and resources delivered to your inbox. 
            Practical guidance for your wellness journey in Melbourne's inner north.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            Get In Touch
            <User className="ml-2 h-5 w-5" />
          </Link>
        </motion.section>
      </div>
    </>
  );
}