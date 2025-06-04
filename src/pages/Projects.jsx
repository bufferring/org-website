import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

const GITHUB_ORG = "bufferring";
const REPO_COUNT = 3;

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.github.com/orgs/${GITHUB_ORG}/repos?sort=created&direction=desc&per_page=${REPO_COUNT}`
        );
        
        const filteredRepos = response.data.filter(repo => 
          !repo.fork && repo.description
        );
        
        setRepos(filteredRepos);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects. GitHub API rate limit may be exceeded. Try again later.');
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mx-auto spinner"></div>
          <p className="mt-4 text-lg text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md text-center">
          <div className="mb-4 text-5xl text-gray-500">⚠️</div>
          <p className="mb-2 text-xl font-medium text-white">API Limit Reached</p>
          <p className="text-gray-400">{error}</p>
          <p className="mt-4 text-sm text-gray-500">
            View our GitHub directly: 
            <a href={`https://github.com/${GITHUB_ORG}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="ml-1 text-gray-400 hover:underline">
              github.com/{GITHUB_ORG}
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-4xl font-bold text-white">BufferRing Projects</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Explore our latest open-source projects
          </p>
        </motion.div>

        {repos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No projects discovered yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 mx-auto max-w-3xl md:grid-cols-1">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                className="gradient-border"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="p-6 h-full rounded-xl backdrop-blur-sm bg-gray-900/80">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <div className="overflow-hidden w-24 h-24 rounded-lg border border-gray-700">
                          <img
                            src={`https://raw.githubusercontent.com/${GITHUB_ORG}/${repo.name}/master/public/cover.png`}
                            alt={repo.name}
                            className="object-cover w-full h-full bg-gray-800"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </a>
                    </div>
                    
                    <div className="flex-grow">
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
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics?.slice(0, 5).map((topic, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-800 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <div className="mr-1 w-3 h-3 bg-gray-500 rounded-full"></div>
                          {repo.language || 'Code'}
                        </span>
                        <span className="flex items-center">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
