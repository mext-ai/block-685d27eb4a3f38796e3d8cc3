import React, { useState, useEffect } from 'react';
import AvatarCustomization from './AvatarCustomization';
import QuizComponent from './QuizComponent';
import ProgressDashboard from './ProgressDashboard';
import { historicalPeriods, quizQuestions } from './gameData';
import { GameState, HistoricalPeriod } from './types';

interface BlockProps {
  title?: string;
  description?: string;
}

// Modes de jeu pour la révision
type GameMode = 'discovery' | 'revision' | 'exam' | 'challenge';

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

  // UI state
  const [showAvatarCustomization, setShowAvatarCustomization] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('discovery');
  const [showModeSelector, setShowModeSelector] = useState(false);

  // Révision state
  const [revisionStats, setRevisionStats] = useState<{[key: string]: {
    attempts: number;
    bestScore: number;
    lastScore: number;
    averageScore: number;
    weaknesses: string[];
  }}>({});

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
        totalRevisions: Object.values(revisionStats).reduce((sum, stat) => sum + stat.attempts, 0)
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
    }
  };

  // Handle period selection
  const handlePeriodClick = (periodId: string) => {
    const period = periods.find(p => p.id === periodId);
    if (!period || (!period.unlocked && gameMode === 'discovery')) return;

    setSelectedPeriod(periodId);
    setGameState(prev => ({ ...prev, currentPeriod: periodId }));
    setShowQuiz(true);
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number, mistakes: string[] = []) => {
    if (!selectedPeriod) return;

    // Mettre à jour les stats de révision
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

    // Update periods
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

    // En mode découverte, débloquer la période suivante
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

  const handleShowDashboard = () => {
    setShowDashboard(true);
  };

  const handleCloseDashboard = () => {
    setShowDashboard(false);
  };

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('history-revision-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setGameState(parsed.gameState || gameState);
        setPeriods(parsed.periods || periods);
        setRevisionStats(parsed.revisionStats || {});
        if (parsed.gameState?.playerName) {
          setShowAvatarCustomization(false);
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (gameState.playerName) {
      localStorage.setItem('history-revision-progress', JSON.stringify({
        gameState,
        periods,
        revisionStats
      }));
    }
  }, [gameState, periods, revisionStats]);

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
                description: 'Apprenez progressivement, période par période',
                color: '#3498db',
                features: ['Déblocage progressif', 'Première fois', 'Apprentissage guidé']
              },
              {
                mode: 'revision' as GameMode,
                title: '📚 Mode Révision',
                description: 'Révisez toutes les périodes déjà vues',
                color: '#27ae60',
                features: ['Toutes périodes ouvertes', 'Améliorer ses scores', 'Répétition espacée']
              },
              {
                mode: 'exam' as GameMode,
                title: '📝 Mode Examen',
                description: 'Testez-vous dans les conditions du Brevet',
                color: '#e74c3c',
                features: ['Questions aléatoires', 'Temps limité', 'Simulation Brevet']
              },
              {
                mode: 'challenge' as GameMode,
                title: '🏆 Mode Défi',
                description: 'Défis quotidiens et questions difficiles',
                color: '#f39c12',
                features: ['Défis quotidiens', 'Questions expertes', 'Classement']
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
        </div>
      </div>
    );
  }

  const completedPercentage = (gameState.completedPeriods.length / periods.length) * 100;
  const averageScore = gameState.completedPeriods.length > 0 ? 
    Math.round(gameState.totalScore / gameState.completedPeriods.length) : 0;

  const totalRevisions = Object.values(revisionStats).reduce((sum, stat) => sum + stat.attempts, 0);

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
            📚 Révisions Brevet Histoire
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            fontSize: '1.1rem',
            color: '#bdc3c7'
          }}>
            {gameState.playerName} - Mode: {
              gameMode === 'discovery' ? '🌟 Découverte' :
              gameMode === 'revision' ? '📚 Révision' :
              gameMode === 'exam' ? '📝 Examen' : '🏆 Défi'
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
              {totalRevisions}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              Révisions
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
              {averageScore}/10
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              Moyenne
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
              📈 Progression découverte
            </span>
            <span style={{ fontSize: '1.1rem', color: '#3498db' }}>
              {Math.round(completedPercentage)}%
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
              width: `${completedPercentage}%`,
              transition: 'width 0.8s ease',
              borderRadius: '10px',
              background: 'linear-gradient(90deg, #3498db, #2ecc71)'
            }} />
          </div>
        </div>
      )}

      {/* Timeline of Historical Periods */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        height: gameMode === 'discovery' ? 'calc(100vh - 250px)' : 'calc(100vh - 200px)'
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
            const isCompleted = period.completed;
            const periodStats = revisionStats[period.id];
            
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
                {/* Completion badge */}
                {isCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#27ae60',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 15px rgba(39, 174, 96, 0.4)'
                  }}>
                    ✅
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

                  {/* Revision stats */}
                  {periodStats && periodStats.attempts > 0 && (
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '10px',
                      padding: '12px',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                        fontSize: '0.8rem',
                        color: 'white'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {periodStats.attempts}
                          </div>
                          <div>Tentatives</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#27ae60' }}>
                            {periodStats.bestScore}/10
                          </div>
                          <div>Meilleur</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>
                            {periodStats.averageScore}/10
                          </div>
                          <div>Moyenne</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Score display */}
                  {isCompleted && period.score !== undefined && (
                    <div style={{
                      background: 'rgba(39, 174, 96, 0.8)',
                      borderRadius: '8px',
                      padding: '8px 15px',
                      display: 'inline-block',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}>
                      🏆 {gameMode === 'discovery' ? 'Score' : 'Meilleur'}: {period.score}/10
                    </div>
                  )}

                  {/* Call to action */}
                  {!isLocked && (
                    <div style={{
                      marginTop: '15px',
                      padding: '10px 15px',
                      background: gameMode === 'discovery' && !isCompleted 
                        ? 'rgba(52, 152, 219, 0.3)' 
                        : 'rgba(39, 174, 96, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}>
                      {gameMode === 'discovery' && !isCompleted ? '🎯 Découvrir' :
                       gameMode === 'revision' ? '📚 Réviser' :
                       gameMode === 'exam' ? '📝 Tester' : '🏆 Défier'}
                    </div>
                  )}

                  {isLocked && (
                    <div style={{
                      marginTop: '15px',
                      padding: '10px 15px',
                      background: 'rgba(127, 140, 141, 0.3)',
                      borderRadius: '8px',
                      color: '#bdc3c7',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}>
                      🔒 Terminez la période précédente
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Modal */}
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