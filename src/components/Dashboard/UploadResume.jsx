import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, Search, CheckCircle } from 'lucide-react';

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    { icon: FileText, label: 'Analyzing Resume' },
    { icon: Search, label: 'Searching Jobs' },
    { icon: CheckCircle, label: 'Finding Matches' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      
      // Simulate steps with delays
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const response = await axios.post('http://localhost:5000/upload', formData);
      navigate('/results', { state: { data: response.data.links } });
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Upload Your Resume</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-12 h-12 text-white/70 mx-auto mb-4" />
              <p className="text-white/70">
                {file ? file.name : 'Drag and drop your resume or click to browse'}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Upload Resume'}
            </button>
          </form>

          {loading && (
            <div className="mt-12">
              <div className="flex justify-between relative">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: index <= currentStep ? 1 : 0.5 }}
                      className={`z-10 flex flex-col items-center gap-2 ${
                        index <= currentStep ? 'text-indigo-400' : 'text-white/30'
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                      <p className="text-sm">{step.label}</p>
                    </motion.div>
                  );
                })}
                <div className="absolute top-4 left-0 right-0 h-1 bg-white/20">
                  <motion.div
                    className="h-full bg-indigo-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}