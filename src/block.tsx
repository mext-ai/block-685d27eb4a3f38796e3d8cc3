import React, { useState, useEffect } from 'react';
import AvatarCustomization from './AvatarCustomization';
import Scene3D from './Scene3D';
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
  const [sceneLoaded, setSceneLoaded] = useState(false);

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
    console.log('Avatar completed:', name, color);
    setGameState(prev => ({
      ...prev,
      playerName: name,
      avatarColor: color
    }));
    setShowAvatarCustomization(false);
    
    // Give some time for the scene to initialize
    setTimeout(() => {
      setSceneLoaded(true);
    }, 100);
    
    // Send initial engagement event
    sendCompletionEvent(false, 0, 10);
  };

  // Handle period selection
  const handlePeriodClick = (periodId: string) => {
    console.log('Period clicked:', periodId);
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
          setSceneLoaded(true);
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

  // Show loading state if scene not ready
  if (!sceneLoaded) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '20px',
            animation: 'spin 2s linear infinite'
          }}>
            ⏰
          </div>
          <h2>Chargement du voyage temporel...</h2>
          <p>Préparation de votre aventure historique</p>
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Debug info */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 1000
      }}>
        Player: {gameState.playerName} | Periods: {periods.length} | Scene: {sceneLoaded ? 'Loaded' : 'Loading'}
      </div>

      {/* Try to render 3D Scene with error boundary */}
      <ErrorBoundary>
        <Scene3D
          periods={periods}
          playerName={gameState.playerName}
          avatarColor={gameState.avatarColor}
          selectedPeriod={selectedPeriod}
          onPeriodClick={handlePeriodClick}
          onShowDashboard={handleShowDashboard}
        />
      </ErrorBoundary>

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
          borderRadius: '8px',
          padding: '10px 15px',
          color: 'white',
          fontSize: '0.9rem',
          cursor: 'pointer',
          zIndex: 200,
          opacity: 0.7,
          transition: 'opacity 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
        title="Recommencer le jeu (développement)"
      >
        🔄 Reset
      </button>
    </div>
  );
};

// Simple Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', padding: '20px' }}>
            <h2>⚠️ Erreur de chargement de la scène 3D</h2>
            <p>Il semble y avoir un problème avec le rendu 3D. Voici une version simplifiée :</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#3498db',
                border: 'none',
                borderRadius: '8px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              🔄 Recharger
            </button>
            <div style={{
              marginTop: '20px',
              fontSize: '0.9rem',
              opacity: 0.8
            }}>
              Erreur: {this.state.error?.message}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default Block;