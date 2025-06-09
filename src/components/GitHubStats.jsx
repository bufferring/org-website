import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { format, subMonths, parseISO, differenceInMonths } from 'date-fns';
import { FaChartBar, FaTimes } from 'react-icons/fa';
import ModalPortal from './ModalPortal';

const GitHubStats = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchGitHubStats = async () => {
    if (loading || stats) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
      );
      
      if (!reposResponse.ok) {
        throw new Error('Error fetching repository data');
      }

      const repos = await reposResponse.json();
      const publicRepos = repos.filter(repo => !repo.private);
      
      if (publicRepos.length === 0) {
        throw new Error('No public repositories found');
      }

      const commitPromises = publicRepos.map(async repo => {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`
        );
        
        if (!commitsResponse.ok) {
          return { commits: [], language: repo.language || 'Other' };
        }

        const commits = await commitsResponse.json();
        return {
          commits: commits.map(commit => ({
            date: commit.commit.author.date,
            message: commit.commit.message,
          })),
          language: repo.language || 'Other',
        };
      });

      const reposData = await Promise.all(commitPromises);

      const languageStats = {};
      const commitDates = [];
      let totalCommits = 0;

      reposData.forEach(repo => {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.commits.length;
        totalCommits += repo.commits.length;

        repo.commits.forEach(commit => {
          commitDates.push(parseISO(commit.date));
        });
      });

      const firstCommitDate = commitDates.length > 0 
        ? format(new Date(Math.min(...commitDates)), 'MMM yyyy')
        : 'No commits';

      const monthsActive = commitDates.length > 0
        ? differenceInMonths(new Date(), new Date(Math.min(...commitDates)))
        : 0;
      
      const averageCommitsPerMonth = totalCommits / Math.max(monthsActive, 1);

      let activityLevel = 'Beginner';
      if (averageCommitsPerMonth > 50) activityLevel = 'Expert';
      else if (averageCommitsPerMonth > 20) activityLevel = 'Advanced';
      else if (averageCommitsPerMonth > 5) activityLevel = 'Intermediate';

      const oneYearAgo = subMonths(new Date(), 12);
      const weeklyData = Array.from({ length: 52 }, (_, i) => {
        const weekStart = subMonths(new Date(), 12 - i);
        const weekEnd = subMonths(new Date(), 11 - i);
        
        const commitsInWeek = commitDates.filter(date => 
          date >= weekStart && date < weekEnd
        ).length;

        return {
          date: format(weekStart, 'MMM dd'),
          commits: commitsInWeek,
        };
      });

      setStats({
        totalCommits,
        languageData: Object.entries(languageStats)
          .filter(([_, count]) => count > 0)
          .map(([language, commits]) => ({
            language,
            commits,
          })),
        weeklyData,
        firstCommit: firstCommitDate,
        activityLevel,
        averageCommitsPerMonth: Math.round(averageCommitsPerMonth),
        publicReposCount: publicRepos.length,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStats = () => {
    setShowModal(true);
    if (!stats) {
      fetchGitHubStats();
    }
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <ModalPortal>
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9999] bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[10000] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div 
                className="relative w-[90%] md:w-[80%] lg:w-[70%] max-w-6xl bg-gray-900 rounded-xl p-6 md:p-8 shadow-2xl border border-gray-800"
                role="dialog"
                aria-modal="true"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute -top-2 -right-2 p-2 text-gray-400 hover:text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors z-[10001]"
                  aria-label="Cerrar modal"
                >
                  <FaTimes size={20} />
                </button>

                {/* Modal Content */}
                <div className="max-h-[85vh] overflow-y-auto pr-2">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </>
      </ModalPortal>
    );
  };

  return (
    <>
      <button
        onClick={handleViewStats}
        className="flex items-center px-3 py-1 space-x-1 text-xs text-gray-300 bg-gray-800 rounded-full transition-colors hover:bg-gray-700 w-fit"
        title="Stats"
      >
        <FaChartBar />
        <span>Stats</span>
      </button>

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-400 text-base">
              <p>Error loading stats: {error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setStats(null);
                  fetchGitHubStats();
                }}
                className="mt-4 text-gray-300 hover:text-white underline"
              >
                Try again
              </button>
            </div>
          ) : stats ? (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                GitHub Statistics
              </h3>

              {/* Activity Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">First Public Commit</p>
                  <p className="text-xl font-semibold text-white mt-1">{stats.firstCommit}</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">Activity Level</p>
                  <p className="text-xl font-semibold text-white mt-1">{stats.activityLevel}</p>
                </div>
              </div>

              {/* Repository Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">Public Repositories</p>
                  <p className="text-xl font-semibold text-white mt-1">{stats.publicReposCount}</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">Average Activity</p>
                  <p className="text-xl font-semibold text-white mt-1">
                    {stats.averageCommitsPerMonth}/month
                  </p>
                </div>
              </div>

              {/* Commit Activity Chart */}
              <div className="bg-gray-800/30 rounded-lg p-6">
                <p className="text-base text-gray-300 mb-4 text-center">
                  Commit Activity (Last Year)
                </p>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        tickLine={{ stroke: '#4B5563' }}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        tickLine={{ stroke: '#4B5563' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6',
                          fontSize: '14px',
                        }}
                        labelFormatter={(label) => `Semana: ${label}`}
                        formatter={(value) => [`${value} commits`, 'Commits']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="commits" 
                        stroke="#60A5FA" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Language Distribution */}
              {stats.languageData.length > 0 && (
                <div className="bg-gray-800/30 rounded-lg p-6">
                  <p className="text-base text-gray-300 mb-4 text-center">
                    Languages in Public Repositories
                  </p>
                  <div className="h-64 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.languageData}>
                        <XAxis 
                          dataKey="language" 
                          tick={{ fill: '#9CA3AF', fontSize: 12 }}
                          tickLine={{ stroke: '#4B5563' }}
                        />
                        <YAxis 
                          tick={{ fill: '#9CA3AF', fontSize: 12 }}
                          tickLine={{ stroke: '#4B5563' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '0.5rem',
                            color: '#F3F4F6',
                            fontSize: '14px',
                          }}
                          formatter={(value) => [`${value} commits`, 'Commits']}
                        />
                        <Bar 
                          dataKey="commits" 
                          fill="#60A5FA"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Summary Stats */}
              <div className="text-center p-6 bg-gray-800/30 rounded-lg">
                <p className="text-base text-gray-300">Total Public Commits</p>
                <p className="text-2xl font-semibold text-white mt-2">
                  {stats.totalCommits} commits
                </p>
              </div>
            </div>
          ) : null}
        </Modal>
      )}
    </>
  );
};

export default GitHubStats; 