'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TURKISH_CHARACTER_CLASSES } from '@/lib/game/SpriteManager';
import { PixelArtGenerator, TURKISH_COLOR_PALETTES } from '@/lib/game/PixelArtGenerator';

/**
 * CHARACTER CREATION PAGE
 *
 * Create your Turkish Digital Metropol character
 */

export default function CharacterCreationPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generator, setGenerator] = useState<PixelArtGenerator | null>(null);

  // Initialize generator only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGenerator(new PixelArtGenerator());
    }
  }, []);

  const [selectedClass, setSelectedClass] = useState<string>('developer');
  const [characterName, setCharacterName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  // Preview character
  useEffect(() => {
    if (canvasRef.current && selectedClass && generator) {
      const spriteCanvas = generator.generateCharacterSpriteSheet(
        selectedClass as keyof typeof TURKISH_COLOR_PALETTES
      );

      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw enlarged idle sprite (frame 0, direction South)
        const scale = 4;
        ctx.drawImage(
          spriteCanvas,
          0, 0, 32, 32, // Source: first frame
          0, 0, 32 * scale, 32 * scale // Destination: scaled
        );
      }
    }
  }, [selectedClass, generator]);

  const validateName = (name: string): boolean => {
    if (name.length < 3) {
      setNameError('İsim en az 3 karakter olmalı');
      return false;
    }
    if (name.length > 16) {
      setNameError('İsim en fazla 16 karakter olmalı');
      return false;
    }
    if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ0-9_]+$/.test(name)) {
      setNameError('İsim sadece harf, rakam ve _ içerebilir');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCharacterName(name);
    if (name) validateName(name);
  };

  const handleCreateCharacter = async () => {
    if (!validateName(characterName)) return;

    // TODO: Send to backend API
    const characterData = {
      name: characterName,
      class: selectedClass,
      createdAt: new Date().toISOString()
    };

    console.log('Creating character:', characterData);

    // For now, redirect to game
    router.push('/game');
  };

  const selectedClassData = TURKISH_CHARACTER_CLASSES.find(c => c.id === selectedClass);

  return (
    <div className="min-h-screen bg-gradient-to-br from-turkish-navy via-turkish-blue to-turkish-red flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-turkish-red to-turkish-gold p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Karakterini Oluştur
          </h1>
          <p className="text-white/90">
            Türk Dijital Metropol'de yolculuğuna başla!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left: Character Preview */}
          <div className="space-y-6">
            <div className="bg-black/30 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Önizleme</h2>
              <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-lg p-8 inline-block">
                <canvas
                  ref={canvasRef}
                  width={128}
                  height={128}
                  className="border-4 border-white/20 rounded-lg"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="mt-4 text-white">
                <div className="text-2xl font-bold">
                  {characterName || '???'}
                </div>
                <div className="text-lg text-turkish-gold mt-1">
                  {selectedClassData?.nameTR}
                </div>
              </div>
            </div>

            {/* Class Info */}
            {selectedClassData && (
              <div className="bg-black/30 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Sınıf Bilgileri</h3>
                <p className="text-white/80 mb-4">{selectedClassData.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Tip:</span>
                    <span className="font-bold">{selectedClassData.nameTR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Başlangıç Seviyesi:</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Başlangıç HP:</span>
                    <span className="font-bold text-green-400">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Başlangıç MP:</span>
                    <span className="font-bold text-blue-400">100</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Character Options */}
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-white font-bold mb-2">
                Karakter İsmi
              </label>
              <input
                type="text"
                value={characterName}
                onChange={handleNameChange}
                placeholder="İsmini gir..."
                maxLength={16}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:border-turkish-gold focus:outline-none transition-colors"
              />
              {nameError && (
                <div className="text-red-400 text-sm mt-2">{nameError}</div>
              )}
              <div className="text-white/60 text-sm mt-2">
                3-16 karakter, Türkçe karakterler desteklenir
              </div>
            </div>

            {/* Class Selection */}
            <div>
              <label className="block text-white font-bold mb-3">
                Sınıf Seç
              </label>
              <div className="space-y-2">
                {TURKISH_CHARACTER_CLASSES.map((charClass) => (
                  <button
                    key={charClass.id}
                    onClick={() => setSelectedClass(charClass.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedClass === charClass.id
                        ? 'bg-gradient-to-r from-turkish-gold to-yellow-500 text-turkish-navy scale-105 shadow-lg'
                        : 'bg-white/5 text-white hover:bg-white/10 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-lg">{charClass.nameTR}</div>
                        <div className="text-sm opacity-80">{charClass.name}</div>
                      </div>
                      {selectedClass === charClass.id && (
                        <div className="text-2xl">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreateCharacter}
              disabled={!characterName || !!nameError}
              className="w-full py-4 bg-gradient-to-r from-turkish-red to-red-600 text-white font-bold text-xl rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Karakteri Oluştur!
            </button>

            {/* Random Name Button */}
            <button
              onClick={() => {
                const randomNames = [
                  'Mehmet', 'Ayşe', 'Mustafa', 'Fatma', 'Ali',
                  'Zeynep', 'Ahmet', 'Elif', 'Hasan', 'Emine',
                  'Hüseyin', 'Hatice', 'İbrahim', 'Meryem', 'Yusuf'
                ];
                const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
                const randomNum = Math.floor(Math.random() * 1000);
                setCharacterName(`${randomName}${randomNum}`);
                setNameError('');
              }}
              className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
            >
              Rastgele İsim
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-black/30 p-4 text-center text-white/60 text-sm">
          Karakterini seçtikten sonra İstanbul Taksim Meydanı'nda doğacaksın!
        </div>
      </div>
    </div>
  );
}
