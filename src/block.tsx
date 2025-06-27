import React, { useState, useEffect } from 'react';
import AvatarCustomization from './AvatarCustomization';
import QuizComponent from './QuizComponent';
import LevelSelector from './LevelSelector';
import ClassicQuizComponent from './ClassicQuizComponent';
import ProgressDashboard from './ProgressDashboard';
import { historicalPeriods, quizQuestions } from './gameData';
import { getAvailableThemes, isThemeComplete } from './classicQuestions';
import { GameState, HistoricalPeriod } from './types';

interface BlockProps {
  title?: string;
  description?: string;
}

// Modes de jeu pour la révision
type GameMode = 'discovery' | 'revision' | 'exam' | 'challenge';

interface Level {
  level: number;
  title: string;
  difficulty: string;
  unlocked: boolean;
  completed: boolean;
  score?: number;
  stars: number;
  passed?: boolean; // Nouveau champ pour indiquer si le niveau est réussi
}

interface PeriodProgress {
  [periodId: string]: {
    levels: Level[];
    overallProgress: number;
  };
}

const Block: React.FC<BlockProps> = ({ title, description }) => {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    currentPeriod: null,
    unlockedPeriods: ['ww1'], // Start with WWI unlocked
    completedPeriods: [],
    totalScore: 0,
    playerName: '',
    avatarColor: '#3498db'
  });

  const [periods, setPeriods] = useState<HistoricalPeriod[]>(
    historicalPeriods.map(period => ({
      ...period,
      unlocked: period.id === 'ww1',
      completed: false
    }))
  );

  // Nouveau système de niveaux
  const [periodProgress, setPeriodProgress] = useState<PeriodProgress>({});

  // UI state
  const [showAvatarCustomization, setShowAvatarCustomization] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showClassicQuiz, setShowClassicQuiz] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('discovery');
  const [showModeSelector, setShowModeSelector] = useState(false);

  // Révision state
  const [revisionStats, setRevisionStats] = useState<{[key: string]: {
    attempts: number;
    bestScore: number;
    lastScore: number;
    averageScore: number;
    weaknesses: string[];
    bestPercentage?: number;
    passed?: boolean;
  }}>({});

  // Initialiser les niveaux pour chaque période
  const initializeLevels = (): PeriodProgress => {
    const progress: PeriodProgress = {};
    
    historicalPeriods.forEach(period => {
      const levels: Level[] = [];
      for (let i = 1; i <= 10; i++) {
        levels.push({
          level: i,
          title: `${period.name} - Niveau ${i}`,
          difficulty: i <= 3 ? 'Facile' : i <= 6 ? 'Moyen' : i <= 8 ? 'Difficile' : 'Expert',
          unlocked: period.id === 'ww1' && i === 1, // Seul le niveau 1 de WWI est débloqué au début
          completed: false,
          stars: 0,
          passed: false
        });
      }
      
      progress[period.id] = {
        levels,
        overallProgress: 0
      };
    });
    
    return progress;
  };

  // Send completion event for tracking
  const sendCompletionEvent = (completed: boolean, score?: number, maxScore?: number) => {
    const completionData = {
      type: 'BLOCK_COMPLETION',
      blockId: 'history-revision-brevet',
      completed,
      score,
      maxScore,
      data: {
        completedPeriods: gameState.completedPeriods.length,
        totalPeriods: periods.length,
        averageScore: score || 0,
        gameMode,
        totalRevisions: Object.values(revisionStats).reduce((sum, stat) => sum + stat.attempts, 0),
        levelsCompleted: Object.values(periodProgress).reduce((sum, period) => 
          sum + period.levels.filter(level => level.completed).length, 0
        ),
        totalLevels: Object.values(periodProgress).reduce((sum, period) => sum + period.levels.length, 0),
        levelsPassed: Object.values(periodProgress).reduce((sum, period) => 
          sum + period.levels.filter(level => level.passed).length, 0
        )
      }
    };

    window.postMessage(completionData, '*');
    window.parent.postMessage(completionData, '*');
  };

  // Handle avatar creation
  const handleAvatarComplete = (name: string, color: string) => {
    setGameState(prev => ({
      ...prev,
      playerName: name,
      avatarColor: color
    }));
    setShowAvatarCustomization(false);
    sendCompletionEvent(false, 0, 10);
  };

  // Handle mode selection
  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    setShowModeSelector(false);
    
    // En mode révision, toutes les périodes sont débloquées
    if (mode === 'revision' || mode === 'exam' || mode === 'challenge') {
      setPeriods(prev => prev.map(period => ({
        ...period,
        unlocked: true
      })));
      setGameState(prev => ({
        ...prev,
        unlockedPeriods: periods.map(p => p.id)
      }));
      
      // Débloquer tous les niveaux complétés ou réussis
      setPeriodProgress(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(periodId => {
          updated[periodId].levels = updated[periodId].levels.map(level => ({
            ...level,
            unlocked: level.completed || level.passed || level.level === 1
          }));
        });
        return updated;
      });
    }
  };

  // Handle period selection - now opens level selector
  const handlePeriodClick = (periodId: string) => {
    const period = periods.find(p => p.id === periodId);
    if (!period || (!period.unlocked && gameMode === 'discovery')) return;

    setSelectedPeriod(periodId);
    setShowLevelSelector(true);
  };

  // Handle level selection
  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    setShowLevelSelector(false);
    setShowClassicQuiz(true);
  };

  // Handle Classic Quiz completion avec nouveau système
  const handleClassicQuizComplete = (score: number, stars: number, mistakes: string[] = [], passed: boolean) => {
    if (!selectedPeriod || !selectedLevel) return;

    const percentage = (score / 6) * 100; // 6 questions par niveau

    // Mettre à jour les stats de révision
    const levelKey = `${selectedPeriod}-${selectedLevel}`;
    const currentStats = revisionStats[levelKey] || {
      attempts: 0,
      bestScore: 0,
      lastScore: 0,
      averageScore: 0,
      weaknesses: [],
      bestPercentage: 0,
      passed: false
    };

    const newAttempts = currentStats.attempts + 1;
    const newAverageScore = ((currentStats.averageScore * currentStats.attempts) + score) / newAttempts;
    
    const updatedStats = {
      ...currentStats,
      attempts: newAttempts,
      bestScore: Math.max(currentStats.bestScore, score),
      lastScore: score,
      averageScore: Math.round(newAverageScore),
      weaknesses: [...new Set([...currentStats.weaknesses, ...mistakes])],
      bestPercentage: Math.max(currentStats.bestPercentage || 0, percentage),
      passed: currentStats.passed || passed // Une fois réussi, reste réussi
    };

    setRevisionStats(prev => ({
      ...prev,
      [levelKey]: updatedStats
    }));

    // Mettre à jour le progrès des niveaux
    setPeriodProgress(prev => {
      const updated = { ...prev };
      const currentLevel = updated[selectedPeriod].levels.find(l => l.level === selectedLevel);
      
      if (currentLevel) {
        // Mettre à jour les infos du niveau
        currentLevel.completed = true;
        currentLevel.score = Math.max(currentLevel.score || 0, score);
        currentLevel.stars = Math.max(currentLevel.stars, stars);
        currentLevel.passed = currentLevel.passed || passed; // Une fois réussi, reste réussi
        
        // Débloquer le niveau suivant SEULEMENT si ce niveau est réussi (≥60%)
        if (passed && selectedLevel < 10) {
          const nextLevel = updated[selectedPeriod].levels.find(l => l.level === selectedLevel + 1);
          if (nextLevel) {
            nextLevel.unlocked = true;
          }
        }
        
        // Vérifier si tous les niveaux sont réussis (pas seulement complétés)
        const allLevelsPassed = updated[selectedPeriod].levels.every(l => l.passed || l.level > 10);
        const passedLevels = updated[selectedPeriod].levels.filter(l => l.passed).length;
        
        // Débloquer la période suivante seulement si au moins 8 niveaux sur 10 sont réussis
        if (passedLevels >= 8 && gameMode === 'discovery') {
          const periodOrder = ['ww1', 'totalitarian', 'ww2', 'coldwar', 'decolonization', 'fifth-republic', 'europe-1989'];
          const currentIndex = periodOrder.indexOf(selectedPeriod);
          
          if (currentIndex >= 0 && currentIndex < periodOrder.length - 1) {
            const nextPeriodId = periodOrder[currentIndex + 1];
            
            // Débloquer la période suivante
            setPeriods(prev => prev.map(period => ({
              ...period,
              unlocked: period.id === nextPeriodId ? true : period.unlocked
            })));
            
            // Débloquer le niveau 1 de la période suivante
            if (updated[nextPeriodId]) {
              updated[nextPeriodId].levels[0].unlocked = true;
            }
            
            setGameState(prev => ({
              ...prev,
              unlockedPeriods: [...prev.unlockedPeriods.filter(id => id !== nextPeriodId), nextPeriodId]
            }));
          }
        }
        
        // Calculer le progrès global de la période (basé sur les niveaux réussis)
        const passedLevelsCount = updated[selectedPeriod].levels.filter(l => l.passed).length;
        updated[selectedPeriod].overallProgress = (passedLevelsCount / 10) * 100;
      }
      
      return updated;
    });

    setShowClassicQuiz(false);
    setShowLevelSelector(true);
    setSelectedLevel(null);

    // Calculer le progrès global
    const totalLevelsPassed = Object.values(periodProgress).reduce((sum, period) => 
      sum + period.levels.filter(level => level.passed).length, 0
    );
    const totalLevels = Object.values(periodProgress).reduce((sum, period) => sum + period.levels.length, 0);
    const overallProgress = totalLevels > 0 ? (totalLevelsPassed / totalLevels) * 100 : 0;
    
    sendCompletionEvent(overallProgress >= 80, score, 6); // 80% des niveaux réussis pour complétion
  };

  // Handle quiz completion (ancien système)
  const handleQuizComplete = (score: number, mistakes: string[] = []) => {
    if (!selectedPeriod) return;

    const currentStats = revisionStats[selectedPeriod] || {
      attempts: 0,
      bestScore: 0,
      lastScore: 0,
      averageScore: 0,
      weaknesses: []
    };

    const newAttempts = currentStats.attempts + 1;
    const newAverageScore = ((currentStats.averageScore * currentStats.attempts) + score) / newAttempts;
    
    const updatedStats = {
      ...currentStats,
      attempts: newAttempts,
      bestScore: Math.max(currentStats.bestScore, score),
      lastScore: score,
      averageScore: Math.round(newAverageScore),
      weaknesses: [...new Set([...currentStats.weaknesses, ...mistakes])]
    };

    setRevisionStats(prev => ({
      ...prev,
      [selectedPeriod]: updatedStats
    }));

    const updatedPeriods = periods.map(period => {
      if (period.id === selectedPeriod) {
        return { 
          ...period, 
          completed: true, 
          score: gameMode === 'discovery' ? score : Math.max(period.score || 0, score)
        };
      }
      return period;
    });

    if (gameMode === 'discovery') {
      const periodOrder = ['ww1', 'totalitarian', 'ww2', 'coldwar', 'decolonization', 'fifth-republic', 'europe-1989'];
      const currentIndex = periodOrder.indexOf(selectedPeriod);
      
      if (currentIndex >= 0 && currentIndex < periodOrder.length - 1) {
        const nextPeriodId = periodOrder[currentIndex + 1];
        updatedPeriods.forEach(period => {
          if (period.id === nextPeriodId) {
            period.unlocked = true;
          }
        });
        
        setGameState(prev => ({
          ...prev,
          unlockedPeriods: [...prev.unlockedPeriods, nextPeriodId]
        }));
      }
    }

    setPeriods(updatedPeriods);
    
    setGameState(prev => ({
      ...prev,
      completedPeriods: gameMode === 'discovery' && !prev.completedPeriods.includes(selectedPeriod) 
        ? [...prev.completedPeriods, selectedPeriod]
        : prev.completedPeriods,
      totalScore: prev.totalScore + score
    }));

    setShowQuiz(false);
    setSelectedPeriod(null);

    const isFullyCompleted = gameMode === 'discovery' && (gameState.completedPeriods.length + 1) === periods.length;
    const averageScore = (gameState.totalScore + score) / Math.max(gameState.completedPeriods.length + 1, 1);
    sendCompletionEvent(isFullyCompleted, Math.round(averageScore), 10);
  };

  const handleQuizClose = () => {
    setShowQuiz(false);
    setSelectedPeriod(null);
    setGameState(prev => ({ ...prev, currentPeriod: null }));
  };

  const handleLevelSelectorBack = () => {
    setShowLevelSelector(false);
    setSelectedPeriod(null);
  };

  const handleClassicQuizClose = () => {
    setShowClassicQuiz(false);
    setSelectedLevel(null);
  };

  const handleShowDashboard = () => {
    setShowDashboard(true);
  };

  const handleCloseDashboard = () => {
    setShowDashboard(false);
  };

  // Initialize levels on first load
  useEffect(() => {
    const initialProgress = initializeLevels();
    setPeriodProgress(initialProgress);
  }, []);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('history-revision-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setGameState(parsed.gameState || gameState);
        setPeriods(parsed.periods || periods);
        setRevisionStats(parsed.revisionStats || {});
        setPeriodProgress(parsed.periodProgress || initializeLevels());
        if (parsed.gameState?.playerName) {
          setShowAvatarCustomization(false);
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
        setPeriodProgress(initializeLevels());
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (gameState.playerName) {
      localStorage.setItem('history-revision-progress', JSON.stringify({
        gameState,
        periods,
        revisionStats,
        periodProgress
      }));
    }
  }, [gameState, periods, revisionStats, periodProgress]);

  // Render avatar customization screen
  if (showAvatarCustomization) {
    return <AvatarCustomization onComplete={handleAvatarComplete} />;
  }

  // Mode selector
  if (showModeSelector) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '25px',
          padding: '50px',
          maxWidth: '800px',
          width: '90%',
          color: 'white'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '30px',
            background: 'linear-gradient(45deg, #3498db, #e74c3c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎯 Choisissez votre mode de révision
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                mode: 'discovery' as GameMode,
                title: '🌟 Mode Découverte',
                description: 'Questions manuelles classiques, niveau par niveau',
                color: '#3498db',
                features: ['10 niveaux par période', 'Questions créées manuellement', 'Minimum 60% requis', 'Difficulté progressive']
              },
              {
                mode: 'revision' as GameMode,
                title: '📚 Mode Révision',
                description: 'Révisez avec des questions classiques',
                color: '#27ae60',
                features: ['Niveaux réussis ouverts', 'Questions toujours identiques', 'Système d\'étoiles', 'Révision solide']
              },
              {
                mode: 'exam' as GameMode,
                title: '📝 Mode Examen',
                description: 'Simulation Brevet avec questions types',
                color: '#e74c3c',
                features: ['Questions niveau Brevet', 'Temps limité', 'Préparation complète', 'Seuil de réussite']
              },
              {
                mode: 'challenge' as GameMode,
                title: '🏆 Mode Défi',
                description: 'Défis avec questions avancées',
                color: '#f39c12',
                features: ['Questions complexes', 'Niveau expert', 'Challenges quotidiens', 'Haute difficulté']
              }
            ].map(modeInfo => (
              <button
                key={modeInfo.mode}
                onClick={() => handleModeSelect(modeInfo.mode)}
                style={{
                  background: `linear-gradient(135deg, ${modeInfo.color}, ${modeInfo.color}88)`,
                  border: 'none',
                  borderRadius: '20px',
                  padding: '30px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = `0 15px 35px ${modeInfo.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem' }}>
                  {modeInfo.title}
                </h3>
                <p style={{ margin: '0 0 15px 0', fontSize: '1rem', opacity: 0.9 }}>
                  {modeInfo.description}
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                  {modeInfo.features.map(feature => (
                    <li key={feature} style={{ marginBottom: '5px' }}>{feature}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
          
          <div style={{
            background: 'rgba(52, 152, 219, 0.1)',
            border: '1px solid rgba(52, 152, 219, 0.3)',
            borderRadius: '15px',
            padding: '20px',
            marginTop: '30px',
            textAlign: 'center'
          }}>
            <h4 style={{ 
              margin: '0 0 10px 0', 
              color: '#3498db',
              fontSize: '1.2rem'
            }}>
              📚 Nouveau Système de Notation
            </h4>
            <p style={{ 
              margin: 0, 
              color: '#bdc3c7',
              fontSize: '0.95rem'
            }}>
              Minimum 60% pour passer au niveau suivant • 60-69% ⭐ • 70-89% ⭐⭐ • 90-100% ⭐⭐⭐
              <br />8 niveaux réussis sur 10 débloqueront la période suivante !
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Level Selector
  if (showLevelSelector && selectedPeriod) {
    const period = periods.find(p => p.id === selectedPeriod);
    const levels = periodProgress[selectedPeriod]?.levels || [];
    
    return (
      <LevelSelector
        periodId={selectedPeriod}
        periodName={period?.name || ''}
        periodColor={period?.color || '#3498db'}
        levels={levels}
        onLevelSelect={handleLevelSelect}
        onBack={handleLevelSelectorBack}
      />
    );
  }

  // Classic Quiz
  if (showClassicQuiz && selectedPeriod && selectedLevel) {
    const period = periods.find(p => p.id === selectedPeriod);
    
    return (
      <ClassicQuizComponent
        themeId={selectedPeriod}
        themeName={period?.name || ''}
        themeColor={period?.color || '#3498db'}
        level={selectedLevel}
        onComplete={handleClassicQuizComplete}
        onClose={handleClassicQuizClose}
      />
    );
  }

  const completedPercentage = (gameState.completedPeriods.length / periods.length) * 100;
  const averageScore = gameState.completedPeriods.length > 0 ? 
    Math.round(gameState.totalScore / gameState.completedPeriods.length) : 0;

  const totalRevisions = Object.values(revisionStats).reduce((sum, stat) => sum + stat.attempts, 0);
  const totalLevelsCompleted = Object.values(periodProgress).reduce((sum, period) => 
    sum + period.levels.filter(level => level.completed).length, 0
  );
  const totalLevelsPassed = Object.values(periodProgress).reduce((sum, period) => 
    sum + period.levels.filter(level => level.passed).length, 0
  );

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <div>
          <h1 style={{
            margin: 0,
            fontSize: '2.2rem',
            background: 'linear-gradient(45deg, #3498db, #e74c3c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📚 Révisions Brevet Histoire Classique
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            fontSize: '1.1rem',
            color: '#bdc3c7'
          }}>
            {gameState.playerName} - Mode: {
              gameMode === 'discovery' ? '🌟 Découverte Classique' :
              gameMode === 'revision' ? '📚 Révision Classique' :
              gameMode === 'exam' ? '📝 Examen Classique' : '🏆 Défi Classique'
            }
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{
            background: 'rgba(52, 152, 219, 0.2)',
            borderRadius: '10px',
            padding: '10px 15px',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {totalLevelsPassed}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              Réussis
            </div>
          </div>

          <div style={{
            background: 'rgba(39, 174, 96, 0.2)',
            borderRadius: '10px',
            padding: '10px 15px',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {totalRevisions}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              Quiz
            </div>
          </div>

          <button
            onClick={() => setShowModeSelector(true)}
            style={{
              backgroundColor: '#9b59b6',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            🎯 Changer de mode
          </button>

          <button
            onClick={handleShowDashboard}
            style={{
              backgroundColor: '#3498db',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
            }}
          >
            📊 Tableau de Bord
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {gameMode === 'discovery' && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '15px 20px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              📚 Progression découverte classique
            </span>
            <span style={{ fontSize: '1.1rem', color: '#3498db' }}>
              {totalLevelsPassed}/70 niveaux réussis
            </span>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            height: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#3498db',
              height: '100%',
              width: `${(totalLevelsPassed / 70) * 100}%`,
              transition: 'width 0.8s ease',
              borderRadius: '10px',
              background: 'linear-gradient(90deg, #3498db, #2ecc71)'
            }} />
          </div>
          <div style={{
            fontSize: '0.9rem',
            opacity: 0.8,
            marginTop: '5px',
            textAlign: 'center'
          }}>
            Minimum 60% requis pour passer au niveau suivant • 8 niveaux réussis débloquent la période suivante
          </div>
        </div>
      )}

      {/* Timeline of Historical Periods */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        height: gameMode === 'discovery' ? 'calc(100vh - 290px)' : 'calc(100vh - 200px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {periods.map((period, index) => {
            const isLocked = !period.unlocked && gameMode === 'discovery';
            const periodLevels = periodProgress[period.id]?.levels || [];
            const completedLevels = periodLevels.filter(level => level.completed).length;
            const passedLevels = periodLevels.filter(level => level.passed).length;
            const totalStars = periodLevels.reduce((sum, level) => sum + level.stars, 0);
            const maxStars = periodLevels.length * 3;
            const overallProgress = periodProgress[period.id]?.overallProgress || 0;
            const isThemeReady = isThemeComplete(period.id);
            
            return (
              <div
                key={period.id}
                onClick={() => handlePeriodClick(period.id)}
                style={{
                  background: isLocked 
                    ? 'rgba(127, 140, 141, 0.3)' 
                    : `linear-gradient(135deg, ${period.color}22, ${period.color}44)`,
                  border: `3px solid ${isLocked ? '#7f8c8d' : period.color}`,
                  borderRadius: '20px',
                  padding: '25px',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isLocked ? 'scale(0.95)' : 'scale(1)',
                  opacity: isLocked ? 0.6 : 1,
                  boxShadow: isLocked 
                    ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
                    : `0 8px 25px ${period.color}33`
                }}
                onMouseEnter={(e) => {
                  if (!isLocked) {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 12px 35px ${period.color}55`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLocked) {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${period.color}33`;
                  }
                }}
              >
                {/* Classic Badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: passedLevels >= 8 ? '60px' : '15px',
                  background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                  borderRadius: '15px',
                  padding: '5px 10px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(39, 174, 96, 0.4)'
                }}>
                  📚 Classique
                </div>

                {/* Mastery badge */}
                {passedLevels >= 8 && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#f1c40f',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 15px rgba(241, 196, 15, 0.4)'
                  }}>
                    🏆
                  </div>
                )}

                {/* Lock icon */}
                {isLocked && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#7f8c8d',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    🔒
                  </div>
                )}

                {/* Period number */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: period.color,
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {index + 1}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {period.name}
                  </h3>

                  <p style={{
                    color: '#ecf0f1',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    opacity: 0.9
                  }}>
                    📅 {period.period}
                  </p>

                  <p style={{
                    color: '#bdc3c7',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    marginBottom: '15px'
                  }}>
                    {period.description}
                  </p>

                  {/* Theme completion status */}
                  {!isThemeReady && (
                    <div style={{
                      background: 'rgba(241, 196, 15, 0.2)',
                      border: '1px solid rgba(241, 196, 15, 0.4)',
                      borderRadius: '8px',
                      padding: '8px',
                      marginBottom: '15px',
                      fontSize: '0.85rem',
                      color: '#f1c40f',
                      textAlign: 'center'
                    }}>
                      🚧 Questions en cours d'ajout
                    </div>
                  )}

                  {/* Level progress avec distinction réussis/complétés */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    padding: '12px',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: 'white', fontSize: '0.9rem' }}>
                        ✅ Réussis: {passedLevels}/10
                      </span>
                      <span style={{ color: '#f39c12', fontSize: '0.9rem' }}>
                        ⭐ {totalStars}/{maxStars}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#bdc3c7', fontSize: '0.8rem' }}>
                        📚 Complétés: {completedLevels}/10
                      </span>
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      height: '6px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: 'linear-gradient(90deg, #27ae60, #2ecc71)',
                        height: '100%',
                        width: `${overallProgress}%`,
                        transition: 'width 0.3s ease',
                        borderRadius: '8px'
                      }} />
                    </div>
                  </div>

                  {/* Action button */}
                  <div style={{
                    padding: '12px 15px',
                    background: isLocked ? 'rgba(127, 140, 141, 0.3)' :
                               !isThemeReady ? 'rgba(241, 196, 15, 0.3)' :
                               passedLevels >= 8 ? 'rgba(241, 196, 15, 0.3)' :
                               passedLevels > 0 ? 'rgba(39, 174, 96, 0.3)' : 
                               'rgba(52, 152, 219, 0.3)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {isLocked ? '🔒 Période verrouillée' :
                     !isThemeReady ? '🚧 En préparation' :
                     passedLevels >= 8 ? '🏆 Période maîtrisée' :
                     passedLevels > 0 ? '📚 Continuer' : '📚 Commencer'}
                  </div>

                  {isLocked && (
                    <div style={{
                      marginTop: '10px',
                      padding: '8px',
                      background: 'rgba(127, 140, 141, 0.2)',
                      borderRadius: '8px',
                      color: '#bdc3c7',
                      fontSize: '0.85rem',
                      textAlign: 'center'
                    }}>
                      Réussissez 8 niveaux de la période précédente
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Modal (ancien système) */}
      {showQuiz && selectedPeriod && (
        <QuizComponent
          questions={quizQuestions[selectedPeriod] || []}
          onComplete={handleQuizComplete}
          onClose={handleQuizClose}
          periodName={periods.find(p => p.id === selectedPeriod)?.name || ''}
        />
      )}

      {/* Progress Dashboard Modal */}
      {showDashboard && (
        <ProgressDashboard
          periods={periods}
          playerName={gameState.playerName}
          totalScore={gameState.totalScore}
          onClose={handleCloseDashboard}
        />
      )}

      {/* Reset button */}
      <button
        onClick={() => {
          localStorage.removeItem('history-revision-progress');
          window.location.reload();
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#e74c3c',
          border: 'none',
          borderRadius: '12px',
          padding: '12px 18px',
          color: 'white',
          fontSize: '0.9rem',
          cursor: 'pointer',
          zIndex: 200,
          opacity: 0.7,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
        }}
      >
        🔄 Reset
      </button>
    </div>
  );
};

export default Block;