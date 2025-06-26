// Historical data for the Brevet exam
import { HistoricalPeriod, QuizQuestion } from './types';

export const historicalPeriods: HistoricalPeriod[] = [
  {
    id: 'ww1',
    name: 'Première Guerre mondiale',
    nameEn: 'World War I',
    period: '1914-1918',
    description: 'La Grande Guerre et ses conséquences',
    color: '#8B4513',
    position: [-4, 0, -2],
    unlocked: true,
    completed: false
  },
  {
    id: 'totalitarian',
    name: 'Régimes totalitaires',
    nameEn: 'Totalitarian Regimes',
    period: '1920-1939',
    description: 'Montée de Staline, Hitler et Mussolini',
    color: '#8B0000',
    position: [-2, 0, -4],
    unlocked: false,
    completed: false
  },
  {
    id: 'ww2',
    name: 'Seconde Guerre mondiale',
    nameEn: 'World War II',
    period: '1939-1945',
    description: 'La guerre et la Shoah',
    color: '#2F4F4F',
    position: [0, 0, -2],
    unlocked: false,
    completed: false
  },
  {
    id: 'coldwar',
    name: 'Guerre froide',
    nameEn: 'Cold War',
    period: '1947-1991',
    description: 'Le mur de Berlin et la bipolarisation',
    color: '#4682B4',
    position: [2, 0, -4],
    unlocked: false,
    completed: false
  },
  {
    id: 'decolonization',
    name: 'Décolonisation',
    nameEn: 'Decolonization',
    period: '1945-1975',
    description: 'Indépendance de l\'Algérie et autres colonies',
    color: '#DAA520',
    position: [4, 0, -2],
    unlocked: false,
    completed: false
  },
  {
    id: 'fifth-republic',
    name: 'Ve République',
    nameEn: 'Fifth Republic',
    period: '1958-présent',
    description: 'De Gaulle et la France moderne',
    color: '#0055A4',
    position: [0, 0, 2],
    unlocked: false,
    completed: false
  },
  {
    id: 'europe-1989',
    name: 'L\'Europe après 1989',
    nameEn: 'Europe after 1989',
    period: '1989-présent',
    description: 'Chute du mur et construction européenne',
    color: '#FFD700',
    position: [2, 0, 4],
    unlocked: false,
    completed: false
  }
];

export const quizQuestions: { [key: string]: QuizQuestion[] } = {
  ww1: [
    {
      id: 'ww1-1',
      question: 'Quelle est la date de l\'attentat de Sarajevo qui déclenche la Première Guerre mondiale ?',
      options: ['28 juin 1914', '1er août 1914', '3 août 1914', '4 août 1914'],
      correctAnswer: 0,
      explanation: 'L\'archiduc François-Ferdinand d\'Autriche est assassiné le 28 juin 1914 à Sarajevo.',
      period: 'ww1'
    },
    {
      id: 'ww1-2',
      question: 'Qu\'est-ce que la guerre de tranchées ?',
      options: ['Une guerre rapide', 'Une guerre de positions fixes', 'Une guerre maritime', 'Une guerre aérienne'],
      correctAnswer: 1,
      explanation: 'La guerre de tranchées est caractérisée par des positions fixes et des combats statiques.',
      period: 'ww1'
    }
  ],
  totalitarian: [
    {
      id: 'totalitarian-1',
      question: 'Qui arrive au pouvoir en Allemagne en 1933 ?',
      options: ['Mussolini', 'Staline', 'Hitler', 'Franco'],
      correctAnswer: 2,
      explanation: 'Adolf Hitler devient chancelier allemand en janvier 1933.',
      period: 'totalitarian'
    }
  ],
  ww2: [
    {
      id: 'ww2-1',
      question: 'Quand commence la Seconde Guerre mondiale ?',
      options: ['1er septembre 1939', '3 septembre 1939', '10 mai 1940', '22 juin 1941'],
      correctAnswer: 0,
      explanation: 'La guerre commence avec l\'invasion de la Pologne par l\'Allemagne le 1er septembre 1939.',
      period: 'ww2'
    }
  ],
  coldwar: [
    {
      id: 'coldwar-1',
      question: 'Quand le mur de Berlin a-t-il été construit ?',
      options: ['1949', '1953', '1961', '1968'],
      correctAnswer: 2,
      explanation: 'Le mur de Berlin a été érigé dans la nuit du 12 au 13 août 1961.',
      period: 'coldwar'
    }
  ],
  decolonization: [
    {
      id: 'decolonization-1',
      question: 'En quelle année l\'Algérie obtient-elle son indépendance ?',
      options: ['1960', '1962', '1954', '1958'],
      correctAnswer: 1,
      explanation: 'L\'Algérie devient indépendante en 1962 après les accords d\'Évian.',
      period: 'decolonization'
    }
  ],
  'fifth-republic': [
    {
      id: 'fifth-republic-1',
      question: 'Qui fonde la Ve République ?',
      options: ['François Mitterrand', 'Charles de Gaulle', 'Georges Pompidou', 'Valéry Giscard d\'Estaing'],
      correctAnswer: 1,
      explanation: 'Charles de Gaulle fonde la Ve République en 1958.',
      period: 'fifth-republic'
    }
  ],
  'europe-1989': [
    {
      id: 'europe-1989-1',
      question: 'Quand le mur de Berlin est-il tombé ?',
      options: ['9 novembre 1989', '3 octobre 1990', '1er janvier 1990', '15 décembre 1989'],
      correctAnswer: 0,
      explanation: 'Le mur de Berlin est tombé le 9 novembre 1989.',
      period: 'europe-1989'
    }
  ]
};