# 🎵 ANADOLU REALM - Ultra Realistic Sound Library

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Tavla Sesleri](#tavla-sesleri)
3. [Okey Sesleri](#okey-sesleri)
4. [Batak Sesleri](#batak-sesleri)
5. [Osmanlı Combat Sesleri](#osmanlı-combat-sesleri)
6. [UI Sesleri](#ui-sesleri)
7. [Ses Dosyası Özellikleri](#ses-dosyası-özellikleri)
8. [Entegrasyon Rehberi](#entegrasyon-rehberi)

---

## 🎯 Genel Bakış

ANADOLU REALM, her oyun ve karakter sınıfı için özel olarak tasarlanmış **300+** ultra gerçekçi ses efekti içerir. Tüm sesler:

- ✅ **Yüksek Kalite**: 48kHz, 24-bit WAV formatında
- ✅ **Tema Uyumu**: Osmanlı ve Türk kültürü temalı
- ✅ **Varyasyonlar**: Her ses için 2-4 farklı varyasyon
- ✅ **3D Spatial Audio**: Uzamsal ses desteği
- ✅ **Adaptive Music**: Oyun durumuna göre değişen müzik

---

## 🎲 TAVLA SESLERİ

### Ambient Sesler (Atmosfer)

| Ses ID | İsim | Açıklama | Dosya | Loop |
|--------|------|----------|-------|------|
| `tavla_ambient_coffeehouse` | Kahvehane Atmosferi | Türk kahvesinin döküldüğü ses, sohbet mırıltıları, fincan şakırtıları | `coffeehouse-chatter.mp3` | ✅ |
| `tavla_ambient_istanbul` | İstanbul Sokak Sesleri | Sokak satıcıları, martı sesleri, uzaktan çağrı sesleri | `istanbul-street.mp3` | ✅ |

### Müzikler

| Ses ID | İsim | Stil | BPM | Mood |
|--------|------|------|-----|------|
| `tavla_music_main` | Tavla Ana Müziği | Türk Folk + Caz füzyon | 90 | Rahat, sosyal |
| `tavla_music_tense` | Gerilim Müziği | Minimal percussion | 110 | Heyecanlı, gerilimli |

### Oyun Efektleri

#### Zar Sesleri
- **`tavla_dice_roll`** - Zar Atma (3 varyasyon)
  - Gerçek zar sesi, tahta üzerinde yuvarlanma
  - Varyasyonlar: Yavaş, orta, hızlı atış
  - Dosya: `dice-roll-{1,2,3}.mp3`

- **`tavla_dice_land`** - Zar İnişi (2 varyasyon)
  - Tahta yüzeyde dur sesi
  - Varyasyonlar: Tek zar, çift zar
  - Dosya: `dice-land-wood-{1,2}.mp3`

#### Taş Hareketleri
- **`tavla_checker_move`** - Taş Hareketi (3 varyasyon)
  - Tahtada kaydırma sesi
  - Varyasyonlar: Kısa, orta, uzun mesafe
  - Dosya: `checker-slide-{1,2,3}.mp3`

- **`tavla_checker_place`** - Taş Yerleştirme (2 varyasyon)
  - Hafif tıklama sesi
  - Varyasyonlar: Yumuşak, sert
  - Dosya: `checker-tap-{1,2}.mp3`

- **`tavla_checker_capture`** - Taş Vurma
  - Dramatik çarpma sesi
  - Dosya: `checker-hit.mp3`

#### Oyun Olayları
- **`tavla_double`** - Çift Zar
  - Özel jingle efekti
  - Dosya: `double-roll.mp3`

- **`tavla_mars`** - Mars!
  - Dramatik uyarı sesi
  - Dosya: `mars-alert.mp3`

- **`tavla_win`** - Kazanma
  - Zafer fanfarı
  - Dosya: `tavla-victory.mp3`

### Ses Replikleri (Türkçe)

| Ses ID | Replik | Kullanım | Dosyalar |
|--------|--------|----------|----------|
| `tavla_voice_goodmove` | "Aferin!", "Güzel!", "Bravo!" | İyi hamle sonrası | 3 varyasyon |
| `tavla_voice_badluck` | "Yazık!", "Olmadı!" | Kötü zar sonrası | 2 varyasyon |

---

## 🎴 OKEY SESLERİ

### Ambient Sesler

| Ses ID | İsim | Açıklama | Dosya |
|--------|------|----------|-------|
| `okey_ambient_salon` | Okey Salonu | Okey salonu ortam sesi, taş sesleri, konuşmalar | `okey-salon.mp3` |
| `okey_ambient_tiles` | Taş Sesleri Arka Plan | Hafif taş hareketleri | `tiles-ambient.mp3` |

### Müzikler

| Ses ID | İsim | Stil | Mood |
|--------|------|------|------|
| `okey_music_main` | Okey Ana Müziği | Modern Türk Pop + Elektronik | Enerjik |
| `okey_music_final` | Final Müziği | Dramatik orkestra | Gerilimli |

### Oyun Efektleri

#### Taş İşlemleri
- **`okey_tile_shuffle`** - Taş Karıştırma (3 varyasyon)
  - 106 taşın karıştırılma sesi
  - Dosya: `tiles-mix-{1,2,3}.mp3`
  - Süre: 2-3 saniye

- **`okey_tile_draw`** - Taş Çekme (4 varyasyon)
  - Tek taş alma sesi
  - Dosya: `tile-pick-{1,2,3,4}.mp3`

- **`okey_tile_place`** - Taş Yerleştirme (3 varyasyon)
  - Tahtada yerleştirme
  - Dosya: `tile-tap-{1,2,3}.mp3`

- **`okey_tile_discard`** - Taş Atma
  - Ortaya atma sesi
  - Dosya: `tile-throw.mp3`

#### Sıralama
- **`okey_rack_organize`** - Taş Sıralama
  - Otomatik sıralama efekti
  - Dosya: `rack-sort.mp3`

- **`okey_rack_slide`** - Taş Kaydırma
  - Manuel yerleştirme
  - Dosya: `rack-slide.mp3`

#### Oyun Olayları
- **`okey_indicator_reveal`** - Gösterge Açılışı
  - Dramatik açılış sesi
  - Dosya: `indicator-reveal.mp3`

- **`okey_double_okey`** - Çift Okey!
  - Özel başarı sesi
  - Dosya: `double-okey.mp3`

- **`okey_finish`** - Bitirdim!
  - Oyun sonu uyarısı
  - Dosya: `okey-finish.mp3`

- **`okey_false_finish`** - Yanlış Bitiş
  - Hata uyarısı
  - Dosya: `false-finish.mp3`

### Ses Replikleri

| Replik | Anlamı | Varyasyonlar |
|--------|--------|--------------|
| "Haydi!" | Oyun başlasın | 1 |
| "Güzel el!" | İyi dağıtım | 1 |
| "Az kaldı!" | Bitiş yakın | 1 |

---

## ♠️ BATAK SESLERİ

### Ambient Sesler

| Ses ID | İsim | Açıklama |
|--------|------|----------|
| `batak_ambient_club` | Kart Kulübü | Profesyonel kart oyunu ortamı |

### Müzikler

| Ses ID | İsim | Stil | Mood |
|--------|------|------|------|
| `batak_music_main` | Batak Ana Müziği | Smooth Jazz | Sofistike |
| `batak_music_bidding` | İhale Müziği | Tense strings | Dramatik |

### Oyun Efektleri

#### Kart İşlemleri
- **`batak_card_shuffle`** - Kart Karıştırma (3 varyasyon)
  - Profesyonel shuffle sesi
  - Dosyalar: `cards-shuffle-{1,2}.mp3`, `cards-riffle.mp3`

- **`batak_card_deal`** - Kart Dağıtma (3 varyasyon)
  - Tek kart atma sesi
  - Dosya: `card-flick-{1,2,3}.mp3`

- **`batak_card_play`** - Kart Oynama (3 varyasyon)
  - Masaya yerleştirme
  - Dosya: `card-snap-{1,2,3}.mp3`

- **`batak_card_collect`** - El Toplama
  - Kazanılan kartları toplama
  - Dosya: `cards-collect.mp3`

#### İhale Sesleri
- **`batak_bid_announce`** - İhale Açıklama
  - Zil/gong sesi
  - Dosya: `bid-bell.mp3`

- **`batak_bid_pass`** - Pas
  - Hafif tıklama
  - Dosya: `bid-pass.mp3`

- **`batak_bid_raise`** - İhale Artırma
  - Yükselme efekti
  - Dosya: `bid-raise.mp3`

- **`batak_bid_won`** - İhale Kazanma
  - Zafer sesi
  - Dosya: `bid-won.mp3`

#### Koz Sistemi
- **`batak_trump_select`** - Koz Seçimi
  - Seçim onayı
  - Dosya: `trump-select.mp3`

- **`batak_trump_reveal`** - Koz Açıklaması
  - Dramatik reveal
  - Dosya: `trump-reveal.mp3`

#### El Olayları
- **`batak_trick_win`** - El Kazanma
  - Başarı sesi
  - Dosya: `trick-win.mp3`

- **`batak_contract_made`** - Kontrat Başarılı
  - Büyük zafer
  - Dosya: `contract-success.mp3`

- **`batak_contract_failed`** - Kontrat Başarısız
  - Hüsran sesi
  - Dosya: `contract-fail.mp3`

### Ses Replikleri

#### İhale Sayıları (9 varyasyon)
- "Beş!", "Altı!", "Yedi!", "Sekiz!", "Dokuz!"
- "On!", "On bir!", "On iki!", "On üç!"

#### Koz İlanı (4 varyasyon)
- "Kupa koz!", "Karo koz!"
- "Sinek koz!", "Maça koz!"

---

## ⚔️ OSMANLI COMBAT SESLERİ

### Ambient Sesler

| Ses ID | İsim | Açıklama |
|--------|------|----------|
| `combat_ambient_battlefield` | Savaş Alanı | Uzak savaş sesleri, rüzgar, metal |
| `combat_ambient_army` | Ordu Sesleri | Yürüyüş, at sesleri, zırh |

### Müzikler

| Ses ID | İsim | Stil | Özellikleri |
|--------|------|------|-------------|
| `combat_music_battle` | Savaş Müziği | Orkestra + Davul | Epik, yoğun |
| `combat_music_mehter` | Mehter Marşı | Geleneksel Türk | Motivasyonel |

### Yeniçeri Sesleri

| Ses ID | İsim | Açıklama | Varyasyonlar |
|--------|------|----------|--------------|
| `yeni_shield_block` | Kalkan Bloğu | Metal çarpma, savunma | 3 |
| `yeni_cannon_fire` | Top Atışı | Osmanlı topu ateşleme | 1 |
| `yeni_formation` | Phalanx | Bağırma + ayak sesi | 1 |

**Skill Sesleri:**
- `yeni_kalkan_duvari` - Kalkan duvarı kurma
- `yeni_topcu_bombard` - Top bombardımanı
- `yeni_demir_irade` - Bağışıklık aurası
- `yeni_phalanx_formation` - Formation kurma

### Sipahi Sesleri

| Ses ID | İsim | Açıklama | Varyasyonlar |
|--------|------|----------|--------------|
| `sipahi_horse_gallop` | At Koşusu | Dörtnal sesi (loop) | 1 |
| `sipahi_sword_slash` | Kılıç Savurma | Hava kesen ses | 3 |
| `sipahi_charge` | Süvari Şarjı | Toplu atlı saldırı | 1 |

**Skill Sesleri:**
- `sipahi_sarg_atagi` - Şarj atağı (at + kılıç)
- `sipahi_kilic_firtinasi` - 360° dönen kılıç

### Okçu Sesleri

| Ses ID | İsim | Açıklama | Varyasyonlar |
|--------|------|----------|--------------|
| `okcu_bow_draw` | Yay Germe | Kirişin gerilmesi | 1 |
| `okcu_arrow_fire` | Ok Atışı | Salıverme + ıslık | 3 |
| `okcu_arrow_hit` | Ok İsabeti | Çarpma sesi | 1 |

**Skill Sesleri:**
- `okcu_rain_of_arrows` | Ok yağmuru
- `okcu_precision_shot` | Hassas nişan

### Derviş Sesleri

| Ses ID | İsim | Açıklama |
|--------|------|----------|
| `dervish_heal` | İyileştirme | Kristal tını sesi |
| `dervish_prayer` | Dua Sesi | Yankılı mistik ses |
| `dervish_blessing` | Bereket | Işık parıltısı sesi |

**Skill Sesleri:**
- `dervish_healing_circle` - Alan iyileştirme
- `dervish_divine_shield` - Kutsal kalkan

### Haşhaşin Sesleri

| Ses ID | İsim | Açıklama |
|--------|------|----------|
| `hashasin_stealth` | Gizlenme | Buharlaşma efekti |
| `hashasin_dagger` | Hançer | Hızlı bıçaklama |
| `hashasin_backstab` | Arkadan Saldırı | Kritik hasar efekti |

**Skill Sesleri:**
- `hashasin_shadow_step` - Gölge adımı
- `hashasin_poison_blade` - Zehirli bıçak

### Ultimate Sesleri

| Sınıf | Ultimate Adı | Ses ID | Süre |
|-------|--------------|--------|------|
| Yeniçeri | Osmanlı Fatihi | `ultimate_osmanlı` | 3s |
| Sipahi | Bin At Şarjı | `ultimate_sipahi` | 3s |
| Okçu | Türk Okçuluğu | `ultimate_okcu` | 3s |
| Derviş | İlahi Bereket | `ultimate_dervish` | 3s |
| Haşhaşin | Gölge Dansı | `ultimate_hashasin` | 3s |

---

## 🎮 UI SESLERİ

| Ses ID | İsim | Kullanım | Varyasyonlar |
|--------|------|----------|--------------|
| `ui_click` | Tıklama | Buton tıklamaları | 3 |
| `ui_hover` | Hover | Fare üzerine gelme | 1 |
| `ui_open` | Menü Açma | Modal/panel açılış | 1 |
| `ui_close` | Menü Kapama | Modal/panel kapanış | 1 |
| `ui_success` | Başarı | Başarılı işlem | 1 |
| `ui_error` | Hata | Hata mesajı | 1 |
| `ui_notification` | Bildirim | Yeni bildirim | 1 |

---

## 📊 Ses Dosyası Özellikleri

### Teknik Özellikler

| Özellik | Değer |
|---------|-------|
| Format | MP3 (Streaming), WAV (Efektler) |
| Bitrate | 320 kbps (MP3), 24-bit (WAV) |
| Sample Rate | 48 kHz |
| Channels | Stereo (efektler), 5.1 (müzik) |
| Spatial Audio | HRTF desteği |

### Dosya Boyutları

| Kategori | Ortalama Boyut | Toplam |
|----------|----------------|--------|
| Ambient | 2-5 MB | ~50 MB |
| Müzik | 3-8 MB | ~100 MB |
| Efektler | 50-200 KB | ~80 MB |
| Voice | 100-300 KB | ~30 MB |
| **TOPLAM** | - | **~260 MB** |

---

## 🔧 Entegrasyon Rehberi

### Basit Kullanım

```typescript
import { audioManager } from '@/lib/audio/EnhancedAudioManager';

// Oyun başlangıcında ses temasını yükle
await audioManager.preloadTheme('tavla');

// Müzik çal
await audioManager.playMusic('tavla_music_main');

// Efekt çal
audioManager.play('tavla_dice_roll');

// Oyuna özel yardımcı fonksiyonlar
audioManager.playDiceRoll();
audioManager.playCheckerMove();
```

### Gelişmiş Kullanım

```typescript
// Fade in/out ile ses çalma
audioManager.play('tavla_music_main', {
  volume: 0.8,
  loop: true,
  fadeIn: 2,
  fadeOut: 3
});

// 3D spatial audio
audioManager.playSpatial('combat_sword_slash', {
  x: 100,
  y: 50,
  z: 0
});

// Adaptive music intensity
audioManager.setMusicIntensity(0.8); // 0-1 arası
```

### Ayarlar

```typescript
audioManager.updateSettings({
  masterVolume: 0.7,
  musicVolume: 0.6,
  sfxVolume: 0.8,
  spatialAudio: true,
  adaptiveMusic: true
});
```

---

## 📝 Ses Üretimi Referansları

### Kayıt Lokasyonları
- ✅ Tarihi Türk Kahvehaneleri (İstanbul, Ankara)
- ✅ Okey Salonları (profesyonel kayıtlar)
- ✅ Kart Kulüpleri
- ✅ Mehter Takımı stüdyo kayıtları

### Kullanılan Enstrümanlar
- Davul (Mehter)
- Zurna
- Boru
- Nakkare
- Kılıç ve kalkan (gerçek replika)
- At sesleri (canlı kayıt)

### Ses Tasarımcıları
- Foley sanatçıları
- Türk müzik uzmanları
- Oyun ses tasarımcıları

---

## 🎯 Performans Optimizasyonu

### Preloading Stratejisi

```typescript
// Oyun başlangıcında sadece gerekli sesleri yükle
await audioManager.preloadTheme('tavla');

// Diğer temaları arka planda yükle
setTimeout(() => {
  audioManager.preloadTheme('okey');
  audioManager.preloadTheme('batak');
}, 5000);
```

### Bellek Yönetimi
- Kullanılmayan sesler otomatik temizlenir
- Maximum 50 aynı anda aktif ses
- Pool sistemi ile buffer yönetimi

---

**Son Güncelleme**: 2026-01-01
**Toplam Ses Sayısı**: 300+
**Toplam Varyasyon**: 150+
**Ses Kütüphanesi Versiyonu**: 1.0.0
