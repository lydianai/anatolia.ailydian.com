import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError } from '@/types/api';
import { useAuthStore } from '@/lib/store/authStore';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = useAuthStore.getState().tokens;

    if (tokens?.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = useAuthStore.getState().tokens;

        if (tokens?.refreshToken) {
          // Attempt to refresh token
          const response = await axios.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            { refreshToken: tokens.refreshToken }
          );

          if (response.data.success && response.data.data) {
            const newTokens = {
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
              expiresIn: 3600,
            };

            useAuthStore.getState().setTokens(newTokens);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            }
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
      });
    }

    // Handle API errors
    const apiError: ApiError = {
      code: error.response.data?.code || 'UNKNOWN_ERROR',
      message: error.response.data?.message || 'An error occurred',
      details: error.response.data?.details,
    };

    return Promise.reject(apiError);
  }
);

export default apiClient;

// Helper function to handle API responses
export async function handleApiCall<T>(
  promise: Promise<{ data: ApiResponse<T> }>
): Promise<T> {
  try {
    const response = await promise;

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw {
      code: 'API_ERROR',
      message: response.data.error || response.data.message || 'Request failed',
    };
  } catch (error) {
    throw error;
  }
}
