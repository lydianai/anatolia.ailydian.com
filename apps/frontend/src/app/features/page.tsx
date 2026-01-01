/**
 * TURK DIJITAL METROPOL - Enhanced Features Page
 * Premium Modal System + AAA Game Website Design
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Users,
  Sparkles,
  MessageSquare,
  Coins,
  Gamepad,
  Heart,
  Trophy,
  Palette,
  Calendar,
  Smartphone,
  ShieldCheck,
  Zap,
  Star,
  Flag,
  ChevronRight,
  X,
  Check,
  Play,
  Image as ImageIcon,
  Quote,
  ArrowRight,
  Lock,
  Unlock,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Cpu,
  Wifi,
  Server,
  Database
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface Feature {
  id: number;
  icon: any;
  title: string;
  description: string;
  details: string;
  stats: string;
  color: string;
  animation: 'bounce' | 'pulse' | 'rotate';
  features?: string[];
  screenshots?: number;
  modalContent: {
    tagline: string;
    paragraphs: string[];
    highlights: string[];
    technicalSpecs: {
      label: string;
      value: string;
    }[];
    testimonials: {
      name: string;
      role: string;
      comment: string;
      rating: number;
    }[];
    videoTitle: string;
    ctaText: string;
    ctaSubtext: string;
  };
}

const features: Feature[] = [
  {
    id: 1,
    icon: Users,
    title: 'Gercek Zamanli Multiplayer',
    description: '1000+ aktif oyuncu ile ayni anda oyna, arkadas edin, is birligi yap',
    details: 'WebSocket tabanli gercek zamanli baglanti ile dunyada nerede olursan ol, anlık olarak binlerce oyuncu ile etkilesim kur.',
    stats: '1,250 aktif oyuncu',
    color: 'from-blue-500 to-cyan-500',
    animation: 'bounce' as const,
    features: [
      'WebSocket tabanli gercek zamanli iletisim',
      'Dunyanin her yerinden oyuncularla baglanti',
      'Ping < 50ms (Turkiye sunuculari)',
      'Anti-cheat sistemi ile adaletli oyun',
      '7/24 moderasyon ve destek'
    ],
    screenshots: 3,
    modalContent: {
      tagline: 'Binlerce Oyuncu, Tek Bir Dunya',
      paragraphs: [
        'Turk Dijital Metropol\'de asla yalniz degilsiniz. Her an 1000\'den fazla aktif oyuncu ile ayni dunyada bulunuyor, ticaret yapiyor, sohbet ediyor ve maceraya atiliyorsunuz.',
        'WebSocket teknolojisi sayesinde her hareket, her mesaj ve her islem anlık olarak dunyanin dort bir yanindaki oyunculara iletiliyor. Istanbul\'dan Tokyo\'ya, New York\'tan Berlin\'e kadar tum oyuncular ayni evrenin parcasi.',
        'Gelismis sunucu altyapimiz sayesinde Turkiye\'den baglanan oyuncular icin ortalama ping suresi 50ms\'nin altinda. Bu, aksiyonun hiç kesilmeden devam etmesi anlamina geliyor.',
        'Anti-cheat sistemimiz 7/24 calisiyor ve hile yapan oyunculari otomatik olarak tespit edip yasakliyor. Boylece herkes icin adil bir oyun ortami sagliyoruz.',
      ],
      highlights: [
        '1000+ eszamanli aktif oyuncu kapasitesi',
        'WebSocket ile <50ms gecikme suresi',
        'Otomatik matchmaking ve parti sistemi',
        'Cross-region oyuncu etkilesimleri',
        'Gercek zamanli liderlik tablolari',
        'Canli etkinlik ve turnuva sistemi',
        'Sesli ve yazili sohbet destegi',
        'Moderatorlu guvenli oyun ortami'
      ],
      technicalSpecs: [
        { label: 'Baglanti Protokolu', value: 'WebSocket (WSS)' },
        { label: 'Maksimum Oyuncu', value: '2,000 eszamanli' },
        { label: 'Ortalama Ping', value: '<50ms (TR)' },
        { label: 'Sunucu Lokasyonu', value: 'Istanbul, Frankfurt' },
        { label: 'Uptime Garantisi', value: '99.9%' },
        { label: 'Guvenlik', value: 'SSL/TLS + Anti-DDoS' }
      ],
      testimonials: [
        {
          name: 'Mehmet K.',
          role: 'Seviye 45 Yazilimci',
          comment: 'Hic lag yasamadim, her sey cok akici. Istanbul sunucusu harika calisiyor!',
          rating: 5
        },
        {
          name: 'Ayse Y.',
          role: 'Lonca Lideri',
          comment: 'Lonca arkadaslarimla anlık iletisim kurabilmek cok keyifli. Sistem mukemmel!',
          rating: 5
        }
      ],
      videoTitle: 'Gercek Zamanli Multiplayer Deneyimi',
      ctaText: 'HEMEN KATIL',
      ctaSubtext: 'Binlerce oyuncu seni bekliyor!'
    }
  },
  {
    id: 2,
    icon: Sparkles,
    title: 'Premium Pixel Art',
    description: '32x32 sprites, 60 FPS animasyonlar, Turk temaları',
    details: 'Profesyonel sanatcilar tarafindan ozel olarak tasarlanan pixel art karakterler ve Osmanli ihtisami yansitan cevreler.',
    stats: '500+ unique sprites',
    color: 'from-purple-500 to-pink-500',
    animation: 'pulse' as const,
    modalContent: {
      tagline: 'Her Piksel Bir Sanat Eseri',
      paragraphs: [
        'Oyunumuzun gorsel kimligini olusturan 500\'den fazla ozel tasarlanmis pixel art sprite, profesyonel dijital sanatcilarimizin emegi ile hayat buldu.',
        '32x32 piksel cozunurlugunde hazirlanmis her karakter, nesne ve cevre elemani nostaljik pixel art estetigini modern animasyon teknikleriyle birlestirir.',
        '60 FPS akiciliginda calisan animasyon sistemimiz, her hareketin, her efektin super akici gorulmesini sagliyor. Karakteriniz yurudu, kosdu ya da zipladigi her an gozleriniz solen oluyor.',
        'Osmanli motifleri, Turk bayraklari, geleneksel mimariye ait detaylar ve Istanbul\'un kulturel zenginligi pixel art\'a donuserek oyunun her karesinde karsiniza cikiyor.'
      ],
      highlights: [
        '500+ ozel tasarlanmis sprite ve karakter',
        '60 FPS akici animasyon sistemi',
        '32x32 retro pixel art estetiği',
        'Osmanli ve Turk kulturel motifleri',
        'Elle cizimlenmis arka plan sahneleri',
        'Dinamik isik ve golge efektleri',
        'Mevsim ve zaman degisim animasyonlari',
        'Ozel etkinlik temalari ve kostumler'
      ],
      technicalSpecs: [
        { label: 'Sprite Boyutu', value: '32x32 pixels' },
        { label: 'Animasyon Hizi', value: '60 FPS' },
        { label: 'Toplam Sprite', value: '500+ unique' },
        { label: 'Renk Paleti', value: '256 color (8-bit)' },
        { label: 'Render Engine', value: 'Canvas 2D + WebGL' },
        { label: 'Tema Paketleri', value: '12 farkli tema' }
      ],
      testimonials: [
        {
          name: 'Zeynep A.',
          role: 'Tasarimci Oyuncu',
          comment: 'Gorsel kalite inanilmaz! Pixel art\'i bu kadar guzel yapan baskasin gormedim.',
          rating: 5
        },
        {
          name: 'Can T.',
          role: 'Retro Oyun Hayrani',
          comment: '90\'larin nostaljisinI modern teknolojiyle birlestirenler harika olmus!',
          rating: 5
        }
      ],
      videoTitle: 'Premium Pixel Art Showcase',
      ctaText: 'SANATI KESFET',
      ctaSubtext: 'Her piksel bir hikaye anlatir'
    }
  },
  {
    id: 3,
    icon: Flag,
    title: 'Turk Kulturu',
    description: '5 Turk karakter sinifi, Istanbul haritasi, milli degerler',
    details: 'Is Adami, Yazilimci, Tasarimci, Pazarlamaci ve Tuccar sinifları ile Turk kulturunun dijital yansımasi.',
    stats: '5 karakter sinifi',
    color: 'from-red-500 to-orange-500',
    animation: 'rotate' as const,
    modalContent: {
      tagline: 'Turk Kultur ve Degerlerinin Dijital Yurti',
      paragraphs: [
        'Turk Dijital Metropol sadece bir oyun degil, Turk kulturunun ve degerlerinin dijital dunyadaki en guclu temsili. Her detay, her karakter, her mekan Turk kimligini yansitacak sekilde tasarlandi.',
        'Istanbul\'un mitinde Karakoy\'den Taksim\'e, Uskudar\'dan Besiktas\'a kadar meshur semtleri kesfedebilir, Bogazin ne\'guzelligini pixel art\'a donusmus halinde gorebilirsiniz.',
        'Bes farkli karakter sinifi - Is Adami, Yazilimci, Tasarimci, Pazarlamaci ve Tuccar - Turkiye\'nin modern ekonomik yapısini temsil ediyor. Her sinif kendine ozel yeteneklere sahip.',
        'Ramazan, Cumhuriyet Bayrami, Zafer Bayrami gibi milli ve dini bayramlarda ozel etkinlikler duzenleniy ve oyun dunyasi bu temayla suslenıyor.'
      ],
      highlights: [
        '5 benzersiz Turk karakter sinifi',
        'Istanbul haritasi: 20+ meshur semt',
        'Osmanli ve Turk mimarisi detaylari',
        'Geleneksel Turk muzigi soundtrack',
        'Milli bayram ozel etkinlikleri',
        'Turk mutfagı temalI sanal yemekler',
        'Kulturel objeler ve koleksiyonlar',
        'Tarihisel referanslar ve bilgiler'
      ],
      technicalSpecs: [
        { label: 'Karakter Sınıfları', value: '5 unique classes' },
        { label: 'Harita Buyuklugu', value: '2.5 km² (Istanbul)' },
        { label: 'Kulturel Lokasyon', value: '50+ landmark' },
        { label: 'Dil Destegi', value: 'Turkce (native)' },
        { label: 'Muzik Trackleri', value: '30+ Turk eseri' },
        { label: 'Bayram Etkinligi', value: '15+ yıllık' }
      ],
      testimonials: [
        {
          name: 'Mustafa S.',
          role: 'Is Adami Sinifi',
          comment: 'Turkiyeyi boyle bir oyunda gormek cok gurur verici. Tebrikler!',
          rating: 5
        },
        {
          name: 'Elif D.',
          role: 'Yazilimci Sinifi',
          comment: 'Istanbul haritasi cok detayli yapilmis, her semt ayri guzellik!',
          rating: 5
        }
      ],
      videoTitle: 'Turk Kulturunu Kesfet',
      ctaText: 'YURUDUSUNE KATIL',
      ctaSubtext: 'Dijital Istanbul seni bekliyor!'
    }
  },
  {
    id: 4,
    icon: MessageSquare,
    title: 'Gelismis Chat Sistemi',
    description: 'Multi-room chat, ozel mesajlar, emoji desteği',
    details: 'Genel sohbet, lonca chati, ozel mesajlasma ve sesli sohbet ozellikleri ile tam bir sosyal deneyim.',
    stats: '10,000+ gunluk mesaj',
    color: 'from-green-500 to-emerald-500',
    animation: 'pulse' as const,
    modalContent: {
      tagline: 'Sohbetin Siniri Yok',
      paragraphs: [
        'Gelismis chat sistemimiz ile oyun icerisinde kesintisiz iletisim kurun. Genel sohbet, lonca chati, ozel mesajlar ve hatta sesli sohbet - hepsi bir arada!',
        'Günde 10,000\'den fazla mesaj paylasiliyor, oyuncular arkadaslik kuruyuyor, ticaret yapiyor ve strateji gelistiriyorlar. Chat sistemimiz tum bu etkilesimi sorunsuzca yonetiyor.',
        'Emoji destegi, gif paylasimi, ekran goruntuleri ve hatta oyun ici objeler de chat\'te paylasılabiliyor. Sosyal medya kalitesinde bir deneyim sunuyoruz.',
        'Otomatik moderasyon sistemi sayesinde olumsuz icerik ve spam otomatik olarak filtreleniyor. Guvenli, temiz ve keyifli bir sohbet ortami.'
      ],
      highlights: [
        'Multi-room chat (Genel, Lonca, Ozel)',
        'Anlık mesajlasma (0 gecikme)',
        '1000+ emoji ve gif destegi',
        'Sesli chat kanallari',
        'Ekran goruntuleri paylasimi',
        'Otomatik moderasyon ve filtre',
        'Mesaj gecmisi ve arama',
        'Ozel chat odaları olusturma'
      ],
      technicalSpecs: [
        { label: 'Chat Odaları', value: '100+ simultaneous' },
        { label: 'Mesaj Kapasitesi', value: '10,000/dakika' },
        { label: 'Emoji/Sticker', value: '1,000+ custom' },
        { label: 'Dosya Paylasimi', value: 'Image, GIF (max 5MB)' },
        { label: 'Sesli Chat', value: 'Opus codec, 48kHz' },
        { label: 'Moderasyon', value: 'AI + Human 7/24' }
      ],
      testimonials: [
        {
          name: 'Burak E.',
          role: 'Aktif Sohbetci',
          comment: 'Chat sistemi super hizli, hic donma yasanmiyor. Emoji secenekleri de cok guzel!',
          rating: 5
        },
        {
          name: 'Selin M.',
          role: 'Lonca Koordinatoru',
          comment: 'Lonca chatimiz cok aktif ve sistem mukemmel calisiyor. Sesli chat sayesinde stratejilerimizi anlık paylasiyoruz.',
          rating: 5
        }
      ],
      videoTitle: 'Chat Sistemini İncele',
      ctaText: 'SOHBETE KATIL',
      ctaSubtext: 'Topluluk seni bekliyor!'
    }
  },
  {
    id: 5,
    icon: Coins,
    title: 'Ekonomi Sistemi',
    description: 'Dijital TL, ticaret, ekonomik stratejiler',
    details: 'Gercekci ekonomi sistemi, marketplace, acik arttirma evi ve ticaret mekanikleri.',
    stats: '₺50M toplam ticaret',
    color: 'from-yellow-500 to-amber-500',
    animation: 'rotate' as const,
    modalContent: {
      tagline: 'Dijital Ekonominin Kalbi',
      paragraphs: [
        'Turk Dijital Metropol\'de gercekci bir ekonomi sistemi var. Dijital TL kazanin, yatirim yapin, ticaret yapin ve zenginliginizi buyutun!',
        'Bugune kadar oyuncular arasinda toplam 50 Milyon TL degerinde ticaret gerceklesti. Marketplace\'de binlerce urun alim satim ediliyor, acik arttirma evinde nadir itemlar en yuksek fiyata satiliyor.',
        'Borsada hisse senedi alip satabilir, is kurabilir, calisanlar istihdam edebilir ve pasif gelir elde edebilirsiniz. Strateji ve ekonomi bilginizi kullanarak oyunun en zengin oyuncusu olabilirsiniz.',
        'Enflasyon, faiz oranlari, arz-talep dengesi - her sey gercek ekonomi kurallarına gore calisiyor. Ekonomi uzerinde gercek etkiler yaratabilirsiniz.'
      ],
      highlights: [
        'Dijital TL para birimi',
        'Marketplace ve acik arttirma evi',
        'Borsa ve hisse senedi sistemi',
        'Is kurma ve yonetme mekanikleri',
        'Ticaret ve pazarlik sistemi',
        'Bankaci ve kredi sistemleri',
        'Ekonomik liderlik tablosu',
        'Gercek zamanli piyasa grafikleri'
      ],
      technicalSpecs: [
        { label: 'Para Birimi', value: 'Dijital TL (₺)' },
        { label: 'Toplam Ticaret', value: '₺50,000,000+' },
        { label: 'Marketplace Items', value: '10,000+ aktif' },
        { label: 'Acik Arttirma', value: '100+ günlük' },
        { label: 'Borsa Sirketleri', value: '50+ traded' },
        { label: 'Guncellemeler', value: 'Real-time pricing' }
      ],
      testimonials: [
        {
          name: 'Ahmet R.',
          role: 'Tuccar Sinifi',
          comment: 'Ekonomi sistemi gercekten cok derinlikli. Gercek hayattaki gibi strateji gelistiriyorum!',
          rating: 5
        },
        {
          name: 'Deniz K.',
          role: 'Is Adami',
          comment: 'Borsada hisse alip satmak cok keyifli. Piyasayi takip etmek adrenalin veriyor!',
          rating: 5
        }
      ],
      videoTitle: 'Ekonomi Sistemi Nasil Calisir?',
      ctaText: 'TICARETE BASLA',
      ctaSubtext: 'Dijital zenginlik seni bekliyor!'
    }
  },
  {
    id: 6,
    icon: Gamepad,
    title: 'Mini Oyunlar',
    description: 'Tavla, Okey, Batak ve daha fazlası',
    details: 'Turk kulturunun geleneksel oyunlarini dijital ortamda arkadaslarinla oyna, turnuvalara katil.',
    stats: '8 farkli oyun',
    color: 'from-indigo-500 to-blue-500',
    animation: 'bounce' as const,
    modalContent: {
      tagline: 'Kahvehane Keyfi Dijital Ortamda',
      paragraphs: [
        'Turkiye\'nin geleneksel kahvehane oyunlari artik dijital dunyada! Tavla, Okey, Batak, 101, Pisti ve daha fazlasi arkadaslarinla birlikte oynayabilecegin mini oyunlar.',
        'Her oyun orijinal kurallarina sadik kalarak hazirlanmis. Tavla\'da zar atarken, Okey\'de tas cekerkend veya Batak\'ta iskambil dagitiirken kendinizi gercek bir kahvehanede gibi hissedeceksiniz.',
        'Gunluk, haftalik ve aylik turnuvalar duzenlenyor. En iyi oyuncular liderlik tablosunda yerini aliyor ve ozel odullere sahip oluyor.',
        'Her mini oyun icin ayri istatistikler tutuluyor. Kazanma oranlarin, en uzun seri rekorun ve toplam oyun sayini takip edebilirsiniz.'
      ],
      highlights: [
        '8 geleneksel Turk oyunu',
        'Tavla, Okey, Batak, 101, Pisti',
        'Gunluk turnuvalar ve oduller',
        'Cok oyunculu oyun masalari',
        'Ozel odalar ve davetiye sistemi',
        'Detaylı istatistikler',
        'Liderlik tablolari',
        'Sesli chat destekli oyunlar'
      ],
      technicalSpecs: [
        { label: 'Toplam Oyun', value: '8 mini game' },
        { label: 'Esozamanli Masa', value: '500+ tables' },
        { label: 'Turnuva Sikliği', value: 'Daily, Weekly, Monthly' },
        { label: 'Oyuncu/Masa', value: '2-4 players' },
        { label: 'Odul Havuzu', value: '₺1M+ monthly' },
        { label: 'AI Rakip', value: '3 difficulty levels' }
      ],
      testimonials: [
        {
          name: 'Hasan Y.',
          role: 'Tavla Ustasi',
          comment: 'Tavla oyunlarini cok seviyorum, fizikten farksiz! Zar atisi bile gercekci.',
          rating: 5
        },
        {
          name: 'Fatma A.',
          role: 'Okey Sampiyonu',
          comment: 'Arkadaslarimla her aksam okey oynuyoruz. Turnuvalar cok heyecanli!',
          rating: 5
        }
      ],
      videoTitle: 'Mini Oyunlar Tanıtımı',
      ctaText: 'OYUNLARA KATIL',
      ctaSubtext: 'Kahvehane keyfi dijital oldu!'
    }
  },
  {
    id: 7,
    icon: Heart,
    title: 'Sosyal Ozellikler',
    description: 'Arkadaslik sistemi, guild, evlilik',
    details: 'Arkadas ekle, lonca kur, sosyal etkinliklere katil, hatta dijital dunyaninda evlen!',
    stats: '15,000+ arkadas baglantisi',
    color: 'from-pink-500 to-rose-500',
    animation: 'pulse' as const,
    modalContent: {
      tagline: 'Dijital Sosyal Yasam',
      paragraphs: [
        'Turk Dijital Metropol sadece bir oyun degil, gercek bir sosyal platformum. Yeni arkadasliklar kurun, loncalar olusturun ve hatta dijital dunyada evlenin!',
        'Bugune kadar 15,000\'den fazla arkadas baglantisi kuruldu. Oyuncular sadece oyun icin degil, sosyalesmek icin de platformumuzu kullaniyorlar.',
        'Loncalar (Guilds) oyunun en onemli sosyal yapisini olusturuyor. Kendi loncanizi kurabilir, uyeler toplayabilir, lonca evine sahip olabilir ve lonca savaszlamasina katilabilirsiniz.',
        'Evlilik sistemi sayesinde ozel biriyle baglari guclendirebilir, evlilik torenıi duzanleyebilir, ortak ev satin alabilir ve evlilik bonuslari kazanabilirsiniz.'
      ],
      highlights: [
        'Arkadaslik sistemi ve profiller',
        'Lonca kurma ve yonetimi',
        'Evlilik sistemi ve torenler',
        'Sosyal etkinlikler ve partiler',
        'Hediye gonderme sistemi',
        'Grup aktiviteleri ve questler',
        'Aile sistemi ve soy agaci',
        'Sosyal liderlik tablolari'
      ],
      technicalSpecs: [
        { label: 'Arkadas Limiti', value: '500 per user' },
        { label: 'Lonca Boyutu', value: '100 members max' },
        { label: 'Aktif Lonca', value: '200+ guilds' },
        { label: 'Evlilik Sayisi', value: '1,000+ couples' },
        { label: 'Gunluk Etkinlik', value: '50+ events' },
        { label: 'Hediye Tipi', value: '200+ items' }
      ],
      testimonials: [
        {
          name: 'Cem O.',
          role: 'Lonca Lideri',
          comment: 'Loncamiz 80 kisilik, her aksam bir arada aktivite yapiyoruz. Harika bir topluluk!',
          rating: 5
        },
        {
          name: 'Pinar ve Emre',
          role: 'Evli Cift',
          comment: 'Oyunda evlendik, gercek hayatta da nisanlandik! Bu oyun hayatimizi degistirdi.',
          rating: 5
        }
      ],
      videoTitle: 'Sosyal Yasam ve Loncalar',
      ctaText: 'TOPLULUĞA KATIL',
      ctaSubtext: 'Yeni arkadasliklar seni bekliyor!'
    }
  },
  {
    id: 8,
    icon: Trophy,
    title: 'Basarimlar',
    description: '100+ achievement, liderlik tablosu, oduller',
    details: 'Her basarin icin odullendir, liderlik tablosunda yerini al, ozel rozetler kazan.',
    stats: '127 achievement',
    color: 'from-orange-500 to-red-500',
    animation: 'bounce' as const,
    modalContent: {
      tagline: 'Her Basari Odullendirilir',
      paragraphs: [
        '127 farkli achievement ile her basarin kutlanir! Ilk adimdan efsanesel basarilara kadar tum yolculugunuz kayit altinda.',
        'Basarimlar sadece rozetlerden ibaret degil - her achievement ile ozel oduller, unvanlar, kostumuler ve para kazaniyorsunuz.',
        'Liderlik tablolari haftalik, aylik ve tum zamanlar olmak uzere 3 kategoride tutuluyor. En iyi oyuncular ozel unvanlara ve gorsel efektlere sahip oluyor.',
        'Gizli basarimlar ve nadir oduller var. Bazilari sadece ozel etkinliklerde, bazilari ise tamamen tesadufı olarak kazanilabiliyor.'
      ],
      highlights: [
        '127 unique achievement',
        'Bronze, Silver, Gold, Platinum seviyeler',
        'Ozel rozetler ve unvanlar',
        'Liderlik tablolari (Weekly, Monthly, All-time)',
        'Basari puanlari ve seviye sistemi',
        'Nadir ve gizli basarimlar',
        'Achievement odulleri (para, item, kostum)',
        'Basari showcase profil sayfasi'
      ],
      technicalSpecs: [
        { label: 'Toplam Achievement', value: '127 unique' },
        { label: 'Zorluk Seviyeleri', value: '4 tiers (Bronze-Platinum)' },
        { label: 'Liderboard', value: '3 types (W/M/All)' },
        { label: 'Gizli Achievement', value: '25 secret' },
        { label: 'Odul Havuzu', value: '₺5M+ total' },
        { label: 'Unvan Sayisi', value: '50+ titles' }
      ],
      testimonials: [
        {
          name: 'Yusuf B.',
          role: 'Achievement Hunter',
          comment: '95 achievement topladim, simdi Platinum seviyeye cok yakinim. Bagimlilık yaptı!',
          rating: 5
        },
        {
          name: 'Gizem S.',
          role: 'Liderlik #7',
          comment: 'Liderlik tablosunda ilk 10\'a girmek icin cok calistim. Motivasyon kaynagi!',
          rating: 5
        }
      ],
      videoTitle: 'Achievement Sistemi ve Oduller',
      ctaText: 'BASARILARI KESFET',
      ctaSubtext: 'Ilk rozetini hemen kazan!'
    }
  },
  {
    id: 9,
    icon: Palette,
    title: 'Karakter Ozellestirme',
    description: 'Sinirsiz customization, kostumler, aksesuarlar',
    details: '1000+ kostum, aksesuar ve gorsel ogeselle karakterini tamamen kendine ozel hale getir.',
    stats: '1,200+ item',
    color: 'from-fuchsia-500 to-purple-500',
    animation: 'rotate' as const,
    modalContent: {
      tagline: 'Sinirsiz Ozellestirme Ozgurlugu',
      paragraphs: [
        '1,200\'den fazla kostum, aksesuar, sac modeli, yuz ifadesi ve ozel itemlarla karakterinizi tamamen sizinlestirin!',
        'Her karakterin basindan ayagina kadar ozellestirilebiliyor. Sac rengi, goz rengi, ten rengi, sac modeli, sakail, biyik ve daha fazlasi.',
        'Osmanli kostumleri, modern giysiler, is kiyafetleri, spor kiyafetler, fantastik kostumler - her tarza uygun secenek mevcut.',
        'Nadir kostumler sadece ozel etkinliklerde veya achievement\'lar ile kazanilabiliyor. Benzersiz gorunumle fark yarat!'
      ],
      highlights: [
        '1,200+ kostum ve aksesuar',
        'Sac, goz, ten rengi ozellestirme',
        '50+ sac modeli ve sakail',
        'Osmanli ve modern kostumler',
        'Nadir ve limitli edisyon itemlar',
        'Yuz ifadeleri ve emotelar',
        'Pet sistemi ve pet kostumleri',
        'Karakter kayıt ve preset sistemi'
      ],
      technicalSpecs: [
        { label: 'Toplam Item', value: '1,200+ customization' },
        { label: 'Kostum Kategorisi', value: '15 categories' },
        { label: 'Nadir Item', value: '100+ legendary' },
        { label: 'Pet Cesitleri', value: '30+ pets' },
        { label: 'Renk Paleti', value: '256 colors/item' },
        { label: 'Preset Slot', value: '10 saved looks' }
      ],
      testimonials: [
        {
          name: 'Ebru T.',
          role: 'Fashionista',
          comment: 'Her gun farkli bir kostum deniyorum. Secenek o kadar cok ki bitmez tukenmez!',
          rating: 5
        },
        {
          name: 'Baris K.',
          role: 'Koleksiyoncu',
          comment: 'Tum nadir kostumleri toplamaya calisiyorum. Simdi %60 tamamladim!',
          rating: 5
        }
      ],
      videoTitle: 'Karakter Ozellestirme Showcace',
      ctaText: 'STILINI YARAT',
      ctaSubtext: 'Ozgun karakterini olustur!'
    }
  },
  {
    id: 10,
    icon: Calendar,
    title: 'Ozel Etkinlikler',
    description: 'Gunluk/haftalik eventler, festivaller, turnuvalar',
    details: 'Ramazan, Cumhuriyet Bayrami, yilbasi gibi ozel gunlerde temali etkinlikler ve bonuslar.',
    stats: '20+ yillik event',
    color: 'from-cyan-500 to-teal-500',
    animation: 'pulse' as const,
    modalContent: {
      tagline: 'Her Gun Yeni Bir Macera',
      paragraphs: [
        'Yil boyunca 20\'den fazla ozel etkinlik! Ramazan, Cumhuriyet Bayrami, 23 Nisan, Zafer Bayrami, Yilbasi ve daha fazlasi.',
        'Her etkinlik ozel temali dekorasyonlar, kostumler, questler ve odullerle birlikte geliyor. Oyun dunyasi tamamen o etkinligin havasina giriyor.',
        'Gunluk ve haftalik etkinlikler surekli yeni icerik ve odul sunuyor. Her girisimizde farkli bir aktivite sizi bekliyor.',
        'Sezonluk turnuvalar ve ligler var. PvP, PvE, ekonomi, sosyal - her kategoride en iyi oyuncular odulendirilyor.'
      ],
      highlights: [
        '20+ yillik ozel etkinlik',
        'Gunluk ve haftalik mini eventler',
        'Milli bayram temalari',
        'Sezonluk turnuva ve ligler',
        'Ozel etkinlik kostumleri',
        'Double XP ve bonus gunleri',
        'Limitli edisyon itemlar',
        'Topluluk etkinlikleri ve festivaller'
      ],
      technicalSpecs: [
        { label: 'Yillik Event', value: '20+ major events' },
        { label: 'Gunluk Quest', value: '10+ daily' },
        { label: 'Haftalik Turnuva', value: '4+ weekly' },
        { label: 'Sezonluk Lig', value: '4 seasons/year' },
        { label: 'Odul Havuzu', value: '₺10M+ yearly' },
        { label: 'Katilimci Ortalama', value: '5,000+ per event' }
      ],
      testimonials: [
        {
          name: 'Kemal D.',
          role: 'Event Hunter',
          comment: 'Her etkinlige katiliyorum, odulleri ve temali dekorasyonlari cok seviyorum!',
          rating: 5
        },
        {
          name: 'Seda F.',
          role: 'Turnuva Kazanani',
          comment: 'Ramazan etkinliginde ilk 3\'e girdim. Odulleri harika, emeğe deger!',
          rating: 5
        }
      ],
      videoTitle: 'Ozel Etkinlikler ve Festivaller',
      ctaText: 'ETKINLIKLERE KATIL',
      ctaSubtext: 'Siradaki etkinlik yakinda!'
    }
  },
  {
    id: 11,
    icon: Smartphone,
    title: 'Mobil Uyumlu',
    description: 'Responsive tasarim, her cihazda muhteşem deneyim',
    details: 'Masaustu, tablet ve mobil cihazlarda sorunsuz calisan responsive arayuz.',
    stats: '3 platform desteği',
    color: 'from-violet-500 to-indigo-500',
    animation: 'bounce' as const,
    modalContent: {
      tagline: 'Her Cihazda Mukemmel Deneyim',
      paragraphs: [
        'Turk Dijital Metropol tamamen responsive tasarlanmis. Masaustu, laptop, tablet ve mobil telefonlar - tum cihazlarda mukemmel calisiyor.',
        'Mobil cihazlarda dokunmatik kontroller icin ozel optimize edilmis arayuz. Her dugme, her menu mobil icin yeniden tasarlandi.',
        'Cross-platform save sistemi sayesinde telefonunuzda basladiginiz oyunu bilgisayarda, bilgisayarda basladiginiz oyunu tablette devam ettirebilirsiniz.',
        'Progressive Web App teknolojisi sayesinde mobil cihazlara uygulama gibi kurulabiliyor ve offline mod destekliyor.'
      ],
      highlights: [
        'Tamamen responsive tasarim',
        'Mobil optimize dokunmatik kontroller',
        'Cross-platform save/sync',
        'PWA - Uygulama gibi kurulur',
        'Offline mod destegi',
        'Her cihaz icin optimize performans',
        'Tablet ve iPad ozel arayuz',
        'Mobil bildirimler'
      ],
      technicalSpecs: [
        { label: 'Desteklenen Platformlar', value: 'Desktop, Tablet, Mobile' },
        { label: 'Min. Ekran Boyutu', value: '320px (iPhone SE)' },
        { label: 'PWA Destegi', value: 'Yes (installable)' },
        { label: 'Offline Mode', value: 'Limited features' },
        { label: 'Mobil Performans', value: '60 FPS guaranteed' },
        { label: 'Cross-Save', value: 'Real-time cloud sync' }
      ],
      testimonials: [
        {
          name: 'Ali C.',
          role: 'Mobil Oyuncu',
          comment: 'Telefonumdan oynarken hic sikinti yasamadim. Mobil arayuz cok iyi dusunulmus!',
          rating: 5
        },
        {
          name: 'Merve K.',
          role: 'Tablet Kullanicisi',
          comment: 'Tablet\'imde oynamayi cok seviyorum. Buyuk ekranda cok daha guzel!',
          rating: 5
        }
      ],
      videoTitle: 'Mobil Deneyim Showcase',
      ctaText: 'MOBILDE DENE',
      ctaSubtext: 'Her yerden erisim!'
    }
  },
  {
    id: 12,
    icon: ShieldCheck,
    title: 'Guvenli ve Hizli',
    description: 'End-to-end encryption, DDoS protection, 99.9% uptime',
    details: 'En yuksek guvenlik standartlari, hizli sunucular ve kesintisiz oyun deneyimi.',
    stats: '99.9% uptime',
    color: 'from-emerald-500 to-green-500',
    animation: 'pulse' as const,
    modalContent: {
      tagline: 'Guvenlik ve Performansta Taviz Yok',
      paragraphs: [
        'Verilerinizin guvenligi bizim onceliğimiz. End-to-end encryption ile tum verilerin sifreleniyor ve kimse erisemiyor.',
        '99.9% uptime garantisi ile sunucularimiz neredeyse hic kapanmiyor. DDoS korumasi, otomatik yedekleme ve felaket kurtarma sistemleri surekli aktif.',
        'Istanbul ve Frankfurt\'ta bulunan sunucularimiz en yuksek performansi sagliyor. Ping sureleri 50ms\'nin altinda, veri transfer hizlari cok yuksek.',
        'Duzenli guvenlik denetimleri, penetrasyon testleri ve bug bounty programi ile sistemlerimiz surekli gelestiriliyor.'
      ],
      highlights: [
        'End-to-end encryption (AES-256)',
        'DDoS korumasi ve firewall',
        '99.9% uptime garantisi',
        '<50ms ping (TR sunuculari)',
        'Otomatik gunluk yedekleme',
        'Two-factor authentication (2FA)',
        'SSL/TLS sertifikasi',
        'GDPR uyumlu veri koruma'
      ],
      technicalSpecs: [
        { label: 'Encryption', value: 'AES-256 + RSA-2048' },
        { label: 'Uptime SLA', value: '99.9% guaranteed' },
        { label: 'DDoS Protection', value: 'Cloudflare Enterprise' },
        { label: 'Sunucu Lokasyonu', value: 'Istanbul, Frankfurt' },
        { label: 'Backup Frequency', value: 'Every 6 hours' },
        { label: '2FA Destegi', value: 'TOTP + SMS' }
      ],
      testimonials: [
        {
          name: 'Omer P.',
          role: 'Guvenlik Uzmani',
          comment: 'Sistem guvenligini inceledim, gercekten cok saglam. Verilerimiz guvende!',
          rating: 5
        },
        {
          name: 'Tugce N.',
          role: 'Aktif Oyuncu',
          comment: 'Hic sunucu capsi yasamadim. Her zaman oyuna girebiliyorum, super!',
          rating: 5
        }
      ],
      videoTitle: 'Guvenlik ve Altyapi',
      ctaText: 'GUVENDE OYNA',
      ctaSubtext: 'Verileriniz bizimle guvenode!'
    }
  }
];

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Generate particles for modal background
  useEffect(() => {
    if (selectedFeature) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setParticles(newParticles);
    }
  }, [selectedFeature]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedFeature) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedFeature]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 10 L40 20 L30 30 L20 20 Z' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37]/20 to-[#E30A17]/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold text-lg tracking-wider">
                PREMIUM OZELLIKLER
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white mb-2">Essiz</span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E30A17] to-[#0097D7] bg-clip-text text-transparent">
                Oyun Deneyimi
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Modern web teknolojileri ve Turk kulturunun muhtesem birlesimi
              ile kendinizi farkli bir dunyada bulacaksiniz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                onClick={() => setSelectedFeature(feature)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <PremiumModal
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
            particles={particles}
          />
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-1 bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] rounded-3xl"
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-16 text-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 A20 20 0 1 0 80 50 A15 15 0 1 1 50 10' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                }}
              />

              <h2 className="text-5xl md:text-6xl font-black mb-6 relative z-10">
                <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
                  DENEYIMI YASAMAYA HAZIR MISIN?
                </span>
              </h2>
              <p className="text-2xl text-gray-300 mb-10 relative z-10">
                Simdi kayit ol ve bu muhteşem ozelliklerin tadini cikar!
              </p>

              <motion.a
                href="/auth/register"
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(212, 175, 55, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-block relative px-12 py-6 text-2xl font-black bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-2xl shadow-2xl z-10"
              >
                UCRETSIZ KAYIT OL
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Feature Card Component with 3D Tilt & Click Handler
interface FeatureCardProps {
  feature: Feature;
  index: number;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouseX((e.clientX - rect.left - rect.width / 2) / 15);
    setMouseY((e.clientY - rect.top - rect.height / 2) / 15);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
    setIsHovered(false);
  };

  const Icon = feature.icon;

  // Icon animation variants
  const iconAnimations = {
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 1.5, repeat: Infinity }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity }
    },
    rotate: {
      rotate: [0, 360],
      transition: { duration: 3, repeat: Infinity, ease: 'linear' }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transform: `perspective(1000px) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
      className="group relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border-2 border-white/10 hover:border-white/30 cursor-pointer overflow-hidden"
    >
      {/* Gradient Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      {/* Turkish Pattern Border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 L25 10 L20 15 L15 10 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={isHovered ? iconAnimations[feature.animation] : {}}
        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-lg`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-3 text-white relative z-10 group-hover:text-[#D4AF37] transition-colors">
        {feature.title}
      </h3>

      <p className="text-gray-400 mb-4 relative z-10 leading-relaxed">
        {feature.description}
      </p>

      <p className="text-sm text-gray-500 mb-4 relative z-10 leading-relaxed">
        {feature.details}
      </p>

      {/* Stats Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 relative z-10 mb-4">
        <Zap className="w-4 h-4 text-[#D4AF37]" />
        <span className="text-sm text-gray-300 font-medium">{feature.stats}</span>
      </div>

      {/* Detaylar Button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-[#D4AF37]/50 transition-all"
      >
        <span>Detaylar</span>
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.8 }}
      />

      {/* Hover Glow */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl -z-10`}
        initial={{ scale: 0.8 }}
        animate={isHovered ? { scale: 1.1 } : { scale: 0.8 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Premium Modal Component
interface PremiumModalProps {
  feature: Feature;
  onClose: () => void;
  particles: { id: number; x: number; y: number }[];
}

const PremiumModal: React.FC<PremiumModalProps> = ({ feature, onClose, particles }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Animated Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className={`absolute w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full blur-sm`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}
      </div>

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-2xl rounded-3xl border-2 border-white/10 shadow-2xl"
      >
        {/* Glassmorphism Gradient Border */}
        <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-20 rounded-3xl blur-3xl -z-10`} />

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Header Section */}
        <div className="relative p-12 pb-8 border-b border-white/10">
          <div className="flex items-start gap-6">
            {/* Animated Icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center shadow-2xl`}
            >
              <Icon className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title & Tagline */}
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-black mb-3 bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent"
              >
                {feature.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl text-[#D4AF37] font-semibold mb-4"
              >
                {feature.modalContent.tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className={`px-4 py-2 bg-gradient-to-r ${feature.color} rounded-full flex items-center gap-2`}>
                  <Zap className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">{feature.stats}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-12 space-y-12">
          {/* Description Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {feature.modalContent.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-lg text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative p-8 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <h3 className="text-3xl font-black mb-6 text-white flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              Ozellikler
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {feature.modalContent.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  className="flex items-start gap-3 group"
                >
                  <div className={`mt-1 p-1 bg-gradient-to-r ${feature.color} rounded-full`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Specs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative p-8 bg-gradient-to-br from-[#D4AF37]/10 to-transparent backdrop-blur-xl rounded-2xl border border-[#D4AF37]/20"
          >
            <h3 className="text-3xl font-black mb-6 text-white flex items-center gap-3">
              <Cpu className="w-8 h-8 text-[#D4AF37]" />
              Teknik Ozellikler
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feature.modalContent.technicalSpecs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + idx * 0.05 }}
                  className="relative p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#D4AF37]/50 transition-all group"
                >
                  <div className="text-sm text-gray-400 mb-2">{spec.label}</div>
                  <div className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {spec.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Screenshots Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="relative p-8 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <h3 className="text-3xl font-black mb-6 text-white flex items-center gap-3">
              <ImageIcon className="w-8 h-8 text-[#D4AF37]" />
              Ekran Goruntuleri
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={num}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`relative aspect-video bg-gradient-to-br ${feature.color} rounded-xl overflow-hidden border-2 border-white/20 shadow-lg cursor-pointer`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white/50" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-semibold text-sm">
                      Screenshot {num}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="relative p-8 bg-gradient-to-br from-[#E30A17]/10 to-transparent backdrop-blur-xl rounded-2xl border border-[#E30A17]/20"
          >
            <h3 className="text-3xl font-black mb-6 text-white flex items-center gap-3">
              <Play className="w-8 h-8 text-[#E30A17]" />
              Video Tanitim
            </h3>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl cursor-pointer group"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-20 h-20 bg-[#E30A17] rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-[#E30A17]/50 transition-all"
                >
                  <Play className="w-10 h-10 text-white ml-1" />
                </motion.div>
                <p className="mt-4 text-white font-bold text-xl">
                  {feature.modalContent.videoTitle}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="relative p-8 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <h3 className="text-3xl font-black mb-6 text-white flex items-center gap-3">
              <Quote className="w-8 h-8 text-[#D4AF37]" />
              Oyuncu Yorumlari
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {feature.modalContent.testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + idx * 0.1 }}
                  className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-bold">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="relative p-12 bg-gradient-to-r from-[#E30A17]/20 via-[#D4AF37]/20 to-[#0097D7]/20 backdrop-blur-xl rounded-2xl border-2 border-white/20 text-center overflow-hidden"
          >
            {/* Animated Background Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L40 20 L30 30 L20 20 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />

            <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent relative z-10">
              {feature.modalContent.ctaText}
            </h3>
            <p className="text-xl text-gray-300 mb-8 relative z-10">
              {feature.modalContent.ctaSubtext}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <motion.a
                href="/auth/register"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 font-black text-xl rounded-2xl shadow-2xl flex items-center justify-center gap-3"
              >
                <span>UCRETSIZ KAYIT OL</span>
                <ArrowRight className="w-6 h-6" />
              </motion.a>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-bold text-xl rounded-2xl border-2 border-white/20 transition-all"
              >
                Geri Don
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
