# TÜRK DİJİTAL METROPOL - Elite Design System

> Dünyanın en premium, hareketli ve kültürel olarak zengin design system'i

## Genel Bakış

Bu design system, **Apple'ın minimalizmi**, **Spotify'ın dinamizmi** ve **Discord'un sosyal dokusunu** Türk kültürü ile harmanlayarak oluşturulmuştur.

## Renk Paleti

### 1. Ottoman Gold (Osmanlı Altını)
Topkapı Sarayı'nın ihtişamından esinlenilmiştir.

```
50:  #FFF9E6  - En açık ton
100: #FFF3CC
200: #FFE799
300: #FFDB66
400: #FFCF33
500: #D4AF37  ⭐ PRIMARY
600: #B8960F
700: #8B720B
800: #5E4D08
900: #312804  - En koyu ton
```

**Kullanım Alanları:**
- Primary CTA buttons
- Premium badges
- Success states
- Highlight effects
- Ottoman themed components

### 2. Turkish Red (Türk Kırmızısı)
Türk bayrağı ve çini motiflerinden esinlenilmiştir.

```
50:  #FFE6E6
100: #FFCCCC
200: #FF9999
300: #FF6666
400: #FF3333
500: #E30A17  ⭐ PRIMARY
600: #B60814
700: #8A0610
800: #5C0409
900: #2E0205
```

**Kullanım Alanları:**
- Important actions
- Error states
- Danger buttons
- Turkish flag elements
- Alert notifications

### 3. Bosphorus Blue (Boğaz Mavisi)
İstanbul Boğazı'nın eşsiz mavisi.

```
50:  #E6F7FF
100: #CCF0FF
200: #99E0FF
300: #66D1FF
400: #33C1FF
500: #0097D7  ⭐ PRIMARY
600: #007AB2
700: #005C86
800: #003D59
900: #001F2D
```

**Kullanım Alanları:**
- Info messages
- Links
- Water/sea themed elements
- Secondary actions
- Cool accents

### 4. Tulip Pink (Lale Pembesi)
Osmanlı lale döneminden esinlenilmiştir.

```
50:  #FFE6F2
100: #FFCCE5
200: #FF99CB
300: #FF66B1
400: #FF3397
500: #FF6B9D  ⭐ PRIMARY
600: #CC5680
700: #994063
800: #662B46
900: #331529
```

**Kullanım Alanları:**
- Featured content
- Special offers
- Romance/beauty themes
- Feminine elements
- Accent highlights

### 5. Olive Green (Zeytin Yeşili)
Ege ve Akdeniz'in zeytin ağaçlarından.

```
50:  #F0F4E6
100: #E0E9CC
200: #C2D399
300: #A3BD66
400: #85A733
500: #6B8E23  ⭐ PRIMARY
600: #56721C
700: #415615
800: #2B390E
900: #161D07
```

**Kullanım Alanları:**
- Success states
- Eco/nature themes
- Organic elements
- Calm accents

### 6. Cini Turquoise (Çini Turkuazı)
İznik çinilerinin muhteşem rengi.

```
50:  #E6FFFC
100: #CCFFF9
200: #99FFF3
300: #66FFED
400: #33FFE7
500: #40E0D0  ⭐ PRIMARY
600: #33B3A6
700: #26867D
800: #1A5A53
900: #0D2D2A
```

**Kullanım Alanları:**
- Success confirmations
- Fresh/new content
- Traditional patterns
- Accent colors
- Interactive elements

## Tipografi

### Font Aileleri

```typescript
heading:  "Montserrat" - Modern, cesur başlıklar
body:     "Inter" - Okunabilir, temiz metin
display:  "Playfair Display" - Zarafet ve ihtişam
mono:     "JetBrains Mono" - Kod ve teknik içerik
turkish:  "Noto Sans Turkish" - Türkçe karakter optimizasyonu
```

### Font Boyutları

```
xs:   12px - Küçük detaylar
sm:   14px - Yardımcı metinler
base: 16px - Ana metin
lg:   18px - Vurgulu metinler
xl:   20px - Küçük başlıklar
2xl:  24px - Orta başlıklar
3xl:  30px - Büyük başlıklar
4xl:  36px - Hero başlıklar
5xl:  48px - Display başlıklar
6xl:  60px - Mega başlıklar
7xl:  72px - Ultra başlıklar
8xl:  96px - Landing page
9xl:  128px - Showcase
```

## Spacing (8px Grid System)

Tüm spacing değerleri 8px'in katlarıdır (Apple standartları).

```
0:    0px
px:   1px
0.5:  2px
1:    4px
2:    8px   ⭐ Base unit
3:    12px
4:    16px
6:    24px
8:    32px
12:   48px
16:   64px
24:   96px
32:   128px
```

## Gölgeler

