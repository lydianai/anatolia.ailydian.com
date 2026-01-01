/**
 * ANADOLU REALM - KVKK Aydınlatma Metni
 * Kişisel Verilerin Korunması Kanunu
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, UserCheck, AlertCircle, Check, Mail } from 'lucide-react';

const rights = [
  'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
  'İşlenmişse buna ilişkin bilgi talep etme',
  'İşlenme amacını ve bu amaca uygun kullanılıp kullanılmadığını öğrenme',
  'Yurtiçinde veya yurtdışında aktarıldığı üçüncü kişileri bilme',
  'Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme',
  'KVKK\'da öngörülen şartlar çerçevesinde silinmesini isteme',
  'Aktarıldığı üçüncü kişilere yukarıdaki işlemlerin bildirilmesini isteme',
  'Münhasıran otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonuç doğması halinde itiraz etme',
  'Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme'
];

const dataTypes = [
  {
    icon: UserCheck,
    title: 'Kimlik Bilgileri',
    items: ['Ad-soyad', 'Doğum tarihi', 'T.C. kimlik numarası (zorunlu hallerde)']
  },
  {
    icon: Mail,
    title: 'İletişim Bilgileri',
    items: ['E-posta adresi', 'Telefon numarası', 'Adres bilgisi']
  },
  {
    icon: Lock,
    title: 'Hesap Bilgileri',
    items: ['Kullanıcı adı', 'Şifre (şifrelenmiş)', 'Oyun içi veriler']
  },
  {
    icon: Eye,
    title: 'İşlem Güvenliği Bilgileri',
    items: ['IP adresi', 'Çerez kayıtları', 'Cihaz bilgileri']
  }
];

const purposes = [
  {
    title: 'Hizmet Sunumu',
    description: 'Oyun hizmetlerinin sunulması ve oyuncu deneyiminin iyileştirilmesi'
  },
  {
    title: 'İletişim',
    description: 'Kullanıcılarla iletişim kurulması, bilgilendirme ve destek hizmetleri'
  },
  {
    title: 'Güvenlik',
    description: 'Hesap güvenliğinin sağlanması, dolandırıcılık ve kötüye kullanımın önlenmesi'
  },
  {
    title: 'Analiz ve İyileştirme',
    description: 'Oyun performansının analizi ve hizmet kalitesinin artırılması'
  },
  {
    title: 'Pazarlama',
    description: 'Rıza alınması kaydıyla pazarlama ve tanıtım faaliyetleri'
  },
  {
    title: 'Yasal Yükümlülükler',
    description: 'Yasal yükümlülüklerin yerine getirilmesi ve hukuki taleplere yanıt verilmesi'
  }
];

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                KVKK Aydınlatma Metni
              </span>
            </h1>

            <p className="text-lg text-gray-400 mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu
            </p>
            <p className="text-sm text-gray-500">
              Son güncelleme: 31 Aralık 2024
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#D4AF37]/10 to-[#E30A17]/10 border border-[#D4AF37]/20 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Veri Sorumlusu</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz;
                  veri sorumlusu sıfatıyla <strong className="text-[#D4AF37]">Anadolu Realm</strong> tarafından
                  aşağıda açıklanan kapsamda işlenebilecektir.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Bu metin, kişisel verilerinizin ne şekilde toplandığı, işlendiği, korunduğu ve
                  haklarınızın neler olduğu konusunda sizi bilgilendirmek amacıyla hazırlanmıştır.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Data Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-white mb-8">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                İşlenen Kişisel Veriler
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataTypes.map((dataType, index) => {
                const Icon = dataType.icon;
                return (
                  <motion.div
                    key={dataType.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#E30A17]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#D4AF37]" />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">{dataType.title}</h3>
                        <ul className="space-y-2">
                          {dataType.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Processing Purposes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Kişisel Verilerin İşlenme Amaçları
            </h2>

            <div className="space-y-4">
              {purposes.map((purpose, index) => (
                <motion.div
                  key={purpose.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                >
                  <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{purpose.title}</h3>
                    <p className="text-gray-400 text-sm">{purpose.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* User Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Kişisel Veri Sahibi Olarak Haklarınız
            </h2>

            <p className="text-gray-300 mb-6">
              KVKK'nın 11. maddesi uyarınca, kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:
            </p>

            <div className="space-y-3">
              {rights.map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">{right}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Veri Güvenliği</h2>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Kişisel verilerinizin güvenliğini sağlamak için gerekli teknik ve idari tedbirler alınmaktadır:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Şifreleme</h4>
                    <p className="text-gray-400 text-sm">
                      Veriler SSL/TLS ile şifrelenir
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Erişim Kontrolü</h4>
                    <p className="text-gray-400 text-sm">
                      Sınırlı ve yetkili erişim
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Log Kayıtları</h4>
                    <p className="text-gray-400 text-sm">
                      Tüm işlemler kayıt altına alınır
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Düzenli Denetim</h4>
                    <p className="text-gray-400 text-sm">
                      Güvenlik denetimleri yapılır
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact for Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#D4AF37]/10 to-[#E30A17]/10 border border-[#D4AF37]/20 rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Haklarınızı Kullanmak İçin</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki iletişim kanallarından başvuruda bulunabilirsiniz.
              Başvurularınız en geç 30 gün içinde yanıtlanacaktır.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:kvkk@anatolurealm.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                <Mail className="w-5 h-5" />
                kvkk@anatolurealm.com
              </motion.a>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Başvuru formunu{' '}
              <a href="#" className="text-[#D4AF37] hover:text-[#FFD700] underline">
                buradan indirebilirsiniz
              </a>
            </p>
          </motion.div>

          {/* Last Update Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl text-center"
          >
            <p className="text-gray-400 text-sm">
              Bu aydınlatma metni en son <strong className="text-white">31 Aralık 2024</strong> tarihinde güncellenmiştir.
              Değişiklikler yapıldığında bu sayfa üzerinden duyurulacaktır.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
