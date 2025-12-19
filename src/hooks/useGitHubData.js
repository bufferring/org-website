import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, CACHE_KEYS, CACHE_DURATION, GITHUB_ORG, REPO_COUNT } from '../config/constants';
import { getCachedEntry, setCachedEntry, isExpired } from '../utils/cache';

const normalizeRepo = (repo) => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  html_url: repo.html_url,
  homepage: repo.homepage,
  language: repo.language,
  stargazers_count: repo.stargazers_count,
  updated_at: repo.updated_at,
  topics: repo.topics,
  languages_url: repo.languages_url,
});

export const useGitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [languagesByRepo, setLanguagesByRepo] = useState([]);
  const [languageSummary, setLanguageSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const hydrateFromPayload = useCallback((payload) => {
    if (!payload) return;
    setRepos(payload.repos || []);
    setLanguagesByRepo(payload.languagesByRepo || []);
    setLanguageSummary(payload.languageSummary || []);
  }, []);

  useEffect(() => {
    let ignore = false;

    const cached = getCachedEntry(CACHE_KEYS.GITHUB_REPOS);
    if (cached?.data) {
      hydrateFromPayload(cached.data);
      setLoading(false);
    }

    const fetchRepos = async (silent = false) => {
      try {
        if (!silent) {
          setRefreshing(true);
        }
        setError(null);

        const reposResponse = await axios.get(
          API_ENDPOINTS.GITHUB_ORG_REPOS(GITHUB_ORG, REPO_COUNT),
          { headers: { Accept: 'application/vnd.github+json' } }
        );

        const filteredRepos = reposResponse.data
          .filter((repo) => !repo.fork && repo.description)
          .map(normalizeRepo);

        const languageRequests = filteredRepos.map((repo) =>
          axios
            .get(repo.languages_url, { headers: { Accept: 'application/vnd.github+json' } })
            .then((response) => response.data)
            .catch(() => ({}))
        );

        const languagesPayload = await Promise.all(languageRequests);

        const summarySet = new Set();
        const languagesMatrix = languagesPayload.map((langMap) => {
          const names = Object.keys(langMap || {});
          names.forEach((name) => summarySet.add(name));
          return names;
        });

        const payload = {
          repos: filteredRepos,
          languagesByRepo: languagesMatrix,
          languageSummary: Array.from(summarySet),
        };

        if (!ignore) {
          hydrateFromPayload(payload);
          setCachedEntry(CACHE_KEYS.GITHUB_REPOS, payload);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to fetch repositories');
          setLoading(false);
        }
      } finally {
        if (!ignore) {
          setRefreshing(false);
        }
      }
    };

    const cachedExpired = isExpired(cached?.timestamp, CACHE_DURATION);
    if (!cached || cachedExpired) {
      fetchRepos(Boolean(cached));
    }

    const refreshTimer = setInterval(() => fetchRepos(true), CACHE_DURATION);

    return () => {
      ignore = true;
      clearInterval(refreshTimer);
    };
  }, [hydrateFromPayload]);

  return { repos, languagesByRepo, languageSummary, loading, refreshing, error };
};
