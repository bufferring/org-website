const STORAGE_NAMESPACE = 'bufferring:cache:v1';

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return window.localStorage;
  } catch (error) {
    console.warn('LocalStorage unavailable, cache disabled.', error);
    return null;
  }
};

const storage = getStorage();

const buildKey = (key) => `${STORAGE_NAMESPACE}:${key}`;

export const getCachedEntry = (key) => {
  if (!storage) return null;
  try {
    const raw = storage.getItem(buildKey(key));
    if (!raw) return null;
    const payload = JSON.parse(raw);
    if (!payload || typeof payload !== 'object') return null;
    return payload;
  } catch (error) {
    console.warn('Failed to parse cache entry', error);
    return null;
  }
};

export const setCachedEntry = (key, data) => {
  if (!storage) return;
  try {
    const payload = JSON.stringify({ data, timestamp: Date.now() });
    storage.setItem(buildKey(key), payload);
  } catch (error) {
    console.warn('Failed to persist cache entry', error);
  }
};

export const clearCachedEntry = (key) => {
  if (!storage) return;
  try {
    storage.removeItem(buildKey(key));
  } catch (error) {
    console.warn('Failed to clear cache entry', error);
  }
};

export const isExpired = (timestamp, ttl) => {
  if (!timestamp) return true;
  return Date.now() - timestamp > ttl;
};

export const withCache = async (key, fetcher, ttl) => {
  const cached = getCachedEntry(key);
  const expired = cached ? isExpired(cached.timestamp, ttl) : true;
  if (!expired && cached) {
    return { data: cached.data, stale: false };
  }

  const data = await fetcher();
  setCachedEntry(key, data);
  return { data, stale: expired };
};
