import apiClient, { handleApiCall } from './client';
import type { LoginRequest, RegisterRequest, LoginResponse, User, ApiResponse } from '@/types/api';

export const authApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return handleApiCall(
      apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials)
    );
  },

  // Register
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    return handleApiCall(
      apiClient.post<ApiResponse<LoginResponse>>('/auth/register', data)
    );
  },

  // Logout
  logout: async (): Promise<void> => {
    return handleApiCall(
      apiClient.post<ApiResponse<void>>('/auth/logout')
    );
  },

  // Get current user
  me: async (): Promise<User> => {
    return handleApiCall(
      apiClient.get<ApiResponse<User>>('/auth/me')
    );
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
    return handleApiCall(
      apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/auth/refresh', {
        refreshToken,
      })
    );
  },

  // Update profile
  updateProfile: async (updates: Partial<User>): Promise<User> => {
    return handleApiCall(
      apiClient.patch<ApiResponse<User>>('/auth/profile', updates)
    );
  },

  // Change password
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    return handleApiCall(
      apiClient.post<ApiResponse<void>>('/auth/change-password', {
        oldPassword,
        newPassword,
      })
    );
  },
};
