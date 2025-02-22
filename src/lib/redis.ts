import { Redis } from 'ioredis';

// Create Redis client
const getRedisClient = () => {
    if (process.env.REDIS_URL) {
        return new Redis(process.env.REDIS_URL);
    }

    // Default to local Redis instance
    return new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
    });
};

// Create a singleton instance
const redis = getRedisClient();

// Cache wrapper function
export async function cache<T>(
    key: string,
    fetchData: () => Promise<T>,
    ttl: number = 300 // 5 minutes default
): Promise<T> {
    try {
        // Try to get data from cache
        const cachedData = await redis.get(key);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // If not in cache, fetch and store
        const data = await fetchData();
        await redis.setex(key, ttl, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Redis cache error:', error);
        // Fallback to direct fetch if cache fails
        return fetchData();
    }
}

// Cache invalidation helper
export async function invalidateCache(pattern: string): Promise<void> {
    try {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
    } catch (error) {
        console.error('Redis cache invalidation error:', error);
    }
}

export default redis; 