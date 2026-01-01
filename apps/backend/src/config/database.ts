import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

// Event listeners for logging
prisma.$on('warn' as never, (e: any) => {
  logger.warn('Prisma warning:', e);
});

prisma.$on('error' as never, (e: any) => {
  logger.error('Prisma error:', e);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('Database connection closed');
});

export default prisma;
