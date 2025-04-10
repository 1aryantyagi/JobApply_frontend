import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react';

export default function Status() {
  const { state } = useLocation();
  const status = state?.status || 'Loading...';
  const link = state?.link;
  const isSuccess = status.toLowerCase().includes('submitted') || status.toLowerCase().includes('success');

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            {isSuccess ? (
              <CheckCircle className="w-full h-full text-green-400" />
            ) : (
              <XCircle className="w-full h-full text-red-400" />
            )}
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-6">Application Status</h2>
          
          <div className="space-y-4">
            <p className="text-xl text-white/90">{status}</p>
            
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                View Job Posting
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}