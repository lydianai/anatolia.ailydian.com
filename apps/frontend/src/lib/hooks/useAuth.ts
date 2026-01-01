import { useCallback } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useUIStore } from '@/lib/store/uiStore';
import { authApi } from '@/lib/api/auth';
import type { LoginRequest, RegisterRequest } from '@/types/api';

export function useAuth() {
  const {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    login: setLogin,
    logout: setLogout,
    setLoading,
    setError,
    clearError,
  } = useAuthStore();

  const { addNotification } = useUIStore();

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      clearError();

      const response = await authApi.login(credentials);

      setLogin(response.user, response.tokens);

      addNotification({
        type: 'success',
        title: 'Hoş geldiniz!',
        message: `Merhaba, ${response.user.displayName || response.user.username}!`,
      });

      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Giriş yapılamadı';
      setError(errorMessage);

      addNotification({
        type: 'error',
        title: 'Giriş Hatası',
        message: errorMessage,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLogin, setLoading, setError, clearError, addNotification]);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setLoading(true);
      clearError();

      const response = await authApi.register(data);

      setLogin(response.user, response.tokens);

      addNotification({
        type: 'success',
        title: 'Kayıt Başarılı!',
        message: 'Türk Dijital Metropol\'e hoş geldiniz!',
      });

      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Kayıt oluşturulamadı';
      setError(errorMessage);

      addNotification({
        type: 'error',
        title: 'Kayıt Hatası',
        message: errorMessage,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLogin, setLoading, setError, clearError, addNotification]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLogout();

      addNotification({
        type: 'info',
        title: 'Çıkış Yapıldı',
        message: 'Görüşmek üzere!',
      });
    }
  }, [setLogout, addNotification]);

  const checkAuth = useCallback(async () => {
    if (!tokens?.accessToken) {
      return false;
    }

    try {
      setLoading(true);
      await authApi.me();
      return true;
    } catch (err) {
      setLogout();
      return false;
    } finally {
      setLoading(false);
    }
  }, [tokens, setLoading, setLogout]);

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
    clearError,
  };
}
