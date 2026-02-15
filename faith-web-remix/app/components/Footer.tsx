import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="glass rounded-xl shadow-lg p-4 sm:p-5 md:p-6 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Copyright */}
        <div className="text-white/60 text-xs sm:text-sm font-montserrat text-center sm:text-left">
          © {new Date().getFullYear()} Unified Faith Service. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link
            to="/about"
            className="text-white/60 hover:text-white text-xs sm:text-sm font-montserrat transition-smooth"
          >
            About
          </Link>
          <Link
            to="/privacy"
            className="text-white/60 hover:text-white text-xs sm:text-sm font-montserrat transition-smooth"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="text-white/60 hover:text-white text-xs sm:text-sm font-montserrat transition-smooth"
          >
            Terms
          </Link>
        </div>

        {/* Tagline */}
        <div className="text-white/80 text-xs sm:text-sm font-quicksand italic text-center sm:text-right">
          Made with ❤️ for the Ummah
        </div>
      </div>
    </footer>
  );
}
