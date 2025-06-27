// Générateur de questions IA pour les quiz d'histoire
import { LevelQuestion } from './levelData';

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export class AIQuestionGenerator {
  private static instance: AIQuestionGenerator;
  
  public static getInstance(): AIQuestionGenerator {
    if (!AIQuestionGenerator.instance) {
      AIQuestionGenerator.instance = new AIQuestionGenerator();
    }
    return AIQuestionGenerator.instance;
  }

  // Prompts spécialisés par période et difficulté
  private getPromptForPeriodAndLevel(periodId: string, periodName: string, level: number): string {
    const difficultyLevel = this.getDifficultyDescription(level);
    const contextInfo = this.getPeriodContext(periodId);
    
    return `Tu es un professeur d'histoire spécialisé dans le programme du Brevet français. 
Génère une question sur "${periodName}" de niveau ${difficultyLevel} (niveau ${level}/10).

CONTEXTE HISTORIQUE:
${contextInfo}

CRITÈRES DE DIFFICULTÉ:
${this.getDifficultyGuidelines(level)}

CONSIGNES STRICTES:
1. La question doit être précise et factuelle
2. Proposer 4 options de réponse (A, B, C, D)
3. Une seule bonne réponse
4. Inclure une explication pédagogique
5. Respecter le programme du Brevet
6. Éviter les questions trop techniques pour les niveaux faciles
7. Inclure des détails précis pour les niveaux experts

FORMAT DE RÉPONSE ATTENDU (JSON strict):
{
  "question": "Votre question ici",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Explication détaillée de la réponse"
}

Génère maintenant UNE question de niveau ${level} sur ${periodName}.`;
  }

  private getPeriodContext(periodId: string): string {
    const contexts: { [key: string]: string } = {
      'ww1': `
        Première Guerre mondiale (1914-1918)
        - Causes: système d'alliances, course aux armements, nationalisme
        - Événements clés: attentat de Sarajevo, bataille de la Marne, Verdun, guerre de tranchées
        - Acteurs: Triple Alliance vs Triple Entente, entrée des USA en 1917
        - Conséquences: traité de Versailles, révolution russe, 10 millions de morts`,
      
      'totalitarian': `
        Régimes totalitaires (1920-1939)
        - Contexte: crise économique, instabilité politique post-WWI
        - Hitler en Allemagne (1933): nazisme, antisémitisme, militarisation
        - Staline en URSS: collectivisation, purges, culte de la personnalité
        - Mussolini en Italie: fascisme, marche sur Rome (1922)`,
      
      'ww2': `
        Seconde Guerre mondiale (1939-1945)
        - Causes: échec de la SDN, appeasement, expansionnisme nazi
        - Phases: Blitzkrieg, bataille d'Angleterre, Barbarossa, Pearl Harbor
        - Génocides: Shoah, solution finale, 6 millions de Juifs
        - Résistance: De Gaulle, appel du 18 juin, France libre vs Vichy`,
      
      'coldwar': `
        Guerre froide (1947-1991)
        - Bipolarisation: USA vs URSS, capitalisme vs communisme
        - Crises: Berlin (1948, 1961), Cuba (1962), Prague (1968)
        - Alliances: OTAN vs Pacte de Varsovie
        - Fin: Gorbatchev, perestroïka, chute du mur (1989)`,
      
      'decolonization': `
        Décolonisation (1945-1975)
        - Causes: affaiblissement européen, mouvements nationalistes
        - Guerre d'Algérie (1954-1962): FLN, OAS, accords d'Évian
        - Conséquences: nouveaux États, guerre froide en Afrique/Asie
        - France: fin de l'empire, pieds-noirs, harkis`,
      
      'fifth-republic': `
        Ve République (1958-présent)
        - Fondation: De Gaulle, crise de 1958, nouvelle Constitution
        - Institutions: présidentialisation, référendums, cohabitation
        - Événements: Mai 68, alternances politiques, construction européenne
        - Évolutions: quinquennat, parité, décentralisation`,
      
      'europe-1989': `
        Europe après 1989
        - Chute du communisme: mur de Berlin, révolutions de velours
        - Unification allemande (1990), disparition de l'URSS (1991)
        - Construction européenne: Maastricht (1992), euro (2002), élargissements
        - Défis: crise des migrants, Brexit, montée des populismes`
    };
    
    return contexts[periodId] || '';
  }

  private getDifficultyDescription(level: number): string {
    if (level <= 3) return 'FACILE';
    if (level <= 6) return 'MOYEN';
    if (level <= 8) return 'DIFFICILE';
    return 'EXPERT';
  }

  private getDifficultyGuidelines(level: number): string {
    if (level <= 3) {
      return `NIVEAU FACILE (${level}/10):
- Questions sur les faits de base, dates principales
- Vocabulaire simple, personnages célèbres
- Événements majeurs, causes principales
- Réponses évidentes pour un élève de 3ème`;
    }
    
    if (level <= 6) {
      return `NIVEAU MOYEN (${level}/10):
- Liens de cause à effet, chronologie précise
- Analyse des conséquences, comparaisons
- Personnages secondaires, batailles spécifiques
- Concepts historiques plus poussés`;
    }
    
    if (level <= 8) {
      return `NIVEAU DIFFICILE (${level}/10):
- Détails historiques précis, nuances
- Analyse critique, interprétations
- Statistiques, données chiffrées
- Contexte géopolitique complexe`;
    }
    
    return `NIVEAU EXPERT (${level}/10):
- Questions très pointues, détails spécialisés
- Analyse historiographique, débats d'experts
- Données précises, pourcentages, traités
- Connections avec l'actualité, enjeux contemporains`;
  }

  // Pool de questions variées pour chaque période et niveau
  private getQuestionPool(): { [key: string]: GeneratedQuestion[] } {
    return {
      'ww1-easy': [
        {
          question: "En quelle année commence la Première Guerre mondiale ?",
          options: ["1913", "1914", "1915", "1916"],
          correctAnswer: 1,
          explanation: "La Première Guerre mondiale commence le 28 juillet 1914 suite à l'attentat de Sarajevo."
        },
        {
          question: "Quel événement déclenche la Première Guerre mondiale ?",
          options: ["L'invasion de la Belgique", "L'attentat de Sarajevo", "La mobilisation russe", "La déclaration de guerre française"],
          correctAnswer: 1,
          explanation: "L'assassinat de l'archiduc François-Ferdinand à Sarajevo le 28 juin 1914 déclenche la guerre."
        },
        {
          question: "Qui était l'empereur d'Allemagne pendant la Première Guerre mondiale ?",
          options: ["Guillaume Ier", "Guillaume II", "Frédéric III", "Otto von Bismarck"],
          correctAnswer: 1,
          explanation: "Guillaume II était l'empereur allemand (Kaiser) de 1888 à 1918."
        },
        {
          question: "En quelle année se termine la Première Guerre mondiale ?",
          options: ["1917", "1918", "1919", "1920"],
          correctAnswer: 1,
          explanation: "La guerre se termine le 11 novembre 1918 avec l'armistice signé dans la forêt de Compiègne."
        },
        {
          question: "Quel pays entre en guerre aux côtés des Alliés en 1917 ?",
          options: ["L'Italie", "Le Japon", "Les États-Unis", "La Grèce"],
          correctAnswer: 2,
          explanation: "Les États-Unis entrent en guerre en avril 1917, apportant un soutien décisif aux Alliés."
        },
        {
          question: "Comment appelle-t-on le type de guerre qui caractérise 1915-1917 sur le front occidental ?",
          options: ["Guerre éclair", "Guerre de tranchées", "Guerre totale", "Guerre froide"],
          correctAnswer: 1,
          explanation: "La guerre de tranchées caractérise le front occidental avec des lignes fixes et meurtrières."
        }
      ],
      'ww1-medium': [
        {
          question: "Quelle bataille de 1916 symbolise l'horreur de la guerre de tranchées ?",
          options: ["La Marne", "Verdun", "La Somme", "Tannenberg"],
          correctAnswer: 1,
          explanation: "Verdun (1916) devient le symbole de l'acharnement et des pertes humaines énormes (700 000 victimes)."
        },
        {
          question: "Quel général français commande à Verdun ?",
          options: ["Ferdinand Foch", "Philippe Pétain", "Joseph Joffre", "Hubert Lyautey"],
          correctAnswer: 1,
          explanation: "Philippe Pétain organise la défense de Verdun et devient le 'vainqueur de Verdun'."
        },
        {
          question: "Quelle révolution éclate en Russie en 1917 ?",
          options: ["La révolution de février seulement", "La révolution d'octobre seulement", "Les deux révolutions", "Aucune révolution"],
          correctAnswer: 2,
          explanation: "La Russie connaît deux révolutions en 1917 : février (abdication du tsar) et octobre (Bolcheviks)."
        },
        {
          question: "Quel est le nom du plan allemand d'offensive à l'ouest en 1914 ?",
          options: ["Plan Schlieffen", "Plan Barbarossa", "Plan Jaune", "Plan Blanc"],
          correctAnswer: 0,
          explanation: "Le plan Schlieffen prévoyait une guerre éclair contre la France via la Belgique."
        },
        {
          question: "Combien de morts approximativement la Première Guerre mondiale fait-elle ?",
          options: ["5 millions", "10 millions", "15 millions", "20 millions"],
          correctAnswer: 1,
          explanation: "La Grande Guerre fait environ 10 millions de morts militaires et civils."
        },
        {
          question: "Quelle arme nouvelle apparaît massivement pendant cette guerre ?",
          options: ["L'avion", "Le char", "Les gaz", "Toutes ces armes"],
          correctAnswer: 3,
          explanation: "La Première Guerre mondiale voit l'apparition massive de l'aviation, des chars et des gaz de combat."
        }
      ],
      'ww1-hard': [
        {
          question: "Quel article du traité de Versailles impose la responsabilité de guerre à l'Allemagne ?",
          options: ["Article 231", "Article 232", "Article 233", "Article 234"],
          correctAnswer: 0,
          explanation: "L'article 231, dit 'clause de culpabilité', impose à l'Allemagne la responsabilité totale du conflit."
        },
        {
          question: "Combien l'Allemagne doit-elle payer en réparations selon Versailles ?",
          options: ["132 milliards de marks-or", "120 milliards de marks-or", "150 milliards de marks-or", "100 milliards de marks-or"],
          correctAnswer: 0,
          explanation: "L'Allemagne doit payer 132 milliards de marks-or, somme considérable qui ruine l'économie."
        },
        {
          question: "Quelle bataille de 1914 sauve Paris ?",
          options: ["La bataille de Charleroi", "La bataille de la Marne", "La bataille de Morhange", "La bataille de Guise"],
          correctAnswer: 1,
          explanation: "La bataille de la Marne (6-12 septembre 1914) arrête l'offensive allemande vers Paris."
        },
        {
          question: "Quel pourcentage de la population masculine française âgée de 20-45 ans meurt ?",
          options: ["15%", "20%", "25%", "30%"],
          correctAnswer: 1,
          explanation: "Environ 20% des hommes français de 20-45 ans meurent, soit 1,4 million de soldats."
        },
        {
          question: "Quelle offensive allemande de 1918 faillit percer le front ?",
          options: ["Offensive Michael", "Offensive Georgette", "Offensive Blücher", "Toutes ces offensives"],
          correctAnswer: 3,
          explanation: "Les offensives du printemps 1918 (Michael, Georgette, Blücher) menacent gravement les Alliés."
        },
        {
          question: "Combien de shells d'artillerie sont tirés pendant toute la guerre ?",
          options: ["500 millions", "1 milliard", "1,5 milliard", "2 milliards"],
          correctAnswer: 2,
          explanation: "Environ 1,5 milliard d'obus sont tirés, transformant les paysages en terres désolées."
        }
      ],
      'totalitarian-easy': [
        {
          question: "En quelle année Hitler arrive-t-il au pouvoir en Allemagne ?",
          options: ["1932", "1933", "1934", "1935"],
          correctAnswer: 1,
          explanation: "Hitler devient chancelier le 30 janvier 1933, marquant le début du régime nazi."
        },
        {
          question: "Comment s'appelle le parti politique d'Hitler ?",
          options: ["Parti communiste", "Parti nazi", "Parti fasciste", "Parti socialiste"],
          correctAnswer: 1,
          explanation: "Le NSDAP (Parti national-socialiste allemand des travailleurs) est communément appelé parti nazi."
        },
        {
          question: "Qui dirige l'URSS après Lénine ?",
          options: ["Trotski", "Staline", "Khrouchtchev", "Brejnev"],
          correctAnswer: 1,
          explanation: "Staline prend le pouvoir en URSS après la mort de Lénine en 1924."
        },
        {
          question: "Quel dictateur dirige l'Italie fasciste ?",
          options: ["Hitler", "Franco", "Mussolini", "Salazar"],
          correctAnswer: 2,
          explanation: "Benito Mussolini, le Duce, dirige l'Italie fasciste de 1922 à 1943."
        },
        {
          question: "Que signifie le terme 'totalitaire' ?",
          options: ["Contrôle total de la société", "Dictature militaire", "Monarchie absolue", "République autoritaire"],
          correctAnswer: 0,
          explanation: "Un régime totalitaire contrôle tous les aspects de la vie sociale, politique et privée."
        },
        {
          question: "Quel événement permet à Hitler de supprimer les libertés ?",
          options: ["L'incendie du Reichstag", "La crise économique", "La mort de Hindenburg", "Les élections de 1933"],
          correctAnswer: 0,
          explanation: "L'incendie du Reichstag (27 février 1933) sert de prétexte pour suspendre les libertés."
        }
      ],
      'totalitarian-medium': [
        {
          question: "Que sont les kolkhozes en URSS ?",
          options: ["Des usines d'État", "Des fermes collectives", "Des camps de travail", "Des écoles politiques"],
          correctAnswer: 1,
          explanation: "Les kolkhozes sont des fermes collectives créées lors de la collectivisation agricole."
        },
        {
          question: "Comment s'appellent les grandes purges staliniennes ?",
          options: ["La Grande Terreur", "La Révolution culturelle", "L'Épuration", "La Collectivisation"],
          correctAnswer: 0,
          explanation: "La Grande Terreur (1936-1938) élimine des millions de Soviétiques suspectés d'opposition."
        },
        {
          question: "Quel est le livre-programme d'Hitler ?",
          options: ["Le Capital", "Mein Kampf", "Le Manifeste fasciste", "L'État totalitaire"],
          correctAnswer: 1,
          explanation: "Mein Kampf (Mon Combat) expose l'idéologie nazie d'Hitler, écrit en prison en 1924."
        },
        {
          question: "Que sont les SA en Allemagne nazie ?",
          options: ["La police secrète", "Les sections d'assaut", "L'armée régulière", "Les fonctionnaires"],
          correctAnswer: 1,
          explanation: "Les SA (Sturmabteilung) sont les sections d'assaut du parti nazi, éliminées en 1934."
        },
        {
          question: "Quel plan économique lance Staline en 1928 ?",
          options: ["Le premier plan quinquennal", "La NEP", "Le plan Marshall", "Le Gosplan"],
          correctAnswer: 0,
          explanation: "Le premier plan quinquennal (1928-1932) industrialise massivement l'URSS."
        },
        {
          question: "Comment Mussolini arrive-t-il au pouvoir ?",
          options: ["Par un coup d'État", "Par la Marche sur Rome", "Par les élections", "Par une révolution"],
          correctAnswer: 1,
          explanation: "La Marche sur Rome (octobre 1922) permet à Mussolini d'accéder au pouvoir légalement."
        }
      ]
    };
  }

  // Simulation d'appel IA avec pool de questions variées
  private async callAI(prompt: string, questionIndex: number): Promise<string> {
    const questionPool = this.getQuestionPool();
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Déterminer la période et le niveau depuis le prompt
    let periodKey = '';
    let levelKey = '';
    
    if (prompt.includes('Première Guerre mondiale')) {
      periodKey = 'ww1';
    } else if (prompt.includes('totalitaires')) {
      periodKey = 'totalitarian';
    }
    
    if (prompt.includes('FACILE')) {
      levelKey = 'easy';
    } else if (prompt.includes('MOYEN')) {
      levelKey = 'medium';
    } else if (prompt.includes('DIFFICILE') || prompt.includes('EXPERT')) {
      levelKey = 'hard';
    }
    
    const poolKey = `${periodKey}-${levelKey}`;
    const questions = questionPool[poolKey];
    
    if (questions && questions.length > 0) {
      // Utiliser l'index pour choisir une question différente à chaque fois
      const selectedQuestion = questions[questionIndex % questions.length];
      return JSON.stringify(selectedQuestion);
    }
    
    // Fallback par défaut
    return JSON.stringify({
      question: "En quelle année commence la Première Guerre mondiale ?",
      options: ["1913", "1914", "1915", "1916"],
      correctAnswer: 1,
      explanation: "La Première Guerre mondiale commence en 1914."
    });
  }

  // Méthode principale pour générer les questions
  public async generateQuestions(
    periodId: string, 
    periodName: string, 
    level: number, 
    count: number = 6
  ): Promise<LevelQuestion[]> {
    const questions: LevelQuestion[] = [];
    
    try {
      for (let i = 0; i < count; i++) {
        const prompt = this.getPromptForPeriodAndLevel(periodId, periodName, level);
        const response = await this.callAI(prompt, i); // Passer l'index pour varier les questions
        
        try {
          const generated: GeneratedQuestion = JSON.parse(response);
          
          const question: LevelQuestion = {
            id: `ai-${periodId}-${level}-${i + 1}-${Date.now()}`, // Ajouter timestamp pour unicité
            level: level,
            question: generated.question,
            options: generated.options,
            correctAnswer: generated.correctAnswer,
            explanation: generated.explanation,
            period: periodId
          };
          
          questions.push(question);
        } catch (parseError) {
          console.error('Erreur parsing JSON IA:', parseError);
          // Fallback sur une question par défaut
          questions.push(this.getFallbackQuestion(periodId, level, i + 1));
        }
      }
    } catch (error) {
      console.error('Erreur génération IA:', error);
      // Générer des questions de secours
      for (let i = 0; i < count; i++) {
        questions.push(this.getFallbackQuestion(periodId, level, i + 1));
      }
    }
    
    return questions;
  }

  // Questions de secours en cas d'échec de l'IA
  private getFallbackQuestion(periodId: string, level: number, index: number): LevelQuestion {
    const fallbacks: { [key: string]: LevelQuestion[] } = {
      'ww1': [
        {
          id: `fallback-${periodId}-${level}-${index}`,
          level: level,
          question: 'En quelle année commence la Première Guerre mondiale ?',
          options: ['1913', '1914', '1915', '1916'],
          correctAnswer: 1,
          explanation: 'La Première Guerre mondiale commence en 1914.',
          period: periodId
        },
        {
          id: `fallback-${periodId}-${level}-${index}`,
          level: level,
          question: 'Quel événement déclenche la Première Guerre mondiale ?',
          options: ['Invasion de la Belgique', 'Attentat de Sarajevo', 'Mobilisation russe', 'Déclaration française'],
          correctAnswer: 1,
          explanation: 'L\'attentat de Sarajevo déclenche la guerre.',
          period: periodId
        }
      ],
      'totalitarian': [
        {
          id: `fallback-${periodId}-${level}-${index}`,
          level: level,
          question: 'Qui arrive au pouvoir en Allemagne en 1933 ?',
          options: ['Mussolini', 'Staline', 'Hitler', 'Franco'],
          correctAnswer: 2,
          explanation: 'Adolf Hitler devient chancelier allemand en janvier 1933.',
          period: periodId
        },
        {
          id: `fallback-${periodId}-${level}-${index}`,
          level: level,
          question: 'Qui dirige l\'URSS après Lénine ?',
          options: ['Trotski', 'Staline', 'Khrouchtchev', 'Molotov'],
          correctAnswer: 1,
          explanation: 'Staline prend le pouvoir après la mort de Lénine.',
          period: periodId
        }
      ]
    };
    
    const periodFallbacks = fallbacks[periodId] || fallbacks['ww1'];
    return periodFallbacks[(index - 1) % periodFallbacks.length];
  }

  // Méthode pour configurer l'API réelle
  public configureAI(apiKey: string, model: string = 'gpt-3.5-turbo') {
    // Configuration pour l'API réelle
    // TODO: Implémenter l'appel à OpenAI, Claude, etc.
  }
}

export default AIQuestionGenerator;