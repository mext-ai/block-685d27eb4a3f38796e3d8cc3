// Données des niveaux avec 10 niveaux par période et 6 questions par niveau
import { QuizQuestion } from './types';

export interface LevelQuestion extends QuizQuestion {
  level: number;
}

// Questions pour la Première Guerre mondiale (10 niveaux, 6 questions chacun)
export const ww1Questions: LevelQuestion[] = [
  // Niveau 1 - Facile
  {
    id: 'ww1-1-1',
    level: 1,
    question: 'En quelle année commence la Première Guerre mondiale ?',
    options: ['1913', '1914', '1915', '1916'],
    correctAnswer: 1,
    explanation: 'La Première Guerre mondiale commence en 1914.',
    period: 'ww1'
  },
  {
    id: 'ww1-1-2',
    level: 1,
    question: 'Dans quelle ville l\'archiduc François-Ferdinand est-il assassiné ?',
    options: ['Vienne', 'Budapest', 'Sarajevo', 'Belgrade'],
    correctAnswer: 2,
    explanation: 'L\'archiduc est assassiné à Sarajevo le 28 juin 1914.',
    period: 'ww1'
  },
  {
    id: 'ww1-1-3',
    level: 1,
    question: 'Combien d\'années dure la Première Guerre mondiale ?',
    options: ['3 ans', '4 ans', '5 ans', '6 ans'],
    correctAnswer: 1,
    explanation: 'La guerre dure 4 ans, de 1914 à 1918.',
    period: 'ww1'
  },
  {
    id: 'ww1-1-4',
    level: 1,
    question: 'Comment appelle-t-on aussi la Première Guerre mondiale ?',
    options: ['La Grande Guerre', 'La Guerre totale', 'La Guerre européenne', 'La Guerre moderne'],
    correctAnswer: 0,
    explanation: 'On appelle aussi la Première Guerre mondiale "La Grande Guerre".',
    period: 'ww1'
  },
  {
    id: 'ww1-1-5',
    level: 1,
    question: 'Quel mois de 1918 se termine la guerre ?',
    options: ['Octobre', 'Novembre', 'Décembre', 'Septembre'],
    correctAnswer: 1,
    explanation: 'La guerre se termine en novembre 1918 avec l\'armistice du 11 novembre.',
    period: 'ww1'
  },
  {
    id: 'ww1-1-6',
    level: 1,
    question: 'Contre qui la France se bat-elle principalement ?',
    options: ['L\'Autriche', 'L\'Allemagne', 'La Russie', 'L\'Italie'],
    correctAnswer: 1,
    explanation: 'La France se bat principalement contre l\'Allemagne.',
    period: 'ww1'
  },

  // Niveau 2 - Facile
  {
    id: 'ww1-2-1',
    level: 2,
    question: 'Quelle est la date exacte de l\'attentat de Sarajevo ?',
    options: ['28 juin 1914', '28 juillet 1914', '1er août 1914', '3 août 1914'],
    correctAnswer: 0,
    explanation: 'L\'attentat a lieu le 28 juin 1914.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-2',
    level: 2,
    question: 'Comment s\'appelle le plan allemand d\'invasion de la France ?',
    options: ['Plan Bismarck', 'Plan Schlieffen', 'Plan Kaiser', 'Plan Moltke'],
    correctAnswer: 1,
    explanation: 'Le plan Schlieffen prévoit une attaque rapide à travers la Belgique.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-3',
    level: 2,
    question: 'Quelle bataille arrête l\'offensive allemande en France en 1914 ?',
    options: ['Bataille de Verdun', 'Bataille de la Somme', 'Bataille de la Marne', 'Bataille d\'Ypres'],
    correctAnswer: 2,
    explanation: 'La bataille de la Marne (6-12 septembre 1914) arrête l\'offensive allemande.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-4',
    level: 2,
    question: 'Qu\'est-ce qu\'un poilu ?',
    options: ['Un officier', 'Un soldat français', 'Un espion', 'Un civil'],
    correctAnswer: 1,
    explanation: 'Un poilu est le surnom donné aux soldats français.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-5',
    level: 2,
    question: 'Quel pays sort de la guerre en 1917 ?',
    options: ['L\'Italie', 'La Russie', 'La Belgique', 'La Serbie'],
    correctAnswer: 1,
    explanation: 'La Russie sort de la guerre en 1917 à cause de la révolution.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-6',
    level: 2,
    question: 'Quand les États-Unis entrent-ils en guerre ?',
    options: ['1915', '1916', '1917', '1918'],
    correctAnswer: 2,
    explanation: 'Les États-Unis entrent en guerre en avril 1917.',
    period: 'ww1'
  },

  // Niveau 3 - Facile
  {
    id: 'ww1-3-1',
    level: 3,
    question: 'Qu\'est-ce que la guerre de tranchées ?',
    options: ['Une guerre rapide', 'Une guerre de positions', 'Une guerre navale', 'Une guerre aérienne'],
    correctAnswer: 1,
    explanation: 'La guerre de tranchées est une guerre de positions fixes.',
    period: 'ww1'
  },
  {
    id: 'ww1-3-2',
    level: 3,
    question: 'Quelle bataille de 1916 symbolise la résistance française ?',
    options: ['Verdun', 'La Somme', 'Ypres', 'Chemin des Dames'],
    correctAnswer: 0,
    explanation: 'Verdun (1916) devient le symbole de la résistance française.',
    period: 'ww1'
  },
  {
    id: 'ww1-3-3',
    level: 3,
    question: 'Quel général français commande à Verdun ?',
    options: ['Foch', 'Joffre', 'Pétain', 'Nivelle'],
    correctAnswer: 2,
    explanation: 'Le général Pétain organise la défense de Verdun.',
    period: 'ww1'
  },
  {
    id: 'ww1-3-4',
    level: 3,
    question: 'Comment appelle-t-on l\'espace entre les tranchées ?',
    options: ['Zone neutre', 'No man\'s land', 'Terre de personne', 'Zone morte'],
    correctAnswer: 1,
    explanation: 'L\'espace entre les tranchées s\'appelle le "no man\'s land".',
    period: 'ww1'
  },
  {
    id: 'ww1-3-5',
    level: 3,
    question: 'Quelle nouvelle arme chimique est utilisée ?',
    options: ['Les bombes', 'Les mitrailleuses', 'Les gaz', 'Les tanks'],
    correctAnswer: 2,
    explanation: 'Les gaz de combat sont une nouveauté terrible de cette guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-3-6',
    level: 3,
    question: 'Qui signe l\'armistice pour l\'Allemagne ?',
    options: ['Le Kaiser', 'Hindenburg', 'Ludendorff', 'Erzberger'],
    correctAnswer: 3,
    explanation: 'Matthias Erzberger signe l\'armistice pour l\'Allemagne.',
    period: 'ww1'
  },

  // Niveau 4 - Moyen
  {
    id: 'ww1-4-1',
    level: 4,
    question: 'Quelle est la durée exacte de la bataille de Verdun ?',
    options: ['6 mois', '8 mois', '10 mois', '12 mois'],
    correctAnswer: 2,
    explanation: 'La bataille de Verdun dure 10 mois (février-décembre 1916).',
    period: 'ww1'
  },
  {
    id: 'ww1-4-2',
    level: 4,
    question: 'Quel est le slogan de Verdun ?',
    options: ['"Ils ne passeront pas"', '"On les aura"', '"Debout les morts"', '"La victoire ou la mort"'],
    correctAnswer: 0,
    explanation: '"Ils ne passeront pas" devient le slogan de la résistance à Verdun.',
    period: 'ww1'
  },
  {
    id: 'ww1-4-3',
    level: 4,
    question: 'Combien de divisions françaises passent par Verdun ?',
    options: ['50', '60', '70', '80'],
    correctAnswer: 2,
    explanation: '70 des 95 divisions françaises passent par Verdun.',
    period: 'ww1'
  },
  {
    id: 'ww1-4-4',
    level: 4,
    question: 'Comment appelle-t-on la route d\'approvisionnement de Verdun ?',
    options: ['Route sacrée', 'Voie sainte', 'Chemin de la gloire', 'Route héroïque'],
    correctAnswer: 0,
    explanation: 'La "Voie sacrée" est la route qui approvisionne Verdun.',
    period: 'ww1'
  },
  {
    id: 'ww1-4-5',
    level: 4,
    question: 'Quelle offensive de 1917 est un échec sanglant ?',
    options: ['Offensive Nivelle', 'Offensive Brusilov', 'Offensive Kerensky', 'Offensive Ludendorff'],
    correctAnswer: 0,
    explanation: 'L\'offensive Nivelle au Chemin des Dames (1917) est un échec.',
    period: 'ww1'
  },
  {
    id: 'ww1-4-6',
    level: 4,
    question: 'Que provoque l\'échec de l\'offensive Nivelle ?',
    options: ['Des désertions', 'Des mutineries', 'Des manifestations', 'Des grèves'],
    correctAnswer: 1,
    explanation: 'L\'échec provoque des mutineries dans l\'armée française.',
    period: 'ww1'
  },

  // Niveau 5 - Moyen
  {
    id: 'ww1-5-1',
    level: 5,
    question: 'Quel sous-marin allemand coule le Lusitania ?',
    options: ['U-20', 'U-21', 'U-30', 'U-35'],
    correctAnswer: 0,
    explanation: 'Le U-20 coule le Lusitania le 7 mai 1915.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-2',
    level: 5,
    question: 'Combien de morts fait le naufrage du Lusitania ?',
    options: ['1100', '1200', '1300', '1400'],
    correctAnswer: 1,
    explanation: 'Le naufrage fait 1198 morts, dont 128 Américains.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-3',
    level: 5,
    question: 'Quel télégramme pousse les États-Unis à entrer en guerre ?',
    options: ['Télégramme Wilson', 'Télégramme Zimmermann', 'Télégramme Kaiser', 'Télégramme Bethmann'],
    correctAnswer: 1,
    explanation: 'Le télégramme Zimmermann révèle une alliance secrète Allemagne-Mexique.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-4',
    level: 5,
    question: 'Qui commande les forces américaines en France ?',
    options: ['Patton', 'Pershing', 'MacArthur', 'Eisenhower'],
    correctAnswer: 1,
    explanation: 'Le général Pershing commande l\'American Expeditionary Force.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-5',
    level: 5,
    question: 'Quelle est la première grande bataille avec des chars ?',
    options: ['Cambrai', 'Flers-Courcelette', 'Amiens', 'Saint-Mihiel'],
    correctAnswer: 1,
    explanation: 'Flers-Courcelette (1916) voit la première utilisation des chars.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-6',
    level: 5,
    question: 'Comment s\'appelle le char français principal ?',
    options: ['Renault FT', 'Schneider CA1', 'Saint-Chamond', 'Char B1'],
    correctAnswer: 0,
    explanation: 'Le Renault FT est le char français le plus utilisé.',
    period: 'ww1'
  },

  // Niveau 6 - Moyen
  {
    id: 'ww1-6-1',
    level: 6,
    question: 'Quel est le bilan total des morts militaires de la guerre ?',
    options: ['8 millions', '9 millions', '10 millions', '11 millions'],
    correctAnswer: 2,
    explanation: 'La guerre fait environ 10 millions de morts militaires.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-2',
    level: 6,
    question: 'Combien la France perd-elle de soldats ?',
    options: ['1,3 million', '1,4 million', '1,5 million', '1,6 million'],
    correctAnswer: 1,
    explanation: 'La France perd environ 1,4 million de soldats.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-3',
    level: 6,
    question: 'Qu\'est-ce qu\'un "gueule cassée" ?',
    options: ['Un prisonnier', 'Un mutilé du visage', 'Un déserteur', 'Un espion'],
    correctAnswer: 1,
    explanation: 'Les "gueules cassées" sont les soldats défigurés par la guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-4',
    level: 6,
    question: 'Quelle révolution russe sort la Russie de la guerre ?',
    options: ['Révolution de février', 'Révolution d\'octobre', 'Révolution de 1917', 'Révolution bolchevique'],
    correctAnswer: 1,
    explanation: 'La révolution d\'octobre 1917 amène les bolcheviques au pouvoir.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-5',
    level: 6,
    question: 'Quel traité la Russie signe-t-elle avec l\'Allemagne ?',
    options: ['Traité de Moscou', 'Traité de Petrograd', 'Traité de Brest-Litovsk', 'Traité de Kiev'],
    correctAnswer: 2,
    explanation: 'Le traité de Brest-Litovsk (mars 1918) sort la Russie de la guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-6',
    level: 6,
    question: 'Combien de femmes travaillent dans les usines françaises en 1918 ?',
    options: ['400 000', '500 000', '600 000', '700 000'],
    correctAnswer: 2,
    explanation: 'Environ 600 000 femmes travaillent dans les usines en 1918.',
    period: 'ww1'
  },

  // Niveau 7 - Difficile
  {
    id: 'ww1-7-1',
    level: 7,
    question: 'Qui est le "Tigre" de la politique française ?',
    options: ['Poincaré', 'Clemenceau', 'Briand', 'Viviani'],
    correctAnswer: 1,
    explanation: 'Georges Clemenceau, surnommé "le Tigre", dirige la France en 1917-1920.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-2',
    level: 7,
    question: 'Quel est le nom de code de la dernière offensive allemande ?',
    options: ['Opération Michel', 'Opération Kaiserschlacht', 'Opération Georgette', 'Opération Blucher'],
    correctAnswer: 1,
    explanation: 'L\'opération Kaiserschlacht (bataille de l\'Empereur) est lancée en mars 1918.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-3',
    level: 7,
    question: 'Qui devient généralissime des forces alliées en 1918 ?',
    options: ['Pétain', 'Haig', 'Foch', 'Pershing'],
    correctAnswer: 2,
    explanation: 'Ferdinand Foch devient généralissime des armées alliées.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-4',
    level: 7,
    question: 'Dans quel wagon l\'armistice est-il signé ?',
    options: ['Wagon de Foch', 'Wagon de Pétain', 'Wagon de Clemenceau', 'Wagon présidentiel'],
    correctAnswer: 0,
    explanation: 'L\'armistice est signé dans le wagon du maréchal Foch.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-5',
    level: 7,
    question: 'Quelle bataille marque le début de la victoire alliée ?',
    options: ['Bataille d\'Amiens', '2e bataille de la Marne', 'Bataille de Megiddo', 'Bataille de Vittorio Veneto'],
    correctAnswer: 0,
    explanation: 'La bataille d\'Amiens (8 août 1918) marque le début de la victoire.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-6',
    level: 7,
    question: 'Combien de prisonniers allemands sont faits à Amiens ?',
    options: ['15 000', '20 000', '25 000', '30 000'],
    correctAnswer: 3,
    explanation: 'La bataille d\'Amiens fait 30 000 prisonniers allemands.',
    period: 'ww1'
  },

  // Niveau 8 - Difficile
  {
    id: 'ww1-8-1',
    level: 8,
    question: 'Quel percentage de la population masculine française mobilisée ?',
    options: ['15%', '17%', '20%', '23%'],
    correctAnswer: 2,
    explanation: '20% de la population masculine française est mobilisée.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-2',
    level: 8,
    question: 'Combien coûte la guerre à la France (en francs 1914) ?',
    options: ['100 milliards', '150 milliards', '200 milliards', '250 milliards'],
    correctAnswer: 1,
    explanation: 'La guerre coûte 150 milliards de francs-or à la France.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-3',
    level: 8,
    question: 'Quel pourcentage du territoire français est détruit ?',
    options: ['8%', '10%', '12%', '15%'],
    correctAnswer: 1,
    explanation: '10% du territoire français est détruit par la guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-4',
    level: 8,
    question: 'Combien d\'obus sont tirés pendant la bataille de Verdun ?',
    options: ['40 millions', '50 millions', '60 millions', '70 millions'],
    correctAnswer: 1,
    explanation: 'Environ 50 millions d\'obus sont tirés à Verdun.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-5',
    level: 8,
    question: 'Quelle est la densité d\'obus au km² à Verdun ?',
    options: ['5000', '6000', '7000', '8000'],
    correctAnswer: 2,
    explanation: 'Il y a environ 7000 obus par km² dans le secteur de Verdun.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-6',
    level: 8,
    question: 'Combien de chevaux sont mobilisés par la France ?',
    options: ['1 million', '1,5 million', '2 millions', '2,5 millions'],
    correctAnswer: 1,
    explanation: 'La France mobilise 1,5 million de chevaux pendant la guerre.',
    period: 'ww1'
  },

  // Niveau 9 - Expert
  {
    id: 'ww1-9-1',
    level: 9,
    question: 'Quel est le nom du premier avion de chasse français ?',
    options: ['Morane-Saulnier', 'Nieuport 11', 'SPAD VII', 'Blériot XI'],
    correctAnswer: 1,
    explanation: 'Le Nieuport 11 "Bébé" est le premier vrai chasseur français.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-2',
    level: 9,
    question: 'Qui est l\'as français avec le plus de victoires ?',
    options: ['Roland Garros', 'René Fonck', 'Georges Guynemer', 'Charles Nungesser'],
    correctAnswer: 1,
    explanation: 'René Fonck totalise 75 victoires aériennes confirmées.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-3',
    level: 9,
    question: 'Quelle bataille navale oppose les flottes britannique et allemande ?',
    options: ['Bataille du Dogger Bank', 'Bataille du Jutland', 'Bataille de Coronel', 'Bataille des Falklands'],
    correctAnswer: 1,
    explanation: 'La bataille du Jutland (31 mai 1916) est la plus grande bataille navale.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-4',
    level: 9,
    question: 'Quel chimiste allemand développe les gaz de combat ?',
    options: ['Fritz Haber', 'Carl Bosch', 'Walther Nernst', 'Otto Hahn'],
    correctAnswer: 0,
    explanation: 'Fritz Haber, prix Nobel, développe les armes chimiques allemandes.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-5',
    level: 9,
    question: 'Quel pourcentage de la production industrielle française est consacrée à la guerre ?',
    options: ['60%', '70%', '80%', '90%'],
    correctAnswer: 2,
    explanation: '80% de la production industrielle française sert l\'effort de guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-6',
    level: 9,
    question: 'Combien de travailleurs coloniaux viennent en France ?',
    options: ['200 000', '300 000', '400 000', '500 000'],
    correctAnswer: 1,
    explanation: 'Environ 300 000 travailleurs coloniaux viennent en France.',
    period: 'ww1'
  },

  // Niveau 10 - Expert
  {
    id: 'ww1-10-1',
    level: 10,
    question: 'Quelle clause du traité de Versailles limite l\'armée allemande ?',
    options: ['Article 150', 'Article 160', 'Article 170', 'Article 180'],
    correctAnswer: 1,
    explanation: 'L\'article 160 limite l\'armée allemande à 100 000 hommes.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-2',
    level: 10,
    question: 'Combien l\'Allemagne doit-elle payer de réparations (en marks-or) ?',
    options: ['132 milliards', '142 milliards', '152 milliards', '162 milliards'],
    correctAnswer: 0,
    explanation: 'L\'Allemagne doit payer 132 milliards de marks-or.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-3',
    level: 10,
    question: 'Quel territoire est administré par la SDN pour 15 ans ?',
    options: ['Alsace', 'Lorraine', 'Sarre', 'Ruhr'],
    correctAnswer: 2,
    explanation: 'La Sarre est administrée par la SDN pendant 15 ans.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-4',
    level: 10,
    question: 'Combien de kilomètres fait le corridor de Dantzig ?',
    options: ['80 km', '100 km', '120 km', '140 km'],
    correctAnswer: 1,
    explanation: 'Le corridor de Dantzig fait environ 100 km de large.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-5',
    level: 10,
    question: 'Quel pourcentage de sa flotte marchande l\'Allemagne doit-elle céder ?',
    options: ['90%', '95%', '98%', '100%'],
    correctAnswer: 3,
    explanation: 'L\'Allemagne doit céder 100% de sa flotte marchande.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-6',
    level: 10,
    question: 'Combien de nouveaux États naissent de la guerre ?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 2,
    explanation: '9 nouveaux États naissent de la dissolution des empires.',
    period: 'ww1'
  }
];

// Questions pour les Régimes totalitaires
export const totalitarianQuestions: LevelQuestion[] = [
  // Niveau 1 - Facile
  {
    id: 'totalitarian-1-1',
    level: 1,
    question: 'Qui arrive au pouvoir en Allemagne en 1933 ?',
    options: ['Mussolini', 'Staline', 'Hitler', 'Franco'],
    correctAnswer: 2,
    explanation: 'Adolf Hitler devient chancelier allemand en janvier 1933.',
    period: 'totalitarian'
  },
  {
    id: 'totalitarian-1-2',
    level: 1,
    question: 'Comment appelle-t-on le régime de Hitler ?',
    options: ['Fascisme', 'Nazisme', 'Communisme', 'Socialisme'],
    correctAnswer: 1,
    explanation: 'Le régime de Hitler est appelé nazisme (national-socialisme).',
    period: 'totalitarian'
  },
  {
    id: 'totalitarian-1-3',
    level: 1,
    question: 'Qui dirige l\'URSS après Lénine ?',
    options: ['Trotsky', 'Staline', 'Kamenev', 'Zinoviev'],
    correctAnswer: 1,
    explanation: 'Staline prend le pouvoir en URSS après la mort de Lénine.',
    period: 'totalitarian'
  },
  {
    id: 'totalitarian-1-4',
    level: 1,
    question: 'Qui dirige l\'Italie fasciste ?',
    options: ['Hitler', 'Staline', 'Mussolini', 'Franco'],
    correctAnswer: 2,
    explanation: 'Benito Mussolini dirige l\'Italie fasciste.',
    period: 'totalitarian'
  },
  {
    id: 'totalitarian-1-5',
    level: 1,
    question: 'Qu\'est-ce qu\'un régime totalitaire ?',
    options: ['Une démocratie', 'Une dictature totale', 'Une monarchie', 'Une république'],
    correctAnswer: 1,
    explanation: 'Un régime totalitaire est une dictature qui contrôle tous les aspects de la vie.',
    period: 'totalitarian'
  },
  {
    id: 'totalitarian-1-6',
    level: 1,
    question: 'Comment Hitler est-il surnommé ?',
    options: ['Le Duce', 'Le Führer', 'Le Guide', 'Le Chef'],
    correctAnswer: 1,
    explanation: 'Hitler est surnommé "Führer" (guide en allemand).',
    period: 'totalitarian'
  }
];

// Pour l'instant, je vais créer quelques niveaux pour chaque période
// Le format sera le même pour toutes les périodes

export const levelQuestionsData: { [key: string]: LevelQuestion[] } = {
  ww1: ww1Questions,
  totalitarian: totalitarianQuestions,
  // Les autres périodes suivront le même format
  ww2: [], // À compléter
  coldwar: [], // À compléter  
  decolonization: [], // À compléter
  'fifth-republic': [], // À compléter
  'europe-1989': [] // À compléter
};