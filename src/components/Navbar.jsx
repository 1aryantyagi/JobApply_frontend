import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Home, Upload, LogOut, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-b border-white/20 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-semibold">
            <Home className="w-5 h-5" />
            <span>JobAI</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/upload"
                  className="flex items-center gap-2 text-white hover:text-indigo-300 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Resume</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-white hover:text-indigo-300 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 text-white hover:text-indigo-300 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}