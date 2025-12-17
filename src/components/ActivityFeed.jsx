import React, { useState, useEffect } from 'react';
import { FiGitCommit, FiGitPullRequest, FiStar, FiGitBranch, FiMessageCircle, FiAlertCircle } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

// LocalStorage key for caching activity data
const CACHE_KEY = 'github_activity_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// All team member GitHub usernames extracted from TeamCarousel
const TEAM_MEMBERS = [
    // Frontend
    'PotOfCode', 'Yumesitahack', 'AlfonzoPro', 'P13tr04', 'onweb-kym',
    // Backend
    'MrTanuk', 'zayas1234', 'Ailya45', 'Velangel', 'Hades-dev-code', 'GrandR4', 'WolveJC',
    // AI
    'Ray-Phamton', 'ImMau14', 'Theyobii', 'santcodex'
];

// Event type configurations
const EVENT_CONFIGS = {
    PushEvent: {
        icon: FiGitCommit,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        getDescription: (event) => {
            const commits = event.payload?.commits?.length || 0;
            return `pushed ${commits} commit${commits !== 1 ? 's' : ''} to`;
        }
    },
    PullRequestEvent: {
        icon: FiGitPullRequest,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        getDescription: (event) => `${event.payload?.action || 'updated'} PR in`
    },
    IssuesEvent: {
        icon: FiAlertCircle,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        getDescription: (event) => `${event.payload?.action || 'updated'} issue in`
    },
    IssueCommentEvent: {
        icon: FiMessageCircle,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        getDescription: () => 'commented on'
    },
    WatchEvent: {
        icon: FiStar,
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        getDescription: () => 'starred'
    },
    CreateEvent: {
        icon: FiGitBranch,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
        getDescription: (event) => `created ${event.payload?.ref_type || 'branch'} in`
    },
    ForkEvent: {
        icon: FiGitBranch,
        color: 'text-pink-400',
        bgColor: 'bg-pink-500/10',
        getDescription: () => 'forked'
    }
};

const ActivityItem = ({ activity }) => {
    const config = EVENT_CONFIGS[activity.type] || EVENT_CONFIGS.PushEvent;
    const Icon = config.icon;

    return (
        <div className="flex items-start gap-3 p-3 mx-3 rounded-lg bg-gray-900/40 border border-gray-800/50 backdrop-blur-sm min-w-[300px] hover:bg-gray-800/50 transition-all duration-300">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
                <img
                    src={activity.actor.avatar_url}
                    alt={activity.actor.login}
                    className="w-10 h-10 rounded-full border-2 border-gray-700/50"
                />
                <div className={`absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full ${config.bgColor} border border-gray-700/30`}>
                    <Icon className={`w-2.5 h-2.5 ${config.color}`} />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-300">
                    <span className="font-semibold text-white">{activity.actor.login}</span>
                    {' '}
                    <span className="text-gray-400">{config.getDescription(activity)}</span>
                    {' '}
                    <a
                        href={`https://github.com/${activity.repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-200 hover:text-white hover:underline"
                    >
                        {activity.repo.name.split('/').pop()}
                    </a>
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                </p>
            </div>
        </div>
    );
};

// Commented out Contributors section as requested
/*
const ContributorAvatar = ({ username }) => {
  const avatarUrl = `https://github.com/${username}.png?size=80`;
  
  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      title={username}
    >
      <img
        src={avatarUrl}
        alt={username}
        className="w-12 h-12 rounded-full border-2 border-gray-700 transition-all group-hover:border-gray-500 group-hover:scale-110"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${username}&background=374151&color=fff&size=80`;
        }}
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
};
*/

import { motion } from 'framer-motion';

const ActivityFeed = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Check localStorage cache first
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    const now = Date.now();

                    // Use cached data if it's still valid
                    if (now - timestamp < CACHE_DURATION) {
                        setActivities(data);
                        setLoading(false);
                        return;
                    }
                }

                setLoading(true);
                setError(null);

                // Fetch events for each team member (limited to prevent rate limiting)
                const eventPromises = TEAM_MEMBERS.slice(0, 10).map(async (username) => {
                    try {
                        const response = await fetch(
                            `https://api.github.com/users/${username}/events/public?per_page=5`
                        );

                        if (!response.ok) return [];

                        const events = await response.json();
                        return events.filter(event => EVENT_CONFIGS[event.type]);
                    } catch {
                        return [];
                    }
                });

                const allEvents = await Promise.all(eventPromises);
                const flatEvents = allEvents.flat();

                // Sort by date and take the most recent
                const sortedEvents = flatEvents
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 12);

                // Cache the results
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data: sortedEvents,
                    timestamp: Date.now()
                }));

                setActivities(sortedEvents);

            } catch (err) {
                setError('Failed to load activity');
                console.error('Activity fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();

        // Refresh every 5 minutes (same as cache duration)
        const interval = setInterval(fetchActivities, CACHE_DURATION);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full [perspective:1000px]">
            {/* Activity Carousel */}
            <motion.div
                className="overflow-hidden py-2"
                initial={{ rotateX: 90, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500/50" />
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-xs">{error}</p>
                    </div>
                ) : activities.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-xs">No recent activity</p>
                    </div>
                ) : (
                    <div className="marquee-container">
                        <div className="marquee-content">
                            {[...activities, ...activities].map((activity, idx) => (
                                <ActivityItem
                                    key={`${activity.id}-${idx}`}
                                    activity={activity}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Contributors Section - Commented Out as Requested */}
            {/* 
      <div className="pt-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Active Contributors</h3>
          <p className="text-sm text-gray-500">Meet the team making it happen</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {displayedContributors.map((username) => (
            <ContributorAvatar 
              key={username}
              username={username}
            />
          ))}
          {remainingCount > 0 && (
            <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-300">+{remainingCount}</span>
            </div>
          )}
        </div>
      </div>
      */}
        </div>
    );
};

export default ActivityFeed;
