import React from 'react';
import { HistoricalPeriod } from './types';

interface ProgressDashboardProps {
  periods: HistoricalPeriod[];
  playerName: string;
  totalScore: number;
  onClose: () => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ 
  periods, 
  playerName, 
  totalScore, 
  onClose 
}) => {
  const completedPeriods = periods.filter(p => p.completed);
  const unlockedPeriods = periods.filter(p => p.unlocked);
  const averageScore = completedPeriods.length > 0 ? 
    Math.round(completedPeriods.reduce((sum, p) => sum + (p.score || 0), 0) / completedPeriods.length) : 0;

  const getProgressColor = (score: number) => {
    if (score >= 8) return '#27ae60'; // Green
    if (score >= 6) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
  };

  const getMotivationalMessage = () => {
    const progress = (completedPeriods.length / periods.length) * 100;
    
    if (progress === 100) return "🎉 Félicitations ! Vous avez terminé toutes les périodes !";
    if (progress >= 75) return "🚀 Excellent travail ! Vous êtes presque au bout !";
    if (progress >= 50) return "💪 Bon travail ! Continuez sur cette lancée !";
    if (progress >= 25) return "📚 C'est un bon début ! Continuez vos efforts !";
    return "🌟 Commencez votre voyage dans l'histoire !";
  };

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
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#3498db',
            fontSize: '2rem'
          }}>
            📊 Tableau de Bord
          </h2>
          <button
            onClick={onClose}
            style={{
              background: '#e74c3c',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
        </div>

        {/* Player info */}
        <div style={{
          backgroundColor: '#34495e',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            color: '#3498db', 
            margin: '0 0 10px 0',
            fontSize: '1.5rem'
          }}>
            Bonjour, {playerName} ! 👋
          </h3>
          <p style={{ 
            margin: '10px 0',
            fontSize: '1.1rem',
            color: '#ecf0f1'
          }}>
            {getMotivationalMessage()}
          </p>
        </div>

        {/* Overall stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          marginBottom: '25px'
        }}>
          <div style={{
            backgroundColor: '#3498db',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {completedPeriods.length}/{periods.length}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Périodes terminées
            </div>
          </div>

          <div style={{
            backgroundColor: '#27ae60',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {averageScore}/10
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Score moyen
            </div>
          </div>

          <div style={{
            backgroundColor: '#f39c12',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {unlockedPeriods.length}/{periods.length}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Périodes débloquées
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              Progression générale
            </span>
            <span style={{ fontSize: '1.1rem', color: '#3498db' }}>
              {Math.round((completedPeriods.length / periods.length) * 100)}%
            </span>
          </div>
          <div style={{
            backgroundColor: '#34495e',
            borderRadius: '10px',
            height: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#3498db',
              height: '100%',
              width: `${(completedPeriods.length / periods.length) * 100}%`,
              transition: 'width 0.5s ease',
              borderRadius: '10px'
            }} />
          </div>
        </div>

        {/* Periods detail */}
        <div>
          <h3 style={{ 
            color: '#ecf0f1', 
            marginBottom: '15px',
            fontSize: '1.3rem'
          }}>
            📚 Détail des périodes
          </h3>
          <div style={{ 
            display: 'grid', 
            gap: '10px' 
          }}>
            {periods.map((period) => (
              <div
                key={period.id}
                style={{
                  backgroundColor: '#34495e',
                  borderRadius: '10px',
                  padding: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: period.unlocked ? 1 : 0.6,
                  borderLeft: `4px solid ${period.color}`
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    color: period.unlocked ? '#ecf0f1' : '#7f8c8d',
                    marginBottom: '5px'
                  }}>
                    {period.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: '#bdc3c7' 
                  }}>
                    {period.period}
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px' 
                }}>
                  {!period.unlocked && (
                    <span style={{ 
                      fontSize: '1.2rem',
                      color: '#7f8c8d'
                    }}>
                      🔒
                    </span>
                  )}
                  {period.completed && period.score !== undefined && (
                    <div style={{
                      backgroundColor: getProgressColor(period.score),
                      borderRadius: '20px',
                      padding: '5px 12px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      minWidth: '60px',
                      textAlign: 'center'
                    }}>
                      {period.score}/10
                    </div>
                  )}
                  {period.unlocked && !period.completed && (
                    <div style={{
                      backgroundColor: '#95a5a6',
                      borderRadius: '20px',
                      padding: '5px 12px',
                      fontSize: '0.9rem',
                      color: 'white'
                    }}>
                      À faire
                    </div>
                  )}
                  {period.completed && (
                    <span style={{ 
                      fontSize: '1.2rem',
                      color: '#27ae60'
                    }}>
                      ✅
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips section */}
        <div style={{
          backgroundColor: '#34495e',
          borderRadius: '10px',
          padding: '20px',
          marginTop: '25px',
          borderLeft: '4px solid #3498db'
        }}>
          <h4 style={{ 
            color: '#3498db', 
            margin: '0 0 10px 0',
            fontSize: '1.2rem'
          }}>
            💡 Conseils pour réussir le Brevet
          </h4>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px',
            color: '#ecf0f1',
            lineHeight: '1.6'
          }}>
            <li>Mémorisez les dates clés de chaque période</li>
            <li>Comprenez les causes et conséquences des événements</li>
            <li>Associez les personnages historiques à leurs actions</li>
            <li>Révisez les périodes déjà complétées régulièrement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;