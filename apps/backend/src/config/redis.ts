import Redis from 'ioredis';
import logger from './logger';

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
  retryStrategy(times: number) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
};

// Main Redis client
export const redis = new Redis(redisConfig);

// Separate client for pub/sub
export const redisPub = new Redis(redisConfig);
export const redisSub = new Redis(redisConfig);

// Event handlers
redis.on('connect', () => {
  logger.info('Redis connected');
});

redis.on('error', (err) => {
  logger.error('Redis error:', err);
});

redis.on('ready', () => {
  logger.info('Redis ready');
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await redis.quit();
  await redisPub.quit();
  await redisSub.quit();
  logger.info('Redis connections closed');
});

export default redis;
