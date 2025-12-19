import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import RepoCard from '../components/RepoCard';
import ActivityFeed from '../components/ActivityFeed';
import { useGitHubRepos } from '../hooks/useGitHubData';
import { GITHUB_ORG } from '../config/constants';
import useSectionObserver from '../hooks/useSectionObserver';

export default function ProjectsSection({ id }) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  useSectionObserver(id, sectionRef);

  const { repos, languagesByRepo, loading, refreshing, error } = useGitHubRepos();

  const heroVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: 'easeOut' },
        },
      };

  return (
    <section id={id} ref={sectionRef} className="relative pt-24 pb-24">
      <div className="relative z-10 px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          data-aos="fade-up"
          data-aos-offset="160"
          variants={heroVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">BufferRing Projects</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Explore our latest open-source projects
          </p>
          {refreshing && !loading && (
            <motion.span
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-700/70 bg-gray-900/60 px-3 py-1 text-xs uppercase tracking-wide text-gray-400"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="h-2 w-2 animate-ping rounded-full bg-gray-400" />
              Updating in background
            </motion.span>
          )}
        </motion.div>

        <div className="mt-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[260px]">
              <div className="text-center">
                <div className="mx-auto spinner" />
                <p className="mt-4 text-lg text-gray-400">Loading projects...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-[260px]">
              <div className="max-w-md text-center">
                <div className="mb-4 text-5xl text-gray-500">⚠️</div>
                <p className="mb-2 text-xl font-medium text-white">API Limit Reached</p>
                <p className="text-gray-400">{error}</p>
                <p className="mt-4 text-sm text-gray-500">
                  View our GitHub directly:
                  <a
                    href={`https://github.com/${GITHUB_ORG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-gray-400 hover:underline"
                  >
                    github.com/{GITHUB_ORG}
                  </a>
                </p>
              </div>
            </div>
          ) : repos.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">No projects discovered yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 mx-auto max-w-3xl">
              {repos.map((repo, index) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  githubOrg={GITHUB_ORG}
                  index={index}
                  _languages={languagesByRepo[index] || []}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          className="mt-24"
          data-aos="fade-up"
          data-aos-offset="120"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Active Contributors</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 text-center">
            Meet the team making it happen
          </p>
          <div className="mt-12">
            <ActivityFeed />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
