import React, { useState, useEffect } from 'react';
import { FiGitCommit, FiGitPullRequest, FiStar, FiGitBranch, FiMessageCircle, FiAlertCircle } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { CACHE_KEYS, CACHE_DURATION, TEAM_MEMBERS } from '../config/constants';
import { getCachedEntry, setCachedEntry, isExpired } from '../utils/cache';
import ScrambleText from './ScrambleText';

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
                    <span className="font-semibold text-white"><ScrambleText text={activity.actor.login} /></span>
                    {' '}
                    <span className="text-gray-400"><ScrambleText text={config.getDescription(activity)} /></span>
                    {' '}
                    <a
                        href={`https://github.com/${activity.repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-200 hover:text-white hover:underline"
                    >
                        <ScrambleText text={activity.repo.name.split('/').pop()} />
                    </a>
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                    <ScrambleText text={formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })} />
                </p>
            </div>
        </div>
    );
};

const ActivityFeed = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const cached = getCachedEntry(CACHE_KEYS.GITHUB_ACTIVITY);
        if (cached?.data && !isExpired(cached.timestamp, CACHE_DURATION)) {
            setActivities(cached.data);
            setLoading(false);
        }

        const fetchActivities = async (silent = false) => {
            try {
                if (!silent) {
                    setLoading(true);
                }
                setError(null);

                const eventPromises = TEAM_MEMBERS.slice(0, 10).map(async (username) => {
                    try {
                        const response = await fetch(
                            `https://api.github.com/users/${username}/events/public?per_page=5`,
                            { headers: { Accept: 'application/vnd.github+json' } }
                        );

                        if (!response.ok) return [];

                        const events = await response.json();
                        return events.filter((event) => EVENT_CONFIGS[event.type]);
                    } catch {
                        return [];
                    }
                });

                const allEvents = await Promise.all(eventPromises);
                const flatEvents = allEvents.flat();

                const sortedEvents = flatEvents
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 12);

                if (!ignore) {
                    setCachedEntry(CACHE_KEYS.GITHUB_ACTIVITY, sortedEvents);
                    setActivities(sortedEvents);
                    setLoading(false);
                }
            } catch (err) {
                if (!ignore) {
                    setError('Failed to load activity');
                    console.error('Activity fetch error:', err);
                    setLoading(false);
                }
            }
        };

        const shouldRefresh = !cached || isExpired(cached?.timestamp, CACHE_DURATION);
        if (shouldRefresh) {
            fetchActivities(Boolean(cached));
        }

        const interval = setInterval(() => fetchActivities(true), CACHE_DURATION);
        return () => {
            ignore = true;
            clearInterval(interval);
        };
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
                        <div className="w-8 h-8 rounded-full border-b-2 animate-spin border-gray-500/50" />
                    </div>
                ) : error ? (
                    <div className="py-8 text-center">
                        <p className="text-xs text-gray-500"><ScrambleText text={error} /></p>
                    </div>
                ) : activities.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-xs text-gray-500"><ScrambleText text="No recent activity" /></p>
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

        </div>
    );
};

export default ActivityFeed;
