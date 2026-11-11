# MURTAZA.EXE — A Universe Made of Little Things

An extraordinary, luxury interactive digital birthday experience crafted for **Murtaza** — founder of **Kaszsoft**, gamer, reader, deep thinker, and adventurer.

Designed as an interactive cinematic narrative unfolding in **10 distinct chapters**, moving through:
**Curiosity → Surprise → Celebration → Playfulness → Discovery → Inspiration → Appreciation → Emotion.**

---

## ✦ Key Features & Chapters

1. **Chapter 01 — The Secret Invitation**:
   - Midnight glass card with magnetic interaction, dissolving portal animation, ambient star particles.
   - Procedural celestial audio starts upon the user's unlock gesture.

2. **Chapter 02 — The Celebration Explosion**:
   - Dramatic 0.5s pause followed by a physics-driven particle explosion in gold, violet, pink, and cyan.
   - Bold kinetic editorial typography: *"IT'S YOUR DAY."* → *"HAPPY BIRTHDAY, MURTAZA."*

3. **Chapter 03 — The Interactive Birthday Cake**:
   - Realistic 3D midnight-blue & champagne-gold tiered cake in Three.js / React Three Fiber.
   - Flickering candlelight, realistic shadows, and interactive `[ BLOW THE CANDLES ]` button (plus optional microphone blow detection).
   - Candle flames gently extinguish, golden smoke drifts upward, revealing the birthday wish.
   - Graceful 2.5D fallback for devices without WebGL.

4. **Chapter 04 — The Three Smiles**:
   - Honest photographic tribute with swipeable mobile cards:
     - *01: The Playful One* (Spontaneous & infectious)
     - *02: The Mischievous One* (Witty & unpredictable smirk)
     - *03: The Real One* (Straight from the heart, golden glow & emotional reveal)

5. **Chapter 05 — His Little Universe (The 14 Essentials)**:
   - Interactive horizontal swipeable showcase of his favourite things:
     `01. UNO` • `02. Mountains` • `03. Nature` • `04. Subway Surfers` • `05. Anime` • `06. Books` • `07. Colours` • `08. Gaming` • `09. Touch` • `10. Intelligence` • `11. Basketball` • `12. Swimming` • `13. Coffee` • `14. His Dark Little Universe`
   - Dedicated photographs, quotes, tags, and fullscreen immersive detail modal.
   - **Easter Egg 1**: Tapping the UNO card triggers a wild `+4` burst!

6. **Chapter 06 — The Cinematic Birthday Film**:
   - Mobile-optimized vertical 9:16 cinema theatre for his Google Flow birthday video.
   - Custom playback controls, ambient glow, fullscreen toggle, and replay button.

7. **Chapter 07 — The Dream Gaming Setup**:
   - Dark aesthetic bedroom with `[ LIGHT UP YOUR WORLD ]` button that illuminates RGB light bars.
   - Interactive hotspots:
     - Liquid-cooled PC (spins fans with neon boost)
     - Dual monitors (cycles anime wallpapers)
     - RGB Keyboard (cycles 4 lighting modes)
     - Galaxy Projector (casts celestial nebulae across ceiling)
     - Espresso mug (brews steam)
   - **Easter Egg 2**: Tapping the gaming monitor unlocks the secret *"Achievement Unlocked: Birthday Boy"* badge!

8. **Chapter 08 — The Next Drive (Haval H6 1.5T)**:
   - Sunset mountain highway reveal of the metallic charcoal grey Haval H6 1.5T SUV.
   - Light sweep animation, engine & tech specifications, and personal reasons why it matches his character.

9. **Chapter 09 — Kaszsoft: The Dream He's Building**:
   - Dedicated celebration of his software company, **Kaszsoft**, and his founder journey.
   - Real-time animated TypeScript code sequence (`buildYourDreams(future);`).
   - **Easter Egg 3**: Tapping the Kaszsoft logo/title reveals secret terminal telemetry: *"Future founder energy detected."*

10. **Final Chapter — The Intensity of Little Things**:
    - Emotional climax in a quiet midnight room with floating golden stardust.
    - Sealed glowing envelope opens to reveal the heartfelt letter line by line:
      > *"Because if there's one thing I've learned from you, it's that sometimes it's not just about the touch... It's the intensity behind it that makes something meaningful."*
    - Concludes with the signature and `[ REPLAY THE MAGIC ]` button.

---

## ✦ How To Add Your Pictures and Videos

All images and videos are cleanly managed through `src/data/birthday.ts` and placed inside `public/`.
The website is **already fully functional with beautiful styled vector artwork**, so it never breaks while you assemble your media files.

### 1. Photos of Murtaza (The 3 Smiles)
Drop your portrait photos into `public/images/murtaza/`:
- `public/images/murtaza/playful.jpg`
- `public/images/murtaza/mischievous.jpg`
- `public/images/murtaza/real.jpg`

### 2. Photos for His Little Universe (Hobbies & Interests)
Drop your 14 photos into `public/images/hobbies/`:
- `uno.jpg`
- `mountains.jpg`
- `nature.jpg`
- `subwaysurfers.jpg`
- `anime.jpg`
- `books.jpg`
- `colours.jpg`
- `gaming.jpg`
- `touch.jpg`
- `intelligence.jpg`
- `basketball.jpg`
- `swimming.jpg`
- `coffee.jpg`
- `dark-universe.jpg`

### 3. Haval H6 Car Photo
- Drop your vehicle photo at: `public/images/cars/haval-h6.jpg`

### 4. Videos (The 2 Videos)
Drop your video files into `public/videos/`:
- `public/videos/birthday-film.mp4` (Your main 9:16 Google Flow film)
- `public/videos/birthday-film-poster.jpg` (Poster image displayed before playback)
- `public/videos/memory-clip.mp4` (Secondary clip if desired)

### 5. Audio (Optional Custom Soundtrack)
- Drop any background MP3 song at `public/audio/ambient.mp3`.
- If no MP3 is supplied, the built-in **Web Audio API procedural celestial synth pad** plays automatically with zero external dependencies!

---

## ✦ Customizing Text & Content

All personalization is centralized in a single configuration file:
```
src/data/birthday.ts
```
Edit this file to tweak any captions, letter wording, quotes, or timestamps.

---

## ✦ Local Development

To run the project locally on your machine:

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your phone or desktop browser.

---

## ✦ Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset: **Next.js** (detected automatically).
5. Build Command: `next build` (or leave default).
6. Click **Deploy**.

The website is fully optimized for mobile viewports (360px–430px) as well as desktop screens!
