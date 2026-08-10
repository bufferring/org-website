import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import RepoCard from '../components/RepoCard';
// import ActivityFeed from '../components/ActivityFeed';
import TeamCarousel from '../components/TeamCarousel';
import { useGitHubRepos } from '../hooks/useGitHubData';
import { GITHUB_ORG } from '../config/constants';
import useSectionObserver from '../hooks/useSectionObserver';
import ScrambleText from '../components/ScrambleText';

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
          <h2 className="mb-4 text-4xl font-bold text-white"><ScrambleText text="BufferRing Projects" /></h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            <ScrambleText text="Explore our latest open-source projects" />
          </p>
          {refreshing && !loading && (
            <motion.span
              className="inline-flex gap-2 items-center px-3 py-1 mt-4 text-xs tracking-wide text-gray-400 uppercase rounded-full border border-gray-700/70 bg-gray-900/60"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-ping" />
              <ScrambleText text="Updating in background" />
            </motion.span>
          )}
        </motion.div>

        <div className="mt-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[260px]">
              <div className="text-center">
                <div className="mx-auto spinner" />
                <p className="mt-4 text-lg text-gray-400"><ScrambleText text="Loading projects..." /></p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-[260px]">
              <div className="max-w-md text-center">
                <div className="mb-4 text-5xl text-gray-500">⚠️</div>
                <p className="mb-2 text-xl font-medium text-white"><ScrambleText text="API Limit Reached" /></p>
                <p className="text-gray-400"><ScrambleText text={error} /></p>
                <p className="mt-4 text-sm text-gray-500">
                  <ScrambleText text="View our GitHub directly:" />
                  <a
                    href={`https://github.com/${GITHUB_ORG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-gray-400 hover:underline"
                  >
                    <ScrambleText text={`github.com/${GITHUB_ORG}`} />
                  </a>
                </p>
              </div>
            </div>
          ) : repos.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500"><ScrambleText text="No projects discovered yet. Check back soon!" /></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 mx-auto max-w-3xl">
              {repos.map((repo, index) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  githubOrg={GITHUB_ORG}
                  index={index}
                  languages={languagesByRepo[index] || []}
                />
              ))}
            </div>
          )}
        </div>

        {/* Active Contributors section (ActivityFeed) - commented out
        <motion.div
          className="mt-24"
          data-aos="fade-up"
          data-aos-offset="120"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h3 className="mb-4 text-3xl font-bold text-center text-white">Active Contributors</h3>
          <p className="mx-auto max-w-2xl text-lg text-center text-gray-400">
            Meet the team making it happen
          </p>
          <div className="mt-12">
            <ActivityFeed />
          </div>
        </motion.div>
        */}

        <motion.div
          className="mt-24"
          data-aos="fade-up"
          data-aos-offset="120"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h3 className="mb-4 text-3xl font-bold text-center text-white"><ScrambleText text="Our Team" /></h3>
          <p className="mx-auto max-w-2xl text-lg text-center text-gray-400">
            <ScrambleText text="The people behind BufferRing" />
          </p>
          <div className="mt-12">
            <TeamCarousel />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
