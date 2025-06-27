import React, { useState, useEffect } from 'react';
import { LevelQuestion } from './levelData';

interface LevelQuizProps {
  questions: LevelQuestion[];
  periodName: string;
  periodColor: string;
  level: number;
  onComplete: (score: number, stars: number, mistakes: string[], passed: boolean) => void;
  onClose: () => void;
}

const LevelQuiz: React.FC<LevelQuizProps> = ({
  questions,
  periodName,
  periodColor,
  level,
  onComplete,
  onClose
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [questionResults, setQuestionResults] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 secondes par question
  const [timerActive, setTimerActive] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Timer
  useEffect(() => {
    if (timerActive && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      // Temps écoulé - considérer comme mauvaise réponse
      handleAnswerSelect(-1); // -1 indique pas de réponse
    }
  }, [timeLeft, timerActive, showExplanation]);

  // Reset timer pour nouvelle question
  useEffect(() => {
    setTimeLeft(30);
    setTimerActive(true);
  }, [currentQuestionIndex]);

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

  // Nouveau système de calcul des étoiles basé sur le pourcentage
  const calculateStarsAndPass = (correctAnswers: number, totalQuestions: number) => {
    const percentage = (correctAnswers / totalQuestions) * 100;
    let stars = 0;
    let passed = false;

    if (percentage >= 60) {
      passed = true;
      if (percentage >= 90) {
        stars = 3;
      } else if (percentage >= 70) {
        stars = 2;
      } else {
        stars = 1;
      }
    }

    return { stars, passed, percentage };
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setTimerActive(false);
    setShowExplanation(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newResults = [...questionResults, isCorrect];
    setQuestionResults(newResults);

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setMistakes([...mistakes, currentQuestion.question]);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);

    if (isLastQuestion) {
      // Utiliser le nouveau système de calcul
      const { stars, passed } = calculateStarsAndPass(score, questions.length);
      onComplete(score, stars, mistakes, passed);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const getCurrentScorePercentage = () => {
    if (questionResults.length === 0) return 0;
    return (score / questionResults.length) * 100;
  };

  const getTimerColor = () => {
    if (timeLeft > 20) return '#27ae60';
    if (timeLeft > 10) return '#f39c12';
    return '#e74c3c';
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return '#f1c40f'; // Doré pour 3 étoiles
    if (percentage >= 70) return '#e67e22'; // Orange pour 2 étoiles
    if (percentage >= 60) return '#27ae60'; // Vert pour 1 étoile
    return '#e74c3c'; // Rouge pour échec
  };

  const renderStars = (percentage: number) => {
    if (percentage >= 90) return '⭐⭐⭐';
    if (percentage >= 70) return '⭐⭐';
    if (percentage >= 60) return '⭐';
    return '❌';
  };

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
        padding: '30px',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: 'white',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          paddingBottom: '20px',
          borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '1.8rem',
              background: `linear-gradient(45deg, ${periodColor}, #e74c3c)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {periodName}
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginTop: '8px'
            }}>
              <div style={{
                background: getDifficultyColor(level),
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                Niveau {level} • {getDifficultyText(level)}
              </div>
              <div style={{
                background: 'rgba(52, 152, 219, 0.3)',
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '0.9rem'
              }}>
                Question {currentQuestionIndex + 1}/{questions.length}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(231, 76, 60, 0.2)',
              border: '2px solid #e74c3c',
              borderRadius: '12px',
              padding: '10px 15px',
              color: '#e74c3c',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ✕ Fermer
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          height: '8px',
          marginBottom: '25px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: `linear-gradient(90deg, ${periodColor}, #27ae60)`,
            height: '100%',
            width: `${getProgressPercentage()}%`,
            transition: 'width 0.3s ease',
            borderRadius: '10px'
          }} />
        </div>

        {/* Timer */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '25px'
        }}>
          <div style={{
            background: getTimerColor(),
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: `0 0 20px ${getTimerColor()}44`,
            position: 'relative'
          }}>
            {timeLeft}s
            <div style={{
              position: 'absolute',
              top: '-5px',
              left: '-5px',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              border: `4px solid ${getTimerColor()}`,
              borderTop: '4px solid transparent',
              transform: `rotate(${((30 - timeLeft) / 30) * 360}deg)`,
              transition: 'transform 1s linear'
            }} />
          </div>
        </div>

        {/* Question */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '25px',
          border: `2px solid ${periodColor}33`
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            lineHeight: '1.5',
            margin: 0,
            color: '#ecf0f1'
          }}>
            {currentQuestion.question}
          </h3>
        </div>

        {/* Answers */}
        <div style={{
          display: 'grid',
          gap: '15px',
          marginBottom: '25px'
        }}>
          {currentQuestion.options.map((option, index) => {
            let backgroundColor = 'rgba(255, 255, 255, 0.1)';
            let borderColor = 'rgba(255, 255, 255, 0.3)';
            let textColor = 'white';

            if (showExplanation) {
              if (index === currentQuestion.correctAnswer) {
                backgroundColor = 'rgba(39, 174, 96, 0.3)';
                borderColor = '#27ae60';
              } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                backgroundColor = 'rgba(231, 76, 60, 0.3)';
                borderColor = '#e74c3c';
              }
            } else if (selectedAnswer === index) {
              backgroundColor = `${periodColor}33`;
              borderColor = periodColor;
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                style={{
                  background: backgroundColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '15px 20px',
                  color: textColor,
                  fontSize: '1.1rem',
                  cursor: showExplanation ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  if (!showExplanation) {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${periodColor}44`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showExplanation) {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{
                  background: showExplanation && index === currentQuestion.correctAnswer
                    ? '#27ae60'
                    : showExplanation && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer
                    ? '#e74c3c'
                    : periodColor,
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {String.fromCharCode(65 + index)}
                </div>
                {option}
                
                {showExplanation && index === currentQuestion.correctAnswer && (
                  <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>✅</span>
                )}
                {showExplanation && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                  <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>❌</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div style={{
            background: selectedAnswer === currentQuestion.correctAnswer
              ? 'rgba(39, 174, 96, 0.2)'
              : 'rgba(231, 76, 60, 0.2)',
            border: `2px solid ${selectedAnswer === currentQuestion.correctAnswer ? '#27ae60' : '#e74c3c'}`,
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '25px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>
                {selectedAnswer === currentQuestion.correctAnswer ? '🎉' : '💡'}
              </span>
              <h4 style={{
                margin: 0,
                fontSize: '1.2rem',
                color: selectedAnswer === currentQuestion.correctAnswer ? '#27ae60' : '#e74c3c'
              }}>
                {selectedAnswer === currentQuestion.correctAnswer ? 'Bonne réponse !' : 'Pas tout à fait...'}
              </h4>
            </div>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#ecf0f1'
            }}>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Score display avec nouveau système */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '15px 20px',
          marginBottom: '25px'
        }}>
          <div style={{
            display: 'flex',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>
                {score}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Bonnes réponses
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>
                {currentQuestionIndex + 1 - score}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Erreurs
              </div>
            </div>
            {questionResults.length > 0 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: getScoreColor(getCurrentScorePercentage())
                }}>
                  {getCurrentScorePercentage().toFixed(0)}%
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {renderStars(getCurrentScorePercentage())}
                </div>
              </div>
            )}
          </div>

          {/* Progress indicators */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {questionResults.map((result, index) => (
              <div
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: result ? '#27ae60' : '#e74c3c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              >
                {result ? '✓' : '✗'}
              </div>
            ))}
            {Array.from({ length: questions.length - questionResults.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Seuil de réussite info */}
        <div style={{
          background: 'rgba(52, 152, 219, 0.1)',
          border: '2px solid rgba(52, 152, 219, 0.3)',
          borderRadius: '12px',
          padding: '15px',
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '5px' }}>
            Système de notation
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            Minimum 60% pour passer • 60-69% ⭐ • 70-89% ⭐⭐ • 90-100% ⭐⭐⭐
          </div>
        </div>

        {/* Next button */}
        {showExplanation && (
          <button
            onClick={handleNextQuestion}
            style={{
              width: '100%',
              backgroundColor: periodColor,
              border: 'none',
              borderRadius: '15px',
              padding: '15px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: `0 8px 25px ${periodColor}44`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 12px 35px ${periodColor}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${periodColor}44`;
            }}
          >
            {isLastQuestion ? '🏁 Terminer le niveau' : '➡️ Question suivante'}
          </button>
        )}
      </div>
    </div>
  );
};

export default LevelQuiz;