import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, CACHE_KEYS, CACHE_DURATION, GITHUB_ORG, REPO_COUNT } from '../config/constants';

export const useGitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [defLanguages, setDefLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);

        // Check cache
        const cached = localStorage.getItem(CACHE_KEYS.GITHUB_REPOS);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const now = Date.now();
          if (now - timestamp < CACHE_DURATION) {
            setRepos(data.repos);
            setLanguages(data.languages);
            setDefLanguages(data.defLanguages);
            setLoading(false);
            return;
          }
        }

        const response = await axios.get(
          API_ENDPOINTS.GITHUB_ORG_REPOS(GITHUB_ORG, REPO_COUNT)
        );

        const filteredRepos = response.data.filter(repo =>
          !repo.fork && repo.description
        );

        setRepos(filteredRepos);

        const defLanguagesPromises = filteredRepos.map(async (repo) => {
          const langResponse = await axios.get(repo.languages_url);
          return langResponse.data;
        });

        const defLanguagesData = await Promise.all(defLanguagesPromises);
        setDefLanguages(defLanguagesData);

        const allLanguages = new Set();
        defLanguagesData.forEach(langs => {
          Object.keys(langs).forEach(lang => allLanguages.add(lang));
        });
        setLanguages(Array.from(allLanguages));

        // Cache the data
        const cacheData = {
          repos: filteredRepos,
          languages: Array.from(allLanguages),
          defLanguages: defLanguagesData,
          timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEYS.GITHUB_REPOS, JSON.stringify(cacheData));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { repos, languages, defLanguages, loading, error };
};
