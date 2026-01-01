import apiClient, { handleApiCall } from './client';
import type { Character, ApiResponse } from '@/types/api';

export const charactersApi = {
  // Get all characters for current user
  getCharacters: async (): Promise<Character[]> => {
    return handleApiCall(
      apiClient.get<ApiResponse<Character[]>>('/characters')
    );
  },

  // Get character by ID
  getCharacter: async (id: string): Promise<Character> => {
    return handleApiCall(
      apiClient.get<ApiResponse<Character>>(`/characters/${id}`)
    );
  },

  // Create new character
  createCharacter: async (data: {
    name: string;
    class: string;
  }): Promise<Character> => {
    return handleApiCall(
      apiClient.post<ApiResponse<Character>>('/characters', data)
    );
  },

  // Update character
  updateCharacter: async (id: string, updates: Partial<Character>): Promise<Character> => {
    return handleApiCall(
      apiClient.patch<ApiResponse<Character>>(`/characters/${id}`, updates)
    );
  },

  // Delete character
  deleteCharacter: async (id: string): Promise<void> => {
    return handleApiCall(
      apiClient.delete<ApiResponse<void>>(`/characters/${id}`)
    );
  },

  // Get character inventory
  getInventory: async (id: string) => {
    return handleApiCall(
      apiClient.get<ApiResponse<any>>(`/characters/${id}/inventory`)
    );
  },

  // Get character equipment
  getEquipment: async (id: string) => {
    return handleApiCall(
      apiClient.get<ApiResponse<any>>(`/characters/${id}/equipment`)
    );
  },
};
