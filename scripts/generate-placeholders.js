const fs = require('fs');
const path = require('path');

const makeSvg = (title, subtitle, accent, bgGradientStart, bgGradientEnd, icon = "✦") => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradientStart}"/>
      <stop offset="100%" stop-color="${bgGradientEnd}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="40" />
    </filter>
  </defs>
  
  <rect width="800" height="1000" fill="url(#bg)"/>
  <circle cx="400" cy="400" r="280" fill="url(#glow)"/>
  
  <!-- Subtle Grid Texture -->
  <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="1000"/>
    <line x1="300" y1="0" x2="300" y2="1000"/>
    <line x1="500" y1="0" x2="500" y2="1000"/>
    <line x1="700" y1="0" x2="700" y2="1000"/>
    <line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="0" y1="600" x2="800" y2="600"/>
    <line x1="0" y1="800" x2="800" y2="800"/>
  </g>

  <!-- Border Card Frame -->
  <rect x="30" y="30" width="740" height="940" rx="24" fill="none" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.3"/>
  <rect x="40" y="40" width="720" height="920" rx="16" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

  <!-- Icon Center Piece -->
  <circle cx="400" cy="420" r="90" fill="rgba(16,16,28,0.8)" stroke="${accent}" stroke-width="2" stroke-opacity="0.5"/>
  <text x="400" y="445" font-family="-apple-system, sans-serif" font-size="64" fill="${accent}" text-anchor="middle">${icon}</text>

  <!-- Title & Subtitle -->
  <text x="400" y="600" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="bold" fill="#F7F2EA" text-anchor="middle" letter-spacing="2">${title}</text>
  <text x="400" y="650" font-family="-apple-system, sans-serif" font-size="18" font-weight="500" fill="${accent}" text-anchor="middle" letter-spacing="4">${subtitle.toUpperCase()}</text>
  
  <!-- Subtle Tag -->
  <rect x="280" y="850" width="240" height="38" rx="19" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="400" y="874" font-family="-apple-system, sans-serif" font-size="13" fill="#94A3B8" text-anchor="middle" letter-spacing="1.5">REPLACE WITH PHOTO</text>
