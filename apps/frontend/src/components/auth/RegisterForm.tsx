'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/hooks/useAuth';

export function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  const [formErrors, setFormErrors] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    clearError();
  };

  const validate = () => {
    const errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
    };
    let isValid = true;

    if (!formData.username) {
      errors.username = 'Kullanıcı adı gerekli';
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.username = 'Kullanıcı adı en az 3 karakter olmalı';
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      errors.password = 'Şifre en az 8 karakter olmalı';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Şifre tekrarı gerekli';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName || formData.username,
      });
      router.push('/game');
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Kayıt Ol</CardTitle>
        <CardDescription className="text-center">
          Maceraya katılın ve dijital metropolü keşfedin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Kullanıcı Adı"
            type="text"
            name="username"
            placeholder="kullaniciadi"
            value={formData.username}
            onChange={handleChange}
            error={formErrors.username}
            autoComplete="username"
            disabled={isLoading}
          />

          <Input
            label="Görünen Ad (opsiyonel)"
            type="text"
            name="displayName"
            placeholder="Oyun içinde görünecek isim"
            value={formData.displayName}
            onChange={handleChange}
            error={formErrors.displayName}
            disabled={isLoading}
          />

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
            autoComplete="new-password"
            disabled={isLoading}
          />

          <Input
            label="Şifre Tekrar"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
            autoComplete="new-password"
            disabled={isLoading}
          />

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500 text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Kayıt Ol
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Zaten hesabınız var mı? </span>
            <a
              href="/auth/login"
              className="text-turkish-red hover:underline font-medium"
            >
              Giriş Yap
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
