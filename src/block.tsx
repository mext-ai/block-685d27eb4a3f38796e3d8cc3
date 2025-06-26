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

  // Send completion event for tracking
  const sendCompletionEvent = (completed: boolean, score?: number, maxScore?: number) => {
    const completionData = {
      type: 'BLOCK_COMPLETION',
      blockId: 'history-game-brevet',
      completed,
      score,
      maxScore,
      data: {
        completedPeriods: gameState.completedPeriods.length,
        totalPeriods: periods.length,
        averageScore: score || 0
      }
    };

    // Send to both parent and window for compatibility
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
    
    // Send initial engagement event
    sendCompletionEvent(false, 0, 10);
  };

  // Handle period selection
  const handlePeriodClick = (periodId: string) => {
    const period = periods.find(p => p.id === periodId);
    if (!period || !period.unlocked) return;

    setSelectedPeriod(periodId);
    setGameState(prev => ({ ...prev, currentPeriod: periodId }));
    setShowQuiz(true);
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number) => {
    if (!selectedPeriod) return;

    // Update the completed period
    const updatedPeriods = periods.map(period => {
      if (period.id === selectedPeriod) {
        return { ...period, completed: true, score };
      }
      return period;
    });

    // Unlock next period based on completion order
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

    setPeriods(updatedPeriods);
    
    // Update game state
    setGameState(prev => ({
      ...prev,
      completedPeriods: [...prev.completedPeriods, selectedPeriod],
      totalScore: prev.totalScore + score
    }));

    setShowQuiz(false);
    setSelectedPeriod(null);

    // Check if all periods are completed
    const newCompletedCount = gameState.completedPeriods.length + 1;
    const isFullyCompleted = newCompletedCount === periods.length;
    
    // Send completion event
    const averageScore = (gameState.totalScore + score) / newCompletedCount;
    sendCompletionEvent(isFullyCompleted, Math.round(averageScore), 10);

    // Show congratulations if all periods completed
    if (isFullyCompleted) {
      setTimeout(() => {
        alert('🎉 Félicitations ! Vous avez terminé toutes les périodes historiques ! Vous êtes prêt pour le Brevet !');
      }, 500);
    }
  };

  // Handle quiz close
  const handleQuizClose = () => {
    setShowQuiz(false);
    setSelectedPeriod(null);
    setGameState(prev => ({ ...prev, currentPeriod: null }));
  };

  // Show dashboard
  const handleShowDashboard = () => {
    setShowDashboard(true);
  };

  // Close dashboard
  const handleCloseDashboard = () => {
    setShowDashboard(false);
  };

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('history-game-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setGameState(parsed.gameState);
        setPeriods(parsed.periods);
        if (parsed.gameState.playerName) {
          setShowAvatarCustomization(false);
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Save progress whenever game state changes
  useEffect(() => {
    if (gameState.playerName) {
      localStorage.setItem('history-game-progress', JSON.stringify({
        gameState,
        periods
      }));
    }
  }, [gameState, periods]);

  // Render avatar customization screen
  if (showAvatarCustomization) {
    return <AvatarCustomization onComplete={handleAvatarComplete} />;
  }

  const completedPercentage = (gameState.completedPeriods.length / periods.length) * 100;
  const averageScore = gameState.completedPeriods.length > 0 ? 
    Math.round(gameState.totalScore / gameState.completedPeriods.length) : 0;

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
            🕰️ Voyage dans l'Histoire
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            fontSize: '1.1rem',
            color: '#bdc3c7'
          }}>
            Salut {gameState.playerName} ! Explorez les grandes périodes du XXe siècle
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {/* Stats display */}
          <div style={{
            background: 'rgba(52, 152, 219, 0.2)',
            borderRadius: '10px',
            padding: '10px 15px',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {gameState.completedPeriods.length}/{periods.length}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              Terminées
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
            onClick={handleShowDashboard}
            style={{
              backgroundColor: '#3498db',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            📊 Tableau de Bord
          </button>
        </div>
      </div>

      {/* Progress bar */}
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
            📈 Progression générale
          </span>
          <span style={{ fontSize: '1.1rem', color: '#3498db' }}>
            {Math.round(completedPercentage)}%
          </span>
        </div>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          height: '12px',
          overflow: 'hidden',
          position: 'relative'
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

      {/* Timeline of Historical Periods */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        height: 'calc(100vh - 200px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {periods.map((period, index) => {
            const isLocked = !period.unlocked;
            const isCompleted = period.completed;
            
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
                    : `0 8px 25px ${period.color}33`,
                  animation: isCompleted ? 'pulse 2s infinite' : 'none'
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

                  {/* Score display */}
                  {isCompleted && period.score !== undefined && (
                    <div style={{
                      background: 'rgba(39, 174, 96, 0.8)',
                      borderRadius: '8px',
                      padding: '8px 15px',
                      display: 'inline-block',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      🏆 Score: {period.score}/10
                    </div>
                  )}

                  {/* Call to action */}
                  {!isLocked && !isCompleted && (
                    <div style={{
                      marginTop: '15px',
                      padding: '10px 15px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}>
                      🎯 Cliquez pour commencer !
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
                      🔒 Terminez la période précédente pour débloquer
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

      {/* Reset button (development/testing) */}
      <button
        onClick={() => {
          localStorage.removeItem('history-game-progress');
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
        onMouseOver={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        title="Recommencer le jeu (développement)"
      >
        🔄 Reset
      </button>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 8px 25px ${periods.find(p => p.completed)?.color || '#27ae60'}33; }
          50% { box-shadow: 0 12px 35px ${periods.find(p => p.completed)?.color || '#27ae60'}66; }
          100% { box-shadow: 0 8px 25px ${periods.find(p => p.completed)?.color || '#27ae60'}33; }
        }
      `}</style>
    </div>
  );
};

export default Block;