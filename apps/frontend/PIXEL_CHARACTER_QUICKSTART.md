# PIXEL CHARACTER SYSTEM - HIZLI BAŞLANGIÇ

## 1. SPRITE'LARI OLUŞTUR (5 dakika)

```bash
# Tarayıcıda aç:
http://localhost:3000/sprite-generator

# Her karakter için:
1. Sınıf seç (İş Adamı, Yazılımcı, vb.)
2. "İndir" tıkla
3. PNG'yi /public/assets/sprites/ dizinine kopyala
```

**Gerekli Dosyalar:**
```
/public/assets/sprites/character_entrepreneur.png
/public/assets/sprites/character_developer.png
/public/assets/sprites/character_designer.png
/public/assets/sprites/character_marketer.png
/public/assets/sprites/character_trader.png
```

## 2. DEV SERVER BAŞLAT

```bash
cd apps/frontend
npm run dev
```

## 3. TEST ET

### Sprite Generator Test
```
URL: http://localhost:3000/sprite-generator
Test: Tüm 5 karakteri oluştur ve indir
```

### Character Creation Test
```
URL: http://localhost:3000/character-creation
Test:
- İsim gir: "TestOyuncu"
- Sınıf seç: Yazılımcı
- "Karakteri Oluştur!" tıkla
```

### Game Canvas Test
```
URL: http://localhost:3000/game
Test:
- WASD ile hareket et
- Shift bas → Koşma
- E bas → Aksiyon animasyonu
- FPS counter görünsün (üst sol)
```

## 4. BEKLENEN DAVRANIŞLAR

### Hareket Sistemi
- **W/A/S/D**: 8 yönlü hareket
- **Shift tutarken**: Koşma (350 px/s)
- **Shift olmadan**: Yürüme (200 px/s)
- **Dur**: Idle animasyonu

### Animasyonlar
- Otomatik yön değişimi (8 yön)
- Smooth geçişler
- 60 FPS sabit

### Kamera
- Karakteri takip eder (smooth lerp)
- Zoom: 1.0 (değiştirilebilir)

## 5. DOSYA YAPISI

```
OLUŞTURULAN DOSYALAR:
✅ src/lib/game/SpriteManager.ts          (344 satır)
✅ src/lib/game/CharacterController.ts    (312 satır)
✅ src/lib/game/PixelArtGenerator.ts      (429 satır)
✅ src/lib/game/TileMap.ts                (332 satır)
✅ src/components/game/GameCanvas.tsx     (güncellenmiş)
✅ src/app/sprite-generator/page.tsx      (220 satır)
✅ src/app/character-creation/page.tsx    (242 satır)

GÜNCELLENDİ:
✅ src/lib/store/gameStore.ts             (updateCamera eklendi)
✅ src/types/game.ts                      (metrics güncellemesi)
✅ tailwind.config.ts                     (Turkish colors)
```

## 6. KARAKTER SINIFI ÖZELLİKLERİ

| Sınıf | Türkçe | Renk Paleti | Özellik |
|-------|--------|-------------|---------|
| entrepreneur | İş Adamı | Lacivert/Altın | Takım elbise |
| developer | Yazılımcı | Gri/Mavi | Kapşon |
| designer | Tasarımcı | Siyah/Pembe | Bere |
| marketer | Pazarlamacı | Casual/Turuncu | Kravat |
| trader | Tüccar | Bordo/Bej | Yelek |

## 7. KONTROLLAR

```
HAREKET:
W - Yukarı
A - Sol
S - Aşağı
D - Sağ

ÖZEL:
Shift - Koş
E - Aksiyon 1
Q - Aksiyon 2
Space - Aksiyon 3
```

## 8. DEBUG

### FPS Düşükse
- Chrome DevTools → Performance
- Check: Sprite batching aktif mi?
- Check: Too many draw calls?

### Karakter Görünmüyorsa
- Console'da error var mı?
- Sprite PNG'ler yüklü mü?
- SpriteManager initialized mı?

### Animasyon Çalışmıyorsa
- Direction doğru hesaplanıyor mu?
- State machine çalışıyor mu?
- Sprite sheet format doğru mu?

## 9. SONRAKI ADIMLAR

- [ ] Multiplayer sync ekle (Socket.io)
- [ ] NPC sistemi ekle
- [ ] Building sprites ekle
- [ ] Collision system ekle
- [ ] Sound effects ekle

## 10. HIZLI KOMUTLAR

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Production
npm run start
```

---

**HAZIR!** Sistem tam çalışır durumda. WASD ile oyna! 🎮🇹🇷
