import React, { useState, useEffect } from 'react';
import { QuizQuestion } from './types';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onClose: () => void;
  periodName: string;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ 
  questions, 
  onComplete, 
  onClose, 
  periodName 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean; selectedAnswer: number }[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

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
      selectedAnswer
    }]);

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const finalScore = Math.round((score / questions.length) * 10);
      onComplete(finalScore);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
        maxWidth: '600px',
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
            <h2 style={{ margin: 0, color: '#3498db' }}>{periodName}</h2>
            <button
              onClick={onClose}
              style={{
                background: '#e74c3c',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ×
            </button>
          </div>
          
          {/* Progress bar */}
          <div style={{
            backgroundColor: '#34495e',
            borderRadius: '10px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#3498db',
              height: '100%',
              width: `${progress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          <p style={{ 
            margin: '10px 0 0 0', 
            fontSize: '14px', 
            color: '#bdc3c7' 
          }}>
            Question {currentQuestionIndex + 1} sur {questions.length}
          </p>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ 
            color: '#ecf0f1', 
            lineHeight: '1.4',
            fontSize: '18px'
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
                  borderRadius: '8px',
                  color: 'white',
                  cursor: showExplanation ? 'default' : 'pointer',
                  fontSize: '16px',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  opacity: showExplanation && index !== currentQuestion.correctAnswer && index !== selectedAnswer ? 0.6 : 1
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
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            borderLeft: `4px solid ${selectedAnswer === currentQuestion.correctAnswer ? '#27ae60' : '#e74c3c'}`
          }}>
            <h4 style={{ 
              color: selectedAnswer === currentQuestion.correctAnswer ? '#27ae60' : '#e74c3c',
              margin: '0 0 10px 0'
            }}>
              {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct !' : '✗ Incorrect'}
            </h4>
            <p style={{ margin: 0, color: '#ecf0f1', lineHeight: '1.4' }}>
              {currentQuestion.explanation}
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
                borderRadius: '8px',
                padding: '12px 30px',
                color: 'white',
                fontSize: '16px',
                cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s ease'
              }}
            >
              Valider
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              style={{
                backgroundColor: '#27ae60',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 30px',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {isLastQuestion ? 'Terminer' : 'Question suivante'}
            </button>
          )}
        </div>

        {/* Score display */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '15px',
          color: '#bdc3c7',
          fontSize: '14px'
        }}>
          Score actuel: {score}/{questions.length}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;