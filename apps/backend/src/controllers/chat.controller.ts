import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import chatService from '../services/chat.service';
import { successResponse, paginatedResponse } from '../utils/response';

export class ChatController {
  async sendMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const characterId = req.body.characterId || null;
      const message = await chatService.sendMessage(userId, characterId, req.body);
      return successResponse(res, message, 'Message sent successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.params;
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '50', 10);

      const result = await chatService.getMessages(roomId, page, limit);

      return paginatedResponse(
        res,
        result.messages,
        result.page,
        result.limit,
        result.total
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const result = await chatService.deleteMessage(id, userId);
      return successResponse(res, result, 'Message deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async createRoom(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const room = await chatService.createRoom(req.body);
      return successResponse(res, room, 'Room created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getRooms(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const rooms = await chatService.getRooms();
      return successResponse(res, rooms);
    } catch (error) {
      next(error);
    }
  }

  async getRoom(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const room = await chatService.getRoom(id);
      return successResponse(res, room);
    } catch (error) {
      next(error);
    }
  }
}

export default new ChatController();
