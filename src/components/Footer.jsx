import React from 'react';
import { FiGithub, FiInstagram } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 py-8 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="flex items-center text-gray-400">
              Made with ♥ by BufferRing
            </p>
          </div>
          <div>
            <p className="text-gray-400">© {currentYear} BufferRing. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/bufferring"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="BufferRing on GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://instagram.com/bufferringorg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="BufferRing on Instagram"
            >
              <FiInstagram size={20} />
            </a>
            <a
              href="https://tiktok.com/@bufferringorg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="BufferRing on TikTok"
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
