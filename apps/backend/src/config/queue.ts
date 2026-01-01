import Queue from 'bull';
import redis from './redis';
import logger from './logger';

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
};

// Create queues
export const emailQueue = new Queue('email', { redis: redisConfig });
export const gameQueue = new Queue('game', { redis: redisConfig });
export const analyticsQueue = new Queue('analytics', { redis: redisConfig });

// Queue event handlers
const setupQueueEvents = (queue: Queue.Queue, name: string) => {
  queue.on('error', (error) => {
    logger.error(`Queue ${name} error:`, error);
  });

  queue.on('completed', (job) => {
    logger.debug(`Job ${job.id} in queue ${name} completed`);
  });

  queue.on('failed', (job, err) => {
    logger.error(`Job ${job?.id} in queue ${name} failed:`, err);
  });

  queue.on('stalled', (job) => {
    logger.warn(`Job ${job.id} in queue ${name} stalled`);
  });
};

setupQueueEvents(emailQueue, 'email');
setupQueueEvents(gameQueue, 'game');
setupQueueEvents(analyticsQueue, 'analytics');

// Process jobs
emailQueue.process(async (job) => {
  logger.info('Processing email job:', job.data);
  // Email processing logic here
  return { success: true };
});

gameQueue.process(async (job) => {
  logger.info('Processing game job:', job.data);
  // Game logic processing here
  return { success: true };
});

analyticsQueue.process(async (job) => {
  logger.info('Processing analytics job:', job.data);
  // Analytics processing here
  return { success: true };
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await emailQueue.close();
  await gameQueue.close();
  await analyticsQueue.close();
  logger.info('Queues closed');
});

export default {
  emailQueue,
  gameQueue,
  analyticsQueue,
};
