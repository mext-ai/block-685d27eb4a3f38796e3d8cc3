import React, { useState, useEffect } from 'react';
import { getQuestionsForLevel, getDifficultyForLevel } from './classicQuestions';
import { QuizQuestion } from './types';

interface ClassicQuizComponentProps {
  themeId: string;
  themeName: string;
  themeColor: string;
  level: number;
  onComplete: (score: number, stars: number, mistakes: string[]) => void;
  onClose: () => void;
}

const ClassicQuizComponent: React.FC<ClassicQuizComponentProps> = ({
  themeId,
  themeName,
  themeColor,
  level,
  onComplete,
  onClose
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per level
  const [quizStarted, setQuizStarted] = useState(false);

  const difficulty = getDifficultyForLevel(level);

  // Load questions for the level
  useEffect(() => {
    const levelQuestions = getQuestionsForLevel(themeId, level);
    if (levelQuestions.length > 0) {
      setQuestions(levelQuestions);
    } else {
      // Fallback - generate placeholder questions if level not found
      const placeholderQuestions: QuizQuestion[] = Array.from({ length: 6 }, (_, i) => ({
        id: `${themeId}-${level}-${i + 1}`,
        question: `Question ${i + 1} pour ${themeName} - Niveau ${level}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: `Cette question de niveau ${level} sera ajoutée prochainement.`,
        period: themeId
      }));
      setQuestions(placeholderQuestions);
    }
  }, [themeId, level, themeName]);

  // Timer
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      // Time's up - finish quiz
      finishQuiz();
    }
  }, [timeLeft, quizStarted, showResult]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers, selectedAnswer];
      setUserAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        finishQuiz(newAnswers);
      }
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const finishQuiz = (finalAnswers?: number[]) => {
    const answers = finalAnswers || userAnswers;
    let correctCount = 0;
    const newMistakes: string[] = [];

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      } else {
        newMistakes.push(question.question);
      }
    });

    const finalScore = correctCount;
    const percentage = (correctCount / questions.length) * 100;
    
    // Calculate stars based on score
    let stars = 0;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 75) stars = 2;
    else if (percentage >= 60) stars = 1;

    setScore(finalScore);
    setMistakes(newMistakes);
    setShowResult(true);
  };

  const handleComplete = () => {
    const percentage = (score / questions.length) * 100;
    let stars = 0;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 75) stars = 2;
    else if (percentage >= 60) stars = 1;

    onComplete(score, stars, mistakes);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2>Chargement des questions...</h2>
        </div>
      </div>
    );
  }

  // Start screen
  if (!quizStarted) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${themeColor}22, ${themeColor}44)`,
          border: `3px solid ${themeColor}`,
          borderRadius: '25px',
          padding: '50px',
          maxWidth: '600px',
          width: '90%',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '20px',
            color: themeColor
          }}>
            📚 Quiz Classique
          </h2>
          
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '30px'
          }}>
            {themeName} - Niveau {level}
          </h3>

          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px'
          }}>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                📊 Difficulté: {difficulty}
              </span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '1.1rem' }}>
                📝 {questions.length} questions
              </span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '1.1rem' }}>
                ⏱️ {formatTime(timeLeft)}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '1rem', opacity: 0.9 }}>
                ⭐ 60% = 1 étoile | 75% = 2 étoiles | 90% = 3 étoiles
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#e74c3c',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ❌ Annuler
            </button>
            
            <button
              onClick={startQuiz}
              style={{
                backgroundColor: themeColor,
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${themeColor}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🚀 Commencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResult) {
    const percentage = (score / questions.length) * 100;
    let stars = 0;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 75) stars = 2;
    else if (percentage >= 60) stars = 1;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${themeColor}22, ${themeColor}44)`,
          border: `3px solid ${themeColor}`,
          borderRadius: '25px',
          padding: '50px',
          maxWidth: '600px',
          width: '90%',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '30px',
            color: themeColor
          }}>
            {stars === 3 ? '🏆' : stars === 2 ? '🥈' : stars === 1 ? '🥉' : '📚'} Résultats
          </h2>

          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px',
              color: percentage >= 60 ? '#27ae60' : '#e74c3c'
            }}>
              {score}/{questions.length}
            </div>

            <div style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              {Math.round(percentage)}%
            </div>

            <div style={{
              fontSize: '2rem',
              marginBottom: '20px'
            }}>
              {'⭐'.repeat(stars)}
            </div>

            <div style={{
              fontSize: '1.2rem',
              color: percentage >= 60 ? '#27ae60' : '#e74c3c'
            }}>
              {percentage >= 90 ? 'Excellent!' :
               percentage >= 75 ? 'Très bien!' :
               percentage >= 60 ? 'Bien!' : 'À améliorer'}
            </div>
          </div>

          {mistakes.length > 0 && (
            <div style={{
              background: 'rgba(231, 76, 60, 0.2)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '30px',
              textAlign: 'left'
            }}>
              <h4 style={{ marginBottom: '15px', textAlign: 'center' }}>
                ❌ Questions à revoir:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {mistakes.slice(0, 3).map((mistake, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    {mistake}
                  </li>
                ))}
                {mistakes.length > 3 && (
                  <li style={{ fontStyle: 'italic', opacity: 0.8 }}>
                    ... et {mistakes.length - 3} autres
                  </li>
                )}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#7f8c8d',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              📚 Retour aux niveaux
            </button>
            
            <button
              onClick={handleComplete}
              style={{
                backgroundColor: themeColor,
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              ✅ Valider
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${themeColor}22, ${themeColor}44)`,
        border: `3px solid ${themeColor}`,
        borderRadius: '25px',
        padding: '40px',
        maxWidth: '800px',
        width: '90%',
        color: 'white'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>
              {themeName} - Niveau {level}
            </h3>
            <div style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '5px' }}>
              📊 {difficulty} | Question {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          
          <div style={{
            background: timeLeft < 60 ? 'rgba(231, 76, 60, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            padding: '10px 15px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: timeLeft < 60 ? '#e74c3c' : 'white'
          }}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
          height: '8px',
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: `linear-gradient(90deg, ${themeColor}, #27ae60)`,
            height: '100%',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
            borderRadius: '10px'
          }} />
        </div>

        {/* Question */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '1.4rem',
            lineHeight: '1.6',
            margin: 0,
            textAlign: 'center'
          }}>
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div style={{
          display: 'grid',
          gap: '15px',
          marginBottom: '30px'
        }}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              style={{
                background: selectedAnswer === index 
                  ? `linear-gradient(135deg, ${themeColor}, ${themeColor}88)`
                  : 'rgba(0, 0, 0, 0.4)',
                border: selectedAnswer === index 
                  ? `2px solid ${themeColor}` 
                  : '2px solid transparent',
                borderRadius: '15px',
                padding: '20px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (selectedAnswer !== index) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAnswer !== index) {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
                }
              }}
            >
              <span style={{ 
                fontWeight: 'bold', 
                marginRight: '10px',
                color: themeColor 
              }}>
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div style={{
            background: 'rgba(52, 152, 219, 0.2)',
            border: '1px solid rgba(52, 152, 219, 0.4)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h4 style={{ marginBottom: '10px', color: '#3498db' }}>
              💡 Explication:
            </h4>
            <p style={{ margin: 0, lineHeight: '1.5' }}>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#e74c3c',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            ❌ Quitter
          </button>

          <div style={{ display: 'flex', gap: '15px' }}>
            {selectedAnswer !== null && !showExplanation && (
              <button
                onClick={handleShowExplanation}
                style={{
                  backgroundColor: '#3498db',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                💡 Explication
              </button>
            )}

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              style={{
                backgroundColor: selectedAnswer !== null ? themeColor : '#7f8c8d',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                color: 'white',
                fontSize: '1rem',
                cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                opacity: selectedAnswer !== null ? 1 : 0.6
              }}
            >
              {currentQuestionIndex === questions.length - 1 ? '🏁 Terminer' : '➡️ Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicQuizComponent;