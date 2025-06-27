// Données des niveaux avec 10 niveaux par période et 6 questions par niveau
import { QuizQuestion } from './types';

export interface LevelQuestion extends QuizQuestion {
  level: number;
}

// Questions pour la Première Guerre mondiale (10 niveaux, 6 questions chacun)
// Progression : Facile (niveaux 1-3) → Moyen (niveaux 4-6) → Difficile (niveaux 7-8) → Expert (niveaux 9-10)
export const ww1Questions: LevelQuestion[] = [
  // Niveau 1 - FACILE : Dates et événements de base
  {
    id: 'ww1-1-1',
    level: 1,
    question: 'En quelle année commence la Première Guerre mondiale ?',
    options: ['1913', '1914', '1915', '1916'],
    correctAnswer: 1,
    explanation: 'La Première Guerre mondiale commence en 1914 avec l\'attentat de Sarajevo.',
    period: 'ww1'
  },
  {
    id: 'ww1-1-2',
    level: 1,
    question: 'En quelle année se termine la Première Guerre mondiale ?',
    options: ['1917', '1918', '1919', '1920'],
    correctAnswer: 1,
    explanation: 'La guerre se termine en 1918 avec l\'armistice du 11 novembre.',
    period: 'ww1'
  },
  {
    id: 'ww1-1-3',
    level: 1,
    question: 'Dans quelle ville l\'archiduc François-Ferdinand est-il assassiné ?',
    options: ['Vienne', 'Budapest', 'Sarajevo', 'Belgrade'],
    correctAnswer: 2,
    explanation: 'L\'archiduc François-Ferdinand est assassiné à Sarajevo le 28 juin 1914.',
    period: 'ww1'
  },
  {
    id: 'ww1-1-4',
    level: 1,
    question: 'Comment appelle-t-on aussi la Première Guerre mondiale ?',
    options: ['La Grande Guerre', 'La Guerre totale', 'La Guerre moderne', 'La Guerre européenne'],
    correctAnswer: 0,
    explanation: 'On appelle aussi la Première Guerre mondiale "La Grande Guerre".',
    period: 'ww1'
  },
  {
    id: 'ww1-1-5',
    level: 1,
    question: 'Combien d\'années dure la Première Guerre mondiale ?',
    options: ['3 ans', '4 ans', '5 ans', '6 ans'],
    correctAnswer: 1,
    explanation: 'La guerre dure 4 ans, de 1914 à 1918.',
    period: 'ww1'
  },
  {
    id: 'ww1-1-6',
    level: 1,
    question: 'Quel jour est signé l\'armistice en 1918 ?',
    options: ['10 novembre', '11 novembre', '12 novembre', '13 novembre'],
    correctAnswer: 1,
    explanation: 'L\'armistice est signé le 11 novembre 1918 à 11 heures.',
    period: 'ww1'
  },

  // Niveau 2 - FACILE : Pays et alliances principales
  {
    id: 'ww1-2-1',
    level: 2,
    question: 'Contre quel pays la France se bat-elle principalement ?',
    options: ['L\'Autriche-Hongrie', 'L\'Allemagne', 'La Russie', 'L\'Italie'],
    correctAnswer: 1,
    explanation: 'La France se bat principalement contre l\'Allemagne sur le front occidental.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-2',
    level: 2,
    question: 'Quel pays fait partie de la Triple Alliance avec l\'Allemagne ?',
    options: ['La France', 'La Russie', 'L\'Autriche-Hongrie', 'L\'Angleterre'],
    correctAnswer: 2,
    explanation: 'L\'Autriche-Hongrie fait partie de la Triple Alliance avec l\'Allemagne et l\'Italie.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-3',
    level: 2,
    question: 'Quel pays entre en guerre aux côtés de la France et de la Russie ?',
    options: ['L\'Espagne', 'L\'Italie', 'Le Royaume-Uni', 'Le Portugal'],
    correctAnswer: 2,
    explanation: 'Le Royaume-Uni entre en guerre en août 1914 aux côtés de la France et de la Russie.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-4',
    level: 2,
    question: 'Quel pays sort de la guerre en 1917 ?',
    options: ['L\'Italie', 'La Russie', 'La Belgique', 'La Serbie'],
    correctAnswer: 1,
    explanation: 'La Russie sort de la guerre en 1917 après la révolution bolchevique.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-5',
    level: 2,
    question: 'Quel pays entre en guerre en 1917 du côté des Alliés ?',
    options: ['Le Japon', 'Les États-Unis', 'La Chine', 'Le Brésil'],
    correctAnswer: 1,
    explanation: 'Les États-Unis entrent en guerre en avril 1917 du côté des Alliés.',
    period: 'ww1'
  },
  {
    id: 'ww1-2-6',
    level: 2,
    question: 'Pourquoi le Royaume-Uni entre-t-il en guerre ?',
    options: ['Pour aider la France', 'Pour défendre la Belgique', 'Pour attaquer l\'Allemagne', 'Pour protéger ses colonies'],
    correctAnswer: 1,
    explanation: 'Le Royaume-Uni entre en guerre pour défendre la neutralité belge violée par l\'Allemagne.',
    period: 'ww1'
  },

  // Niveau 3 - FACILE : Guerre de tranchées et vie des soldats
  {
    id: 'ww1-3-1',
    level: 3,
    question: 'Qu\'est-ce que la guerre de tranchées ?',
    options: ['Une guerre rapide', 'Une guerre de positions fixes', 'Une guerre navale', 'Une guerre aérienne'],
    correctAnswer: 1,
    explanation: 'La guerre de tranchées est une guerre de positions fixes qui dure de 1915 à 1917.',
    period: 'ww1'
  },
  {
    id: 'ww1-3-2',
    level: 3,
    question: 'Comment appelle-t-on les soldats français de 14-18 ?',
    options: ['Les braves', 'Les poilus', 'Les héros', 'Les combattants'],
    correctAnswer: 1,
    explanation: 'Les soldats français sont appelés "poilus" à cause de leur barbe et de leurs conditions difficiles.',
    period: 'ww1'
  },
  {
    id: 'ww1-3-3',
    level: 3,
    question: 'Comment appelle-t-on l\'espace entre les tranchées ennemies ?',
    options: ['Zone neutre', 'No man\'s land', 'Terre de personne', 'Zone interdite'],
    correctAnswer: 1,
    explanation: 'L\'espace entre les tranchées s\'appelle le "no man\'s land" (terre de personne).',
    period: 'ww1'
  },
  {
    id: 'ww1-3-4',
    level: 3,
    question: 'Quelle nouvelle arme terrible est utilisée pour la première fois ?',
    options: ['La mitrailleuse', 'Les gaz de combat', 'L\'artillerie', 'Les grenades'],
    correctAnswer: 1,
    explanation: 'Les gaz de combat sont utilisés pour la première fois, notamment par les Allemands.',
    period: 'ww1'
  },
  {
    id: 'ww1-3-5',
    level: 3,
    question: 'Qu\'est-ce qu\'un "assaut" dans les tranchées ?',
    options: ['Une défense', 'Une attaque pour prendre les tranchées ennemies', 'Une retraite', 'Une négociation'],
    correctAnswer: 1,
    explanation: 'Un assaut est une attaque pour prendre les tranchées ennemies, souvent très meurtrière.',
    period: 'ww1'
  },
  {
    id: 'ww1-3-6',
    level: 3,
    question: 'Quelle maladie touche beaucoup de soldats dans les tranchées ?',
    options: ['La grippe', 'Le pied des tranchées', 'La tuberculose', 'Le scorbut'],
    correctAnswer: 1,
    explanation: 'Le "pied des tranchées" est causé par l\'humidité et les mauvaises conditions d\'hygiène.',
    period: 'ww1'
  },

  // Niveau 4 - MOYEN : Grandes batailles
  {
    id: 'ww1-4-1',
    level: 4,
    question: 'Quelle bataille arrête l\'offensive allemande en septembre 1914 ?',
    options: ['Bataille de Verdun', 'Bataille de la Somme', 'Bataille de la Marne', 'Bataille d\'Ypres'],
    correctAnswer: 2,
    explanation: 'La bataille de la Marne (6-12 septembre 1914) arrête l\'offensive allemande vers Paris.',
    period: 'ww1'
  },
  {
    id: 'ww1-4-2',
    level: 4,
    question: 'En quelle année se déroule la bataille de Verdun ?',
    options: ['1915', '1916', '1917', '1918'],
    correctAnswer: 1,
    explanation: 'La bataille de Verdun se déroule de février à décembre 1916.',
    period: 'ww1'
  },
  {
    id: 'ww1-4-3',
    level: 4,
    question: 'Quel est le symbole de la résistance française à Verdun ?',
    options: ['"On les aura"', '"Ils ne passeront pas"', '"Vive la France"', '"Mort aux Boches"'],
    correctAnswer: 1,
    explanation: '"Ils ne passeront pas" devient le symbole de la résistance française à Verdun.',
    period: 'ww1'
  },
  {
    id: 'ww1-4-4',
    level: 4,
    question: 'Quelle bataille de 1916 est menée par les Britanniques ?',
    options: ['Bataille de Verdun', 'Bataille de la Somme', 'Bataille d\'Ypres', 'Bataille de Passchendaele'],
    correctAnswer: 1,
    explanation: 'La bataille de la Somme (juillet-novembre 1916) est une grande offensive britannique.',
    period: 'ww1'
  },
  {
    id: 'ww1-4-5',
    level: 4,
    question: 'Combien de morts fait environ la bataille de Verdun ?',
    options: ['200 000', '300 000', '400 000', '500 000'],
    correctAnswer: 1,
    explanation: 'La bataille de Verdun fait environ 300 000 morts (français et allemands confondus).',
    period: 'ww1'
  },
  {
    id: 'ww1-4-6',
    level: 4,
    question: 'Quelle offensive de 1917 provoque des mutineries dans l\'armée française ?',
    options: ['Offensive de Verdun', 'Offensive Nivelle', 'Offensive de la Somme', 'Offensive de Flandres'],
    correctAnswer: 1,
    explanation: 'L\'offensive Nivelle au Chemin des Dames (avril 1917) échoue et provoque des mutineries.',
    period: 'ww1'
  },

  // Niveau 5 - MOYEN : Généraux et personnages importants
  {
    id: 'ww1-5-1',
    level: 5,
    question: 'Quel général français organise la défense de Verdun ?',
    options: ['Joffre', 'Foch', 'Pétain', 'Nivelle'],
    correctAnswer: 2,
    explanation: 'Le général Pétain organise la défense de Verdun et devient le "vainqueur de Verdun".',
    period: 'ww1'
  },
  {
    id: 'ww1-5-2',
    level: 5,
    question: 'Quel général français commande lors de la bataille de la Marne ?',
    options: ['Joffre', 'Foch', 'Pétain', 'Gallieni'],
    correctAnswer: 0,
    explanation: 'Le général Joffre commande les troupes françaises lors de la victoire de la Marne.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-3',
    level: 5,
    question: 'Qui devient généralissime des armées alliées en 1918 ?',
    options: ['Pétain', 'Joffre', 'Foch', 'Haig'],
    correctAnswer: 2,
    explanation: 'Ferdinand Foch devient généralissime des armées alliées pour coordonner l\'offensive finale.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-4',
    level: 5,
    question: 'Qui est Georges Clemenceau pendant la guerre ?',
    options: ['Un général', 'Le président', 'Le président du Conseil', 'Un ambassadeur'],
    correctAnswer: 2,
    explanation: 'Clemenceau, surnommé "le Tigre", est président du Conseil de 1917 à 1920.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-5',
    level: 5,
    question: 'Comment surnomme-t-on Georges Clemenceau ?',
    options: ['Le Lion', 'Le Tigre', 'L\'Aigle', 'Le Loup'],
    correctAnswer: 1,
    explanation: 'Georges Clemenceau est surnommé "le Tigre" pour sa détermination.',
    period: 'ww1'
  },
  {
    id: 'ww1-5-6',
    level: 5,
    question: 'Quel général allemand dirige l\'offensive de 1918 ?',
    options: ['Hindenburg', 'Ludendorff', 'Falkenhayn', 'Moltke'],
    correctAnswer: 1,
    explanation: 'Ludendorff dirige les offensives allemandes du printemps 1918.',
    period: 'ww1'
  },

  // Niveau 6 - MOYEN : Innovations techniques et guerre totale
  {
    id: 'ww1-6-1',
    level: 6,
    question: 'Quelle nouvelle arme mobile apparaît en 1916 ?',
    options: ['L\'avion', 'Le char d\'assaut', 'Le sous-marin', 'La mitrailleuse'],
    correctAnswer: 1,
    explanation: 'Les premiers chars d\'assaut sont utilisés par les Britanniques en 1916.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-2',
    level: 6,
    question: 'Comment s\'appelle la guerre sous-marine allemande ?',
    options: ['Guerre navale', 'Guerre submersible', 'Guerre sous-marine totale', 'Guerre des U-Boot'],
    correctAnswer: 2,
    explanation: 'L\'Allemagne lance la "guerre sous-marine totale" pour couler tous les navires.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-3',
    level: 6,
    question: 'Quel navire britannique est coulé par un sous-marin allemand en 1915 ?',
    options: ['Titanic', 'Lusitania', 'Britannia', 'Queen Mary'],
    correctAnswer: 1,
    explanation: 'Le paquebot Lusitania est coulé en mai 1915, faisant 1 198 morts.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-4',
    level: 6,
    question: 'Qu\'est-ce que l\'aviation de chasse en 1914-1918 ?',
    options: ['Transport de troupes', 'Combat aérien', 'Bombardement', 'Reconnaissance'],
    correctAnswer: 1,
    explanation: 'L\'aviation de chasse se développe pour les combats aériens entre pilotes.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-5',
    level: 6,
    question: 'Que signifie "guerre totale" ?',
    options: ['Guerre très violente', 'Toute la société mobilisée', 'Guerre mondiale', 'Guerre sans limite'],
    correctAnswer: 1,
    explanation: 'La guerre totale mobilise toute la société : soldats, civils, économie, industrie.',
    period: 'ww1'
  },
  {
    id: 'ww1-6-6',
    level: 6,
    question: 'Que produisent les usines pendant la guerre ?',
    options: ['Des biens civils', 'Du matériel de guerre', 'De la nourriture', 'Des vêtements'],
    correctAnswer: 1,
    explanation: 'Les usines sont reconverties pour produire armes, munitions et matériel militaire.',
    period: 'ww1'
  },

  // Niveau 7 - DIFFICILE : Révolutions et changements politiques
  {
    id: 'ww1-7-1',
    level: 7,
    question: 'Quelle révolution russe de 1917 maintient la Russie dans la guerre ?',
    options: ['Révolution de février', 'Révolution d\'octobre', 'Révolution de mars', 'Révolution bolchevique'],
    correctAnswer: 0,
    explanation: 'La révolution de février 1917 renverse le Tsar mais maintient la Russie en guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-2',
    level: 7,
    question: 'Quelle révolution russe de 1917 sort la Russie de la guerre ?',
    options: ['Révolution de février', 'Révolution d\'octobre', 'Révolution de mars', 'Révolution bourgeoise'],
    correctAnswer: 1,
    explanation: 'La révolution d\'octobre 1917 amène Lénine au pouvoir et sort la Russie de la guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-3',
    level: 7,
    question: 'Quel traité la Russie bolchevique signe-t-elle avec l\'Allemagne ?',
    options: ['Traité de Moscou', 'Traité de Brest-Litovsk', 'Traité de Petrograd', 'Traité de Kiev'],
    correctAnswer: 1,
    explanation: 'Le traité de Brest-Litovsk (mars 1918) sort la Russie de la guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-4',
    level: 7,
    question: 'Pourquoi les États-Unis entrent-ils en guerre en 1917 ?',
    options: ['Aide à la France', 'Guerre sous-marine allemande', 'Attaque directe', 'Alliance britannique'],
    correctAnswer: 1,
    explanation: 'La guerre sous-marine totale allemande et le télégramme Zimmermann poussent les États-Unis à entrer en guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-5',
    level: 7,
    question: 'Qu\'est-ce que le télégramme Zimmermann ?',
    options: ['Proposition d\'armistice', 'Alliance Allemagne-Mexique', 'Déclaration de guerre', 'Demande d\'aide'],
    correctAnswer: 1,
    explanation: 'Le télégramme Zimmermann propose une alliance secrète entre l\'Allemagne et le Mexique contre les États-Unis.',
    period: 'ww1'
  },
  {
    id: 'ww1-7-6',
    level: 7,
    question: 'Qui abdique en Allemagne en novembre 1918 ?',
    options: ['Le chancelier', 'Le Kaiser Guillaume II', 'Le général Ludendorff', 'Le président'],
    correctAnswer: 1,
    explanation: 'Le Kaiser Guillaume II abdique le 9 novembre 1918, entraînant la fin de l\'Empire allemand.',
    period: 'ww1'
  },

  // Niveau 8 - DIFFICILE : Conséquences et traités
  {
    id: 'ww1-8-1',
    level: 8,
    question: 'En quelle année est signé le traité de Versailles ?',
    options: ['1918', '1919', '1920', '1921'],
    correctAnswer: 1,
    explanation: 'Le traité de Versailles est signé le 28 juin 1919, exactement 5 ans après l\'attentat de Sarajevo.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-2',
    level: 8,
    question: 'Quelle clause du traité de Versailles rend l\'Allemagne responsable ?',
    options: ['Article 231', 'Article 232', 'Article 233', 'Article 234'],
    correctAnswer: 0,
    explanation: 'L\'article 231 (clause de culpabilité) rend l\'Allemagne responsable de tous les dommages.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-3',
    level: 8,
    question: 'Quelle région française est rendue à la France par le traité ?',
    options: ['La Savoie', 'L\'Alsace-Lorraine', 'La Franche-Comté', 'La Bourgogne'],
    correctAnswer: 1,
    explanation: 'L\'Alsace-Lorraine, perdue en 1871, est rendue à la France.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-4',
    level: 8,
    question: 'À combien d\'hommes l\'armée allemande est-elle limitée ?',
    options: ['50 000', '100 000', '150 000', '200 000'],
    correctAnswer: 1,
    explanation: 'L\'armée allemande est limitée à 100 000 hommes sans aviation ni chars.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-5',
    level: 8,
    question: 'Qu\'est-ce que la SDN créée en 1919 ?',
    options: ['Alliance militaire', 'Organisation de paix', 'Traité commercial', 'Union douanière'],
    correctAnswer: 1,
    explanation: 'La Société des Nations (SDN) est créée pour maintenir la paix mondiale.',
    period: 'ww1'
  },
  {
    id: 'ww1-8-6',
    level: 8,
    question: 'Quel territoire est démilitarisé en 1919 ?',
    options: ['L\'Alsace', 'La Sarre', 'La Rhénanie', 'La Ruhr'],
    correctAnswer: 2,
    explanation: 'La Rhénanie est démilitarisée et occupée par les Alliés pendant 15 ans.',
    period: 'ww1'
  },

  // Niveau 9 - EXPERT : Détails techniques et statistiques
  {
    id: 'ww1-9-1',
    level: 9,
    question: 'Combien de morts militaires fait approximativement la guerre ?',
    options: ['8 millions', '9 millions', '10 millions', '11 millions'],
    correctAnswer: 2,
    explanation: 'La Première Guerre mondiale fait environ 10 millions de morts militaires.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-2',
    level: 9,
    question: 'Combien la France perd-elle de soldats ?',
    options: ['1,2 million', '1,3 million', '1,4 million', '1,5 million'],
    correctAnswer: 2,
    explanation: 'La France perd environ 1,4 million de soldats, soit 10% de la population active masculine.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-3',
    level: 9,
    question: 'Quel pourcentage de la population française est mobilisé ?',
    options: ['15%', '17%', '20%', '25%'],
    correctAnswer: 2,
    explanation: '20% de la population française masculine est mobilisée pendant la guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-4',
    level: 9,
    question: 'Combien d\'obus sont tirés pendant toute la guerre ?',
    options: ['500 millions', '1 milliard', '2 milliards', '3 milliards'],
    correctAnswer: 1,
    explanation: 'Environ 1 milliard d\'obus sont tirés pendant toute la guerre.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-5',
    level: 9,
    question: 'Comment appelle-t-on les mutilés du visage ?',
    options: ['Les blessés', 'Les gueules cassées', 'Les défigurés', 'Les invalides'],
    correctAnswer: 1,
    explanation: 'Les "gueules cassées" sont les soldats mutilés du visage par les éclats d\'obus.',
    period: 'ww1'
  },
  {
    id: 'ww1-9-6',
    level: 9,
    question: 'Combien coûte la guerre à la France en francs-or ?',
    options: ['100 milliards', '150 milliards', '200 milliards', '250 milliards'],
    correctAnswer: 1,
    explanation: 'La guerre coûte environ 150 milliards de francs-or à la France.',
    period: 'ww1'
  },

  // Niveau 10 - EXPERT : Mémoire et historiographie
  {
    id: 'ww1-10-1',
    level: 10,
    question: 'Où est situé le principal mémorial français de la guerre ?',
    options: ['À Paris', 'À Verdun', 'À Reims', 'À Compiègne'],
    correctAnswer: 1,
    explanation: 'L\'ossuaire de Douaumont à Verdun est le principal mémorial français de 14-18.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-2',
    level: 10,
    question: 'Qu\'abrite l\'ossuaire de Douaumont ?',
    options: ['Des armes', 'Des ossements de soldats', 'Des documents', 'Des uniformes'],
    correctAnswer: 1,
    explanation: 'L\'ossuaire de Douaumont contient les restes de 130 000 soldats français et allemands non identifiés.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-3',
    level: 10,
    question: 'Quand est institué le 11 novembre comme jour férié en France ?',
    options: ['1918', '1919', '1920', '1922'],
    correctAnswer: 1,
    explanation: 'Le 11 novembre devient jour férié en France dès 1919 pour commémorer l\'armistice.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-4',
    level: 10,
    question: 'Où se trouve la tombe du Soldat inconnu français ?',
    options: ['Au Panthéon', 'Aux Invalides', 'Sous l\'Arc de Triomphe', 'À Notre-Dame'],
    correctAnswer: 2,
    explanation: 'La tombe du Soldat inconnu se trouve sous l\'Arc de Triomphe depuis 1921.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-5',
    level: 10,
    question: 'Que représente le bleuet de France ?',
    options: ['La victoire', 'Le souvenir des morts', 'La paix', 'L\'espoir'],
    correctAnswer: 1,
    explanation: 'Le bleuet de France est le symbole du souvenir des morts pour la patrie.',
    period: 'ww1'
  },
  {
    id: 'ww1-10-6',
    level: 10,
    question: 'Dans quel wagon l\'armistice de 1918 est-il signé ?',
    options: ['Wagon de Foch', 'Wagon de Pétain', 'Wagon de Clemenceau', 'Wagon allemand'],
    correctAnswer: 0,
    explanation: 'L\'armistice est signé dans le wagon-restaurant du maréchal Foch en forêt de Compiègne.',
    period: 'ww1'
  }
];

// Questions pour les Régimes totalitaires (structure identique maintenue)
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

// Pour l'instant, seule la Première Guerre mondiale a été entièrement réécrite
// Les autres périodes conservent leur structure mais peuvent être développées de la même manière

export const levelQuestionsData: { [key: string]: LevelQuestion[] } = {
  ww1: ww1Questions,
  totalitarian: totalitarianQuestions,
  // Les autres périodes suivront le même format avec 10 niveaux chacune
  ww2: [], // À développer avec 60 questions (10 niveaux × 6 questions)
  coldwar: [], // À développer avec 60 questions
  decolonization: [], // À développer avec 60 questions
  'fifth-republic': [], // À développer avec 60 questions
  'europe-1989': [] // À développer avec 60 questions
};