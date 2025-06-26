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

  // Simulation d'appel IA (remplacera par vraie API)
  private async callAI(prompt: string): Promise<string> {
    // Simulation avec des exemples prédéfinis pour le développement
    // Dans la vraie version, on appellera une API comme OpenAI, Claude, etc.
    
    const mockResponses = {
      'ww1-1': `{
        "question": "En quelle année commence la Première Guerre mondiale ?",
        "options": ["1913", "1914", "1915", "1916"],
        "correctAnswer": 1,
        "explanation": "La Première Guerre mondiale commence le 28 juin 1914 avec l'attentat de Sarajevo qui déclenche le conflit."
      }`,
      'ww1-5': `{
        "question": "Combien de soldats français sont morts pendant la bataille de Verdun ?",
        "options": ["150 000", "163 000", "180 000", "200 000"],
        "correctAnswer": 1,
        "explanation": "La bataille de Verdun (1916) a causé environ 163 000 morts côté français et 143 000 côté allemand, soit plus de 300 000 morts au total."
      }`,
      'ww1-10': `{
        "question": "Quel article du traité de Versailles impose à l'Allemagne de reconnaître sa responsabilité dans la guerre ?",
        "options": ["Article 231", "Article 232", "Article 233", "Article 234"],
        "correctAnswer": 0,
        "explanation": "L'article 231, surnommé 'clause de culpabilité de guerre', impose à l'Allemagne d'accepter la responsabilité totale des dommages causés par la guerre."
      }`
    };

    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Pour la démo, retourner des exemples basés sur le niveau
    if (prompt.includes('niveau 1') || prompt.includes('FACILE')) {
      return mockResponses['ww1-1'];
    } else if (prompt.includes('niveau 5') || prompt.includes('MOYEN')) {
      return mockResponses['ww1-5'];
    } else {
      return mockResponses['ww1-10'];
    }
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
        const response = await this.callAI(prompt);
        
        try {
          const generated: GeneratedQuestion = JSON.parse(response);
          
          const question: LevelQuestion = {
            id: `ai-${periodId}-${level}-${i + 1}`,
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
    const fallbacks: { [key: string]: LevelQuestion } = {
      'ww1': {
        id: `fallback-${periodId}-${level}-${index}`,
        level: level,
        question: 'En quelle année commence la Première Guerre mondiale ?',
        options: ['1913', '1914', '1915', '1916'],
        correctAnswer: 1,
        explanation: 'La Première Guerre mondiale commence en 1914.',
        period: periodId
      },
      'totalitarian': {
        id: `fallback-${periodId}-${level}-${index}`,
        level: level,
        question: 'Qui arrive au pouvoir en Allemagne en 1933 ?',
        options: ['Mussolini', 'Staline', 'Hitler', 'Franco'],
        correctAnswer: 2,
        explanation: 'Adolf Hitler devient chancelier allemand en janvier 1933.',
        period: periodId
      }
    };
    
    return fallbacks[periodId] || fallbacks['ww1'];
  }

  // Méthode pour configurer l'API réelle
  public configureAI(apiKey: string, model: string = 'gpt-3.5-turbo') {
    // Configuration pour l'API réelle
    // TODO: Implémenter l'appel à OpenAI, Claude, etc.
  }
}

export default AIQuestionGenerator;