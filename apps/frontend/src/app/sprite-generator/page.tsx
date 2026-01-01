'use client';

import React, { useRef, useEffect, useState } from 'react';
import { PixelArtGenerator, TURKISH_COLOR_PALETTES } from '@/lib/game/PixelArtGenerator';
import { TURKISH_CHARACTER_CLASSES } from '@/lib/game/SpriteManager';

/**
 * SPRITE GENERATOR PAGE
 *
 * Tool to generate and preview pixel art character sprites
 * Downloads sprite sheets for use in the game
 */

export default function SpriteGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generator, setGenerator] = useState<PixelArtGenerator | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('developer');
  const [generated, setGenerated] = useState(false);

  // Initialize generator only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGenerator(new PixelArtGenerator());
    }
  }, []);

  // Generate sprite on mount or class change
  useEffect(() => {
    if (canvasRef.current && selectedClass && generator) {
      const spriteCanvas = generator.generateCharacterSpriteSheet(
        selectedClass as keyof typeof TURKISH_COLOR_PALETTES
      );

      // Copy to display canvas
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(spriteCanvas, 0, 0);
        setGenerated(true);
      }
    }
  }, [selectedClass, generator]);

  const handleDownload = () => {
    if (!generator) return;
    generator.downloadSpriteSheet(selectedClass);
  };

  const handleDownloadAll = async () => {
    if (!generator) return;
    for (const charClass of TURKISH_CHARACTER_CLASSES) {
      generator.generateCharacterSpriteSheet(
        charClass.id as keyof typeof TURKISH_COLOR_PALETTES
      );
      await new Promise(resolve => setTimeout(resolve, 100));
      generator.downloadSpriteSheet(charClass.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-turkish-navy to-turkish-red p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Pixel Art Karakter Üretici
          </h1>
          <p className="text-white/80">
            Türk Dijital Metropol için pixel art karakterler oluşturun
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Class Selection */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Karakter Sınıfı</h2>
            <div className="space-y-3">
              {TURKISH_CHARACTER_CLASSES.map((charClass) => (
                <button
                  key={charClass.id}
                  onClick={() => setSelectedClass(charClass.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedClass === charClass.id
                      ? 'bg-turkish-gold text-turkish-navy scale-105'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-lg">{charClass.nameTR}</div>
                  <div className="text-sm opacity-80">{charClass.description}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleDownload}
                disabled={!generated}
                className="w-full px-6 py-3 bg-turkish-gold text-turkish-navy font-bold rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                İndir ({selectedClass})
              </button>
              <button
                onClick={handleDownloadAll}
                className="w-full px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
              >
                Tümünü İndir
              </button>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Önizleme</h2>
            <div className="bg-black/30 rounded-lg p-4 overflow-auto">
              <canvas
                ref={canvasRef}
                width={512}
                height={512}
                className="border-2 border-white/20 rounded"
                style={{
                  imageRendering: 'pixelated',
                  width: '100%',
                  maxWidth: '512px',
                  height: 'auto'
                }}
              />
            </div>

            {/* Technical Info */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-white/80 text-sm">
              <div className="bg-black/30 p-3 rounded">
                <div className="font-bold text-white">Sprite Boyutu</div>
                <div>32x32 piksel</div>
              </div>
              <div className="bg-black/30 p-3 rounded">
                <div className="font-bold text-white">Animasyonlar</div>
                <div>4 durum x 8 yön</div>
              </div>
              <div className="bg-black/30 p-3 rounded">
                <div className="font-bold text-white">Toplam Kare</div>
                <div>384 frame</div>
              </div>
              <div className="bg-black/30 p-3 rounded">
                <div className="font-bold text-white">FPS</div>
                <div>8-20 fps (duruma göre)</div>
              </div>
            </div>

            {/* Animation States */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-3">Animasyon Durumları</h3>
              <div className="grid grid-cols-2 gap-3 text-white text-sm">
                <div className="bg-black/30 p-3 rounded">
                  <span className="font-bold">IDLE:</span> Beklemede durma
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <span className="font-bold">WALK:</span> Yürüme
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <span className="font-bold">RUN:</span> Koşma
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <span className="font-bold">ACTION:</span> Özel aksiyon
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-3">8 Yön Sistemi</h3>
              <div className="grid grid-cols-4 gap-2 text-white text-xs text-center">
                <div className="bg-black/30 p-2 rounded">N (Kuzey)</div>
                <div className="bg-black/30 p-2 rounded">NE</div>
                <div className="bg-black/30 p-2 rounded">E (Doğu)</div>
                <div className="bg-black/30 p-2 rounded">SE</div>
                <div className="bg-black/30 p-2 rounded">S (Güney)</div>
                <div className="bg-black/30 p-2 rounded">SW</div>
                <div className="bg-black/30 p-2 rounded">W (Batı)</div>
                <div className="bg-black/30 p-2 rounded">NW</div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Kullanım Talimatları</h2>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Yukarıdan bir karakter sınıfı seçin</li>
            <li>Sprite sheet otomatik oluşturulacak ve önizleme gösterilecek</li>
            <li>"İndir" butonuna tıklayarak PNG dosyasını kaydedin</li>
            <li>İndirilen dosyayı <code className="bg-black/30 px-2 py-1 rounded">/public/assets/sprites/</code> dizinine kopyalayın</li>
            <li>Dosya adı: <code className="bg-black/30 px-2 py-1 rounded">character_[sınıf].png</code></li>
            <li>Oyun otomatik olarak sprite'ları yükleyecektir</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
