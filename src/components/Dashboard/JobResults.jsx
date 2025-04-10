import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ExternalLink, Building, MapPin, Clock, Briefcase } from 'lucide-react';

export default function JobResults() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const results = state?.data || [];

  const [showCredForm, setShowCredForm] = useState(false);
  const [currentLink, setCurrentLink] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleApplyClick = (link) => {
    setCurrentLink(link);
    setShowCredForm(true);
  };

  const applyToJob = async (link, credentials = null) => {
    try {
      navigate('/status', { state: { status: 'Applying...', link } });

      const payload = credentials
        ? { link, username: credentials.username, password: credentials.password }
        : { link };

      const res = await axios.post('http://localhost:5000/apply', payload);

      navigate('/status', {
        state: {
          status: res.data.message || 'Application Submitted!',
          link
        }
      });
    } catch (err) {
      navigate('/status', {
        state: {
          status: err.response?.data?.error || 'Application Failed!',
          link
        }
      });
    }
  };

  const handleSubmitCredentials = (e) => {
    e.preventDefault();
    applyToJob(currentLink, { username, password });
    setShowCredForm(false);
    setUsername('');
    setPassword('');
  };

  const JobCard = ({ job, platform }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{job.title || 'Job Opening'}</h3>
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
          {platform}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {job.company && (
          <div className="flex items-center gap-2 text-gray-300">
            <Building className="w-4 h-4" />
            <span>{job.company}</span>
          </div>
        )}
        {job.location && (
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
        )}
        {job.posted && (
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{job.posted}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleApplyClick(job.link)}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
        >
          Apply Now
        </button>
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white hover:text-indigo-300 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-8 h-8 text-white" />
          <h2 className="text-3xl font-bold text-white">Recommended Jobs</h2>
        </div>

        {results.map((role, index) => (
          <div key={index} className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">{role.role}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {role.linkedin_links.map((job, i) => (
                <JobCard key={`linkedin-${i}`} job={job} platform="LinkedIn" />
              ))}
              {role.workday_links.map((job, i) => (
                <JobCard key={`workday-${i}`} job={job} platform="Workday" />
              ))}
            </div>
          </div>
        ))}

        {showCredForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 w-full max-w-md"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Enter Workday Credentials</h3>
              <form onSubmit={handleSubmitCredentials} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Workday Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Workday Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCredForm(false)}
                    className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}