// Historical data for the Brevet exam - Enhanced for revision
import { HistoricalPeriod, QuizQuestion } from './types';

export const historicalPeriods: HistoricalPeriod[] = [
  {
    id: 'ww1',
    name: 'Première Guerre mondiale',
    nameEn: 'World War I',
    period: '1914-1918',
    description: 'La Grande Guerre, guerre totale qui transforme l\'Europe',
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
    description: 'Montée de Staline, Hitler et Mussolini en Europe',
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
    description: 'Guerre mondiale et génocide juif et tsigane',
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
    description: 'Affrontement États-Unis/URSS et mur de Berlin',
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
    description: 'Indépendances et guerre d\'Algérie (1954-1962)',
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
    description: 'De Gaulle et les institutions de la France moderne',
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
    description: 'Chute du mur et construction de l\'Union européenne',
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
      explanation: 'L\'archiduc François-Ferdinand d\'Autriche est assassiné le 28 juin 1914 à Sarajevo par un nationaliste serbe.',
      period: 'ww1'
    },
    {
      id: 'ww1-2',
      question: 'Qu\'est-ce que la guerre de tranchées ?',
      options: ['Une guerre rapide', 'Une guerre de positions fixes', 'Une guerre maritime', 'Une guerre aérienne'],
      correctAnswer: 1,
      explanation: 'La guerre de tranchées (1915-1917) est caractérisée par des positions fixes, des no man\'s land et une guerre d\'usure.',
      period: 'ww1'
    },
    {
      id: 'ww1-3',
      question: 'Qu\'est-ce que la bataille de Verdun (1916) ?',
      options: ['Une victoire rapide', 'Une bataille d\'usure symbolique', 'Une bataille navale', 'Une bataille coloniale'],
      correctAnswer: 1,
      explanation: 'Verdun (février-décembre 1916) est devenue le symbole de la résistance française face à l\'offensive allemande.',
      period: 'ww1'
    },
    {
      id: 'ww1-4',
      question: 'Quand les États-Unis entrent-ils en guerre ?',
      options: ['1914', '1915', '1917', '1918'],
      correctAnswer: 2,
      explanation: 'Les États-Unis déclarent la guerre à l\'Allemagne en avril 1917, notamment à cause de la guerre sous-marine.',
      period: 'ww1'
    },
    {
      id: 'ww1-5',
      question: 'Qu\'est-ce que l\'armistice du 11 novembre 1918 ?',
      options: ['La paix définitive', 'L\'arrêt des combats', 'La déclaration de guerre', 'La révolution russe'],
      correctAnswer: 1,
      explanation: 'L\'armistice signe l\'arrêt des combats. La paix sera officiellement signée avec le traité de Versailles en 1919.',
      period: 'ww1'
    }
  ],
  totalitarian: [
    {
      id: 'totalitarian-1',
      question: 'Qui arrive au pouvoir en Allemagne en 1933 ?',
      options: ['Mussolini', 'Staline', 'Hitler', 'Franco'],
      correctAnswer: 2,
      explanation: 'Adolf Hitler devient chancelier allemand en janvier 1933 et installe rapidement une dictature nazie.',
      period: 'totalitarian'
    },
    {
      id: 'totalitarian-2',
      question: 'Qu\'est-ce que le régime de Staline en URSS ?',
      options: ['Une démocratie', 'Un régime totalitaire', 'Une monarchie', 'Une république'],
      correctAnswer: 1,
      explanation: 'Staline établit un régime totalitaire avec parti unique, culte de la personnalité et terreur d\'État.',
      period: 'totalitarian'
    },
    {
      id: 'totalitarian-3',
      question: 'Qui est le dirigeant fasciste de l\'Italie ?',
      options: ['Hitler', 'Staline', 'Mussolini', 'Franco'],
      correctAnswer: 2,
      explanation: 'Benito Mussolini, surnommé "le Duce", dirige l\'Italie fasciste de 1922 à 1943.',
      period: 'totalitarian'
    },
    {
      id: 'totalitarian-4',
      question: 'Qu\'est-ce que la propagande dans les régimes totalitaires ?',
      options: ['Information libre', 'Manipulation des masses', 'Débat démocratique', 'Presse indépendante'],
      correctAnswer: 1,
      explanation: 'La propagande utilise tous les moyens (radio, cinéma, affiches) pour manipuler l\'opinion et créer l\'adhésion.',
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
    },
    {
      id: 'ww2-2',
      question: 'Qu\'est-ce que la "drôle de guerre" ?',
      options: ['Une guerre comique', 'Une période sans combats', 'Une guerre rapide', 'Une guerre civile'],
      correctAnswer: 1,
      explanation: 'La "drôle de guerre" (septembre 1939 - mai 1940) est une période d\'inactivité militaire sur le front occidental.',
      period: 'ww2'
    },
    {
      id: 'ww2-3',
      question: 'Qui dirige la France libre ?',
      options: ['Pétain', 'Laval', 'De Gaulle', 'Darlan'],
      correctAnswer: 2,
      explanation: 'Le général de Gaulle lance l\'appel du 18 juin 1940 et dirige la Résistance française depuis Londres.',
      period: 'ww2'
    },
    {
      id: 'ww2-4',
      question: 'Qu\'est-ce que la Shoah ?',
      options: ['Une bataille', 'Le génocide des Juifs', 'Une alliance', 'Une résistance'],
      correctAnswer: 1,
      explanation: 'La Shoah est le génocide systématique des Juifs d\'Europe par l\'Allemagne nazie (6 millions de victimes).',
      period: 'ww2'
    },
    {
      id: 'ww2-5',
      question: 'Quand se termine la Seconde Guerre mondiale en Europe ?',
      options: ['6 juin 1944', '8 mai 1945', '2 septembre 1945', '11 novembre 1945'],
      correctAnswer: 1,
      explanation: 'L\'Allemagne capitule le 8 mai 1945. La guerre se termine en Asie le 2 septembre 1945.',
      period: 'ww2'
    }
  ],
  coldwar: [
    {
      id: 'coldwar-1',
      question: 'Quand le mur de Berlin a-t-il été construit ?',
      options: ['1949', '1953', '1961', '1968'],
      correctAnswer: 2,
      explanation: 'Le mur de Berlin a été érigé dans la nuit du 12 au 13 août 1961 pour séparer Berlin-Est et Berlin-Ouest.',
      period: 'coldwar'
    },
    {
      id: 'coldwar-2',
      question: 'Qu\'est-ce que la guerre froide ?',
      options: ['Une guerre en hiver', 'Un conflit armé direct', 'Une tension sans guerre directe', 'Une guerre civile'],
      correctAnswer: 2,
      explanation: 'La guerre froide est une période de tensions entre les États-Unis et l\'URSS sans affrontement direct.',
      period: 'coldwar'
    },
    {
      id: 'coldwar-3',
      question: 'Qu\'est-ce que l\'OTAN ?',
      options: ['Alliance communiste', 'Alliance occidentale', 'Organisation africaine', 'Traité commercial'],
      correctAnswer: 1,
      explanation: 'L\'OTAN (1949) est l\'alliance militaire occidentale dirigée par les États-Unis face au bloc soviétique.',
      period: 'coldwar'
    },
    {
      id: 'coldwar-4',
      question: 'Qu\'est-ce que le pacte de Varsovie ?',
      options: ['Alliance occidentale', 'Alliance soviétique', 'Traité de paix', 'Accord commercial'],
      correctAnswer: 1,
      explanation: 'Le pacte de Varsovie (1955) unit les pays communistes d\'Europe de l\'Est sous la direction de l\'URSS.',
      period: 'coldwar'
    }
  ],
  decolonization: [
    {
      id: 'decolonization-1',
      question: 'En quelle année l\'Algérie obtient-elle son indépendance ?',
      options: ['1960', '1962', '1954', '1958'],
      correctAnswer: 1,
      explanation: 'L\'Algérie devient indépendante en 1962 après les accords d\'Évian signés avec la France.',
      period: 'decolonization'
    },
    {
      id: 'decolonization-2',
      question: 'Quand commence la guerre d\'Algérie ?',
      options: ['1er novembre 1954', '1er mai 1954', '14 juillet 1954', '11 novembre 1954'],
      correctAnswer: 0,
      explanation: 'La guerre d\'Algérie commence le 1er novembre 1954 avec les attentats de la Toussaint rouge.',
      period: 'decolonization'
    },
    {
      id: 'decolonization-3',
      question: 'Qu\'est-ce que la décolonisation ?',
      options: ['Colonisation de l\'Afrique', 'Indépendance des colonies', 'Guerre civile', 'Révolution industrielle'],
      correctAnswer: 1,
      explanation: 'La décolonisation est le processus par lequel les colonies obtiennent leur indépendance.',
      period: 'decolonization'
    },
    {
      id: 'decolonization-4',
      question: 'Qui sont les pieds-noirs ?',
      options: ['Soldats français', 'Français d\'Algérie', 'Algériens', 'Marocains'],
      correctAnswer: 1,
      explanation: 'Les pieds-noirs sont les Français installés en Algérie, contraints de quitter le pays en 1962.',
      period: 'decolonization'
    }
  ],
  'fifth-republic': [
    {
      id: 'fifth-republic-1',
      question: 'Qui fonde la Ve République ?',
      options: ['François Mitterrand', 'Charles de Gaulle', 'Georges Pompidou', 'Valéry Giscard d\'Estaing'],
      correctAnswer: 1,
      explanation: 'Charles de Gaulle fonde la Ve République en 1958 pour résoudre la crise de la guerre d\'Algérie.',
      period: 'fifth-republic'
    },
    {
      id: 'fifth-republic-2',
      question: 'Qu\'est-ce que Mai 68 ?',
      options: ['Une élection', 'Une crise sociale', 'Une guerre', 'Un référendum'],
      correctAnswer: 1,
      explanation: 'Mai 68 est une crise sociale majeure avec grèves étudiantes et ouvrières qui paralyse la France.',
      period: 'fifth-republic'
    },
    {
      id: 'fifth-republic-3',
      question: 'Quand le président est-il élu au suffrage universel direct ?',
      options: ['1958', '1962', '1965', '1969'],
      correctAnswer: 1,
      explanation: 'Depuis 1962, le président de la République est élu au suffrage universel direct pour 7 ans (5 ans depuis 2000).',
      period: 'fifth-republic'
    },
    {
      id: 'fifth-republic-4',
      question: 'Qu\'est-ce que la cohabitation ?',
      options: ['Vie en couple', 'Président et Premier ministre de camps opposés', 'Alliance politique', 'Gouvernement d\'union'],
      correctAnswer: 1,
      explanation: 'La cohabitation se produit quand le président et le Premier ministre appartiennent à des camps politiques opposés.',
      period: 'fifth-republic'
    }
  ],
  'europe-1989': [
    {
      id: 'europe-1989-1',
      question: 'Quand le mur de Berlin est-il tombé ?',
      options: ['9 novembre 1989', '3 octobre 1990', '1er janvier 1990', '15 décembre 1989'],
      correctAnswer: 0,
      explanation: 'Le mur de Berlin est tombé le 9 novembre 1989, symbole de la fin de la guerre froide.',
      period: 'europe-1989'
    },
    {
      id: 'europe-1989-2',
      question: 'Qu\'est-ce que le traité de Maastricht (1992) ?',
      options: ['Traité de paix', 'Création de l\'Union européenne', 'Alliance militaire', 'Traité commercial'],
      correctAnswer: 1,
      explanation: 'Le traité de Maastricht (1992) crée l\'Union européenne et prévoit une monnaie unique.',
      period: 'europe-1989'
    },
    {
      id: 'europe-1989-3',
      question: 'Qu\'est-ce que l\'Euro ?',
      options: ['Une alliance', 'Une monnaie unique', 'Un traité', 'Une institution'],
      correctAnswer: 1,
      explanation: 'L\'Euro est la monnaie unique européenne, mise en circulation en 2002 dans 12 pays.',
      period: 'europe-1989'
    },
    {
      id: 'europe-1989-4',
      question: 'Quand l\'URSS disparaît-elle ?',
      options: ['1989', '1990', '1991', '1992'],
      correctAnswer: 2,
      explanation: 'L\'URSS disparaît en décembre 1991 avec la démission de Gorbatchev et l\'indépendance des républiques.',
      period: 'europe-1989'
    }
  ]
};

