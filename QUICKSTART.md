# 🚀 Hızlı Başlangıç Kılavuzu

> **TÜRK DİJİTAL METROPOL** - 5 Dakikada Başla!

---

## ⚡ Süper Hızlı Başlangıç (Otomatik)

```bash
cd ~/Desktop/TURK-DIJITAL-METROPOL

# Tek komutla her şeyi başlat
chmod +x start-dev.sh
./start-dev.sh
```

**Bu kadar!** Script otomatik olarak:
- ✅ Docker servislerini başlatır (PostgreSQL, Redis, MongoDB)
- ✅ Dependencies'leri kontrol eder
- ✅ Database'i setup eder
- ✅ Backend ve Frontend'i ayrı terminallerde açar

---

## 📋 Manuel Adımlar (Detaylı Kontrol İçin)

### 1. Docker Servisleri (30 saniye)

```bash
cd apps/backend
docker-compose up -d

# Kontrol
docker-compose ps
```

**Çıktı:**
```
✓ tdm-postgres
✓ tdm-redis
✓ tdm-mongodb
✓ tdm-rabbitmq
```

---

### 2. Backend Setup (2 dakika)

```bash
cd apps/backend

# Dependencies
npm install

# Database
npx prisma generate
npx prisma migrate dev --name init

# Başlat
npm run dev
```

**Çıktı:**
```
✓ Backend API çalışıyor: http://localhost:3001
✓ Socket.io ready
✓ Health check: http://localhost:3001/api/v1/health
```

---

### 3. Frontend Setup (2 dakika)

**Yeni terminal aç:**

```bash
cd apps/frontend

# Dependencies
npm install

# Başlat
npm run dev
```

**Çıktı:**
```
✓ Frontend çalışıyor: http://localhost:3000
✓ Optimized for development
✓ HMR enabled
```

---

## 🎮 İlk Giriş (1 dakika)

### Adım 1: Kayıt Ol

Browser'da aç: **http://localhost:3000/auth/register**

```
Email: test@example.com
Kullanıcı Adı: test_oyuncu
Şifre: Test1234!
```

### Adım 2: Karakter Yarat

Otomatik yönlendirileceksin: **http://localhost:3000/character-creation**

```
1. İsim gir (örn: "Ahmet")
2. Sınıf seç (örn: Yazılımcı)
3. "Karakteri Oluştur" tıkla
```

### Adım 3: Oyna!

**http://localhost:3000/game**

```
WASD: Hareket
Shift: Koş
E/Q/Space: Aksiyonlar
Enter: Chat
M: Harita
I: Envanter
```

---

## 🎨 Demo Sayfaları

### Landing Page
**http://localhost:3000**
- Premium hero section
- 2000 particle background
- Animated stats
- 3D cards

### Animasyon Showcase
**http://localhost:3000/demo-animations**
- 50+ animation variants
- Particle systems
- 3D effects
- Loading states

### Game UI Demo
**http://localhost:3000/game-ui-demo**
- Character panel
- Health/Mana/XP bars
- Chat interface
- Inventory system
- Minimap

### Sprite Generator
**http://localhost:3000/sprite-generator**
- 5 karakter sınıfı
- Programmatic pixel art
- Download PNG
- Real-time preview

---

## 🔧 Sorun Giderme

### Port zaten kullanımda

```bash
# Backend (3001)
lsof -ti:3001 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9
```

### Docker başlamıyor

```bash
# Docker kontrol
docker --version

# Restart
docker-compose down
docker-compose up -d
```

### Database hatası

```bash
cd apps/backend

# Reset
npx prisma migrate reset

# Yeniden oluştur
npx prisma migrate dev
```

### Dependencies eksik

```bash
# Root
npm install

# Backend
cd apps/backend && npm install

# Frontend
cd apps/frontend && npm install
```

---

## 📊 Servis Kontrolleri

### Health Checks

```bash
# Backend API
curl http://localhost:3001/api/v1/health

# PostgreSQL
docker exec -it tdm-postgres pg_isready

# Redis
docker exec -it tdm-redis redis-cli ping
```

### Logs

```bash
# Backend logs
cd apps/backend
npm run dev  # Terminal'de görürsün

# Docker logs
docker-compose logs -f

# Sadece PostgreSQL
docker-compose logs -f postgres
```

---

## 🛑 Durdurma

### Otomatik

```bash
./stop-dev.sh
```

### Manuel

```bash
# Node servisleri
lsof -ti:3000,3001 | xargs kill -9

# Docker (opsiyonel)
cd apps/backend
docker-compose down
```

---

## 🎯 Sonraki Adımlar

### 1. Sprite'ları Oluştur (5 dakika)
```bash
# Browser'da aç
http://localhost:3000/sprite-generator

# Her karakter için:
1. Sınıf seç
2. "İndir" tıkla
3. PNG'yi /public/assets/sprites/ kaydet
```

### 2. Kendi Karakterini Özelleştir
```bash
# CharacterController.ts düzenle
apps/frontend/src/lib/game/CharacterController.ts

# Hız ayarla
walkSpeed: 200  // Varsayılan
runSpeed: 350   // Koşma
```

### 3. Backend API'yi Keşfet
```bash
# API dokümantasyonu
apps/backend/API.md

# Postman collection (yakında)
# Swagger UI (yakında)
```

### 4. UI Komponentlerini Kullan
```bash
# UI Kit
packages/ui-kit/README.md

# Import et
import { Button, Card } from '@turk-dijital-metropol/ui-kit';
```

---

## 💡 Faydalı Komutlar

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Test
npm run test

# Build
npm run build

# Prisma Studio (Database GUI)
cd apps/backend
npx prisma studio  # http://localhost:5555
```

---

## 📚 Daha Fazla Bilgi

- 📖 [Ana README](./README.md) - Tam dokümantasyon
- 📖 [Backend Setup](./apps/backend/SETUP.md) - Backend detayları
- 📖 [Animation Guide](./apps/frontend/ANIMATION_GUIDE.md) - Animasyon sistemi
- 📖 [Character System](./apps/frontend/CHARACTER_SYSTEM_README.md) - Karakter sistemi

---

## ❓ Yardım

### Discord (yakında)
https://discord.gg/tdm

### GitHub Issues
https://github.com/turkdijitalmetropol/tdm/issues

### Email
info@turkdijitalmetropol.com

---

<div align="center">

**🎉 Hoş Geldin!**

**TÜRK DİJİTAL METROPOL**

*Türkiye'nin İlk Dijital Metropolü*

**Made with ❤️ for Turkey 🇹🇷**

</div>
