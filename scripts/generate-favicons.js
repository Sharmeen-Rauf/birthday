const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function makeIcons() {
  const source = path.join(__dirname, '..', 'public', 'images', 'Realistic Young Man Headshot Cutout.png');
  
  const size = 512;
  const strokeWidth = 16;
  const radius = (size / 2) - strokeWidth;
  
  // Create circular SVG ring with violet-gold gradient
  const ringSvg = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1B172E" />
          <stop offset="65%" stop-color="#0E0C18" />
          <stop offset="100%" stop-color="#05040A" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="35%" stop-color="#E8C88A" />
          <stop offset="70%" stop-color="#C084FC" />
          <stop offset="100%" stop-color="#8B5CF6" />
        </linearGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="${strokeWidth}" />
    </svg>
  `);
  
  // Resize cutout to fit neatly inside the badge
  const innerSize = Math.round(size * 0.90);
  const resizedCutout = await sharp(source)
    .resize(innerSize, innerSize, { fit: 'contain' })
    .toBuffer();
    
  const left = Math.round((size - innerSize) / 2);
  const top = Math.round((size - innerSize) / 2);

  // Circular mask for the final composite
  const circleMask = Buffer.from(`
    <svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#fff" />
    </svg>
  `);

  const masterBadge = await sharp(ringSvg)
    .composite([
      { input: resizedCutout, top, left }
    ])
    .toBuffer();
    
  const roundedMaster = await sharp(masterBadge)
    .composite([
      { input: circleMask, blend: 'dest-in' }
    ])
    .png()
    .toBuffer();
    
  // Export to 192x192
  await sharp(roundedMaster).resize(192, 192).toFile(path.join(__dirname, '..', 'public', 'icon-192.png'));
  await sharp(roundedMaster).resize(192, 192).toFile(path.join(__dirname, '..', 'src', 'app', 'icon.png'));
  
  // Export to 180x180 (Apple Touch Icon)
  await sharp(roundedMaster).resize(180, 180).toFile(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'));
  await sharp(roundedMaster).resize(180, 180).toFile(path.join(__dirname, '..', 'src', 'app', 'apple-icon.png'));

  // Export to 32x32
  await sharp(roundedMaster).resize(32, 32).toFile(path.join(__dirname, '..', 'public', 'icon-32.png'));
  
  // For favicon.ico (32x32)
  await sharp(roundedMaster).resize(32, 32).toFile(path.join(__dirname, '..', 'public', 'favicon.ico'));
  await sharp(roundedMaster).resize(32, 32).toFile(path.join(__dirname, '..', 'src', 'app', 'favicon.ico'));

  // Export SVG with embedded high-res badge
  const png192Buf = fs.readFileSync(path.join(__dirname, '..', 'public', 'icon-192.png'));
  const b64 = png192Buf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <defs>
    <clipPath id="avatarClip">
      <circle cx="96" cy="96" r="94" />
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${b64}" width="192" height="192" clip-path="url(#avatarClip)" />
</svg>`;

  fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), svgContent);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.svg'), svgContent);

  console.log('Successfully generated all favicons, PNGs, and SVGs from headshot cutout!');
}

makeIcons().catch(err => {
  console.error(err);
  process.exit(1);
});
