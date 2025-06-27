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
    // NIVEAU 3 - FACILE
    {
      level: 3,
      difficulty: 'Facile',
      questions: [
        {
          id: 'ww1-3-1',
          question: 'Qu\'est-ce qu\'une tranchée ?',
          options: ['Un tunnel', 'Un fossé de protection', 'Une arme', 'Un véhicule'],
          correctAnswer: 1,
          explanation: 'Les tranchées sont des fossés creusés pour protéger les soldats.',
          period: 'ww1'
        },
        {
          id: 'ww1-3-2',
          question: 'Pourquoi creuse-t-on des tranchées ?',
          options: ['Pour attaquer', 'Pour se protéger', 'Pour communiquer', 'Pour dormir'],
          correctAnswer: 1,
          explanation: 'Les tranchées protègent les soldats des tirs ennemis et des obus.',
          period: 'ww1'
        },
        {
          id: 'ww1-3-3',
          question: 'Qu\'est-ce que le "no man\'s land" ?',
          options: ['Zone neutre', 'Zone entre les tranchées', 'Zone de combat', 'Zone d\'hôpital'],
          correctAnswer: 1,
          explanation: 'Le "no man\'s land" est la zone dangereuse entre les tranchées adverses.',
          period: 'ww1'
        },
        {
          id: 'ww1-3-4',
          question: 'Quelle nouvelle arme utilise-t-on pour la première fois ?',
          options: ['Le fusil', 'Le canon', 'Les gaz toxiques', 'L\'épée'],
          correctAnswer: 2,
          explanation: 'Les gaz toxiques sont utilisés pour la première fois massivement pendant cette guerre.',
          period: 'ww1'
        },
        {
          id: 'ww1-3-5',
          question: 'Quel nouveau moyen de transport apparaît ?',
          options: ['Le train', 'L\'automobile', 'L\'avion', 'Le bateau'],
          correctAnswer: 2,
          explanation: 'L\'aviation se développe rapidement pendant la guerre pour la reconnaissance et le combat.',
          period: 'ww1'
        },
        {
          id: 'ww1-3-6',
          question: 'À quoi servent d\'abord les avions ?',
          options: ['Bombarder', 'Observer', 'Transporter', 'Communiquer'],
          correctAnswer: 1,
          explanation: 'Les avions servent d\'abord à observer les positions ennemies depuis le ciel.',
          period: 'ww1'
        }
      ]
    },
    // NIVEAU 4 - MOYEN
    {
      level: 4,
      difficulty: 'Moyen',
      questions: [
        {
          id: 'ww1-4-1',
          question: 'Quelle est la date exacte de l\'attentat de Sarajevo ?',
          options: ['28 juin 1914', '28 juillet 1914', '28 août 1914', '28 mai 1914'],
          correctAnswer: 0,
          explanation: 'L\'attentat de Sarajevo a lieu le 28 juin 1914, déclenchant la crise de juillet.',
          period: 'ww1'
        },
        {
          id: 'ww1-4-2',
          question: 'Qui assassine l\'archiduc François-Ferdinand ?',
          options: ['Un Autrichien', 'Un Serbe', 'Un Allemand', 'Un Russe'],
          correctAnswer: 1,
          explanation: 'Gavrilo Princip, nationaliste serbe, assassine l\'archiduc à Sarajevo.',
          period: 'ww1'
        },
        {
          id: 'ww1-4-3',
          question: 'Qu\'est-ce que la "guerre de mouvement" ?',
          options: ['Guerre rapide', 'Guerre lente', 'Guerre défensive', 'Guerre navale'],
          correctAnswer: 0,
          explanation: 'La guerre de mouvement (1914) est caractérisée par des offensives rapides.',
          period: 'ww1'
        },
        {
          id: 'ww1-4-4',
          question: 'Qu\'est-ce que le plan Schlieffen ?',
          options: ['Plan français', 'Plan allemand', 'Plan russe', 'Plan britannique'],
          correctAnswer: 1,
          explanation: 'Le plan Schlieffen est la stratégie allemande pour vaincre rapidement la France.',
          period: 'ww1'
        },
        {
          id: 'ww1-4-5',
          question: 'Quelle bataille arrête l\'offensive allemande en 1914 ?',
          options: ['Bataille de Verdun', 'Bataille de la Somme', 'Bataille de la Marne', 'Bataille de Tannenberg'],
          correctAnswer: 2,
          explanation: 'La bataille de la Marne (septembre 1914) arrête l\'offensive allemande vers Paris.',
          period: 'ww1'
        },
        {
          id: 'ww1-4-6',
          question: 'Qui commande les troupes françaises lors de la bataille de la Marne ?',
          options: ['Pétain', 'Foch', 'Joffre', 'Nivelle'],
          correctAnswer: 2,
          explanation: 'Le général Joffre commande les forces françaises pendant la bataille de la Marne.',
          period: 'ww1'
        }
      ]
    },
    // NIVEAU 5 - MOYEN
    {
      level: 5,
      difficulty: 'Moyen',
      questions: [
        {
          id: 'ww1-5-1',
          question: 'Quand commence la guerre de tranchées ?',
          options: ['Fin 1914', 'Début 1915', 'Mi-1915', 'Fin 1915'],
          correctAnswer: 0,
          explanation: 'La guerre de tranchées s\'installe fin 1914 après l\'échec des offensives.',
          period: 'ww1'
        },
        {
          id: 'ww1-5-2',
          question: 'Combien de temps dure la bataille de Verdun ?',
          options: ['6 mois', '8 mois', '10 mois', '12 mois'],
          correctAnswer: 2,
          explanation: 'La bataille de Verdun dure 10 mois, de février à décembre 1916.',
          period: 'ww1'
        },
        {
          id: 'ww1-5-3',
          question: 'Quel est le surnom de Verdun ?',
          options: ['L\'enfer vert', 'L\'enfer rouge', 'L\'enfer blanc', 'L\'enfer noir'],
          correctAnswer: 0,
          explanation: 'Verdun est surnommé "l\'enfer vert" à cause de la végétation détruite par les obus.',
          period: 'ww1'
        },
        {
          id: 'ww1-5-4',
          question: 'Qui prononce la phrase "Ils ne passeront pas" ?',
          options: ['Joffre', 'Pétain', 'Foch', 'Nivelle'],
          correctAnswer: 1,
          explanation: 'Cette phrase est attribuée au général Pétain, défenseur de Verdun.',
          period: 'ww1'
        },
        {
          id: 'ww1-5-5',
          question: 'Qu\'est-ce que la "Voie sacrée" ?',
          options: ['Route vers Verdun', 'Tranchée importante', 'Ligne de chemin de fer', 'Pont stratégique'],
          correctAnswer: 0,
          explanation: 'La "Voie sacrée" est la route qui ravitaille Verdun pendant la bataille.',
          period: 'ww1'
        },
        {
          id: 'ww1-5-6',
          question: 'Quelle bataille de 1916 fait le plus de victimes britanniques ?',
          options: ['Verdun', 'La Somme', 'Passchendaele', 'Arras'],
          correctAnswer: 1,
          explanation: 'La bataille de la Somme (1916) fait 60 000 victimes britanniques en un jour.',
          period: 'ww1'
        }
      ]
    },
    // NIVEAU 6 - MOYEN
    {
      level: 6,
      difficulty: 'Moyen',
      questions: [
        {
          id: 'ww1-6-1',
          question: 'En quelle année la Russie sort-elle de la guerre ?',
          options: ['1916', '1917', '1918', '1919'],
          correctAnswer: 1,
          explanation: 'La Russie signe une paix séparée en 1917 après la révolution bolchevique.',
          period: 'ww1'
        },
        {
          id: 'ww1-6-2',
          question: 'Qu\'est-ce que la révolution russe de 1917 ?',
          options: ['Révolution agricole', 'Révolution politique', 'Révolution industrielle', 'Révolution culturelle'],
          correctAnswer: 1,
          explanation: 'La révolution russe renverse le tsar et amène les bolcheviques au pouvoir.',
          period: 'ww1'
        },
        {
          id: 'ww1-6-3',
          question: 'Qui dirige la révolution bolchevique ?',
          options: ['Staline', 'Trotski', 'Lénine', 'Kerenski'],
          correctAnswer: 2,
          explanation: 'Lénine dirige la révolution bolchevique d\'octobre 1917 en Russie.',
          period: 'ww1'
        },
        {
          id: 'ww1-6-4',
          question: 'Pourquoi les États-Unis entrent-ils en guerre ?',
          options: ['Attaque directe', 'Guerre sous-marine', 'Alliance avec la France', 'Révolution russe'],
          correctAnswer: 1,
          explanation: 'Les États-Unis entrent en guerre à cause de la guerre sous-marine allemande.',
          period: 'ww1'
        },
        {
          id: 'ww1-6-5',
          question: 'Qu\'est-ce que le télégramme Zimmermann ?',
          options: ['Message secret allemand', 'Déclaration de guerre', 'Proposition de paix', 'Ordre militaire'],
          correctAnswer: 0,
          explanation: 'Le télégramme Zimmermann propose au Mexique une alliance contre les États-Unis.',
          period: 'ww1'
        },
        {
          id: 'ww1-6-6',
          question: 'Quand les États-Unis déclarent-ils la guerre à l\'Allemagne ?',
          options: ['Mars 1917', 'Avril 1917', 'Mai 1917', 'Juin 1917'],
          correctAnswer: 1,
          explanation: 'Les États-Unis déclarent la guerre à l\'Allemagne en avril 1917.',
          period: 'ww1'
        }
      ]
    },
    // NIVEAU 7 - DIFFICILE
    {
      level: 7,
      difficulty: 'Difficile',
      questions: [
        {
          id: 'ww1-7-1',
          question: 'Qu\'est-ce que l\'offensive Nivelle ?',
          options: ['Offensive allemande', 'Offensive française', 'Offensive britannique', 'Offensive russe'],
          correctAnswer: 1,
          explanation: 'L\'offensive Nivelle (1917) est un échec français qui provoque des mutineries.',
          period: 'ww1'
        },
        {
          id: 'ww1-7-2',
          question: 'Qu\'est-ce que les mutineries de 1917 ?',
          options: ['Révolte de civils', 'Révolte de soldats', 'Révolte d\'officiers', 'Révolte d\'ouvriers'],
          correctAnswer: 1,
          explanation: 'Les mutineries de 1917 sont des révoltes de soldats français après l\'offensive Nivelle.',
          period: 'ww1'
        },
        {
          id: 'ww1-7-3',
          question: 'Qui remplace Nivelle après l\'échec de son offensive ?',
          options: ['Joffre', 'Pétain', 'Foch', 'Clemenceau'],
          correctAnswer: 1,
          explanation: 'Pétain remplace Nivelle et restaure le moral des troupes françaises.',
          period: 'ww1'
        },
        {
          id: 'ww1-7-4',
          question: 'Qu\'est-ce que l\'offensive Ludendorff ?',
          options: ['Dernière offensive allemande', 'Première offensive allemande', 'Offensive défensive', 'Offensive navale'],
          correctAnswer: 0,
          explanation: 'L\'offensive Ludendorff (1918) est la dernière grande offensive allemande.',
          period: 'ww1'
        },
        {
          id: 'ww1-7-5',
          question: 'Qu\'est-ce que l\'offensive des Cent-Jours ?',
          options: ['Offensive allemande', 'Contre-offensive alliée', 'Bataille navale', 'Révolution'],
          correctAnswer: 1,
          explanation: 'L\'offensive des Cent-Jours (1918) est la contre-offensive alliée victorieuse.',
          period: 'ww1'
        },
        {
          id: 'ww1-7-6',
          question: 'Qui commande les forces alliées en 1918 ?',
          options: ['Joffre', 'Pétain', 'Foch', 'Haig'],
          correctAnswer: 2,
          explanation: 'Ferdinand Foch devient généralissime des forces alliées en 1918.',
          period: 'ww1'
        }
      ]
    },
    // NIVEAU 8 - DIFFICILE
    {
      level: 8,
      difficulty: 'Difficile',
      questions: [
        {
          id: 'ww1-8-1',
          question: 'Qu\'est-ce que la guerre totale ?',
          options: ['Guerre courte', 'Guerre longue', 'Guerre mobilisant tout', 'Guerre limitée'],
          correctAnswer: 2,
          explanation: 'La guerre totale mobilise toutes les ressources humaines et économiques.',
          period: 'ww1'
        },
        {
          id: 'ww1-8-2',
          question: 'Qu\'est-ce que l\'économie de guerre ?',
          options: ['Économie normale', 'Économie militarisée', 'Économie agricole', 'Économie libérale'],
          correctAnswer: 1,
          explanation: 'L\'économie de guerre oriente toute la production vers l\'effort militaire.',
          period: 'ww1'
        },
        {
          id: 'ww1-8-3',
          question: 'Qu\'est-ce que la propagande de guerre ?',
          options: ['Information objective', 'Manipulation de l\'opinion', 'Éducation civique', 'Culture générale'],
          correctAnswer: 1,
          explanation: 'La propagande manipule l\'opinion pour maintenir le soutien à la guerre.',
          period: 'ww1'
        },
        {
          id: 'ww1-8-4',
          question: 'Qu\'est-ce que l\'Union sacrée ?',
          options: ['Alliance militaire', 'Unité politique', 'Traité de paix', 'Organisation religieuse'],
          correctAnswer: 1,
          explanation: 'L\'Union sacrée unit tous les partis politiques français dans l\'effort de guerre.',
          period: 'ww1'
        },
        {
          id: 'ww1-8-5',
          question: 'Quel rôle jouent les femmes pendant la guerre ?',
          options: ['Aucun rôle', 'Rôle traditionnel', 'Remplacement des hommes', 'Rôle militaire'],
          correctAnswer: 2,
          explanation: 'Les femmes remplacent les hommes dans les usines et les campagnes.',
          period: 'ww1'
        },
        {
          id: 'ww1-8-6',
          question: 'Qu\'est-ce que les "munitionnettes" ?',
          options: ['Soldates', 'Ouvrières d\'armement', 'Infirmières', 'Résistantes'],
          correctAnswer: 1,
          explanation: 'Les "munitionnettes" sont les femmes qui fabriquent les munitions.',
          period: 'ww1'
        }
      ]
    },
    // NIVEAU 9 - EXPERT
    {
      level: 9,
      difficulty: 'Expert',
      questions: [
        {
          id: 'ww1-9-1',
          question: 'Qu\'est-ce que le traité de Brest-Litovsk ?',
          options: ['Traité franco-allemand', 'Traité russo-allemand', 'Traité anglo-allemand', 'Traité austro-allemand'],
          correctAnswer: 1,
          explanation: 'Le traité de Brest-Litovsk (1918) signe la paix séparée entre la Russie et l\'Allemagne.',
          period: 'ww1'
        },
        {
          id: 'ww1-9-2',
          question: 'Quelles sont les conséquences de ce traité pour l\'Allemagne ?',
          options: ['Affaiblissement', 'Renforcement', 'Aucun changement', 'Défaite'],
          correctAnswer: 1,
          explanation: 'Ce traité permet à l\'Allemagne de concentrer ses forces sur le front occidental.',
          period: 'ww1'
        },
        {
          id: 'ww1-9-3',
          question: 'Qu\'est-ce que la bataille de Caporetto ?',
          options: ['Victoire française', 'Victoire allemande', 'Victoire italienne', 'Victoire austro-allemande'],
          correctAnswer: 3,
          explanation: 'Caporetto (1917) est une victoire austro-allemande contre l\'Italie.',
          period: 'ww1'
        },
        {
          id: 'ww1-9-4',
          question: 'Qu\'est-ce que la guerre sous-marine à outrance ?',
          options: ['Guerre défensive', 'Guerre offensive totale', 'Guerre limitée', 'Guerre côtière'],
          correctAnswer: 1,
          explanation: 'L\'Allemagne attaque tous les navires, même neutres, pour affamer la Grande-Bretagne.',
          period: 'ww1'
        },
        {
          id: 'ww1-9-5',
          question: 'Quel navire civil coulé émeut l\'opinion américaine ?',
          options: ['Titanic', 'Lusitania', 'Mauretania', 'Olympic'],
          correctAnswer: 1,
          explanation: 'Le torpillage du Lusitania (1915) fait 1200 morts et choque les États-Unis.',
          period: 'ww1'
        },
        {
          id: 'ww1-9-6',
          question: 'Qu\'est-ce que la bataille de Jutland ?',
          options: ['Bataille terrestre', 'Bataille navale', 'Bataille aérienne', 'Bataille de tranchées'],
          correctAnswer: 1,
          explanation: 'Jutland (1916) est la plus grande bataille navale entre les flottes britannique et allemande.',
          period: 'ww1'
        }
      ]
    },
    // NIVEAU 10 - EXPERT
    {
      level: 10,
      difficulty: 'Expert',
      questions: [
        {
          id: 'ww1-10-1',
          question: 'Quel est le bilan humain approximatif de la Première Guerre mondiale ?',
          options: ['8-10 millions de morts', '10-12 millions de morts', '12-15 millions de morts', '15-18 millions de morts'],
          correctAnswer: 2,
          explanation: 'La Première Guerre mondiale fait environ 14 millions de morts militaires et civils.',
          period: 'ww1'
        },
        {
          id: 'ww1-10-2',
          question: 'Qu\'est-ce que les "gueules cassées" ?',
          options: ['Soldats morts', 'Soldats blessés au visage', 'Soldats décorés', 'Soldats mutins'],
          correctAnswer: 1,
          explanation: 'Les "gueules cassées" sont les soldats défigurés par les blessures de guerre.',
          period: 'ww1'
        },
        {
          id: 'ww1-10-3',
          question: 'Qu\'est-ce que le syndrome du "shell shock" ?',
          options: ['Maladie physique', 'Trauma psychologique', 'Empoisonnement', 'Blessure par éclat'],
          correctAnswer: 1,
          explanation: 'Le "shell shock" est le traumatisme psychologique causé par la guerre.',
          period: 'ww1'
        },
        {
          id: 'ww1-10-4',
          question: 'Qu\'est-ce que la grippe espagnole ?',
          options: ['Maladie espagnole', 'Pandémie mondiale', 'Arme chimique', 'Poison'],
          correctAnswer: 1,
          explanation: 'La grippe espagnole (1918-1919) tue plus que la guerre elle-même.',
          period: 'ww1'
        },
        {
          id: 'ww1-10-5',
          question: 'Combien de victimes fait la grippe espagnole ?',
          options: ['10-20 millions', '20-30 millions', '30-50 millions', '50-100 millions'],
          correctAnswer: 3,
          explanation: 'La grippe espagnole fait entre 50 et 100 millions de morts dans le monde.',
          period: 'ww1'
        },
        {
          id: 'ww1-10-6',
          question: 'Qu\'est-ce que l\'article 231 du traité de Versailles ?',
          options: ['Clause militaire', 'Clause de guerre', 'Clause territoriale', 'Clause économique'],
          correctAnswer: 1,
          explanation: 'L\'article 231, dit "clause de guerre", rend l\'Allemagne responsable de la guerre.',
          period: 'ww1'
        }
      ]
    }
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
    },
    // Continue with other levels for totalitarian...
    // I'll add a few more levels to demonstrate the structure
    {
      level: 2,
      difficulty: 'Facile',
      questions: [
        {
          id: 'totalitarian-2-1',
          question: 'Qu\'est-ce que le fascisme ?',
          options: ['Régime démocratique', 'Idéologie totalitaire', 'Système économique', 'Religion'],
          correctAnswer: 1,
          explanation: 'Le fascisme est une idéologie totalitaire née en Italie après 1918.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-2-2',
          question: 'Qu\'est-ce que le nazisme ?',
          options: ['Fascisme allemand', 'Communisme', 'Capitalisme', 'Socialisme'],
          correctAnswer: 0,
          explanation: 'Le nazisme est la version allemande du fascisme, avec le racisme en plus.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-2-3',
          question: 'Qu\'est-ce que le stalinisme ?',
          options: ['Démocratie', 'Communisme totalitaire', 'Fascisme', 'Capitalisme'],
          correctAnswer: 1,
          explanation: 'Le stalinisme est la version totalitaire du communisme en URSS.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-2-4',
          question: 'Qu\'est-ce qu\'un parti unique ?',
          options: ['Plusieurs partis', 'Un seul parti autorisé', 'Aucun parti', 'Partis libres'],
          correctAnswer: 1,
          explanation: 'Dans un régime totalitaire, un seul parti politique est autorisé.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-2-5',
          question: 'Qu\'est-ce que la propagande ?',
          options: ['Information libre', 'Manipulation des masses', 'Débat public', 'Éducation'],
          correctAnswer: 1,
          explanation: 'La propagande manipule l\'opinion publique par tous les moyens.',
          period: 'totalitarian'
        },
        {
          id: 'totalitarian-2-6',
          question: 'Qu\'est-ce que la censure ?',
          options: ['Liberté d\'expression', 'Contrôle de l\'information', 'Débat public', 'Presse libre'],
          correctAnswer: 1,
          explanation: 'La censure contrôle et interdit certaines informations.',
          period: 'totalitarian'
        }
      ]
    }
    // ... Continue with levels 3-10 for totalitarian
  ]
  
  // Continue with other themes (ww2, coldwar, decolonization, fifth-republic, europe-1989)
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