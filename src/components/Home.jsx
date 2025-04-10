import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase as BriefcaseSearch, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-12 max-w-lg text-center border border-white/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <BriefcaseSearch className="w-10 h-10 text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          AI-Powered Job Search
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          Upload your resume and let our AI find the perfect job matches for you.
        </p>
        
        <Link
          to="/login"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get Started
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}