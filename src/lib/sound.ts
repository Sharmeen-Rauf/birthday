"use client";

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingPad: boolean = false;
  private ambientGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private htmlAudio: HTMLAudioElement | null = null;

  constructor() {
    // Lazy initialized on first user gesture
  }

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.08, this.audioCtx?.currentTime || 0, 0.2);
    }
    if (this.htmlAudio) {
      this.htmlAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Start warm atmospheric synth pad (procedural celestial drone)
   */
  public startAmbient() {
    this.initContext();
    if (!this.audioCtx || this.isPlayingPad) return;

    try {
      // First try to check if user placed an audio file
      if (!this.htmlAudio) {
        const audio = new Audio("/audio/ambient.mp3");
        audio.loop = true;
        audio.volume = 0.25;
        audio.addEventListener("canplaythrough", () => {
          if (!this.isMuted) {
            audio.play().catch(() => {
              // Browser autoplay blocked or file unavailable, use Web Audio synth
              this.startProceduralDrone();
            });
          }
        });
        audio.addEventListener("error", () => {
          // File not found -> Fall back automatically to Web Audio procedural drone
          this.startProceduralDrone();
        });
        this.htmlAudio = audio;
      } else if (!this.isMuted) {
        this.htmlAudio.play().catch(() => this.startProceduralDrone());
      }
    } catch {
      this.startProceduralDrone();
    }
  }

  private startProceduralDrone() {
    if (!this.audioCtx || this.isPlayingPad) return;
    this.isPlayingPad = true;

    try {
      const ctx = this.audioCtx;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, ctx.currentTime);
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // Filter for warm soft character
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.connect(masterGain);

      // Chords: D3 (146.83 Hz), A3 (220 Hz), F#4 (369.99 Hz), C#5 (554.37 Hz) - Dreamy, starry mood
      const freqs = [146.83, 220.0, 369.99, 554.37];
      this.oscillators = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle detune for warmth
        osc.detune.setValueAtTime((idx - 1.5) * 4, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.25 / freqs.length, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        this.oscillators.push(osc);
      });
    } catch (e) {
      console.warn("Ambient audio context notice:", e);
    }
  }

  /**
   * Sound effect: Delicate chime / portal sparkle
   */
  public playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.85);
      });
    } catch {}
  }

  /**
   * Sound effect: Soft candle blow breath & wish chime
   */
  public playBlowCandle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Soft noise breath
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.5);

      const breathGain = ctx.createGain();
      breathGain.gain.setValueAtTime(0, now);
      breathGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      breathGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      whiteNoise.connect(filter);
      filter.connect(breathGain);
      breathGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.6);

      // Followed by wish chime
      setTimeout(() => {
        this.playCelebrationArpeggio();
      }, 350);
    } catch {}
  }

  /**
   * Sound effect: Celebration arpeggio
   */
  public playCelebrationArpeggio() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      // Golden pentatonic: D5, E5, F#5, A5, B5, D6
      const scale = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66];

      scale.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.95);
      });
    } catch {}
  }

  /**
   * Sound effect: Gentle emotional ending piano melody (Tender romantic arpeggio)
   */
  public playEndingPianoMusic() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Soft emotional piano notes progression (D-major / B-minor tender emotional mood)
      const pianoNotes = [
        // Measure 1: D - F# - A - D5 arpeggio
        { note: 293.66, time: 0.0, dur: 2.8, vol: 0.12 },  // D4
        { note: 369.99, time: 0.25, dur: 2.5, vol: 0.10 }, // F#4
        { note: 440.00, time: 0.5, dur: 2.8, vol: 0.11 },  // A4
        { note: 587.33, time: 0.85, dur: 3.2, vol: 0.13 }, // D5
        { note: 739.99, time: 1.6, dur: 2.6, vol: 0.12 },  // F#5
        { note: 587.33, time: 2.2, dur: 2.4, vol: 0.10 },  // D5

        // Measure 2: G - B - D5 - E5
        { note: 196.00, time: 2.8, dur: 3.5, vol: 0.13 },  // G3 (deep bass)
        { note: 392.00, time: 3.1, dur: 2.8, vol: 0.10 },  // G4
        { note: 493.88, time: 3.4, dur: 2.8, vol: 0.11 },  // B4
        { note: 587.33, time: 3.8, dur: 3.0, vol: 0.12 },  // D5
        { note: 659.25, time: 4.5, dur: 2.8, vol: 0.11 },  // E5
        { note: 587.33, time: 5.1, dur: 2.6, vol: 0.10 },  // D5

        // Measure 3: Bm - D - F# - B5 (longing, tender climax)
        { note: 246.94, time: 5.8, dur: 3.8, vol: 0.13 },  // B3 (deep bass)
        { note: 369.99, time: 6.1, dur: 2.8, vol: 0.10 },  // F#4
        { note: 440.00, time: 6.4, dur: 2.8, vol: 0.11 },  // A4
        { note: 587.33, time: 6.8, dur: 3.2, vol: 0.12 },  // D5
        { note: 739.99, time: 7.5, dur: 3.2, vol: 0.13 },  // F#5
        { note: 880.00, time: 8.2, dur: 4.0, vol: 0.14 },  // A5 (high sweet tear note)

        // Measure 4: A - C# - E - D resolution
        { note: 220.00, time: 9.2, dur: 4.0, vol: 0.12 },  // A3
        { note: 440.00, time: 9.5, dur: 3.0, vol: 0.10 },  // A4
        { note: 554.37, time: 9.9, dur: 3.2, vol: 0.11 },  // C#5
        { note: 587.33, time: 10.6, dur: 4.5, vol: 0.13 }, // D5 (peaceful resolution)
        { note: 293.66, time: 11.4, dur: 5.5, vol: 0.12 }, // D4
      ];

      const playPianoKey = (freq: number, start: number, dur: number, vol: number) => {
        // Fundamental sine
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(freq, now + start);

        // Warm acoustic harmonic (triangle 2nd harmonic)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(freq * 2, now + start);

        // Subtle bell sparkle (3rd harmonic)
        const osc3 = ctx.createOscillator();
        const gain3 = ctx.createGain();
        osc3.type = "sine";
        osc3.frequency.setValueAtTime(freq * 3, now + start);

        // Gentle acoustic piano envelope: immediate attack, natural reverberant decay
        gain1.gain.setValueAtTime(0, now + start);
        gain1.gain.linearRampToValueAtTime(vol, now + start + 0.02);
        gain1.gain.exponentialRampToValueAtTime(vol * 0.45, now + start + 0.35);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);

        gain2.gain.setValueAtTime(0, now + start);
        gain2.gain.linearRampToValueAtTime(vol * 0.35, now + start + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + start + dur * 0.65);

        gain3.gain.setValueAtTime(0, now + start);
        gain3.gain.linearRampToValueAtTime(vol * 0.15, now + start + 0.015);
        gain3.gain.exponentialRampToValueAtTime(0.0001, now + start + dur * 0.4);

        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);

        gain1.connect(ctx.destination);
        gain2.connect(ctx.destination);
        gain3.connect(ctx.destination);

        osc1.start(now + start);
        osc1.stop(now + start + dur + 0.1);
        osc2.start(now + start);
        osc2.stop(now + start + dur + 0.1);
        osc3.start(now + start);
        osc3.stop(now + start + dur + 0.1);
      };

      pianoNotes.forEach((n) => {
        playPianoKey(n.note, n.time, n.dur, n.vol);
      });
    } catch {}
  }

  /**
   * Sound effect: Easter Egg trigger
   */
  public playEasterEgg() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      const tones = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C major bright synth

      tones.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.4);
      });
    } catch {}
  }

  /**
   * Sound effect: Mechanical Keyboard Click
   */
  public playKeyboardClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  }

  /**
   * Sound effect: PC Turbo Fan Hum
   */
  public playFanBoost() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(380, ctx.currentTime + 0.4);
      osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.25);
    } catch {}
  }

  /**
   * Sound effect: Subtle UI tap
   */
  public playTap() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }
}

export const soundManager = new SoundManager();

