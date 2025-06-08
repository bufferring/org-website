import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import RepoCard from '../components/RepoCard.jsx';

const GITHUB_ORG = "bufferring";
const REPO_COUNT = 3;

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [defLanguages, setDefLanguages] = useState([]);
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

        const defLanguagesPromises = filteredRepos.map(async (repo) => {
          try {
            const response = await fetch(repo.languages_url);

            if (!response.ok) return [];
            const json = await response.json();
            let defLangs = [];

            for (const langName in json) {
              defLangs.push(langName);
            }

            return defLangs;
          } catch (err) {
            return [];
          }
        });

        const languagePromises = filteredRepos.map(async (repo) => {
          try {
            const response = await fetch(
              `https://raw.githubusercontent.com/${GITHUB_ORG}/${repo.name}/${repo.default_branch}/brpub/langdata.json`
            );

            if (!response.ok) return [];
            const json = await response.json();
            return json;
          } catch (err) {
            return [];
          }
        });

        const [defLanguageData, languageData] = await Promise.all([
          Promise.all(defLanguagesPromises),
          Promise.all(languagePromises)
        ]);

        setDefLanguages(defLanguageData);
        setLanguages(languageData); 

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
      </div>
    </div>
  );
}
