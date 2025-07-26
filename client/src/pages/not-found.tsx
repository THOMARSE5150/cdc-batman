import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home, Search, Phone, ArrowLeft } from "lucide-react";

import { SEO } from "@/components/ui/SEO";

export default function NotFound() {
  const popularPages = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Search },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <>
      <SEO
        title="Page Not Found | Celia Dunsmore Counselling"
        description="The page you're looking for doesn't exist. Find professional counselling services and support at Celia Dunsmore Counselling."
        canonicalPath="/404"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-6xl font-bold text-primary mb-4">404</div>
            <h1 className="text-2xl font-semibold text-text-primary mb-4">
              Page Not Found
            </h1>
            <p className="text-text-secondary">
              The page you're looking for doesn't exist or may have been moved. 
              Let's get you back on track.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <h2 className="text-lg font-medium text-text-primary mb-4">
              Popular pages:
            </h2>
            <div className="grid gap-3">
              {popularPages.map((page, index) => {
                const Icon = page.icon;
                return (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      href={page.href}
                      className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/20 group"
                    >
                      <Icon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                      <span className="text-text-primary font-medium">
                        {page.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-lg shadow-primary/25"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
