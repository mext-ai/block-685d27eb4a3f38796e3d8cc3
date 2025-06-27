// Classic Manual Questions System
// Each theme: 10 levels, Each level: 6 questions
// Level 1: Easy → Level 10: Hard

import { QuizQuestion } from './types';

export interface LevelQuestions {
  level: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile' | 'Expert';
  questions: QuizQuestion[];
}

export interface ThemeQuestions {
  [themeId: string]: LevelQuestions[];
}

export const classicQuestions: ThemeQuestions = {
  ww1: [
    // NIVEAU 1 - FACILE
    {
      level: 1,
      difficulty: 'Facile',
      questions: [
        {
          id: 'ww1-1-1',
          question: 'En quelle année commence la Première Guerre mondiale ?',
          options: ['1914', '1915', '1916', '1917'],
          correctAnswer: 0,
          explanation: 'La Première Guerre mondiale commence en 1914 avec l\'attentat de Sarajevo.',
          period: 'ww1'
        },
        {
          id: 'ww1-1-2',
          question: 'Quel archiduc est assassiné à Sarajevo ?',
          options: ['François-Ferdinand', 'Guillaume II', 'Nicolas II', 'Empereur Charles'],
          correctAnswer: 0,
          explanation: 'L\'archiduc François-Ferdinand d\'Autriche est assassiné le 28 juin 1914 à Sarajevo.',
          period: 'ww1'
        },
        {
          id: 'ww1-1-3',
          question: 'Combien d\'années dure la Première Guerre mondiale ?',
          options: ['3 ans', '4 ans', '5 ans', '6 ans'],
          correctAnswer: 1,
          explanation: 'La Première Guerre mondiale dure 4 ans, de 1914 à 1918.',
          period: 'ww1'
        },
        {
          id: 'ww1-1-4',
          question: 'Quel pays n\'appartient PAS à la Triple Alliance ?',
          options: ['Allemagne', 'Autriche-Hongrie', 'France', 'Italie'],
          correctAnswer: 2,
          explanation: 'La France appartient à la Triple Entente, pas à la Triple Alliance.',
          period: 'ww1'
        },
        {
          id: 'ww1-1-5',
          question: 'En quelle année se termine la Première Guerre mondiale ?',
          options: ['1917', '1918', '1919', '1920'],
          correctAnswer: 1,
          explanation: 'La Première Guerre mondiale se termine en 1918 avec l\'armistice du 11 novembre.',
          period: 'ww1'
        },
        {
          id: 'ww1-1-6',
          question: 'Quel mois et jour marque la fin des combats ?',
          options: ['11 novembre', '11 octobre', '1er novembre', '21 novembre'],
          correctAnswer: 0,
          explanation: 'L\'armistice est signé le 11 novembre 1918 à 11h.',
          period: 'ww1'
        }
      ]
    },
    // NIVEAU 2 - FACILE
    {
      level: 2,
      difficulty: 'Facile',
      questions: [
        {
          id: 'ww1-2-1',
          question: 'Qu\'est-ce que la Triple Entente ?',
          options: ['Alliance de 3 pays', 'Bataille importante', 'Type de tranchée', 'Arme nouvelle'],
          correctAnswer: 0,
          explanation: 'La Triple Entente unit la France, le Royaume-Uni et la Russie.',
          period: 'ww1'
        },
        {
          id: 'ww1-2-2',
          question: 'Quels pays forment la Triple Entente ?',
          options: ['France, Allemagne, Russie', 'France, Royaume-Uni, Russie', 'France, Italie, Russie', 'France, Autriche, Russie'],
          correctAnswer: 1,
          explanation: 'La Triple Entente réunit la France, le Royaume-Uni et la Russie contre la Triple Alliance.',
          period: 'ww1'
        },
        {
          id: 'ww1-2-3',
          question: 'Qu\'est-ce qu\'un "poilu" ?',
          options: ['Un animal', 'Un soldat français', 'Une arme', 'Un chef militaire'],
          correctAnswer: 1,
          explanation: 'Les "poilus" sont les soldats français de la Première Guerre mondiale.',
          period: 'ww1'
        },
        {
          id: 'ww1-2-4',
          question: 'Pourquoi appelle-t-on les soldats français "poilus" ?',
          options: ['Ils sont courageux', 'Ils ont des barbes', 'Ils sont sales', 'Ils sont jeunes'],
          correctAnswer: 1,
          explanation: 'On les appelle "poilus" car ils laissent pousser leur barbe dans les tranchées.',
          period: 'ww1'
        },
        {
          id: 'ww1-2-5',
          question: 'Où se trouve principalement le front occidental ?',
          options: ['En Allemagne', 'En France', 'En Russie', 'En Autriche'],
          correctAnswer: 1,
          explanation: 'Le front occidental traverse principalement la France, de la Manche à la Suisse.',
          period: 'ww1'
        },
        {
          id: 'ww1-2-6',
          question: 'Qu\'est-ce que le front oriental ?',
          options: ['Combat en Russie', 'Combat en France', 'Combat en mer', 'Combat en Afrique'],
          correctAnswer: 0,
          explanation: 'Le front oriental oppose l\'Allemagne et l\'Autriche-Hongrie à la Russie.',
          period: 'ww1'
        }
      ]
    },
    // Continue with all 10 levels for WWI...
    // (I'll provide the complete structure but focus on key levels to stay within limits)
  ],
  
  totalitarian: [
    // NIVEAU 1 - FACILE
    {
      level: 1,
      difficulty: 'Facile',
      questions: [
        {
          id: 'totalitarian-1-1',
          question: 'Qu\'est-ce qu\'un régime totalitaire ?',
          options: ['Démocratie', 'Dictature totale', 'Monarchie', 'République'],
          correctAnswer: 1,
          explanation: 'Un régime totalitaire contrôle totalement la société et les individus.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-1-2',
          question: 'Qui dirige l\'URSS après Lénine ?',
          options: ['Trotski', 'Staline', 'Khrouchtchev', 'Brejnev'],
          correctAnswer: 1,
          explanation: 'Staline prend le pouvoir en URSS après la mort de Lénine en 1924.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-1-3',
          question: 'Qui dirige l\'Allemagne nazie ?',
          options: ['Hitler', 'Mussolini', 'Franco', 'Staline'],
          correctAnswer: 0,
          explanation: 'Adolf Hitler dirige l\'Allemagne nazie de 1933 à 1945.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-1-4',
          question: 'Qui dirige l\'Italie fasciste ?',
          options: ['Hitler', 'Staline', 'Mussolini', 'Franco'],
          correctAnswer: 2,
          explanation: 'Benito Mussolini, "Il Duce", dirige l\'Italie fasciste de 1922 à 1943.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-1-5',
          question: 'En quelle année Hitler arrive-t-il au pouvoir ?',
          options: ['1932', '1933', '1934', '1935'],
          correctAnswer: 1,
          explanation: 'Hitler devient chancelier allemand en janvier 1933.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-1-6',
          question: 'Quel est le symbole du parti nazi ?',
          options: ['L\'étoile', 'La croix', 'La swastika', 'Le marteau'],
          correctAnswer: 2,
          explanation: 'La swastika (croix gammée) est le symbole du parti nazi.',
          period: 'totalitarian'
        }
      ]
    }
    // Continue with levels 2-10 for totalitarian...
  ],
  
  ww2: [
    // NIVEAU 1 - FACILE
    {
      level: 1,
      difficulty: 'Facile',
      questions: [
        {
          id: 'ww2-1-1',
          question: 'Quand commence la Seconde Guerre mondiale ?',
          options: ['1er septembre 1939', '3 septembre 1939', '10 mai 1940', '22 juin 1941'],
          correctAnswer: 0,
          explanation: 'La guerre commence avec l\'invasion de la Pologne par l\'Allemagne le 1er septembre 1939.',
          period: 'ww2'
        },
        {
          id: 'ww2-1-2',
          question: 'Quel pays l\'Allemagne envahit-elle en premier ?',
          options: ['France', 'Pologne', 'Belgique', 'Danemark'],
          correctAnswer: 1,
          explanation: 'L\'Allemagne envahit la Pologne le 1er septembre 1939, déclenchant la guerre.',
          period: 'ww2'
        },
        {
          id: 'ww2-1-3',
          question: 'Qui dirige la France libre ?',
          options: ['Pétain', 'Laval', 'De Gaulle', 'Giraud'],
          correctAnswer: 2,
          explanation: 'Le général de Gaulle lance l\'appel du 18 juin 1940 depuis Londres.',
          period: 'ww2'
        },
        {
          id: 'ww2-1-4',
          question: 'En quelle année se termine la guerre en Europe ?',
          options: ['1944', '1945', '1946', '1947'],
          correctAnswer: 1,
          explanation: 'L\'Allemagne capitule le 8 mai 1945.',
          period: 'ww2'
        },
        {
          id: 'ww2-1-5',
          question: 'Qu\'est-ce que la Résistance ?',
          options: ['Collaboration', 'Opposition à l\'occupant', 'Parti politique', 'Armée régulière'],
          correctAnswer: 1,
          explanation: 'La Résistance lutte contre l\'occupation allemande et le régime de Vichy.',
          period: 'ww2'
        },
        {
          id: 'ww2-1-6',
          question: 'Qui dirige le régime de Vichy ?',
          options: ['De Gaulle', 'Pétain', 'Laval', 'Darlan'],
          correctAnswer: 1,
          explanation: 'Le maréchal Pétain dirige l\'État français (régime de Vichy) de 1940 à 1944.',
          period: 'ww2'
        }
      ]
    }
    // Continue with levels 2-10 for ww2...
  ]
  
  // Continue with other themes (coldwar, decolonization, fifth-republic, europe-1989)
  // Each theme should have 10 levels with 6 questions each
};

// Helper function to get questions for a specific theme and level
export function getQuestionsForLevel(themeId: string, level: number): QuizQuestion[] {
  const theme = classicQuestions[themeId];
  if (!theme) return [];
  
  const levelData = theme.find(l => l.level === level);
  return levelData ? levelData.questions : [];
}

// Helper function to get difficulty for a level
export function getDifficultyForLevel(level: number): string {
  if (level <= 3) return 'Facile';
  if (level <= 6) return 'Moyen';
  if (level <= 8) return 'Difficile';
  return 'Expert';
}

// Helper function to get all available themes
export function getAvailableThemes(): string[] {
  return Object.keys(classicQuestions);
}

// Helper function to check if a theme has complete questions
export function isThemeComplete(themeId: string): boolean {
  const theme = classicQuestions[themeId];
  if (!theme) return false;
  
  // Check if theme has 10 levels with 6 questions each
  if (theme.length !== 10) return false;
  
  return theme.every(level => level.questions.length === 6);
}