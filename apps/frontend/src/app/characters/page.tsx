/**
 * TURK DIJITAL METROPOL - Characters Page
 * 5 Turkish Character Classes - Premium Interactive Modals
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Star,
  Zap,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  X,
  Play,
  CheckCircle,
  Target,
  Trophy,
  Sword,
  Shield,
  Flame
} from 'lucide-react';
import { characterClasses } from '@/lib/mock/data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Enhanced character data with modal content
const enhancedCharacterData = {
  isadami: {
    story: [
      "Istanbul'un kalbinde, modern iş dünyasının temsilcisi olarak yetiştin. Küçük yaşlardan beri ticaretin inceliklerini öğrenerek, Mısır Çarşısı'nın dar sokaklarından Levent'in gökdelenlerine kadar her yerde iz bıraktın.",
      "Sabah erkenden ofisinde işe başlayan, gece geç saatlere kadar anlaşmaları yöneten bir lidersin. Her toplantıda masayı sen çevirirsin, her pazarlıkta en avantajlı teklifi sen alırsın.",
      "Network'ün şehrin dört bir yanına yayılmış durumda. Kim ne yapıyorsa haberdarsin, kim kiminle iş yapıyorsa biliyorsun. Bu bilgi ağın senin en büyük silahın.",
      "Hedefin net: İstanbul'un en güçlü iş imparatorluğunu kurmak ve adını tarihe altın harflerle yazdırmak."
    ],
    playstyle: [
      "CEO tarzı liderlik ile ekipleri yönetin ve büyük projeleri hayata geçirin",
      "Güçlü network ağınızı kullanarak stratejik ortaklıklar kurun",
      "Pazarlık becerilerinizle en karlı anlaşmaları yapın",
      "Pasif gelir sistemleri oluşturarak imparatorluğunuzu büyütün",
      "Risk-getiri analizleriyle akıllı yatırımlar gerçekleştirin",
      "Şirket satın almaları ve birleşmelerle rakiplerinizi etkisiz hale getirin",
      "Prestij ve itibar kazanarak toplumsal statünüzü yükseltin",
      "Global ticaret yollarını açarak uluslararası pazarlara girin"
    ],
    progression: [
      { level: 1, milestone: "İlk Şirketinizi Kurun", bonus: "Başlangıç Sermayesi +50%" },
      { level: 5, milestone: "İlk Çalışanınızı İşe Alın", bonus: "İşgücü Verimliliği +10%" },
      { level: 10, milestone: "Ofis Açın", bonus: "Pasif Gelir Başlangıcı" },
      { level: 15, milestone: "İlk Büyük Anlaşma", bonus: "Pazarlık Gücü +20%" },
      { level: 20, milestone: "Şube Açın", bonus: "Gelir x2" },
      { level: 25, milestone: "Holding Kurun", bonus: "Çoklu İş Yönetimi" },
      { level: 30, milestone: "Borsa'da İşlem Yapın", bonus: "Yatırım Bonusu +30%" },
      { level: 35, milestone: "Uluslararası Genişleme", bonus: "Global Pazar Erişimi" },
      { level: 40, milestone: "Rakip Şirket Satın Alımı", bonus: "Pazar Hakimiyeti +25%" },
      { level: 50, milestone: "İmparatorluk Kuruldu", bonus: "Legendary İş Adamı Ünvanı" }
    ],
    equipment: [
      "Lüks İtalyan Takım Elbise (Karizma +5)",
      "Premium İsviçre Kol Saati (Prestij +10)",
      "Akıllı Tablet & Telefon Seti (İletişim +8)",
      "Özel Yapım Deri Evrak Çantası (Organizasyon +7)",
      "CEO Kartvizit Destesi (Network +15)"
    ],
    testimonials: [
      {
        name: "Ahmet Kaya",
        level: 47,
        quote: "İş Adamı karakteriyle 6 ayda holding sahibi oldum. Network sistemi inanılmaz güçlü!"
      },
      {
        name: "Mehmet Demir",
        level: 38,
        quote: "Pazarlık yetenekleri sayesinde rakiplerimden hep bir adım öndeyim. Kesinlikle tavsiye ederim!"
      }
    ],
    videoTitle: "İş Adamı Masterclass - Level 1'den 50'ye Gidiş",
    bestFor: "Strateji Odaklı Oyuncular"
  },
  yazilimci: {
    story: [
      "Klavyenin büyücüsü, kodun şairi olarak tanınırsın. Çocukluktan beri bilgisayarlarla iç içe büyüdün ve ilk 'Hello World'ünü 8 yaşında yazdın.",
      "Geceler boyunca kod yazıp debug yapan, Stack Overflow'un en aktif Türk üyesi olarak ün salan bir developer'sın. Her probleme teknolojik bir çözüm üretirsin.",
      "Startup dünyasının kurtarıcısı olarak anılırsın. Başkaları için imkansız görünen projeleri haftalarda tamamlarsın. AI, blockchain, cloud - her teknolojiye hakimsin.",
      "Hedefin açık: Türkiye'nin en büyük teknoloji devrimini başlatmak ve kodlarınla geleceği şekillendirmek."
    ],
    playstyle: [
      "Kod yazarak güçlü otomasyon sistemleri oluşturun",
      "Bug hunting ile sistemleri analiz edin ve optimize edin",
      "Open source projelerde işbirliği yaparak takım bonusları kazanın",
      "Hacking yetenekleriyle rakip sistemlere erişim sağlayın",
      "AI asistanlarınızla otomatik problem çözün",
      "Framework ve library'ler geliştirerek pasif gelir elde edin",
      "Tech konferanslarında konuşarak ün kazanın",
      "Startup kurarak teknoloji imparatorluğunuzu büyütün"
    ],
    progression: [
      { level: 1, milestone: "İlk Projenizi Tamamlayın", bonus: "Kod Hızı +30%" },
      { level: 5, milestone: "GitHub 1000 Star", bonus: "Topluluk Desteği" },
      { level: 10, milestone: "İlk Framework'ünüzü Yayınlayın", bonus: "Pasif Gelir Başlat" },
      { level: 15, milestone: "Bug Bounty Kazanın", bonus: "Hacking Becerisi +25%" },
      { level: 20, milestone: "Senior Developer Ol", bonus: "Maaş x3" },
      { level: 25, milestone: "Startup Kurun", bonus: "Girişimci Bonusu" },
      { level: 30, milestone: "AI Asistanı Geliştirin", bonus: "Otomasyon Gücü +40%" },
      { level: 35, milestone: "Tech Conference Konuşmacısı", bonus: "Ün ve İtibar +50" },
      { level: 40, milestone: "Unicorn Startup", bonus: "Değerleme $1B+" },
      { level: 50, milestone: "Tech Legend", bonus: "Kod Büyücüsü Ünvanı" }
    ],
    equipment: [
      "MacBook Pro M3 Max (İşlem Gücü +15)",
      "Mechanical RGB Keyboard (Hız +10)",
      "4K Dual Monitor Setup (Verimlilik +12)",
      "Noise Cancelling Headphones (Konsantrasyon +8)",
      "Kahve Termosu (Enerji +∞)"
    ],
    testimonials: [
      {
        name: "Can Özdemir",
        level: 45,
        quote: "Otomasyon sistemleri sayesinde uyurken bile para kazanıyorum. Yazılımcı karakteri OP!"
      },
      {
        name: "Ege Arslan",
        level: 41,
        quote: "Bug bounty ile bir günde 10000 gold kazandım. Hacking sistemi mükemmel!"
      }
    ],
    videoTitle: "Yazılımcı ile Kod Yaparak Zengin Olma Rehberi",
    bestFor: "Problem Çözücüler"
  },
  tasarimci: {
    story: [
      "Yaratıcılığın sınırlarını zorlayan, renklerin ve şekillerin dilini konuşan bir sanatçısın. Her sabah ilham peşinde koşar, her akşam bir şaheser yaratırsın.",
      "Figma'dan Photoshop'a, Illustrator'dan Blender'a her aracı ustalıkla kullanırsın. Pixel perfect çalışmalar yaparak müşterilerini her seferinde şaşırtırsın.",
      "İstanbul'un en cool coffee shop'larında laptop'unu açıp çalışırsın. Çevrendeki herkes senin estetik anlayışına hayran kalır.",
      "Hedefin kristal netliğinde: Türkiye'nin en ünlü tasarımcısı olmak ve tasarımlarınla kültürü şekillendirmek."
    ],
    playstyle: [
      "Yaratıcılığınızı kullanarak benzersiz tasarımlar oluşturun",
      "Pixel perfect detaylarla premium işler çıkarın",
      "Branding projeleriyle şirketlere kimlik kazandırın",
      "UI/UX uzmanlığıyla kullanıcı deneyimlerini optimize edin",
      "Trend analizi yaparak tasarım dünyasını yönlendirin",
      "Portfolio oluşturarak prestij kazanın",
      "Tasarım ajansı kurarak ekip yönetin",
      "NFT ve dijital sanat eserleriyle pasif gelir elde edin"
    ],
    progression: [
      { level: 1, milestone: "İlk Logo Tasarımı", bonus: "Yaratıcılık +25%" },
      { level: 5, milestone: "Behance 1000 Like", bonus: "Topluluk Tanınırlığı" },
      { level: 10, milestone: "İlk Branding Projesi", bonus: "Proje Fiyatları +50%" },
      { level: 15, milestone: "Design Award Kazanın", bonus: "Prestij +30" },
      { level: 20, milestone: "Tasarım Ajansı Kurun", bonus: "Ekip Bonusları" },
      { level: 25, milestone: "International Client", bonus: "Global Pazar +40%" },
      { level: 30, milestone: "Design System Oluşturun", bonus: "Verimlilik x2" },
      { level: 35, milestone: "NFT Koleksiyonu", bonus: "Pasif Gelir Stream" },
      { level: 40, milestone: "Tasarım Konferansı Konuşmacısı", bonus: "Otorite +50" },
      { level: 50, milestone: "Design Legend", bonus: "Sanat Dehası Ünvanı" }
    ],
    equipment: [
      "iPad Pro + Apple Pencil (Tasarım Gücü +20)",
      "Wacom Cintiq Pro (Precision +15)",
      "Pantone Kartları (Renk Doğruluğu +100%)",
      "Premium Sketchbook (İlham +10)",
      "Ergonomik Mouse (Konfor +8)"
    ],
    testimonials: [
      {
        name: "Zeynep Yıldız",
        level: 43,
        quote: "Branding projeleriyle müşterilerime değer katıyorum. Tasarımcı karakteri yaratıcılar için ideal!"
      },
      {
        name: "Ayşe Şahin",
        level: 39,
        quote: "NFT koleksiyonumdan her gün pasif gelir elde ediyorum. Design sistemi harika!"
      }
    ],
    videoTitle: "Tasarımcı ile Sıfırdan Portfolio Oluşturma",
    bestFor: "Yaratıcı Oyuncular"
  },
  pazarlamaci: {
    story: [
      "Dijital dünyanın iletişim ustası, viral içeriklerin yaratıcısı olarak tanınırsın. Sosyal medya senin oyun alanın, her post bir strateji.",
      "Sabah trend analizi, öğle kampanya yönetimi, akşam networking - günün her saati pazarlama ile dolu. Instagram, Twitter, LinkedIn - her platformda aktif ve etkilisin.",
      "100K+ takipçi kitlen var ve her paylaşımın binlerce etkileşim alıyor. Influencer'ların influencer'ı olarak anılıyorsun.",
      "Hedefin viral: Türkiye'nin en büyük pazarlama gurusu olmak ve her kampanla yeni rekorlar kırmak."
    ],
    playstyle: [
      "Viral içerikler oluşturarak takipçi kitlenizi büyütün",
      "ROI odaklı kampanyalarla geliri maksimize edin",
      "Influencer aura'nızla insanları etkileyip yönlendirin",
      "Sosyal medya analitiği ile stratejilerinizi optimize edin",
      "Brand deal'ler yaparak sponsorluk gelirleri kazanın",
      "Trend yaratarak pazar liderliğini ele geçirin",
      "PR stunts ile medyada yer alıp ünlenin",
      "Pazarlama ajansı kurarak müşteri portföyü oluşturun"
    ],
    progression: [
      { level: 1, milestone: "İlk Viral Post", bonus: "Takipçi Büyümesi +100%" },
      { level: 5, milestone: "10K Takipçi", bonus: "Engagement Rate +25%" },
      { level: 10, milestone: "İlk Brand Deal", bonus: "Sponsorluk Geliri" },
      { level: 15, milestone: "100K Takipçi", bonus: "Influencer Statüsü" },
      { level: 20, milestone: "Pazarlama Ajansı Kurun", bonus: "Müşteri Bonusu" },
      { level: 25, milestone: "Kampanya Ödülü", bonus: "ROI +50%" },
      { level: 30, milestone: "1M Takipçi", bonus: "Mega Influencer" },
      { level: 35, milestone: "TED Talk Konuşması", bonus: "Otorite +100" },
      { level: 40, milestone: "Global Campaign", bonus: "Uluslararası Tanınma" },
      { level: 50, milestone: "Marketing Mogul", bonus: "Viral Kral Ünvanı" }
    ],
    equipment: [
      "iPhone 15 Pro Max (Content Quality +20)",
      "Professional Ring Light (Görüntü Kalitesi +15)",
      "Gimbal Stabilizer (Video Kalitesi +12)",
      "Content Planner Pro (Organizasyon +10)",
      "Analytics Dashboard (Strateji +18)"
    ],
    testimonials: [
      {
        name: "Berk Aydın",
        level: 46,
        quote: "Viral kampanyalarımla günde 50K gold kazanıyorum. Pazarlamacı karakteri sosyal oyuncular için mükemmel!"
      },
      {
        name: "Selin Kara",
        level: 42,
        quote: "Brand deal'lerim sayesinde pasif gelir akışım var. Influencer sistemi çok gerçekçi!"
      }
    ],
    videoTitle: "Pazarlamacı ile 0'dan 1M Takipçi Stratejisi",
    bestFor: "Sosyal Oyuncular"
  },
  tuccar: {
    story: [
      "Kapalıçarşı'nın modern versiyonu, Anadolu'nun ticaret ustası olarak yetiştin. Nesillerin biriktirdiği ticaret bilgisini modern ekonomiye uyarlayan bir dahisin.",
      "Büyük babandan öğrendiğin ticaret sırlarını kripto paradan emtia ticaretine kadar her alana uygularsın. 'Al ucuzdan, sat pahalıya' - yaşam felsefenin temeli.",
      "Piyasanın nabzını tutan, fiyat hareketlerini önceden tahmin eden, her zaman kazançlı çıkan bir tacirsin. Sabır ve strateji senin en büyük silahların.",
      "Hedefin ebedi: Türkiye'nin en zengin tüccarı olmak ve ticaret imparatorluğunu kuşaklar boyu sürdürmek."
    ],
    playstyle: [
      "Piyasa analizi yaparak fiyat hareketlerini tahmin edin",
      "Toplu alım-satımlarla büyük karlar elde edin",
      "Kervan sistemiyle ticaret konvoyları düzenleyin",
      "Lojistik ağ kurarak tedarik zincirine hakim olun",
      "Ekonomik krizlerde fırsatları değerlendirin",
      "Uluslararası ticaret yollarını açın",
      "Depo ve envanter yönetimiyle verimliliği artırın",
      "Ticaret loncası kurarak monopol oluşturun"
    ],
    progression: [
      { level: 1, milestone: "İlk Ticaret", bonus: "Kar Marjı +10%" },
      { level: 5, milestone: "Dükkân Açın", bonus: "Satış Hacmi x2" },
      { level: 10, milestone: "İlk Kervan", bonus: "Toplu Ticaret Bonusu" },
      { level: 15, milestone: "Depo Sistemi", bonus: "Envanter Kapasitesi +100%" },
      { level: 20, milestone: "Çarşı Açın", bonus: "Pasif Ticaret Geliri" },
      { level: 25, milestone: "Uluslararası Ticaret", bonus: "Global Pazar +35%" },
      { level: 30, milestone: "Ticaret Loncası", bonus: "Monopol Gücü" },
      { level: 35, milestone: "Liman Kontrolü", bonus: "İthalat-İhracat Master" },
      { level: 40, milestone: "Ticaret İmparatorluğu", bonus: "Pazar Hakimiyeti %40" },
      { level: 50, milestone: "Merchant King", bonus: "Efsanevi Tüccar Ünvanı" }
    ],
    equipment: [
      "Antika Ticaret Defteri (Kayıt Tutma +20)",
      "Hassas Tartı Seti (Doğruluk +100%)",
      "Altın Kaplama Kese (Prestij +15)",
      "Mühür Yüzüğü (Otorite +12)",
      "Kervan Haritası (Ticaret Yolu +25%)"
    ],
    testimonials: [
      {
        name: "Hasan Çelik",
        level: 48,
        quote: "Kervan sistemiyle günde 100K+ gold kazanıyorum. Tüccar karakteri ekonomi oyuncuları için biçilmiş kaftan!"
      },
      {
        name: "Mustafa Yılmaz",
        level: 44,
        quote: "Piyasa analizi sayesinde her zaman karlı çıkıyorum. Ticaret mekaniği inanılmaz detaylı!"
      }
    ],
    videoTitle: "Tüccar ile Milyoner Olma Rehberi - Ticaret Stratejileri",
    bestFor: "Ekonomi Odaklı Oyuncular"
  }
};

export default function CharactersPage() {
  const [selectedClass, setSelectedClass] = useState(characterClasses[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCharacter, setModalCharacter] = useState<any>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const openCharacterModal = (charClass: any) => {
    setModalCharacter(charClass);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E30A17]/10 via-transparent to-transparent" />
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E30A17]/20 to-[#D4AF37]/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Users className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold text-lg tracking-wider">
                KARAKTER SINIFLARI
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white mb-2">5 Turk</span>
              <span className="block bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] bg-clip-text text-transparent">
                Karakter Sinifi
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Her biri benzersiz yetenekler ve hikayelerle dolu,
              Turk kulturunu yansitan karakter siniflari.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Class Selection */}
      <section className="relative py-16 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {characterClasses.map((charClass, index) => (
              <ClassSelector
                key={charClass.id}
                charClass={charClass}
                index={index}
                isSelected={selectedClass.id === charClass.id}
                onClick={() => setSelectedClass(charClass)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Selected Class Details */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <ClassDetails key={selectedClass.id} charClass={selectedClass} />
          </AnimatePresence>
        </div>
      </section>

      {/* All Classes Grid */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Tum Siniflar
              </span>
            </h2>
            <p className="text-xl text-gray-400">Karsilastir ve en uygun sinifi sec</p>
          </motion.div>

          <div className="space-y-8">
            {characterClasses.map((charClass, index) => (
              <ClassComparisonCard
                key={charClass.id}
                charClass={charClass}
                index={index}
                onSelect={() => setSelectedClass(charClass)}
                onDetailsClick={() => openCharacterModal(charClass)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Character Modal */}
      <CharacterModal
        isOpen={modalOpen}
        character={modalCharacter}
        onClose={() => setModalOpen(false)}
      />

      <Footer />
    </div>
  );
}

// Class Selector Component
interface ClassSelectorProps {
  charClass: any;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({
  charClass,
  index,
  isSelected,
  onClick,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-6 rounded-2xl border-2 transition-all ${
        isSelected
          ? 'bg-gradient-to-br from-[#E30A17]/20 to-[#D4AF37]/20 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/20'
          : 'bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/30'
      }`}
    >
      {/* Sprite Preview (Mock) */}
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-3xl">
        {charClass.id === 'isadami' && '👔'}
        {charClass.id === 'yazilimci' && '💻'}
        {charClass.id === 'tasarimci' && '🎨'}
        {charClass.id === 'pazarlamaci' && '📱'}
        {charClass.id === 'tuccar' && '🏪'}
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{charClass.name}</h3>
      <p className="text-xs text-[#D4AF37] mb-2">{charClass.title}</p>
      <p className="text-xs text-gray-400">{charClass.playerCount.toLocaleString()} oyuncu</p>

      {isSelected && (
        <motion.div
          layoutId="class-indicator"
          className="absolute inset-0 border-2 border-[#D4AF37] rounded-2xl"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

// Class Details Component
interface ClassDetailsProps {
  charClass: any;
}

const ClassDetails: React.FC<ClassDetailsProps> = ({ charClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="grid lg:grid-cols-2 gap-12"
    >
      {/* Left: Character Info */}
      <div>
        {/* Character Sprite */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative mb-8"
        >
          <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/20 flex items-center justify-center text-9xl overflow-hidden">
            {charClass.id === 'isadami' && '👔'}
            {charClass.id === 'yazilimci' && '💻'}
            {charClass.id === 'tasarimci' && '🎨'}
            {charClass.id === 'pazarlamaci' && '📱'}
            {charClass.id === 'tuccar' && '🏪'}

            {/* Animated Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#E30A17]/20 to-[#D4AF37]/20"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Player Count Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute -top-4 -right-4 px-6 py-3 bg-gradient-to-r from-[#E30A17] to-[#D4AF37] rounded-full shadow-xl"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white font-bold">{charClass.playerCount.toLocaleString()}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl font-black text-white mb-2">{charClass.name}</h2>
          <p className="text-2xl text-[#D4AF37] mb-4">{charClass.title}</p>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{charClass.description}</p>

          {/* Lore */}
          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 mb-6">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              Hikaye
            </h3>
            <p className="text-gray-400 leading-relaxed">{charClass.lore}</p>
          </div>

          {/* Starting Equipment */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3">Baslangic Ekipmani</h3>
            <div className="flex flex-wrap gap-2">
              {charClass.startingEquipment.map((item: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-lg border border-white/10"
                >
                  <span className="text-sm text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Starting Gold */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8960F]/20 rounded-xl border border-[#D4AF37]/30">
            <span className="text-2xl">💰</span>
            <div>
              <div className="text-xs text-gray-400">Baslangic Altini</div>
              <div className="text-xl font-bold text-[#D4AF37]">
                ₺{charClass.startingGold.toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Stats & Abilities */}
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
            Istatistikler
          </h3>

          <div className="space-y-4">
            {Object.entries(charClass.stats).map(([key, value], index) => (
              <StatBar
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value as number}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Abilities */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#D4AF37]" />
            Yetenekler
          </h3>

          <div className="space-y-4">
            {charClass.abilities.map((ability: any, index: number) => (
              <AbilityCard key={index} ability={ability} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Quotes */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-2xl border border-[#D4AF37]/30"
        >
          <h3 className="text-xl font-bold text-white mb-4">Unlu Sozleri</h3>
          <div className="space-y-3">
            {charClass.quotes.map((quote: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="text-[#D4AF37] text-xl">&ldquo;</span>
                <p className="text-gray-300 italic">{quote}</p>
                <span className="text-[#D4AF37] text-xl">&rdquo;</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Stat Bar Component
interface StatBarProps {
  label: string;
  value: number;
  index: number;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, index }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-bold text-white">{value}/10</span>
      </div>
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / 10) * 100}%` }}
          transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] rounded-full"
        />
      </div>
    </div>
  );
};

// Ability Card Component
interface AbilityCardProps {
  ability: any;
  index: number;
}

const AbilityCard: React.FC<AbilityCardProps> = ({ ability, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#D4AF37]/30 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{ability.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
              {ability.name}
            </h4>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                ability.type === 'passive'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {ability.type === 'passive' ? 'Pasif' : 'Aktif'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-2">{ability.description}</p>
          {ability.cooldown > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>⏱️ Cooldown: {ability.cooldown}s</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Class Comparison Card Component
interface ClassComparisonCardProps {
  charClass: any;
  index: number;
  onSelect: () => void;
  onDetailsClick: () => void;
}

const ClassComparisonCard: React.FC<ClassComparisonCardProps> = ({
  charClass,
  index,
  onSelect,
  onDetailsClick,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all group"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Icon */}
        <div className="text-6xl">
          {charClass.id === 'isadami' && '👔'}
          {charClass.id === 'yazilimci' && '💻'}
          {charClass.id === 'tasarimci' && '🎨'}
          {charClass.id === 'pazarlamaci' && '📱'}
          {charClass.id === 'tuccar' && '🏪'}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-1">{charClass.name}</h3>
          <p className="text-[#D4AF37] mb-2">{charClass.title}</p>
          <p className="text-gray-400 text-sm mb-3">{charClass.description}</p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-2">
            {charClass.abilities.slice(0, 3).map((ability: any, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10"
              >
                {ability.icon} {ability.name}
              </span>
            ))}
          </div>
        </div>

        {/* Select Button */}
        <motion.button
          onClick={onDetailsClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          Detaylar
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Premium Character Modal Component
interface CharacterModalProps {
  isOpen: boolean;
  character: any;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ isOpen, character, onClose }) => {
  if (!character) return null;

  const enhancedData = enhancedCharacterData[character.id as keyof typeof enhancedCharacterData];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl border-2 border-[#D4AF37]/30 shadow-2xl overflow-hidden">
              {/* Animated Particle Background */}
              <ParticleBackground />

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 hover:bg-[#E30A17]/80 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Scrollable Content */}
              <div className="relative h-full overflow-y-auto px-8 py-12 md:px-16 md:py-16">
                <div className="max-w-6xl mx-auto space-y-12">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="text-8xl mb-6">
                      {character.id === 'isadami' && '👔'}
                      {character.id === 'yazilimci' && '💻'}
                      {character.id === 'tasarimci' && '🎨'}
                      {character.id === 'pazarlamaci' && '📱'}
                      {character.id === 'tuccar' && '🏪'}
                    </div>
                    <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] bg-clip-text text-transparent">
                      {character.name}
                    </h2>
                    <p className="text-2xl text-[#D4AF37] mb-4">{character.title}</p>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">{character.description}</p>
                  </motion.div>

                  {/* Story Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                      Karakter Hikayesi
                    </h3>
                    <div className="space-y-4">
                      {enhancedData.story.map((paragraph, index) => (
                        <p key={index} className="text-gray-300 leading-relaxed text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Abilities Breakdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-8 bg-gradient-to-br from-[#E30A17]/10 to-[#D4AF37]/10 backdrop-blur-xl rounded-2xl border border-[#D4AF37]/30"
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Zap className="w-8 h-8 text-[#D4AF37]" />
                      Detayli Yetenek Analizi
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {character.abilities.map((ability: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:border-[#D4AF37]/50 transition-all"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl">{ability.icon}</span>
                            <div>
                              <h4 className="text-xl font-bold text-white">{ability.name}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                ability.type === 'passive' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {ability.type === 'passive' ? 'Pasif' : 'Aktif'}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-300">{ability.description}</p>
                          {ability.cooldown > 0 && (
                            <p className="text-sm text-gray-500 mt-2">⏱️ Cooldown: {ability.cooldown}s</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Playstyle Recommendations */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Target className="w-8 h-8 text-[#D4AF37]" />
                      Oyun Tarzi Onerileri
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {enhancedData.playstyle.map((tip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{tip}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-[#0097D7]/20 to-[#D4AF37]/20 rounded-xl border border-[#0097D7]/30">
                      <p className="text-center text-lg font-bold text-white">
                        En Uygun: <span className="text-[#D4AF37]">{enhancedData.bestFor}</span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Progression System */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-8 bg-gradient-to-br from-[#0097D7]/10 to-transparent backdrop-blur-xl rounded-2xl border border-[#0097D7]/30"
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Trophy className="w-8 h-8 text-[#D4AF37]" />
                      Seviye Ilerlemesi (1-50)
                    </h3>
                    <div className="space-y-3">
                      {enhancedData.progression.map((milestone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.03 }}
                          className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-full flex items-center justify-center font-bold text-white text-lg">
                            {milestone.level}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold mb-1">{milestone.milestone}</h4>
                            <p className="text-sm text-[#D4AF37]">{milestone.bonus}</p>
                          </div>
                          <Star className="w-6 h-6 text-[#D4AF37]" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Best Equipment */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Shield className="w-8 h-8 text-[#D4AF37]" />
                      En Iyi Ekipman Onerileri
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {enhancedData.equipment.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Sword className="w-5 h-5 text-[#D4AF37]" />
                            <p className="text-white font-bold">{item.split(' (')[0]}</p>
                          </div>
                          <p className="text-sm text-gray-400">{item.match(/\(([^)]+)\)/)?.[1]}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Player Testimonials */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-8 bg-gradient-to-br from-[#D4AF37]/10 to-transparent backdrop-blur-xl rounded-2xl border border-[#D4AF37]/30"
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Users className="w-8 h-8 text-[#D4AF37]" />
                      Unlu Oyuncu Yorumlari
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {enhancedData.testimonials.map((testimonial, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-full flex items-center justify-center font-bold text-white">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-white">{testimonial.name}</p>
                              <p className="text-sm text-gray-400">Level {testimonial.level}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Video Showcase */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Play className="w-8 h-8 text-[#D4AF37]" />
                      Video Gosterimi
                    </h3>
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                      <div className="text-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-24 h-24 mx-auto mb-4 bg-[#D4AF37] rounded-full flex items-center justify-center group-hover:bg-[#E30A17] transition-colors"
                        >
                          <Play className="w-12 h-12 text-white ml-2" />
                        </motion.div>
                        <p className="text-white font-bold text-xl">{enhancedData.videoTitle}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-6 bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] rounded-2xl font-black text-white text-2xl shadow-2xl"
                    >
                      <span className="flex items-center gap-3">
                        <Flame className="w-8 h-8" />
                        Karakteri Sec
                        <Flame className="w-8 h-8" />
                      </span>
                    </motion.button>
                    <p className="text-gray-400 mt-4">Bu karakterle oyuna basla ve maceraya atil!</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Particle Background Component
const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#D4AF37]/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