### Standart Gölgeler
```
xs:  Çok hafif gölge
sm:  Hafif gölge
md:  Orta gölge
lg:  Büyük gölge
xl:  Çok büyük gölge
2xl: Ultra büyük gölge
```

### Premium Gölgeler
```
ottoman:    Altın parıltılı gölge
turkish:    Kırmızı parıltılı gölge
bosphorus:  Mavi parıltılı gölge
cini:       Turkuaz parıltılı gölge
glass:      Glassmorphism gölge
```

## Gradientler

### Kültürel Gradientler

**Turkish Sunset (İstanbul Günbatımı)**
```css
linear-gradient(135deg, #FF6B9D 0%, #D4AF37 50%, #E30A17 100%)
```

**Bosphorus Waters (Boğaz Suları)**
```css
linear-gradient(135deg, #0097D7 0%, #40E0D0 100%)
```

**Ottoman Gold (Osmanlı Altını)**
```css
linear-gradient(135deg, #FFE799 0%, #D4AF37 50%, #8B720B 100%)
```

**Tulip Garden (Lale Bahçesi)**
```css
linear-gradient(135deg, #FF6B9D 0%, #FF3397 50%, #CC5680 100%)
```

## Animasyonlar

### Temel Animasyonlar
- **fadeIn** - Yumuşak belirme
- **slideUp** - Yukarı kayma
- **scaleIn** - Büyüyerek giriş
- **rotateIn** - Dönerek giriş

### Türk Kültürel Animasyonlar
- **springBounce** - Tavla zarı atışı gibi
- **elasticScale** - İpek kumaş dalgalanması
- **waveMotion** - Boğaz dalgaları
- **shimmer** - Altın parıltısı
- **starSpin** - Ay-yıldız dönüşü

## Desenler

### SVG Desenleri

1. **Cini Pattern** - İznik çini motifleri
2. **Geometric Pattern** - İslami geometrik desenler
3. **Tulip Pattern** - Osmanlı lalesi
4. **Star Crescent** - Ay-yıldız
5. **Bosphorus Waves** - Boğaz dalgaları
6. **Calligraphy** - Türk hat sanatı
7. **Nazar** - Nazar boncuğu

## Komponent Kullanım Prensipleri

### 1. Button Hiyerarşisi
```
Primary:   Ottoman Gold - Ana aksiyonlar
Secondary: Turkish Red - Önemli aksiyonlar
Tertiary:  Outline - Alternatif aksiyonlar
Ghost:     Minimal - En az önemli aksiyonlar
```

### 2. Card Varyantları
```
Glass:     Premium, modern görünüm
Solid:     Standart, güvenilir
Ottoman:   Özel, kültürel içerik
Gradient:  Dikkat çekici, öne çıkan
```

### 3. Input Stilleri
```
Default:   Günlük kullanım
Glass:     Premium formlar
Turkish:   Önemli inputlar
Bosphorus: Bilgilendirici inputlar
```

## Responsive Breakpoints

```
xs:  0px     - Mobile first
sm:  640px   - Mobile landscape
md:  768px   - Tablet
lg:  1024px  - Desktop
xl:  1280px  - Large desktop
2xl: 1536px  - Ultra wide
```

## Accessibility

### WCAG 2.1 AAA Standartları

- **Kontrast Oranı:** Minimum 7:1
- **Odak Göstergeleri:** Her interaktif element
- **Klavye Navigasyonu:** Tab, Enter, Escape
- **Ekran Okuyucu:** ARIA etiketleri
- **Renk Körlüğü:** Yalnızca renge bağımlı olmayan
- **Hareket Azaltma:** prefers-reduced-motion desteği

## Performans Hedefleri

- **60 FPS** - Tüm animasyonlar
- **GPU Acceleration** - transform ve opacity kullanımı
- **Lazy Loading** - Görünür componentler
- **Code Splitting** - Route bazlı
- **Tree Shaking** - Kullanılmayan kod eliminasyonu

## Kullanım Örnekleri

### Landing Page
```tsx
<section className="bg-gradient-to-b from-gray-950 to-black">
  <div className="pattern-cini">
    <h1 className="text-7xl font-black bg-gradient-ottoman">
      Türk Dijital Metropol
    </h1>
    <Button variant="ottoman" size="lg" ripple>
      Maceraya Başla
    </Button>
  </div>
</section>
```

### Dashboard
```tsx
<Card variant="glass" hover3d>
  <CardHeader>
    <Avatar variant="ottoman" status="online" />
    <CardTitle>Hoş Geldin</CardTitle>
  </CardHeader>
  <CardContent>
    <Input label="Ara" variant="bosphorus" />
  </CardContent>
</Card>
```

## Katkıda Bulunma

Bu design system açık kaynak ve katkılara açıktır. Türk kültürünü doğru şekilde yansıtan, accessibility standartlarına uygun ve performanslı değişiklikler bekliyoruz.

---

**Created with 🇹🇷 for Turkey**
