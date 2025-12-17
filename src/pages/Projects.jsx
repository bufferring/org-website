import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import RepoCard from '../components/RepoCard.jsx';
import ActivityFeed from '../components/ActivityFeed';
import { useGitHubRepos } from '../hooks/useGitHubData';
import { GITHUB_ORG } from '../config/constants';

export default function Projects() {
  const { repos, languages, defLanguages, loading, error } = useGitHubRepos();

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
              <RepoCard
                key={repo.id}
                repo={repo}
                githubOrg={GITHUB_ORG}
                index={index}
                _languages={[...new Set([...languages[index], ...defLanguages[index]])]}
              />
            ))}
          </div>
        )}

        {/* Active Contributors Section - Moved from Home */}
        <div className="mt-24">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white">Active Contributors</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Meet the team making it happen
            </p>
          </motion.div>

          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
