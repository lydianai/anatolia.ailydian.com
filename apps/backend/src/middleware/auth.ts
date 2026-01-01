import { Response, NextFunction } from 'express';
import { AuthRequest, AuthenticationError, AuthorizationError } from '../types';
import { verifyAccessToken } from '../utils/jwt';
import logger from '../config/logger';

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      logger.error('Authentication error:', error);
      res.status(401).json({
        success: false,
        error: 'Authentication failed',
        timestamp: new Date().toISOString(),
      });
    }
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new AuthenticationError('User not authenticated');
      }

      if (!roles.includes(req.user.role)) {
        throw new AuthorizationError('Insufficient permissions');
      }

      next();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        res.status(403).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      } else {
        res.status(401).json({
          success: false,
          error: 'Authorization failed',
          timestamp: new Date().toISOString(),
        });
      }
    }
  };
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = verifyAccessToken(token);

      req.user = {
        id: payload.id,
        email: payload.email,
        username: payload.username,
        role: payload.role,
      };
    }

    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
};
