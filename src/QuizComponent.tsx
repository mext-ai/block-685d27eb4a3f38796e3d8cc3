import React, { useState, useEffect } from 'react';
import { QuizQuestion } from './types';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number, mistakes?: string[]) => void;
  onClose: () => void;
  periodName: string;
  mode?: 'discovery' | 'revision' | 'exam' | 'challenge';
}

const QuizComponent: React.FC<QuizComponentProps> = ({ 
  questions, 
  onComplete, 
  onClose, 
  periodName,
  mode = 'discovery'
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean; selectedAnswer: number; question: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(mode === 'exam' ? 300 : 0); // 5 minutes en mode examen
  const [showReview, setShowReview] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Timer for exam mode
  useEffect(() => {
    if (mode === 'exam' && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (mode === 'exam' && timeLeft === 0 && !showReview) {
      handleFinishQuiz();
    }
  }, [timeLeft, mode, showExplanation, showReview]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, {
      questionId: currentQuestion.id,
      correct: isCorrect,
      selectedAnswer,
      question: currentQuestion.question
    }]);

    if (mode === 'revision' || mode === 'discovery') {
      setShowExplanation(true);
    } else {
      // En mode examen/défi, passer directement à la question suivante
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleFinishQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleFinishQuiz = () => {
    const finalScore = Math.round((score / questions.length) * 10);
    const mistakes = answers.filter(a => !a.correct).map(a => a.question);
    
    if (mode === 'exam' || mode === 'challenge') {
      setShowReview(true);
    } else {
      onComplete(finalScore, mistakes);
    }
  };

  const handleReviewComplete = () => {
    const finalScore = Math.round((score / questions.length) * 10);
    const mistakes = answers.filter(a => !a.correct).map(a => a.question);
    onComplete(finalScore, mistakes);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Review screen for exam/challenge modes
  if (showReview) {
    const finalScore = Math.round((score / questions.length) * 10);
    const correctAnswers = answers.filter(a => a.correct).length;
    const incorrectAnswers = answers.filter(a => !a.correct);

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#2c3e50',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '700px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
          color: 'white',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>
              {finalScore >= 8 ? '🏆' : finalScore >= 6 ? '👍' : '📚'}
            </div>
            <h2 style={{ 
              margin: 0, 
              color: finalScore >= 8 ? '#27ae60' : finalScore >= 6 ? '#f39c12' : '#e74c3c',
              fontSize: '2.5rem'
            }}>
              {finalScore >= 8 ? 'Excellent !' : finalScore >= 6 ? 'Bien joué !' : 'À retravailler'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#bdc3c7', margin: '10px 0' }}>
              {periodName} - Mode {mode === 'exam' ? 'Examen' : 'Défi'}
            </p>
          </div>

          {/* Results summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: '#27ae60',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{correctAnswers}</div>
              <div>Bonnes réponses</div>
            </div>
            <div style={{
              background: '#e74c3c',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{incorrectAnswers.length}</div>
              <div>Erreurs</div>
            </div>
            <div style={{
              background: '#3498db',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{finalScore}/10</div>
              <div>Score final</div>
            </div>
          </div>

          {/* Mistakes review */}
          {incorrectAnswers.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>
                📝 Points à réviser :
              </h3>
              <div style={{
                background: '#34495e',
                borderRadius: '10px',
                padding: '20px'
              }}>
                {incorrectAnswers.map((answer, index) => {
                  const question = questions.find(q => q.id === answer.questionId);
                  if (!question) return null;
                  
                  return (
                    <div key={answer.questionId} style={{ 
                      marginBottom: index < incorrectAnswers.length - 1 ? '15px' : 0,
                      paddingBottom: index < incorrectAnswers.length - 1 ? '15px' : 0,
                      borderBottom: index < incorrectAnswers.length - 1 ? '1px solid #4a5f7a' : 'none'
                    }}>
                      <p style={{ 
                        fontWeight: 'bold', 
                        color: '#ecf0f1',
                        marginBottom: '8px'
                      }}>
                        {question.question}
                      </p>
                      <p style={{ 
                        color: '#e74c3c', 
                        marginBottom: '5px',
                        fontSize: '0.9rem'
                      }}>
                        ❌ Votre réponse: {question.options[answer.selectedAnswer]}
                      </p>
                      <p style={{ 
                        color: '#27ae60', 
                        marginBottom: '8px',
                        fontSize: '0.9rem'
                      }}>
                        ✅ Bonne réponse: {question.options[question.correctAnswer]}
                      </p>
                      <p style={{ 
                        color: '#bdc3c7', 
                        fontSize: '0.85rem',
                        fontStyle: 'italic'
                      }}>
                        💡 {question.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Motivational message */}
          <div style={{
            background: 'rgba(52, 152, 219, 0.2)',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>
              {finalScore >= 8 ? '🌟 Vous maîtrisez parfaitement cette période ! Continuez comme ça !' :
               finalScore >= 6 ? '💪 Bon travail ! Quelques révisions et vous serez au top !' :
               '📚 Cette période demande plus de travail. Révisez les points difficiles et recommencez !'}
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '15px'
          }}>
            <button
              onClick={handleReviewComplete}
              style={{
                backgroundColor: '#27ae60',
                border: 'none',
                borderRadius: '12px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#229954';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#27ae60';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ✅ Terminer
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#95a5a6',
                border: 'none',
                borderRadius: '12px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7f8c8d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#95a5a6';
              }}
            >
              🚪 Quitter sans sauver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#2c3e50',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '650px',
        width: '90%',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h2 style={{ margin: 0, color: '#3498db', fontSize: '1.5rem' }}>
              {periodName} - {mode === 'discovery' ? '🌟 Découverte' :
                             mode === 'revision' ? '📚 Révision' :
                             mode === 'exam' ? '📝 Examen' : '🏆 Défi'}
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {mode === 'exam' && (
                <div style={{
                  background: timeLeft < 60 ? '#e74c3c' : '#f39c12',
                  borderRadius: '10px',
                  padding: '8px 15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  ⏱️ {formatTime(timeLeft)}
                </div>
              )}
              
              <button
                onClick={onClose}
                style={{
                  background: '#e74c3c',
                  border: 'none',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div style={{
            backgroundColor: '#34495e',
            borderRadius: '10px',
            height: '10px',
            overflow: 'hidden',
            marginBottom: '10px'
          }}>
            <div style={{
              backgroundColor: mode === 'exam' ? '#e74c3c' : '#3498db',
              height: '100%',
              width: `${progress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: '#bdc3c7' 
            }}>
              Question {currentQuestionIndex + 1} sur {questions.length}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: '#27ae60',
              fontWeight: 'bold'
            }}>
              Score: {score}/{questions.length}
            </p>
          </div>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ 
            color: '#ecf0f1', 
            lineHeight: '1.4',
            fontSize: '1.2rem',
            marginBottom: '20px'
          }}>
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options */}
        <div style={{ marginBottom: '25px' }}>
          {currentQuestion.options.map((option, index) => {
            let backgroundColor = '#34495e';
            let borderColor = '#34495e';
            
            if (showExplanation) {
              if (index === currentQuestion.correctAnswer) {
                backgroundColor = '#27ae60';
                borderColor = '#27ae60';
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                backgroundColor = '#e74c3c';
                borderColor = '#e74c3c';
              }
            } else if (selectedAnswer === index) {
              backgroundColor = '#3498db';
              borderColor = '#3498db';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  backgroundColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '10px',
                  color: 'white',
                  cursor: showExplanation ? 'default' : 'pointer',
                  fontSize: '1rem',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  opacity: showExplanation && index !== currentQuestion.correctAnswer && index !== selectedAnswer ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!showExplanation && selectedAnswer !== index) {
                    e.currentTarget.style.backgroundColor = '#4a6fa5';
                    e.currentTarget.style.borderColor = '#4a6fa5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showExplanation && selectedAnswer !== index) {
                    e.currentTarget.style.backgroundColor = '#34495e';
                    e.currentTarget.style.borderColor = '#34495e';
                  }
                }}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div style={{
            backgroundColor: '#34495e',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            borderLeft: `4px solid ${selectedAnswer === currentQuestion.correctAnswer ? '#27ae60' : '#e74c3c'}`
          }}>
            <h4 style={{ 
              color: selectedAnswer === currentQuestion.correctAnswer ? '#27ae60' : '#e74c3c',
              margin: '0 0 15px 0',
              fontSize: '1.2rem'
            }}>
              {selectedAnswer === currentQuestion.correctAnswer ? '✅ Excellent !' : '❌ Pas tout à fait...'}
            </h4>
            <p style={{ 
              margin: 0, 
              color: '#ecf0f1', 
              lineHeight: '1.5',
              fontSize: '1rem'
            }}>
              💡 <strong>Explication :</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ textAlign: 'center' }}>
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              style={{
                backgroundColor: selectedAnswer !== null ? '#3498db' : '#7f8c8d',
                border: 'none',
                borderRadius: '12px',
                padding: '15px 40px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedAnswer !== null) {
                  e.currentTarget.style.backgroundColor = '#2980b9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAnswer !== null) {
                  e.currentTarget.style.backgroundColor = '#3498db';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              ✅ Valider ma réponse
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              style={{
                backgroundColor: '#27ae60',
                border: 'none',
                borderRadius: '12px',
                padding: '15px 40px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#229954';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#27ae60';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isLastQuestion ? '🏁 Voir mes résultats' : '➡️ Question suivante'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;