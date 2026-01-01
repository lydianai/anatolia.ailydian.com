/**
 * ANADOLU REALM - Ayarlar (Settings)
 * User settings and preferences page
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Settings {
  // Game Settings
  graphics: 'low' | 'medium' | 'high' | 'ultra';
  fps: 30 | 60 | 120 | 144;
  vsync: boolean;
  shadows: boolean;
  particles: boolean;
  antialiasing: boolean;

  // Audio Settings
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  ambientVolume: number;
  voiceVolume: number;
  muted: boolean;
  spatialAudio: boolean;

  // Gameplay Settings
  autoSave: boolean;
  tutorialHints: boolean;
  damageNumbers: boolean;
  nameplatess: 'always' | 'combat' | 'never';
  language: 'tr' | 'en' | 'ar';
  chatFilter: boolean;
  privateMessages: boolean;

  // Accessibility
  colorBlindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  fontSize: 'small' | 'medium' | 'large';
  subtitles: boolean;
  screenShake: boolean;
  motionBlur: boolean;

  // Privacy
  showOnlineStatus: boolean;
  allowFriendRequests: boolean;
  allowGuildInvites: boolean;
  showProfile: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    // Defaults
    graphics: 'high',
    fps: 60,
    vsync: true,
    shadows: true,
    particles: true,
    antialiasing: true,

    masterVolume: 70,
    musicVolume: 60,
    sfxVolume: 80,
    ambientVolume: 40,
    voiceVolume: 90,
    muted: false,
    spatialAudio: true,

    autoSave: true,
    tutorialHints: true,
    damageNumbers: true,
    nameplatess: 'combat',
    language: 'tr',
    chatFilter: true,
    privateMessages: true,

    colorBlindMode: 'none',
    fontSize: 'medium',
    subtitles: true,
    screenShake: true,
    motionBlur: true,

    showOnlineStatus: true,
    allowFriendRequests: true,
    allowGuildInvites: true,
    showProfile: true
  });

  const [activeTab, setActiveTab] = useState<'graphics' | 'audio' | 'gameplay' | 'accessibility' | 'privacy'>('graphics');

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'graphics', name: 'Grafik', icon: '🎨' },
    { id: 'audio', name: 'Ses', icon: '🔊' },
    { id: 'gameplay', name: 'Oynanış', icon: '🎮' },
    { id: 'accessibility', name: 'Erişilebilirlik', icon: '♿' },
    { id: 'privacy', name: 'Gizlilik', icon: '🔒' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Ayarlar
        </h1>
        <p className="text-gray-400">Oyun tercihlerinizi özelleştirin</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  w-full p-4 rounded-lg font-bold text-left transition-all flex items-center gap-3
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg'
                    : 'bg-slate-700 hover:bg-slate-600'
                  }
                `}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30"
          >
            {/* Graphics Settings */}
            {activeTab === 'graphics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">🎨 Grafik Ayarları</h2>

                {/* Graphics Quality */}
                <div>
                  <label className="block mb-2 font-bold">Grafik Kalitesi</label>
                  <div className="grid grid-cols-4 gap-3">
                    {(['low', 'medium', 'high', 'ultra'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => updateSetting('graphics', level)}
                        className={`p-3 rounded-lg font-bold transition-all ${
                          settings.graphics === level
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {level === 'low' ? 'Düşük' : level === 'medium' ? 'Orta' : level === 'high' ? 'Yüksek' : 'Ultra'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FPS Limit */}
                <div>
                  <label className="block mb-2 font-bold">FPS Limiti</label>
                  <div className="grid grid-cols-4 gap-3">
                    {([30, 60, 120, 144] as const).map((fps) => (
                      <button
                        key={fps}
                        onClick={() => updateSetting('fps', fps)}
                        className={`p-3 rounded-lg font-bold transition-all ${
                          settings.fps === fps
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {fps} FPS
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <ToggleSetting
                  label="V-Sync"
                  value={settings.vsync}
                  onChange={(val) => updateSetting('vsync', val)}
                />
                <ToggleSetting
                  label="Gölgeler"
                  value={settings.shadows}
                  onChange={(val) => updateSetting('shadows', val)}
                />
                <ToggleSetting
                  label="Partikül Efektleri"
                  value={settings.particles}
                  onChange={(val) => updateSetting('particles', val)}
                />
                <ToggleSetting
                  label="Anti-Aliasing"
                  value={settings.antialiasing}
                  onChange={(val) => updateSetting('antialiasing', val)}
                />
              </div>
            )}

            {/* Audio Settings */}
            {activeTab === 'audio' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">🔊 Ses Ayarları</h2>

                <SliderSetting
                  label="Ana Ses"
                  icon="🔊"
                  value={settings.masterVolume}
                  onChange={(val) => updateSetting('masterVolume', val)}
                />
                <SliderSetting
                  label="Müzik"
                  icon="🎵"
                  value={settings.musicVolume}
                  onChange={(val) => updateSetting('musicVolume', val)}
                />
                <SliderSetting
                  label="Ses Efektleri"
                  icon="💥"
                  value={settings.sfxVolume}
                  onChange={(val) => updateSetting('sfxVolume', val)}
                />
                <SliderSetting
                  label="Ortam Sesleri"
                  icon="🌊"
                  value={settings.ambientVolume}
                  onChange={(val) => updateSetting('ambientVolume', val)}
                />
                <SliderSetting
                  label="Seslendirme"
                  icon="🎤"
                  value={settings.voiceVolume}
                  onChange={(val) => updateSetting('voiceVolume', val)}
                />

                <ToggleSetting
                  label="Sesi Kapat"
                  value={settings.muted}
                  onChange={(val) => updateSetting('muted', val)}
                />
                <ToggleSetting
                  label="3D Uzamsal Ses"
                  value={settings.spatialAudio}
                  onChange={(val) => updateSetting('spatialAudio', val)}
                />
              </div>
            )}

            {/* Gameplay Settings */}
            {activeTab === 'gameplay' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">🎮 Oynanış Ayarları</h2>

                <ToggleSetting
                  label="Otomatik Kayıt"
                  value={settings.autoSave}
                  onChange={(val) => updateSetting('autoSave', val)}
                />
                <ToggleSetting
                  label="Öğretici İpuçları"
                  value={settings.tutorialHints}
                  onChange={(val) => updateSetting('tutorialHints', val)}
                />
                <ToggleSetting
                  label="Hasar Sayıları"
                  value={settings.damageNumbers}
                  onChange={(val) => updateSetting('damageNumbers', val)}
                />

                {/* Nameplates */}
                <div>
                  <label className="block mb-2 font-bold">İsim Plakaları</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['always', 'combat', 'never'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => updateSetting('nameplatess', mode)}
                        className={`p-3 rounded-lg font-bold transition-all ${
                          settings.nameplatess === mode
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {mode === 'always' ? 'Her Zaman' : mode === 'combat' ? 'Savaşta' : 'Asla'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block mb-2 font-bold">Dil</label>
                  <div className="grid grid-cols-3 gap-3">
                    {([
                      { id: 'tr', name: 'Türkçe', flag: '🇹🇷' },
                      { id: 'en', name: 'English', flag: '🇬🇧' },
                      { id: 'ar', name: 'العربية', flag: '🇸🇦' }
                    ] as const).map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => updateSetting('language', lang.id)}
                        className={`p-3 rounded-lg font-bold transition-all ${
                          settings.language === lang.id
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {lang.flag} {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <ToggleSetting
                  label="Chat Filtresi"
                  value={settings.chatFilter}
                  onChange={(val) => updateSetting('chatFilter', val)}
                />
                <ToggleSetting
                  label="Özel Mesajlar"
                  value={settings.privateMessages}
                  onChange={(val) => updateSetting('privateMessages', val)}
                />
              </div>
            )}

            {/* Accessibility Settings */}
            {activeTab === 'accessibility' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">♿ Erişilebilirlik Ayarları</h2>

                {/* Color Blind Mode */}
                <div>
                  <label className="block mb-2 font-bold">Renk Körlüğü Modu</label>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { id: 'none', name: 'Kapalı' },
                      { id: 'deuteranopia', name: 'Deuteranopia' },
                      { id: 'protanopia', name: 'Protanopia' },
                      { id: 'tritanopia', name: 'Tritanopia' }
                    ] as const).map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => updateSetting('colorBlindMode', mode.id)}
                        className={`p-3 rounded-lg font-bold transition-all ${
                          settings.colorBlindMode === mode.id
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {mode.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block mb-2 font-bold">Yazı Boyutu</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => updateSetting('fontSize', size)}
                        className={`p-3 rounded-lg font-bold transition-all ${
                          settings.fontSize === size
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {size === 'small' ? 'Küçük' : size === 'medium' ? 'Orta' : 'Büyük'}
                      </button>
                    ))}
                  </div>
                </div>

                <ToggleSetting
                  label="Altyazılar"
                  value={settings.subtitles}
                  onChange={(val) => updateSetting('subtitles', val)}
                />
                <ToggleSetting
                  label="Ekran Sarsıntısı"
                  value={settings.screenShake}
                  onChange={(val) => updateSetting('screenShake', val)}
                />
                <ToggleSetting
                  label="Hareket Bulanıklığı"
                  value={settings.motionBlur}
                  onChange={(val) => updateSetting('motionBlur', val)}
                />
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">🔒 Gizlilik Ayarları</h2>

                <ToggleSetting
                  label="Çevrimiçi Durumunu Göster"
                  value={settings.showOnlineStatus}
                  onChange={(val) => updateSetting('showOnlineStatus', val)}
                />
                <ToggleSetting
                  label="Arkadaşlık İsteklerine İzin Ver"
                  value={settings.allowFriendRequests}
                  onChange={(val) => updateSetting('allowFriendRequests', val)}
                />
                <ToggleSetting
                  label="Lonca Davetlerine İzin Ver"
                  value={settings.allowGuildInvites}
                  onChange={(val) => updateSetting('allowGuildInvites', val)}
                />
                <ToggleSetting
                  label="Profili Herkese Göster"
                  value={settings.showProfile}
                  onChange={(val) => updateSetting('showProfile', val)}
                />
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-bold text-xl hover:shadow-lg hover:shadow-green-500/50"
              >
                💾 Ayarları Kaydet
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function ToggleSetting({ label, value, onChange }: { label: string; value: boolean; onChange: (val: boolean) => void }) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-lg">
      <span className="font-bold">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-16 h-8 rounded-full transition-all ${
          value ? 'bg-green-500' : 'bg-gray-600'
        }`}
      >
        <div className={`w-6 h-6 bg-white rounded-full transition-all ${
          value ? 'translate-x-9' : 'translate-x-1'
        }`} />
      </button>
    </div>
  );
}

function SliderSetting({ label, icon, value, onChange }: { label: string; icon: string; value: number; onChange: (val: number) => void }) {
  return (
    <div className="p-4 bg-slate-700/50 rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="font-bold">
          <span className="mr-2">{icon}</span>
          {label}
        </span>
        <span className="text-yellow-400 font-bold">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