// Questions bonus pour les modes avancés
export const bonusQuestions: { [key: string]: QuizQuestion[] } = {
  challenge: [
    {
      id: 'challenge-1',
      question: 'Quel est le bilan humain de la Première Guerre mondiale ?',
      options: ['5 millions de morts', '10 millions de morts', '15 millions de morts', '20 millions de morts'],
      correctAnswer: 1,
      explanation: 'La Première Guerre mondiale fait environ 10 millions de morts militaires et 8 millions de civils.',
      period: 'challenge'
    },
    {
      id: 'challenge-2',
      question: 'Qui a écrit "Mein Kampf" ?',
      options: ['Mussolini', 'Hitler', 'Staline', 'Franco'],
      correctAnswer: 1,
      explanation: 'Hitler écrit "Mein Kampf" (Mon Combat) en prison en 1924, exposant son idéologie nazie.',
      period: 'challenge'
    },
    {
      id: 'challenge-3',
      question: 'Qu\'est-ce que l\'Opération Barbarossa ?',
      options: ['Invasion de la France', 'Invasion de l\'URSS', 'Débarquement en Normandie', 'Bataille d\'Angleterre'],
      correctAnswer: 1,
      explanation: 'L\'Opération Barbarossa (juin 1941) est l\'invasion de l\'URSS par l\'Allemagne nazie.',
      period: 'challenge'
    }
  ]
};