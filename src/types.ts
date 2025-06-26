// Types for the 3D History Game
export interface HistoricalPeriod {
  id: string;
  name: string;
  nameEn: string;
  period: string;
  description: string;
  color: string;
  position: [number, number, number];
  unlocked: boolean;
  completed: boolean;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  period: string;
}

export interface GameState {
  currentPeriod: string | null;
  unlockedPeriods: string[];
  completedPeriods: string[];
  totalScore: number;
  playerName: string;
  avatarColor: string;
}

export interface Avatar {
  name: string;
  color: string;
  position: [number, number, number];
}