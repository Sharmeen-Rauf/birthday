export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ChapterMeta {
  id: ChapterId;
  code: string;
  title: string;
  subtitle: string;
}

export interface SmileCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  accent: "gold" | "violet" | "cyan";
  climaxMessage?: string;
}

export interface UniverseCategory {
  id: string;
  number: string;
  title: string;
  caption: string;
  quote: string;
  imagePath: string;
  accent: string;
  tags: string[];
  gradient: string;
  easterEgg?: boolean;
}

export interface GamingHotspot {
  id: string;
  name: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
  iconName: string;
  actionLabel: string;
  resultMessage: string;
  easterEgg?: string;
}

export interface CarFeature {
  label: string;
  value: string;
  detail: string;
}

export interface CarStoryPoint {
  title: string;
  description: string;
}

export interface KaszsoftData {
  companyName: string;
  tagline: string;
  foundedBy: string;
  officialLogoPath: string;
  headline: string;
  subheadline: string;
  narrativeParagraphs: string[];
  codeSnippet: string;
  terminalCommand: string;
  terminalOutput: string[];
  closingWords: string;
}

export interface FinalLetterData {
  preface: string;
  buttonLabel: string;
  paragraphs: string[];
  heroMessage: string;
  recipientTitle: string;
  hopeMessage: string;
  signature: string;
}

export interface ThreeSmilesData {
  headline: string;
  openingLine: string;
  sections: {
    id: string;
    tag: string;
    title: string;
    paragraphs: string[];
    accent: string;
  }[];
  closingWish: string;
  closingNote: string;
  signature: string;
}

export interface BirthdayData {
  recipient: {
    firstName: string;
    fullName: string;
    codename: string;
    birthDateFormatted: string;
  };
  chapters: ChapterMeta[];
  invitation: {
    greeting: string;
    pauseNote: string;
    question: string;
    buttonText: string;
  };
  celebration: {
    primaryText: string;
    secondaryText: string;
    supportingText: string;
  };
  cake: {
    preface: string;
    instruction: string;
    buttonText: string;
    note: {
      headline: string;
      subtitle: string[];
      blessing: string;
      motto: string;
      futureLine: string;
      salutation: string;
    };
  };
  threeSmiles: ThreeSmilesData;
  universe: {
    headline: string;
    subheadline: string;
    items: UniverseCategory[];
  };
  cinematicFilm: {
    headline: string;
    subheadline: string;
    videoPath: string;
    fallbackPosterPath: string;
    teaserText: string;
    buttonText: string;
  };
  gamingSetup: {
    headline: string;
    subheadline: string;
    initialButtonText: string;
    mainCaption: string;
    supportingLine: string;
    hotspots: GamingHotspot[];
  };
  car: {
    title: string;
    model: string;
    subtitle: string;
    description: string;
    note: string;
    endingLine: string;
    imagePath: string;
    specs: CarFeature[];
    reasons: CarStoryPoint[];
  };
  kaszsoft: KaszsoftData;
  finalLetter: FinalLetterData;
  audio: {
    ambientTrackPath: string;
    ambientSynthEnabled: boolean;
  };
}

