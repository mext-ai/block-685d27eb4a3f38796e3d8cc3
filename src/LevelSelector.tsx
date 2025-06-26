import React from 'react';

interface Level {
  level: number;
  title: string;
  difficulty: string;
  unlocked: boolean;
  completed: boolean;
  score?: number;
  stars: number;
}

interface LevelSelectorProps {
  periodId: string;
  periodName: string;
  periodColor: string;
  levels: Level[];
  onLevelSelect: (level: number) => void;
  onBack: () => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  periodId,
  periodName,
  periodColor,
  levels,
  onLevelSelect,
  onBack
}) => {
  const getDifficultyIcon = (level: number): string => {
    if (level <= 3) return '🟢'; // Facile
    if (level <= 6) return '🟡'; // Moyen
    if (level <= 8) return '🟠'; // Difficile
    return '🔴'; // Expert
  };

  const getDifficultyText = (level: number): string => {
    if (level <= 3) return 'Facile';
    if (level <= 6) return 'Moyen';
    if (level <= 8) return 'Difficile';
    return 'Expert';
  };

  const getStarsDisplay = (stars: number): string => {
    return '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif'
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
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 15px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: '20px',
              transition: 'all 0.3s ease'
            }}
          >
            ← Retour
          </button>
          <span style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${periodColor}, #e74c3c)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📚 {periodName}
          </span>
        </div>
        
        <div style={{
          background: `linear-gradient(45deg, ${periodColor}44, ${periodColor}88)`,
          borderRadius: '15px',
          padding: '15px 25px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Niveaux disponibles
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: periodColor }}>
            10
          </div>
        </div>
      </div>

      {/* Levels Grid */}
      <div style={{
        padding: '30px',
        height: 'calc(100vh - 120px)',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {levels.map((level) => {
            const isLocked = !level.unlocked;
            const difficultyIcon = getDifficultyIcon(level.level);
            const difficultyText = getDifficultyText(level.level);

            return (
              <div
                key={level.level}
                onClick={() => !isLocked && onLevelSelect(level.level)}
                style={{
                  background: isLocked 
                    ? 'rgba(127, 140, 141, 0.3)' 
                    : `linear-gradient(135deg, ${periodColor}22, ${periodColor}44)`,
                  border: `3px solid ${isLocked ? '#7f8c8d' : periodColor}`,
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
                    : `0 8px 25px ${periodColor}33`
                }}
                onMouseEnter={(e) => {
                  if (!isLocked) {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 12px 35px ${periodColor}55`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLocked) {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${periodColor}33`;
                  }
                }}
              >
                {/* Level number badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: isLocked ? '#7f8c8d' : periodColor,
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}>
                  {level.level}
                </div>

                {/* Difficulty badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '20px',
                  padding: '8px 12px',
                  fontSize: '0.9rem',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  {difficultyIcon}
                  <span>{difficultyText}</span>
                </div>

                {/* Lock icon */}
                {isLocked && (
                  <div style={{
                    position: 'absolute',
                    top: '70px',
                    right: '15px',
                    background: '#7f8c8d',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>
                    🔒
                  </div>
                )}

                {/* Completion badge */}
                {level.completed && (
                  <div style={{
                    position: 'absolute',
                    top: '70px',
                    right: '15px',
                    background: '#27ae60',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    boxShadow: '0 4px 15px rgba(39, 174, 96, 0.4)'
                  }}>
                    ✅
                  </div>
                )}

                <div style={{ marginTop: '30px' }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {level.title}
                  </h3>

                  <p style={{
                    color: '#ecf0f1',
                    fontSize: '1rem',
                    marginBottom: '15px',
                    opacity: 0.9
                  }}>
                    📝 6 questions • Niveau {level.level}/10
                  </p>

                  {/* Stars display */}
                  {level.completed && (
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '10px',
                      padding: '10px',
                      marginBottom: '15px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        marginBottom: '5px'
                      }}>
                        {getStarsDisplay(level.stars)}
                      </div>
                      <div style={{
                        color: 'white',
                        fontSize: '0.9rem'
                      }}>
                        Score: {level.score}/6
                      </div>
                    </div>
                  )}

                  {/* Progress bar for difficulty */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    height: '8px',
                    marginBottom: '15px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: level.level <= 3 ? '#27ae60' :
                                 level.level <= 6 ? '#f39c12' :
                                 level.level <= 8 ? '#e67e22' : '#e74c3c',
                      height: '100%',
                      width: `${(level.level / 10) * 100}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>

                  {/* Action button */}
                  <div style={{
                    padding: '12px 15px',
                    background: isLocked ? 'rgba(127, 140, 141, 0.3)' :
                               level.completed ? 'rgba(39, 174, 96, 0.3)' : 
                               'rgba(52, 152, 219, 0.3)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {isLocked ? '🔒 Niveau verrouillé' :
                     level.completed ? '🔄 Rejouer' : '▶️ Commencer'}
                  </div>

                  {isLocked && (
                    <div style={{
                      marginTop: '10px',
                      padding: '8px',
                      background: 'rgba(127, 140, 141, 0.2)',
                      borderRadius: '8px',
                      color: '#bdc3c7',
                      fontSize: '0.85rem',
                      textAlign: 'center'
                    }}>
                      Terminez le niveau {level.level - 1} pour débloquer
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '20px',
          padding: '25px',
          margin: '30px auto',
          maxWidth: '800px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '15px',
            color: periodColor
          }}>
            🎯 Comment ça fonctionne ?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}>
            <div>
              <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🟢 Niveaux 1-3</div>
              <div>Questions faciles pour débuter</div>
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🟡 Niveaux 4-6</div>
              <div>Difficulté moyenne</div>
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🟠 Niveaux 7-8</div>
              <div>Questions difficiles</div>
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🔴 Niveaux 9-10</div>
              <div>Niveau expert</div>
            </div>
          </div>
          <div style={{
            marginTop: '15px',
            padding: '10px',
            background: 'rgba(52, 152, 219, 0.2)',
            borderRadius: '10px'
          }}>
            ⭐ Obtenez 3 étoiles en répondant parfaitement à toutes les questions !
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;