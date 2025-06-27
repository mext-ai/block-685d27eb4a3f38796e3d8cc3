import React, { useState, useEffect } from 'react';
import { QuizQuestion } from './types';

interface ManualQuizComponentProps {
  periodId: string;
  periodName: string;
  periodColor: string;
  level: number;
  questions: QuizQuestion[];
  onComplete: (score: number, stars: number, mistakes: string[]) => void;
  onClose: () => void;
}

const ManualQuizComponent: React.FC<ManualQuizComponentProps> = ({
  periodId,
  periodName,
  periodColor,
  level,
  questions,
  onComplete,
  onClose
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && !showExplanation && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      // Time up - automatically submit wrong answer
      handleAnswer(-1); // -1 indicates timeout
    }
  }, [timeLeft, quizStarted, quizCompleted, showExplanation]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || showExplanation) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setMistakes([...mistakes, currentQuestion.question]);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      // Quiz completed
      const finalScore = score;
      const percentage = (finalScore / totalQuestions) * 100;
      let stars = 0;
      if (percentage >= 90) stars = 3;
      else if (percentage >= 70) stars = 2;
      else if (percentage >= 50) stars = 1;

      setQuizCompleted(true);
      onComplete(finalScore, stars, mistakes);
    }
  };

  const getDifficultyInfo = (level: number) => {
    if (level <= 3) return { name: 'Facile', color: '#27ae60', icon: '🟢' };
    if (level <= 6) return { name: 'Moyen', color: '#f39c12', icon: '🟡' };
    if (level <= 8) return { name: 'Difficile', color: '#e74c3c', icon: '🔴' };
    return { name: 'Expert', color: '#9b59b6', icon: '🟣' };
  };

  const difficulty = getDifficultyInfo(level);

  if (!quizStarted) {
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
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            background: periodColor,
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            {level}
          </div>

          <h2 style={{
            margin: '0 0 10px 0',
            fontSize: '2rem',
            background: `linear-gradient(45deg, ${periodColor}, #ffffff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {periodName}
          </h2>

          <div style={{
            background: difficulty.color,
            borderRadius: '15px',
            padding: '10px 20px',
            display: 'inline-block',
            marginBottom: '20px',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            {difficulty.icon} Niveau {level} - {difficulty.name}
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#3498db' }}>
              📝 Informations du Quiz
            </h3>
            <div style={{ textAlign: 'left' }}>
              <p>• {totalQuestions} questions de culture historique</p>
              <p>• 30 secondes par question</p>
              <p>• Questions adaptées au niveau {level}</p>
              <p>• Obtenez au moins 50% pour valider</p>
            </div>
          </div>

          <div style={{
            background: 'rgba(52, 152, 219, 0.2)',
            border: '2px solid #3498db',
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '30px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>
              🎯 Système d'étoiles
            </h4>
            <div style={{ fontSize: '0.9rem' }}>
              <div>⭐ 50-69% : 1 étoile</div>
              <div>⭐⭐ 70-89% : 2 étoiles</div>
              <div>⭐⭐⭐ 90%+ : 3 étoiles</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              onClick={() => setQuizStarted(true)}
              style={{
                background: `linear-gradient(45deg, ${periodColor}, ${periodColor}88)`,
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🚀 Commencer le Quiz
            </button>
            
            <button
              onClick={onClose}
              style={{
                background: 'rgba(231, 76, 60, 0.8)',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              ❌ Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / totalQuestions) * 100;
    let stars = 0;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 70) stars = 2;
    else if (percentage >= 50) stars = 1;

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
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px'
          }}>
            {stars === 3 ? '🏆' : stars === 2 ? '🥈' : stars === 1 ? '🥉' : '📚'}
          </div>

          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '2.5rem',
            background: `linear-gradient(45deg, ${periodColor}, #ffffff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {stars === 3 ? 'Excellent !' : stars === 2 ? 'Très bien !' : stars === 1 ? 'Bien joué !' : 'Continue tes efforts !'}
          </h2>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
                  {score}/{totalQuestions}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Questions</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
                  {Math.round(percentage)}%
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Score</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', color: '#f39c12' }}>
                  {'⭐'.repeat(stars)}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Étoiles</div>
              </div>
            </div>

            {mistakes.length > 0 && (
              <div style={{
                background: 'rgba(231, 76, 60, 0.2)',
                borderRadius: '15px',
                padding: '15px',
                marginTop: '20px'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#e74c3c' }}>
                  📝 Points à réviser
                </h4>
                <div style={{ fontSize: '0.9rem', textAlign: 'left' }}>
                  {mistakes.slice(0, 3).map((mistake, index) => (
                    <div key={index} style={{ marginBottom: '5px' }}>
                      • {mistake}
                    </div>
                  ))}
                  {mistakes.length > 3 && (
                    <div style={{ fontStyle: 'italic', opacity: 0.8 }}>
                      Et {mistakes.length - 3} autres questions...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              background: `linear-gradient(45deg, ${periodColor}, ${periodColor}88)`,
              border: 'none',
              borderRadius: '15px',
              padding: '15px 40px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🎯 Continuer
          </button>
        </div>
      </div>
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
        maxWidth: '800px',
        width: '95%',
        color: 'white',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '1.5rem',
              background: `linear-gradient(45deg, ${periodColor}, #ffffff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {periodName} - Niveau {level}
            </h3>
            <div style={{ fontSize: '1rem', opacity: 0.8, marginTop: '5px' }}>
              Question {currentQuestionIndex + 1} sur {totalQuestions}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              background: timeLeft <= 10 ? '#e74c3c' : '#3498db',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none'
            }}>
              {timeLeft}
            </div>
            
            <button
              onClick={onClose}
              style={{
                background: 'rgba(231, 76, 60, 0.8)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 15px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          height: '8px',
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: `linear-gradient(90deg, ${periodColor}, #27ae60)`,
            height: '100%',
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Question */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px'
        }}>
          <h4 style={{
            margin: '0 0 20px 0',
            fontSize: '1.3rem',
            color: '#ecf0f1',
            lineHeight: '1.5'
          }}>
            {currentQuestion.question}
          </h4>

          <div style={{
            display: 'grid',
            gap: '15px',
            gridTemplateColumns: '1fr'
          }}>
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = {
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '15px 20px',
                color: 'white',
                fontSize: '1rem',
                cursor: selectedAnswer === null ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                textAlign: 'left' as const,
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center'
              };

              if (showExplanation) {
                if (index === currentQuestion.correctAnswer) {
                  buttonStyle.background = '#27ae60';
                  buttonStyle.border = '2px solid #2ecc71';
                } else if (index === selectedAnswer) {
                  buttonStyle.background = '#e74c3c';
                  buttonStyle.border = '2px solid #c0392b';
                }
              } else if (selectedAnswer === index) {
                buttonStyle.background = periodColor;
                buttonStyle.border = `2px solid ${periodColor}`;
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  style={buttonStyle}
                  disabled={selectedAnswer !== null}
                >
                  <span style={{ marginRight: '15px', fontWeight: 'bold' }}>
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>✓</span>
                  )}
                  {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                    <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>✗</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div style={{
            background: 'rgba(52, 152, 219, 0.1)',
            border: '2px solid rgba(52, 152, 219, 0.3)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h5 style={{ margin: '0 0 10px 0', color: '#3498db', fontSize: '1.1rem' }}>
              💡 Explication
            </h5>
            <p style={{ margin: 0, lineHeight: '1.5', fontSize: '1rem' }}>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleNextQuestion}
              style={{
                background: `linear-gradient(45deg, ${periodColor}, ${periodColor}88)`,
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Question suivante →' : 'Voir les résultats 🎯'}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ManualQuizComponent;