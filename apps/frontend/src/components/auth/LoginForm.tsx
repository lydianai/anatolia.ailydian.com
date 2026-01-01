'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/hooks/useAuth';

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    clearError();
  };

  const validate = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    if (!formData.email) {
      errors.email = 'E-posta gerekli';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Geçerli bir e-posta giriniz';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Şifre gerekli';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalı';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(formData);
      router.push('/game');
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Giriş Yap</CardTitle>
        <CardDescription className="text-center">
          Türk Dijital Metropol'e hoş geldiniz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-posta"
            type="email"
            name="email"
            placeholder="ornek@email.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            autoComplete="email"
            disabled={isLoading}
          />

          <Input
            label="Şifre"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            autoComplete="current-password"
            disabled={isLoading}
          />

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500 text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Giriş Yap
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Hesabınız yok mu? </span>
            <a
              href="/auth/register"
              className="text-turkish-red hover:underline font-medium"
            >
              Kayıt Ol
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