</svg>`;
};

const assets = [
  // Murtaza Photos
  { file: 'public/images/murtaza/playful.svg', title: 'The Playful One', sub: 'Murtaza Smile 01', accent: '#67E8F9', bg1: '#0B132B', bg2: '#080810', icon: '😄' },
  { file: 'public/images/murtaza/mischievous.svg', title: 'The Mischievous One', sub: 'Murtaza Smile 02', accent: '#8B5CF6', bg1: '#1F1135', bg2: '#080810', icon: '😏' },
  { file: 'public/images/murtaza/real.svg', title: 'The Real One', sub: 'Murtaza Smile 03', accent: '#E8C88A', bg1: '#261C0E', bg2: '#080810', icon: '✨' },

  // Hobbies
  { file: 'public/images/hobbies/uno.svg', title: 'UNO Champion', sub: '+4 Comeback Master', accent: '#F43F5E', bg1: '#2B0E14', bg2: '#080810', icon: '🃏' },
  { file: 'public/images/hobbies/mountains.svg', title: 'Mountain Peaks', sub: 'Above The Clouds', accent: '#38BDF8', bg1: '#0E2235', bg2: '#080810', icon: '⛰️' },
  { file: 'public/images/hobbies/nature.svg', title: 'Quiet Nature', sub: 'Earth & Sunlight', accent: '#4ADE80', bg1: '#0F2618', bg2: '#080810', icon: '🌿' },
  { file: 'public/images/hobbies/subwaysurfers.svg', title: 'Subway Surfers', sub: 'Reflex Flow & Escapes', accent: '#FACC15', bg1: '#2E2609', bg2: '#080810', icon: '🛹' },
  { file: 'public/images/hobbies/anime.svg', title: 'Anime Universes', sub: 'Infinite Imagination', accent: '#A855F7', bg1: '#1E0E35', bg2: '#080810', icon: '⚡' },
  { file: 'public/images/hobbies/books.svg', title: 'Curious Books', sub: 'Deep Knowledge', accent: '#E8C88A', bg1: '#261F10', bg2: '#080810', icon: '📖' },
  { file: 'public/images/hobbies/colours.svg', title: 'Colours In The Dark', sub: 'Atmospheric Hues', accent: '#EC4899', bg1: '#2D0E23', bg2: '#080810', icon: '🎨' },
  { file: 'public/images/hobbies/gaming.svg', title: 'Elite Gaming', sub: 'Next Level Dominance', accent: '#8B5CF6', bg1: '#180B2E', bg2: '#080810', icon: '🎮' },
  { file: 'public/images/hobbies/touch.svg', title: 'Warm Touch', sub: 'Meaningful Closeness', accent: '#FB7185', bg1: '#2D101A', bg2: '#080810', icon: '🤍' },
  { file: 'public/images/hobbies/intelligence.svg', title: 'Brilliant Mind', sub: 'Sharp Wit & Ideas', accent: '#38BDF8', bg1: '#0B1E30', bg2: '#080810', icon: '💡' },
  { file: 'public/images/hobbies/basketball.svg', title: 'Basketball Court', sub: 'Last-Second Clutch', accent: '#FB923C', bg1: '#2A1409', bg2: '#080810', icon: '🏀' },
  { file: 'public/images/hobbies/swimming.svg', title: 'Ocean & Water', sub: 'Pure Weightless Peace', accent: '#22D3EE', bg1: '#0A2530', bg2: '#080810', icon: '🌊' },
  { file: 'public/images/hobbies/coffee.svg', title: 'Dark Coffee', sub: 'Aromatic Ritual', accent: '#D97706', bg1: '#281708', bg2: '#080810', icon: '☕' },
  { file: 'public/images/hobbies/dark-universe.svg', title: 'Dark Little Universe', sub: 'Midnight Sanctuary', accent: '#C084FC', bg1: '#1B0E30', bg2: '#05050A', icon: '🌌' },

  // Haval H6 Car
  { file: 'public/images/cars/haval-h6.svg', title: 'Haval H6 1.5T', sub: 'Metallic Charcoal Grey', accent: '#E8C88A', bg1: '#151520', bg2: '#080810', icon: '🏎️' },

  // Film Poster
  { file: 'public/videos/birthday-film-poster.svg', title: 'The Birthday Film', sub: 'A Universe in Motion', accent: '#8B5CF6', bg1: '#160E2A', bg2: '#080810', icon: '🎬' },
];

assets.forEach(asset => {
  const content = makeSvg(asset.title, asset.sub, asset.accent, asset.bg1, asset.bg2, asset.icon);
  fs.writeFileSync(path.join(__dirname, '..', asset.file), content, 'utf8');
});

// Kaszsoft Official Logo SVG
const kaszsoftLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="100%" height="100%">
  <defs>
    <linearGradient id="kaszGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="50%" stop-color="#67E8F9"/>
      <stop offset="100%" stop-color="#E8C88A"/>
    </linearGradient>
  </defs>
  <!-- Hexagon / Cube monogram -->
  <g transform="translate(15, 20)">
    <polygon points="40,5 75,25 75,65 40,85 5,65 5,25" fill="none" stroke="url(#kaszGrad)" stroke-width="4" stroke-linejoin="round"/>
    <polygon points="40,5 75,25 40,45 5,25" fill="rgba(139, 92, 246, 0.3)"/>
    <polygon points="40,45 75,25 75,65 40,85" fill="rgba(103, 232, 249, 0.2)"/>
    <polygon points="40,45 5,25 5,65 40,85" fill="rgba(232, 200, 138, 0.2)"/>
    <circle cx="40" cy="45" r="4" fill="#FFFFFF"/>
  </g>
  <!-- Brand text -->
  <text x="110" y="65" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="36" font-weight="900" fill="#FFFFFF" letter-spacing="3">KASZ<tspan fill="#8B5CF6">SOFT</tspan></text>
  <text x="112" y="85" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#E8C88A" letter-spacing="4">ENGINEERING THE FUTURE</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, '..', 'public/images/kaszsoft/logo.svg'), kaszsoftLogo, 'utf8');

console.log('All placeholder SVG assets generated successfully!');

