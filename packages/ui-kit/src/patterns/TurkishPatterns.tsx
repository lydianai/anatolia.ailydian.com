/**
 * TÜRK DİJİTAL METROPOL - Turkish Cultural SVG Patterns
 *
 * Cini, Geometric, Tulip, Calligraphy patterns
 * Traditional Turkish motifs in modern design
 */

'use client';

import React from 'react';

// Cini Pattern (Iznik Tiles)
export const CiniPattern: React.FC<{ id?: string; color?: string }> = ({
  id = 'cini-pattern',
  color = '#40E0D0',
}) => (
  <svg width="0" height="0">
    <defs>
      <pattern id={id} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <g fill={color} fillOpacity="0.1">
          <path d="M30 10 L40 20 L30 30 L20 20 Z" />
          <path d="M30 30 L40 40 L30 50 L20 40 Z" />
          <path d="M10 30 L20 40 L10 50 L0 40 Z" />
          <path d="M50 30 L60 40 L50 50 L40 40 Z" />
          <circle cx="30" cy="30" r="3" />
        </g>
      </pattern>
    </defs>
  </svg>
);

// Geometric Pattern (Islamic Geometry)
export const GeometricPattern: React.FC<{ id?: string; color?: string }> = ({
  id = 'geometric-pattern',
  color = '#D4AF37',
}) => (
  <svg width="0" height="0">
    <defs>
      <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <g fill={color} fillOpacity="0.08">
          <path d="M0 0 L40 0 L40 40 L0 40 Z M40 40 L80 40 L80 80 L40 80 Z" />
          <path d="M20 20 L60 20 L60 60 L20 60 Z" />
          <circle cx="40" cy="40" r="15" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="0" cy="0" r="8" />
          <circle cx="80" cy="0" r="8" />
          <circle cx="0" cy="80" r="8" />
          <circle cx="80" cy="80" r="8" />
        </g>
      </pattern>
    </defs>
  </svg>
);

// Tulip Pattern (Ottoman Tulip - Lale)
export const TulipPattern: React.FC<{ id?: string; color?: string }> = ({
  id = 'tulip-pattern',
  color = '#FF6B9D',
}) => (
  <svg width="0" height="0">
    <defs>
      <pattern id={id} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <g fill={color} fillOpacity="0.1">
          <path d="M30 10 Q25 20, 30 30 Q35 20, 30 10" />
          <path d="M30 35 L30 45" stroke={color} strokeWidth="2" />
          <ellipse cx="30" cy="25" rx="5" ry="8" />
          <ellipse cx="25" cy="28" rx="4" ry="7" transform="rotate(-20 25 28)" />
          <ellipse cx="35" cy="28" rx="4" ry="7" transform="rotate(20 35 28)" />
        </g>
      </pattern>
    </defs>
  </svg>
);

// Star & Crescent Pattern (Ay-Yıldız)
export const StarCrescentPattern: React.FC<{ id?: string; color?: string }> = ({
  id = 'star-crescent-pattern',
  color = '#E30A17',
}) => (
  <svg width="0" height="0">
    <defs>
      <pattern id={id} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <g fill={color} fillOpacity="0.08">
          {/* Crescent */}
          <path d="M35 50 A20 20 0 1 0 65 50 A15 15 0 1 1 35 50" />
          {/* Star */}
          <path d="M75 30 L78 39 L87 39 L80 44 L83 53 L75 48 L67 53 L70 44 L63 39 L72 39 Z" />
        </g>
      </pattern>
    </defs>
  </svg>
);

// Bosphorus Waves Pattern
export const BosphorusWavesPattern: React.FC<{ id?: string; color?: string }> = ({
  id = 'bosphorus-waves-pattern',
  color = '#0097D7',
}) => (
  <svg width="0" height="0">
    <defs>
      <pattern id={id} x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
        <path
          d="M0 10 Q12.5 5, 25 10 T50 10 T75 10 T100 10"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.2"
        />
        <path
          d="M0 15 Q12.5 10, 25 15 T50 15 T75 15 T100 15"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.15"
        />
      </pattern>
    </defs>
  </svg>
);

// Calligraphy Border Pattern
export const CalligraphyPattern: React.FC<{ id?: string; color?: string }> = ({
  id = 'calligraphy-pattern',
  color = '#D4AF37',
}) => (
  <svg width="0" height="0">
    <defs>
      <pattern id={id} x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={color} strokeWidth="2" opacity="0.1">
          <path d="M10 30 Q30 10, 50 30 T90 30" />
          <path d="M20 40 Q40 20, 60 40 T100 40" />
          <circle cx="30" cy="30" r="5" />
          <circle cx="70" cy="30" r="5" />
        </g>
      </pattern>
    </defs>
  </svg>
);

// Nazar Boncugu Pattern (Evil Eye)
export const NazarPattern: React.FC<{ id?: string }> = ({ id = 'nazar-pattern' }) => (
  <svg width="0" height="0">
    <defs>
      <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <g opacity="0.15">
          <circle cx="40" cy="40" r="20" fill="#0097D7" />
          <circle cx="40" cy="40" r="14" fill="#ffffff" />
          <circle cx="40" cy="40" r="8" fill="#0097D7" />
          <circle cx="40" cy="40" r="4" fill="#000000" />
        </g>
      </pattern>
    </defs>
  </svg>
);

// Pattern Background Component
export interface PatternBackgroundProps {
  pattern: 'cini' | 'geometric' | 'tulip' | 'star' | 'waves' | 'calligraphy' | 'nazar';
  color?: string;
  opacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
  pattern,
  color,
  opacity = 1,
  className = '',
  children,
}) => {
  const patternId = `pattern-${pattern}-${Math.random().toString(36).substr(2, 9)}`;

  const PatternComponent = {
    cini: CiniPattern,
    geometric: GeometricPattern,
    tulip: TulipPattern,
    star: StarCrescentPattern,
    waves: BosphorusWavesPattern,
    calligraphy: CalligraphyPattern,
    nazar: NazarPattern,
  }[pattern];

  return (
    <div className={`relative ${className}`}>
      <PatternComponent id={patternId} color={color} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(#${patternId})`,
          opacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
