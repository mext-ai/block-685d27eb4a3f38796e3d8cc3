import React, { useState, useEffect } from 'react';
import { AIQuestionGenerator } from './AIQuestionGenerator';
import { LevelQuestion } from './levelData';
import LevelQuiz from './LevelQuiz';

interface AIQuizLoaderProps {
  periodId: string;
  periodName: string;
  periodColor: string;
  level: number;
  onComplete: (score: number, stars: number, mistakes: string[]) => void;
  onClose: () => void;
}

const AIQuizLoader: React.FC<AIQuizLoaderProps> = ({
  periodId,
  periodName,
  periodColor,
  level,
  onComplete,
  onClose
}) => {
  const [questions, setQuestions] = useState<LevelQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Préparation...');

  useEffect(() => {
    generateQuestions();
  }, [periodId, level]);

  const generateQuestions = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      const generator = AIQuestionGenerator.getInstance();
      
      // Simulation du progrès de génération
      const steps = [
        'Analyse du contexte historique...',
        'Définition du niveau de difficulté...',
        'Génération des questions...',
        'Vérification de la cohérence...',
        'Finalisation du quiz...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i]);
        setProgress((i / steps.length) * 100);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const generatedQuestions = await generator.generateQuestions(
        periodId,
        periodName,
        level,
        6
      );

      setQuestions(generatedQuestions);
      setProgress(100);
      setCurrentStep('Quiz prêt !');
      
      // Petit délai pour montrer le succès
      setTimeout(() => {
        setLoading(false);
      }, 500);

    } catch (err) {
      console.error('Erreur génération questions:', err);
      setError('Impossible de générer les questions. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const getDifficultyColor = (level: number): string => {
    if (level <= 3) return '#27ae60'; // Vert - Facile
    if (level <= 6) return '#f39c12'; // Orange - Moyen
    if (level <= 8) return '#e67e22'; // Orange foncé - Difficile
    return '#e74c3c'; // Rouge - Expert
  };

  const getDifficultyText = (level: number): string => {
    if (level <= 3) return 'Facile';
    if (level <= 6) return 'Moyen';
    if (level <= 8) return 'Difficile';
    return 'Expert';
  };

  if (!loading && questions.length > 0) {
    return (
      <LevelQuiz
        questions={questions}
        periodName={periodName}
        periodColor={periodColor}
        level={level}
        onComplete={onComplete}
        onClose={onClose}
      />
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #2c3e50, #34495e)',
        borderRadius: '25px',
        padding: '40px',
        maxWidth: '600px',
        width: '90%',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(231, 76, 60, 0.2)',
            border: '2px solid #e74c3c',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#e74c3c',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            margin: '0 0 10px 0',
            fontSize: '2rem',
            background: `linear-gradient(45deg, ${periodColor}, #e74c3c)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🤖 Quiz IA Personnalisé
          </h2>
          <div style={{
            background: getDifficultyColor(level),
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            {periodName} • Niveau {level} • {getDifficultyText(level)}
          </div>
        </div>

        {loading && !error && (
          <>
            {/* AI Animation */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px'
            }}>
              <div style={{
                background: `linear-gradient(45deg, ${periodColor}, #3498db)`,
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                animation: 'pulse 2s infinite',
                boxShadow: `0 0 30px ${periodColor}44`
              }}>
              🧠
              </div>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '15px',
                color: '#ecf0f1'
              }}>
                {currentStep}
              </h3>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                height: '8px',
                overflow: 'hidden',
                marginBottom: '15px'
              }}>
                <div style={{
                  background: `linear-gradient(90deg, ${periodColor}, #27ae60)`,
                  height: '100%',
                  width: `${progress}%`,
                  transition: 'width 0.5s ease',
                  borderRadius: '25px'
                }} />
              </div>
              
              <div style={{
                fontSize: '1.1rem',
                color: '#3498db',
                fontWeight: 'bold'
              }}>
                {Math.round(progress)}%
              </div>
            </div>

            {/* Features */}
            <div style={{
              background: 'rgba(52, 152, 219, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h4 style={{
                margin: '0 0 15px 0',
                color: '#3498db',
                fontSize: '1.2rem'
              }}>
                ✨ Génération intelligente
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                fontSize: '0.95rem',
                color: '#bdc3c7'
              }}>
                <div>🎯 Questions adaptées au niveau</div>
                <div>📚 Respect du programme Brevet</div>
                <div>🔄 Contenu toujours différent</div>
                <div>💡 Explications détaillées</div>
              </div>
            </div>
          </>
        )}

        {error && (
          <>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px'
            }}>
              ⚠️
            </div>
            <h3 style={{
              color: '#e74c3c',
              marginBottom: '15px'
            }}>
              Erreur de génération
            </h3>
            <p style={{
              color: '#bdc3c7',
              marginBottom: '25px',
              fontSize: '1.1rem'
            }}>
              {error}
            </p>
            <button
              onClick={generateQuestions}
              style={{
                background: periodColor,
                border: 'none',
                borderRadius: '12px',
                padding: '12px 25px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: '15px'
              }}
            >
              🔄 Réessayer
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(127, 140, 141, 0.3)',
                border: '2px solid #7f8c8d',
                borderRadius: '12px',
                padding: '10px 25px',
                color: '#bdc3c7',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Annuler
            </button>
          </>
        )}

        {/* Info box */}
        {!error && (
          <div style={{
            background: 'rgba(39, 174, 96, 0.1)',
            border: '1px solid rgba(39, 174, 96, 0.3)',
            borderRadius: '10px',
            padding: '15px',
            fontSize: '0.9rem',
            color: '#2ecc71'
          }}>
            💡 L'IA analyse votre niveau et génère 6 questions personnalisées sur {periodName}
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIQuizLoader;