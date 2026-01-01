/**
 * TURK DIJITAL METROPOL - World/Map Page
 * Interactive Turkey Map + 7 Zones with Premium Modal System
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MapPin,
  Users,
  Star,
  Gamepad,
  Building2,
  UserCircle,
  ChevronRight,
  Globe,
  Compass,
  X,
  Clock,
  Cloud,
  Train,
  Ship,
  MapPinned,
  TrendingUp,
  Quote,
  Play,
  Sparkles,
  Landmark,
  Activity
} from 'lucide-react';
import { zones } from '@/lib/mock/data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Zone detail data with rich content
const zoneDetails = {
  taksim: {
    lore: [
      "Istanbul'un kalbi atan meydani, modern ile tarihin bulusma noktasi. Her gun binlerce oyuncu bu meydanda bulusuyor, yeni arkadasliklar kuruyor ve efsaneler yaziyor.",
      "Istiklal Caddesi'nin baslangic noktasi olan Taksim, gece gunduz hareketli, canli ve dinamik. Burada her sey mumkun - ticaret, macera, ask ve heyecan.",
      "Cumhuriyet Aniti etrafinda toplanan oyuncular, gunluk gorevlerini aliyor, loncalarina katiliyor ve buyuk maceralara atiliyor. Metro girisi ise diger bolgelere acilan kapiniz.",
      "Nostaljik tramvay sesiyle uyaniyor sehir, Bogazin esintisiyle uyuyor. Taksim sadece bir meydandan ibaret degil, bir yasam tarzi, bir kultur, bir tutkudur."
    ],
    landmarks: [
      { name: 'Istiklal Caddesi', desc: 'Avrupa\'nin en islek caddesi, binlerce dukkan ve kafe', icon: '🏙️' },
      { name: 'Galata Kulesi', desc: 'Bogazin muhtesem manzarasi, romantik gorev noktalari', icon: '🗼' },
      { name: 'Dolmabahce Sarayi', desc: 'Osmanli\'nin gorkemli mirasini kesfet', icon: '🏰' },
      { name: 'Karakoy Limani', desc: 'Deniz ticareti ve balik tutma merkezi', icon: '⚓' },
      { name: 'Tunel', desc: 'Tarihi metro, hizli ulasim sistemi', icon: '🚇' },
      { name: 'Pera Muzesi', desc: 'Kultur ve sanat gorevleri', icon: '🖼️' },
      { name: 'Cicek Pasaji', desc: 'Eglence ve sosyallesmee merkezi', icon: '🌸' },
      { name: 'Beyoglu Sokakllari', desc: 'Gizli gorevler ve hazineler', icon: '🗺️' }
    ],
    activities: [
      { name: 'Tramvay Yolculugu', xp: 50, gold: 100, difficulty: 'Kolay' },
      { name: 'Galata Kulesi Tirmani', xp: 200, gold: 500, difficulty: 'Orta' },
      { name: 'Bogaz Turu', xp: 150, gold: 300, difficulty: 'Kolay' },
      { name: 'Istiklal Sokak Performansi', xp: 100, gold: 250, difficulty: 'Kolay' },
      { name: 'Taksim Meydan Etkinligi', xp: 300, gold: 750, difficulty: 'Orta' },
      { name: 'Galeri Gezisi', xp: 120, gold: 200, difficulty: 'Kolay' },
      { name: 'Gece Hayati Kesfii', xp: 180, gold: 400, difficulty: 'Orta' },
      { name: 'Karakoy Balık Avı', xp: 90, gold: 150, difficulty: 'Kolay' },
      { name: 'Pera\'da Sanat Etkinligi', xp: 250, gold: 600, difficulty: 'Zor' },
      { name: 'Cicek Pasaji Gorevii', xp: 140, gold: 350, difficulty: 'Orta' }
    ],
    economy: {
      trade: 'Teknoloji, moda, sanat ve turizm merkezi',
      businesses: 'Startup kulupler, galeriler, butik oteller',
      income: 'Yuksek gelir potansiyeli, premium pazar'
    },
    transport: {
      metro: 'M2 Hatti (Yenikapi - Haciosman)',
      tram: 'Nostaljik Tramvay',
      ferry: 'Karakoy - Kadikooy - Adalar',
      funicular: 'Tunel ve Taksim Funikuleri'
    },
    weather: {
      current: 'Parcali Bulutlu',
      temp: '18°C',
      season: 'Ilkbahar',
      time: 'Gunduz - 14:30'
    },
    testimonials: [
      { user: 'Ahmet_Istanbul', avatar: '👨', text: 'Taksim\'de baslayan maceramda 50+ arkadas edindim, harika bir deneyim!', rating: 5 },
      { user: 'ZeynepGamer', avatar: '👩', text: 'Galata Kulesi gorevleri inanilmaz, manzara ve oduller mukemmel!', rating: 5 }
    ],
    videoUrl: 'https://www.youtube.com/embed/taksim-tour'
  },
  kizilay: {
    lore: [
      "Baskentin modern merkezi, siyasi gucun kalbi. Kizilay Meydani, Ankara'nin nabzinin attigi nokta. Burada onemli kararlar aliniyor, buyuk anlasmalar yapiliyor.",
      "Ataturk Bulvari uzerindeki buyuk meydan, gunluk binlerce diplomatik gorev ve ticari anlasma ile canli. Burokratik gorevler tamamlayanlar ozel rozetler kazaniyor.",
      "Genclik Parki'ndan Anitkabir'e uzanan yolculuk, tarihi ve modernin muhtecem birlesmesi. Her kosede bir hikaye, her binada bir gorev var.",
      "Baskent ozelinde tasarlanan ozel gorevler, oyunculara benzersiz rozetler ve unvanlar kazandiriyor. Kizilay'da olmak, guc sahibi olmak demektir."
    ],
    landmarks: [
      { name: 'Anitkabir', desc: 'Ataturk\'un aniti, ozel saygii gorevleri', icon: '🏛️' },
      { name: 'Genclik Parki', desc: 'Eglence ve dinlenme alani, mini oyunlar', icon: '🎡' },
      { name: 'Kocatepe Camii', desc: 'Ankaranin en buyuk camii, manevii gorevler', icon: '🕌' },
      { name: 'Ataturk Orman Ciftligi', desc: 'Tarim ve hayvancilik aktiviteleri', icon: '🌾' },
      { name: 'Kugulu Park', desc: 'Romantik gorevler ve piknik alanlari', icon: '🦢' },
      { name: 'Opera Binaasi', desc: 'Kultur ve sanat etkinlikleri', icon: '🎭' },
      { name: 'TBMM Binasi', desc: 'Siyasi gorevler ve diplomasi', icon: '🏢' },
      { name: 'Tunali Hilmi Caddesi', desc: 'Alisveris ve sosyal hayat', icon: '🛍️' }
    ],
    activities: [
      { name: 'Anitkabir Ziyareti', xp: 300, gold: 800, difficulty: 'Orta' },
      { name: 'Genclik Parki Etkinligi', xp: 100, gold: 200, difficulty: 'Kolay' },
      { name: 'Diplomatik Gorev', xp: 400, gold: 1000, difficulty: 'Zor' },
      { name: 'Orman Ciftligi Turu', xp: 150, gold: 350, difficulty: 'Kolay' },
      { name: 'Kugulu Park Piknik', xp: 80, gold: 150, difficulty: 'Kolay' },
      { name: 'Opera Gecesi', xp: 200, gold: 500, difficulty: 'Orta' },
      { name: 'TBMM Gezisi', xp: 250, gold: 600, difficulty: 'Orta' },
      { name: 'Tunali Alisveris', xp: 120, gold: 300, difficulty: 'Kolay' },
      { name: 'Metro Kesfii', xp: 90, gold: 180, difficulty: 'Kolay' },
      { name: 'Baskent Etkinligi', xp: 350, gold: 900, difficulty: 'Zor' }
    ],
    economy: {
      trade: 'Devlet islemleri, egitim, danismanlik',
      businesses: 'Hukuk burolari, konsultans firmalari, akademik kurumlar',
      income: 'Stabil ve guvenli gelir kaynaklari'
    },
    transport: {
      metro: 'Ankaray ve M1-M2-M3 Hatlari',
      bus: 'EGO Otobusleri - 100+ hat',
      train: 'YHT - Hizli Tren Baglantisi',
      taxi: '7/24 Taksi Hizmeti'
    },
    weather: {
      current: 'Acik',
      temp: '22°C',
      season: 'Yaz',
      time: 'Gunduz - 15:00'
    },
    testimonials: [
      { user: 'AnkaraLi_Murat', avatar: '👨', text: 'Anitkabir gorevleri cok duygulandirici, mutlaka yapin!', rating: 5 },
      { user: 'BaskenttteYasam', avatar: '👩', text: 'Diplomatik gorevler sayesinde rozetlerimi tamamladim!', rating: 5 }
    ],
    videoUrl: 'https://www.youtube.com/embed/ankara-tour'
  },
  kordon: {
    lore: [
      "Ege'nin incisi, deniz kokulu ruzgarlar... Kordon Sahili, Izmir'in en romantik ve huzurlu bolgesi. Gunes batarken kordonun keyfini cikaran oyuncular, gunun yorgunlugunu atiyorr.",
      "Sahil boyunca uzanan bisiklet yollari, balik tutma noktalari ve kafeler, oyunculara sayisiz aktivite sunuyor. Ege denizinin berrakligi, dalis gorevlerini eglenceli kiliyor.",
      "Saat Kulesi'nden Alsancak'a uzanan yolculuk, Izmir'in ruhunu hissettiriyor. Kemeraltı Carsisi'nda yapilan ticaret, oyunculara buyuk kazanclar sagliyor.",
      "Deniz ticareti ve balikcilik, Kordon'un ana gelir kaynaklari. Gemi sahipleri ve balikcilar, oyun duniyasinin en zengin oyunculari arasinda yer aliyor."
    ],
    landmarks: [
      { name: 'Saat Kulesi', desc: 'Izmir\'in sembolu, bulusma noktasi', icon: '🕐' },
      { name: 'Kemeraltı Carsisi', desc: 'Buyuk ticaret merkezi, efsane esyalar', icon: '🏪' },
      { name: 'Asansor', desc: 'Tarihi asansor, sehir manzarasi', icon: '🏗️' },
      { name: 'Kadifekale', desc: 'Antik kale, macera gorevleri', icon: '🏰' },
      { name: 'Alsancak Limani', desc: 'Gemi ticareti ve deniz yolculuklari', icon: '⛵' },
      { name: 'Korddon Sahili', desc: '5 km sahil yolu, bisiklet ve yuruyus', icon: '🚴' },
      { name: 'Gundogdu Meydani', desc: 'Festival ve etkinlik alani', icon: '🎪' },
      { name: 'Izmir Fuar Alani', desc: 'Ticari fuarlar ve sergiler', icon: '🎡' }
    ],
    activities: [
      { name: 'Kordon Yuruyusu', xp: 80, gold: 150, difficulty: 'Kolay' },
      { name: 'Balik Tutma', xp: 120, gold: 300, difficulty: 'Kolay' },
      { name: 'Bisiklet Turu', xp: 100, gold: 200, difficulty: 'Kolay' },
      { name: 'Kemeraltı Alisveris', xp: 150, gold: 400, difficulty: 'Orta' },
      { name: 'Asansor Gezisi', xp: 90, gold: 180, difficulty: 'Kolay' },
      { name: 'Kadifekale Kesiifi', xp: 200, gold: 500, difficulty: 'Orta' },
      { name: 'Deniz Ticareti', xp: 300, gold: 800, difficulty: 'Zor' },
      { name: 'Gemi Yarisi', xp: 250, gold: 600, difficulty: 'Orta' },
      { name: 'Gundogdu Festivali', xp: 180, gold: 450, difficulty: 'Orta' },
      { name: 'Fuar Etkinligi', xp: 220, gold: 550, difficulty: 'Orta' }
    ],
    economy: {
      trade: 'Deniz ticareti, tarim urunleri, ihracat',
      businesses: 'Gemi sirketleri, ihracat firmalari, balikcilik',
      income: 'Yuksek ihracat geliri, uluslararasi ticaret'
    },
    transport: {
      metro: 'Izmir Metro - 2 Hat',
      ferry: 'Karsiyaka - Alsancak - Bostanli',
      bus: 'ESHOT Otobussleri',
      bike: 'BISIM Bisiklet Paylasim Sistemi'
    },
    weather: {
      current: 'Gunesli',
      temp: '25°C',
      season: 'Yaz',
      time: 'Gunduz - 16:00'
    },
    testimonials: [
      { user: 'EgeDenizi', avatar: '👨', text: 'Balik tutma gorevleri harika, hem eglenceli hem kazancli!', rating: 5 },
      { user: 'IzmirliSelin', avatar: '👩', text: 'Kordon\'da gunbatimi izlemek paha bicilemez!', rating: 5 }
    ],
    videoUrl: 'https://www.youtube.com/embed/izmir-tour'
  },
  kaleici: {
    lore: [
      "Akdeniz'in cennet kosesi, tarih ve doganin bulustugu liman... Antalya Kaleici, oyun dunyyasinin en guzel ve huzurlu bolgelerinden biri.",
      "Dar sokaklar, tarihi evler ve turkuaz deniz... Kaleici, her kosesinde bir hikaye barindiriyor. Roma doneminden kalma Hadrian Kapisi, oyunculari zamanda yolculuga cikariyor.",
      "Turizm merkezi olan bu bolge, oyunculara sayisiz is firsati sunuyor. Otel isletmeciligi, restoran zinciri ve dalış okulu gibi isletmeler kurabilirsiniz.",
      "Yivli Minare'nin golgesinde, Duden Selalesi'nin sesine karışan oyuncu sohbetleri, Kaleici'yi oyunun en sosyal bolgesi yapiyor."
    ],
    landmarks: [
      { name: 'Hadrian Kapisi', desc: 'Roma donemi aniti, zamann yolculugu', icon: '🏛️' },
      { name: 'Yivli Minare', desc: 'Antalya\'nin sembolu, fotograf noktasi', icon: '🕌' },
      { name: 'Duden Selalesi', desc: 'Muhtesem dogal guzellik, gorev alani', icon: '💧' },
      { name: 'Karain Magarasi', desc: 'Antik magara, gizli hazineler', icon: '🗿' },
      { name: 'Kaleici Limani', desc: 'Tekne turlari ve deniz aktiviteleri', icon: '⚓' },
      { name: 'Konyaalti Plaji', desc: 'Plaj aktiviteleri ve su sporları', icon: '🏖️' },
      { name: 'Antalya Muzesi', desc: 'Arkeolojik hazineler ve kultur', icon: '🏺' },
      { name: 'Olympos Teleferik', desc: 'Dagin zirvesine yolculuk', icon: '🚡' }
    ],
    activities: [
      { name: 'Hadrian Kapisi Gezisi', xp: 150, gold: 350, difficulty: 'Kolay' },
      { name: 'Yivli Minare Fotograf', xp: 80, gold: 150, difficulty: 'Kolay' },
      { name: 'Duden Selalesi Turu', xp: 200, gold: 500, difficulty: 'Orta' },
      { name: 'Karain Magarasi Kesiifi', xp: 300, gold: 750, difficulty: 'Zor' },
      { name: 'Tekne Turu', xp: 180, gold: 400, difficulty: 'Kolay' },
      { name: 'Dalış Macerasi', xp: 250, gold: 600, difficulty: 'Orta' },
      { name: 'Plaj Voleybol', xp: 100, gold: 200, difficulty: 'Kolay' },
      { name: 'Muzee Gezisi', xp: 120, gold: 280, difficulty: 'Kolay' },
      { name: 'Teleferik Yolculugu', xp: 220, gold: 520, difficulty: 'Orta' },
      { name: 'Su Sporlari', xp: 280, gold: 700, difficulty: 'Orta' }
    ],
    economy: {
      trade: 'Turizm, otelcilik, restorancilik',
      businesses: 'Butik oteller, dalış okullari, tur firmalari',
      income: 'Sezonluk yuksek gelir, uluslararasi turistler'
    },
    transport: {
      tram: 'Antray - Sehir Ici Tramvay',
      bus: 'Antalya Ulasim Otobusslerri',
      boat: 'Tekne Turlari ve Deniz Taksi',
      airport: 'Antalya Havalimani - Hizli Baglanti'
    },
    weather: {
      current: 'Acik ve Sicak',
      temp: '30°C',
      season: 'Yaz',
      time: 'Gunduz - 14:00'
    },
    testimonials: [
      { user: 'TatilciAhmet', avatar: '👨', text: 'Kaleici\'nde otel actim, super gelir elde ediyorum!', rating: 5 },
      { user: 'DalisciEsra', avatar: '👩', text: 'Dalış gorevleri inanilmaz, turkuaz suda hazine buldum!', rating: 5 }
    ],
    videoUrl: 'https://www.youtube.com/embed/antalya-tour'
  },
  'ulu-cami': {
    lore: [
      "Osmanlı'nin ilk baskenti, yesilin baskenti... Bursa, tarihi dokusu ve dogal guzellikleriyle oyunculari buyuluyor. Ulu Cami'nin avlusunda yapilan sohbetler, oyunun en guzel anlari.",
      "Ipek Yolu'nun onemli duraklarindan biri olan Bursa, ticaretin merkezi. Koza Han'da yapilan ipek ticareti, oyunculara buyuk kazanclar sagliyor.",
      "Uludag'in eteklerinde kurulu sehir, kis sporlarindan termal turizme kadar sayisiz aktivite sunuyor. Teleferikle dagin zirvesine cikan oyuncular, muhtesem manzaranin keyfini cikariyor.",
      "Yesil Turbe, Yeşil Cami ve Osmanli eserlerri, Bursa'yi oyunun en kulturel bolgesi yapiyor. Her kose bir muzee, her sokak bir tarih dersi."
    ],
    landmarks: [
      { name: 'Ulu Cami', desc: 'Buyuk selale ve 20 kubbe, ibadet ve kultur', icon: '🕌' },
      { name: 'Yesil Turbe', desc: 'Osmanli mimarisinin incisi', icon: '💚' },
      { name: 'Koza Hani', desc: 'Ipek ticareti merkezi, premium esyalar', icon: '🏪' },
      { name: 'Ipek Carsisi', desc: 'Tarihi carsi, ipek ve el sanatlari', icon: '🧵' },
      { name: 'Uludag', desc: 'Kayak ve dag aktiviteleri', icon: '⛷️' },
      { name: 'Cekirge Kaplicaları', desc: 'Termal saglik ve dinlenme', icon: '♨️' },
      { name: 'Cumalikizik Kooyu', desc: 'Osmanlı koyu, zaman yolculugu', icon: '🏘️' },
      { name: 'Bursa Teleferik', desc: 'Sehirden Uludag\'a teleferik', icon: '🚡' }
    ],
    activities: [
      { name: 'Ulu Cami Ziyareti', xp: 150, gold: 300, difficulty: 'Kolay' },
      { name: 'Ipek Ticareti', xp: 300, gold: 800, difficulty: 'Orta' },
      { name: 'Koza Han Alisverisi', xp: 200, gold: 500, difficulty: 'Orta' },
      { name: 'Uludag Kayak', xp: 280, gold: 700, difficulty: 'Zor' },
      { name: 'Termal Baanyoo', xp: 120, gold: 250, difficulty: 'Kolay' },
      { name: 'Cumalikizik Gezisi', xp: 180, gold: 400, difficulty: 'Kolay' },
      { name: 'Teleferik Macerasi', xp: 150, gold: 350, difficulty: 'Kolay' },
      { name: 'Ipek Dokuma Kursu', xp: 250, gold: 600, difficulty: 'Orta' },
      { name: 'Yesil Turbe Turu', xp: 100, gold: 200, difficulty: 'Kolay' },
      { name: 'Iskender Lezzeti', xp: 90, gold: 180, difficulty: 'Kolay' }
    ],
    economy: {
      trade: 'Ipek uretimi, otomotiv, tekstil',
      businesses: 'Ipek fabrikalari, termal oteller, kayak tesisleri',
      income: 'Ceşitli gelir kaynaklari, sanayi ve turizm'
    },
    transport: {
      metro: 'Bursaray - Metro Hatti',
      bus: 'Buruulas Otobussleri',
      cable: 'Uludag Teleferik Sistemi',
      dolmus: 'Geleneksel Dolmus Hatlari'
    },
    weather: {
      current: 'Serin',
      temp: '15°C',
      season: 'Sonbahar',
      time: 'Gunduz - 13:00'
    },
    testimonials: [
      { user: 'IpekYolu_Tacir', avatar: '👨', text: 'Koza Han\'da ipek ticareti yaparak zengin oldum!', rating: 5 },
      { user: 'Kayakci_Zeynep', avatar: '👩', text: 'Uludag kayak gorevleri muhtesem, kis eglencesi!', rating: 5 }
    ],
    videoUrl: 'https://www.youtube.com/embed/bursa-tour'
  },
  'trabzon-meydan': {
    lore: [
      "Karadeniz'in incisi, Sumela'nin efsanevi daglari... Trabzon, oyun dunyyasinin en benzersiz ve otantik bolgesi. Horon, hamsi ve cay kulturu burada yasaniyor.",
      "Dik yamaclarda kurulu manastir Sumela, oyunculari buyuluyor. Daga tirmanarak ulasan oyuncular, hem muhteşem manzaranin hem de ozel oduullerin sahibi oluyor.",
      "Uzungol'un berrak sulari, fotograflarin yildizi. Yaylalarda yapilan festivaller, oyunculari bir araya getiriyor. Kemence sesi esliginde oynanan horon, oyunun en eglenceli aktivitelerinden.",
      "Hamsi avciligi ve cay uretimi, Trabzon'un ana gelir kaynaklari. Findik bahceleri ve cay plantasyonlari, oyunculara pasif gelir sagliyor."
    ],
    landmarks: [
      { name: 'Sumela Manastiri', desc: 'Dag yamaçlarindaki efsanevi manastir', icon: '⛪' },
      { name: 'Uzungol', desc: 'Dogal goller, muhteesem manzara', icon: '🏞️' },
      { name: 'Atatürk Kosku', desc: 'Tarihi kosk ve muzee', icon: '🏛️' },
      { name: 'Ayasofya Muzesi', desc: 'Bizans donemi kilise ve freskler', icon: '🕌' },
      { name: 'Boztepe', desc: 'Sehir manzarasi, cay bahceleri', icon: '🏔️' },
      { name: 'Trabzon Limani', desc: 'Balikcilik ve deniz ticareti', icon: '⚓' },
      { name: 'Cay Bahceleri', desc: 'Cay uretiimi ve toplama', icon: '🍵' },
      { name: 'Ayder Yaylasi', desc: 'Yayla festivali ve dogal guzellik', icon: '🌄' }
    ],
    activities: [
      { name: 'Sumela Tirmani', xp: 350, gold: 900, difficulty: 'Zor' },
      { name: 'Uzungol Turu', xp: 200, gold: 500, difficulty: 'Orta' },
      { name: 'Hamsi Tutma', xp: 150, gold: 350, difficulty: 'Kolay' },
      { name: 'Horon Oynama', xp: 100, gold: 200, difficulty: 'Kolay' },
      { name: 'Cay Toplama', xp: 120, gold: 280, difficulty: 'Kolay' },
      { name: 'Kemence Caalma', xp: 180, gold: 400, difficulty: 'Orta' },
      { name: 'Yayla Festivali', xp: 250, gold: 600, difficulty: 'Orta' },
      { name: 'Findik Hasadi', xp: 130, gold: 300, difficulty: 'Kolay' },
      { name: 'Boztepe Manzarasi', xp: 90, gold: 180, difficulty: 'Kolay' },
      { name: 'Ayasofya Gezisi', xp: 160, gold: 380, difficulty: 'Kolay' }
    ],
    economy: {
      trade: 'Balikcilik, cay ve findik uretimi',
      businesses: 'Cay fabrikalari, balik isletmeleri, turizm',
      income: 'Tarim ve balikcilik bazli gelir'
    },
    transport: {
      bus: 'Trabzon Ulassim Otobuslleri',
      dolmus: 'Yerel Dolmus Hatlari',
      boat: 'Balik Tekneleri ve Deniz Ulasimi',
      cable: 'Dag Teleferik Sistemi'
    },
    weather: {
      current: 'Yagmurlu',
      temp: '16°C',
      season: 'Ilkbahar',
      time: 'Gunduz - 12:00'
    },
    testimonials: [
      { user: 'Karadenizli_Hasan', avatar: '👨', text: 'Sumela\'ya tirmandim, inanilmaz bir deneyim!', rating: 5 },
      { user: 'Cayci_Ayse', avatar: '👩', text: 'Cay bahcelerinde calisiyor, pasif gelir kazaniyorum!', rating: 5 }
    ],
    videoUrl: 'https://www.youtube.com/embed/trabzon-tour'
  },
  mevlana: {
    lore: [
      "Anadolu'nun manevi baskenti, Mevlana'nin sehri... Konya, huzur ve sukunetin bulustugu yer. Sema seremoniileri, oyunculari derin bir meditasyona goturuyor.",
      "Mevlana Muzesi'nin avlusunda toplanan oyuncular, maneviyat gorevlerini tamamliyor ve ozel rozetler kazaniyor. Ask ve hosgorunun sehri, oyunculari birlestiiriyor.",
      "Alaeddin Tepesi'nden sehri seyreden oyuncular, tarihi dokuyu hissediyor. Sille koyu, Karatay Medresesi ve Ince Minareli Medrese, Konya'yi acik hava muuzzesi yapiyor.",
      "Tarim ve sanayi kenti Konya, oyunculara cesitli is firsatlari sunuyor. Hali dokuma, etli ekmek uretimi ve el sanatlari, oyunun en karlii isleri arasinda."
    ],
    landmarks: [
      { name: 'Mevlana Muzesi', desc: 'Mevlana\'nin turbesi, manevvi merkez', icon: '🕌' },
      { name: 'Alaeddin Tepesi', desc: 'Tarihi tepe, sehir manzarasi', icon: '🏔️' },
      { name: 'Sille Koyu', desc: 'Antik kooy, magaralar ve kiliseler', icon: '🏘️' },
      { name: 'Ince Minareli Medrese', desc: 'Selcuklu mimarisi, tas oyma', icon: '🏛️' },
      { name: 'Karatay Medresesi', desc: 'Cini sanati muzesi', icon: '🎨' },
      { name: 'Sema Meydani', desc: 'Sema seremoniileri ve gorevler', icon: '💫' },
      { name: 'Konya Ovasi', desc: 'Tarim alanlari ve hasat', icon: '🌾' },
      { name: 'Tropikal Kelebek Bahcesi', desc: 'Egitici ve eglenceli tur', icon: '🦋' }
    ],
    activities: [
      { name: 'Sema Seremoonisi', xp: 300, gold: 750, difficulty: 'Orta' },
      { name: 'Mevlana Ziyareti', xp: 200, gold: 500, difficulty: 'Kolay' },
      { name: 'Meditasyon', xp: 150, gold: 300, difficulty: 'Kolay' },
      { name: 'Hat Sanati', xp: 250, gold: 600, difficulty: 'Orta' },
      { name: 'Sille Kesfi', xp: 180, gold: 400, difficulty: 'Kolay' },
      { name: 'Hali Dokuma', xp: 220, gold: 550, difficulty: 'Orta' },
      { name: 'Etli Ekmek Yapımı', xp: 100, gold: 200, difficulty: 'Kolay' },
      { name: 'Alaeddin Yuruyusu', xp: 120, gold: 250, difficulty: 'Kolay' },
      { name: 'Cini Sanati', xp: 280, gold: 700, difficulty: 'Zor' },
      { name: 'Tarim Hasadi', xp: 160, gold: 380, difficulty: 'Kolay' }
    ],
    economy: {
      trade: 'Tarim, sanayi, el sanatlari',
      businesses: 'Hali fabrikalari, tarim isletmeleri, turizm',
      income: 'Cesitli gelir kaynaklari, tarim ve sanayi'
    },
    transport: {
      tram: 'Konya Tramvayi - 2 Hat',
      bus: 'Konya Ulasim Otoobusleri',
      train: 'YHT - Hizli Tren Baglantisi',
      bike: 'Bisiklet Paylasim Sistemi'
    },
    weather: {
      current: 'Acik',
      temp: '20°C',
      season: 'Ilkbahar',
      time: 'Gunduz - 15:30'
    },
    testimonials: [
      { user: 'ManeviYolcu', avatar: '👨', text: 'Sema seremoniisi beni cok etkiledi, huzur buldum!', rating: 5 },
      { user: 'SanatciMerve', avatar: '👩', text: 'Hat sanati gorevleri harika, sanat ogreniyorum!', rating: 5 }
    ],
    videoUrl: 'https://www.youtube.com/embed/konya-tour'
  }
};

export default function WorldPage() {
  const [selectedZone, setSelectedZone] = useState(zones[0]);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [modalZone, setModalZone] = useState<string | null>(null);

  // Body scroll lock
  useEffect(() => {
    if (modalZone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalZone]);

  // ESC to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalZone(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0097D7]/10 via-transparent to-transparent" />
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0097D7]/20 to-[#D4AF37]/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Globe className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold text-lg tracking-wider">
                OYUN DUNYASI
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white mb-2">Istanbul & Anadolu</span>
              <span className="block bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] bg-clip-text text-transparent">
                Dijital Haritasi
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              7 farkli bolgede maceraya atil, Turkiye'nin dort bir yanini kesfet,
              her sehirde yeni dostlar edin ve efsaneler yaz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Interaktif Harita
              </span>
            </h2>
            <p className="text-xl text-gray-400">Bolgeye tikla, detaylari gor</p>
          </motion.div>

          {/* Turkey Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl border border-white/10 mb-16"
          >
            {/* Simplified Turkey Shape */}
            <div className="relative w-full aspect-[2/1] bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
                <Compass className="w-16 h-16 opacity-20" />
              </div>

              {/* Zone Markers */}
              {zones.map((zone, index) => {
                // Position zones across Turkey map (mock positions)
                const positions = [
                  { top: '45%', left: '20%' }, // Istanbul (West)
                  { top: '50%', left: '50%' }, // Ankara (Center)
                  { top: '60%', left: '15%' }, // Izmir (Southwest)
                  { top: '75%', left: '35%' }, // Antalya (South)
                  { top: '40%', left: '35%' }, // Bursa (Northwest)
                  { top: '25%', left: '75%' }, // Trabzon (Northeast)
                  { top: '60%', left: '55%' }, // Konya (South-center)
                ];

                return (
                  <motion.button
                    key={zone.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                    onClick={() => setSelectedZone(zone)}
                    onMouseEnter={() => setHoveredZone(zone.id)}
                    onMouseLeave={() => setHoveredZone(null)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group ${
                      selectedZone.id === zone.id ? 'z-20' : 'z-10'
                    }`}
                    style={positions[index]}
                  >
                    {/* Pin */}
                    <div
                      className={`relative transition-all ${
                        selectedZone.id === zone.id
                          ? 'scale-125'
                          : hoveredZone === zone.id
                          ? 'scale-110'
                          : ''
                      }`}
                    >
                      <MapPin
                        className={`w-12 h-12 ${
                          selectedZone.id === zone.id
                            ? 'text-[#D4AF37] fill-[#D4AF37]'
                            : 'text-[#E30A17] fill-[#E30A17]'
                        }`}
                      />

                      {/* Pulse Effect */}
                      {selectedZone.id === zone.id && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#D4AF37]"
                          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          selectedZone.id === zone.id || hoveredZone === zone.id
                            ? 'bg-[#D4AF37] text-gray-900 shadow-lg'
                            : 'bg-white/10 text-white backdrop-blur-sm'
                        }`}
                      >
                        {zone.city}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                <MapPin className="w-5 h-5 text-[#E30A17] fill-[#E30A17]" />
                <span className="text-sm text-gray-300">Sehir</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                <MapPin className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-sm text-gray-300">Secili</span>
              </div>
            </div>
          </motion.div>

          {/* Selected Zone Details */}
          <ZoneDetails zone={selectedZone} />
        </div>
      </section>

      {/* All Zones Grid */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#E30A17] to-[#D4AF37] bg-clip-text text-transparent">
                Tum Bolgeler
              </span>
            </h2>
            <p className="text-xl text-gray-400">Kesfet, oyna, fethet</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zones.map((zone, index) => (
              <ZoneCard
                key={zone.id}
                zone={zone}
                index={index}
                onSelect={() => setSelectedZone(zone)}
                onOpenModal={() => setModalZone(zone.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Modal System */}
      <AnimatePresence>
        {modalZone && (
          <ZoneModal
            zoneId={modalZone}
            onClose={() => setModalZone(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

// Zone Details Component
interface ZoneDetailsProps {
  zone: any;
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ zone }) => {
  return (
    <motion.div
      key={zone.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid lg:grid-cols-2 gap-8"
    >
      {/* Left: Image & Info */}
      <div>
        {/* Zone Image (Mock) */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-4 border-[#D4AF37] overflow-hidden mb-6 shadow-2xl shadow-[#D4AF37]/20">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            {zone.id === 'taksim' && '🏙️'}
            {zone.id === 'kizilay' && '🏛️'}
            {zone.id === 'kordon' && '🌊'}
            {zone.id === 'kaleici' && '🏖️'}
            {zone.id === 'ulu-cami' && '🕌'}
            {zone.id === 'trabzon-meydan' && '⛰️'}
            {zone.id === 'mevlana' && '🌙'}
          </div>

          {/* Level Badge */}
          <div className="absolute top-4 left-4 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-lg border border-[#D4AF37]/30">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#D4AF37]" fill="currentColor" />
              <span className="text-white font-bold">Level {zone.levelRequirement}+</span>
            </div>
          </div>

          {/* Player Count */}
          <div className="absolute top-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-lg border border-green-500/30">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white font-bold">{zone.playerCount}</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <h2 className="text-4xl font-black text-white mb-2">{zone.name}</h2>
        <p className="text-xl text-[#D4AF37] mb-4">{zone.city}</p>
        <p className="text-lg text-gray-300 leading-relaxed">{zone.description}</p>
      </div>

      {/* Right: Features & Details */}
      <div className="space-y-6">
        {/* Features */}
        <div className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#D4AF37]" />
            Ozellikler
          </h3>
          <div className="flex flex-wrap gap-2">
            {zone.features.map((feature: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8960F]/20 rounded-full text-sm text-gray-300 border border-[#D4AF37]/30"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Buildings */}
        <div className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#D4AF37]" />
            Binalar
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {zone.buildings.map((building: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10"
              >
                <span className="text-lg">🏢</span>
                <span className="text-sm text-gray-300">{building}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NPCs */}
        <div className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-[#D4AF37]" />
            NPC'ler
          </h3>
          <div className="space-y-2">
            {zone.npcs.map((npc: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg border border-white/10 hover:border-[#D4AF37]/30 transition-colors"
              >
                <span className="text-2xl">👤</span>
                <span className="text-sm text-gray-300">{npc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Games */}
        <div className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Gamepad className="w-5 h-5 text-[#D4AF37]" />
            Mini Oyunlar
          </h3>
          <div className="flex flex-wrap gap-2">
            {zone.miniGames.map((game: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg text-sm text-gray-300 border border-purple-500/30"
              >
                🎮 {game}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Zone Card Component
interface ZoneCardProps {
  zone: any;
  index: number;
  onSelect: () => void;
  onOpenModal: () => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, index, onSelect, onOpenModal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all cursor-pointer overflow-hidden"
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E30A17]/10 to-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icon */}
      <div className="text-6xl mb-4">
        {zone.id === 'taksim' && '🏙️'}
        {zone.id === 'kizilay' && '🏛️'}
        {zone.id === 'kordon' && '🌊'}
        {zone.id === 'kaleici' && '🏖️'}
        {zone.id === 'ulu-cami' && '🕌'}
        {zone.id === 'trabzon-meydan' && '⛰️'}
        {zone.id === 'mevlana' && '🌙'}
      </div>

      {/* Info */}
      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
        {zone.name}
      </h3>
      <p className="text-[#D4AF37] text-sm mb-3">{zone.city}</p>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{zone.description}</p>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg">
          <Star className="w-4 h-4 text-[#D4AF37]" fill="currentColor" />
          <span className="text-xs text-gray-300">Level {zone.levelRequirement}+</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg">
          <Users className="w-4 h-4 text-green-400" />
          <span className="text-xs text-gray-300">{zone.playerCount}</span>
        </div>
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal();
        }}
        className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-lg font-bold flex items-center justify-center gap-2"
      >
        Detaylar
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

// Premium Zone Modal Component
interface ZoneModalProps {
  zoneId: string;
  onClose: () => void;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ zoneId, onClose }) => {
  const zone = zones.find(z => z.id === zoneId);
  const details = zoneDetails[zoneId as keyof typeof zoneDetails];

  if (!zone || !details) return null;

  // Zone-specific colors
  const zoneColors = {
    'taksim': { primary: '#E30A17', secondary: '#D4AF37' },
    'kizilay': { primary: '#0097D7', secondary: '#D4AF37' },
    'kordon': { primary: '#0097D7', secondary: '#E30A17' },
    'kaleici': { primary: '#D4AF37', secondary: '#0097D7' },
    'ulu-cami': { primary: '#00A86B', secondary: '#D4AF37' },
    'trabzon-meydan': { primary: '#8B4513', secondary: '#00A86B' },
    'mevlana': { primary: '#9B59B6', secondary: '#D4AF37' }
  };

  const colors = zoneColors[zoneId as keyof typeof zoneColors];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl"
        style={{
          boxShadow: `0 0 100px ${colors.primary}40`
        }}
      >
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 2 === 0 ? colors.primary : colors.secondary,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Content */}
        <div className="relative p-8 md:p-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="text-7xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {zone.id === 'taksim' && '🏙️'}
                {zone.id === 'kizilay' && '🏛️'}
                {zone.id === 'kordon' && '🌊'}
                {zone.id === 'kaleici' && '🏖️'}
                {zone.id === 'ulu-cami' && '🕌'}
                {zone.id === 'trabzon-meydan' && '⛰️'}
                {zone.id === 'mevlana' && '🌙'}
              </motion.div>
              <div>
                <h2 className="text-5xl font-black text-white mb-2">{zone.name}</h2>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                  {zone.city}
                </p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20">
                <Star className="w-5 h-5" style={{ color: colors.secondary }} fill="currentColor" />
                <span className="text-white font-bold">Level {zone.levelRequirement}+</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-white font-bold">{zone.playerCount} Oyuncu</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-white font-bold">{details.weather.time}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20">
                <Cloud className="w-5 h-5 text-gray-400" />
                <span className="text-white font-bold">{details.weather.current} - {details.weather.temp}</span>
              </div>
            </div>
          </motion.div>

          {/* Lore Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8" style={{ color: colors.primary }} />
              Bolge Hikayesi
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {details.lore.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-gray-300 leading-relaxed p-4 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Landmarks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Landmark className="w-8 h-8" style={{ color: colors.secondary }} />
              Unlu Yerler
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {details.landmarks.map((landmark, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 hover:border-white/40 transition-all cursor-pointer group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {landmark.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{landmark.name}</h4>
                  <p className="text-sm text-gray-400">{landmark.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8" style={{ color: colors.primary }} />
              Aktiviteler & Gorevler
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {details.activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.03 }}
                  className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 hover:border-white/30 transition-all group"
                >
                  <div className="flex-1">
                    <h4 className="text-white font-bold mb-1">{activity.name}</h4>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-blue-400">+{activity.xp} XP</span>
                      <span className="text-yellow-400">+{activity.gold} Gold</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          activity.difficulty === 'Kolay'
                            ? 'bg-green-500/20 text-green-400'
                            : activity.difficulty === 'Orta'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {activity.difficulty}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ▶️
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Economy & Transport Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Economy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20"
            >
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6" style={{ color: colors.secondary }} />
                Ekonomi
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Ticaret</p>
                  <p className="text-white font-semibold">{details.economy.trade}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Isletmeler</p>
                  <p className="text-white font-semibold">{details.economy.businesses}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Gelir</p>
                  <p className="text-white font-semibold">{details.economy.income}</p>
                </div>
              </div>
            </motion.div>

            {/* Transport */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20"
            >
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <Train className="w-6 h-6" style={{ color: colors.primary }} />
                Ulasim
              </h3>
              <div className="space-y-3">
                {Object.entries(details.transport).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="text-2xl">
                      {key === 'metro' && '🚇'}
                      {key === 'tram' && '🚊'}
                      {key === 'ferry' && '⛴️'}
                      {key === 'bus' && '🚌'}
                      {key === 'train' && '🚄'}
                      {key === 'cable' && '🚡'}
                      {key === 'bike' && '🚲'}
                      {key === 'boat' && '⛵'}
                      {key === 'dolmus' && '🚐'}
                      {key === 'funicular' && '🚋'}
                      {key === 'taxi' && '🚕'}
                      {key === 'airport' && '✈️'}
                    </div>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Quote className="w-8 h-8" style={{ color: colors.secondary }} />
              Oyuncu Yorumlari
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {details.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <p className="text-white font-bold">{testimonial.user}</p>
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Virtual Tour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Play className="w-8 h-8" style={{ color: colors.primary }} />
              Sanal Tur
            </h3>
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-white/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center cursor-pointer border-2 border-white/40"
                >
                  <Play className="w-10 h-10 text-white ml-2" fill="currentColor" />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-lg">
                  <p className="text-white font-bold">{zone.name} - Sanal Tur</p>
                  <p className="text-gray-300 text-sm">360° Interaktif Keşif</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-xl font-black text-xl text-white shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `0 10px 40px ${colors.primary}60`
              }}
            >
              🎮 Bolgeye Git
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
