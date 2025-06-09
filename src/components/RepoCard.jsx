import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

export default function RepoCard({ repo, githubOrg, index, _languages }) {
  const languages = _languages;

  const langs = {
    "React" : "https://img.shields.io/badge/React-004870?style=for-the-badge&logo=react",
    "TailwindCSS" : "https://img.shields.io/badge/TailwindCSS-006670?style=for-the-badge&logo=tailwindcss",
    "HTML" : "https://img.shields.io/badge/HTML-62291e?style=for-the-badge&logo=html5",
    "CSS" : "https://img.shields.io/badge/CSS-1e4762?style=for-the-badge&logo=css",
    "NodeJS" : "https://img.shields.io/badge/NodeJS-385836?style=for-the-badge&logo=nodedotjs",
    "Vite" : "https://img.shields.io/badge/Vite-363d58?style=for-the-badge&logo=vite",
    "MySQL" : "https://img.shields.io/badge/MySQL-00162d?style=for-the-badge&logo=mysql",
    "JavaScript": "https://img.shields.io/badge/JavaScript-474100?style=for-the-badge&logo=javascript",
    "Sequelize": "https://img.shields.io/badge/Sequelize-005382?style=for-the-badge&logo=sequelize",
    "Express" : "https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express",
    "TypeScript": "https://img.shields.io/badge/TypeScript-002234?style=for-the-badge&logo=typescript",
    "Python" : "https://img.shields.io/badge/Python-001f2d?style=for-the-badge&logo=python",
    "PHP" : "https://img.shields.io/badge/PHP-21002d?style=for-the-badge&logo=php",
    "Laravel" : "https://img.shields.io/badge/Laravel-0f0000?style=for-the-badge&logo=laravel",
    "C" : "https://img.shields.io/badge/C-1f2936?style=for-the-badge&logo=c",
    "C++" : "https://img.shields.io/badge/C%2B%2B-040039?style=for-the-badge&logo=cplusplus",
    "Linux" : "https://img.shields.io/badge/Linux-4e4900?style=for-the-badge&logo=linux",
    "Apache" : "https://img.shields.io/badge/Apache-4e0a09?style=for-the-badge&logo=apache",
    "Flask" : "https://img.shields.io/badge/Flask-010101?style=for-the-badge&logo=flask",
    "PostgreSQL" : "https://img.shields.io/badge/PostgreSQL-27273e?style=for-the-badge&logo=postgresql",
    "Markdown" : "https://img.shields.io/badge/Markdown-black?style=for-the-badge&logo=markdown"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="gradient-border"
    >
      <div className="p-6 h-full rounded-xl backdrop-blur-sm bg-gray-900/80">
        <div className="flex flex-col sm:flex-row items-center h-full">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <div className="overflow-hidden h-200 w-200 rounded-lg border border-gray-700 lg:h-[200px] lg:w-[200px] sm:w-28 sm:h-28">
                <img
                  src={`https://raw.githubusercontent.com/${githubOrg}/${repo.name}/${repo.default_branch}/brpub/cover.png`}
                  alt={repo.name}
                  className="object-cover h-full w-full bg-gray-800"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E";
                  }}
                />
              </div>
            </a>
          </div>

          <div className="flex flex-col h-[100%] w-[100%]">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white">{repo.name}</h3>
              <div className="flex space-x-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  title="GitHub Repository"
                >
                  <FiGithub size={20} />
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
                    title="Live Demo"
                  >
                    <FiExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
            <p className="mb-4 text-gray-400">{repo.description || 'A BufferRing project'}</p>

            <div className="flex flex-wrap gap-2">
              {repo.topics?.slice(0, 5).map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-800 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>

            {Array.isArray(languages) && languages.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {languages.map((langKey) => (
                  <img
                    key={langKey}
                    src={langs[langKey] || ''}
                    alt={`${langKey} badge`}
                    className="h-6"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mb-6">
                <p className="text-gray-500">No languages to display</p>
              </div>
            )}

            <div className="flex mt-[auto] justify-between items-center text-sm text-gray-500">
              <span className="flex mr-4 items-center">
                <div className="mr-1 w-3 h-3 bg-gray-500 rounded-full"></div>
                {repo.language || 'Code'}
              </span>
              <span className="flex mr-[auto] items-center">
                <FiStar className="mr-1 text-gray-400" />
                {repo.stargazers_count}
              </span>
              <span className="text-gray-500">
                Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}