import React, { useState } from 'react';

interface AvatarCustomizationProps {
  onComplete: (name: string, color: string) => void;
}

const avatarColors = [
  { name: 'Rouge', color: '#e74c3c' },
  { name: 'Bleu', color: '#3498db' },
  { name: 'Vert', color: '#27ae60' },
  { name: 'Violet', color: '#9b59b6' },
  { name: 'Orange', color: '#f39c12' },
  { name: 'Rose', color: '#e91e63' },
  { name: 'Cyan', color: '#1abc9c' },
  { name: 'Jaune', color: '#f1c40f' }
];

const AvatarCustomization: React.FC<AvatarCustomizationProps> = ({ onComplete }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedColor, setSelectedColor] = useState(avatarColors[0].color);

  const handleSubmit = () => {
    if (playerName.trim()) {
      onComplete(playerName.trim(), selectedColor);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && playerName.trim()) {
      handleSubmit();
    }
  };

  const selectedColorName = avatarColors.find(c => c.color === selectedColor)?.name || 'Bleu';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      zIndex: 1000
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`
            }}
          />
        ))}
      </div>

      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: '25px',
        padding: '50px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 2,
        border: '2px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '15px',
            animation: 'bounce 2s infinite'
          }}>
            🕰️
          </div>
          <h1 style={{
            fontSize: '2.8rem',
            marginBottom: '10px',
            background: 'linear-gradient(45deg, #3498db, #e74c3c, #f39c12)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'glow 3s ease-in-out infinite'
          }}>
            Voyage dans l'Histoire
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '20px',
            color: '#bdc3c7',
            lineHeight: '1.6'
          }}>
            Préparez-vous pour une aventure épique à travers les grands événements du XXe siècle !
          </p>

          <div style={{
            background: 'linear-gradient(90deg, #3498db, #e74c3c)',
            height: '3px',
            borderRadius: '3px',
            margin: '20px auto',
            width: '80%',
            animation: 'shimmer 2s infinite'
          }} />
        </div>

        {/* Avatar Preview */}
        <div style={{
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${selectedColor}, ${selectedColor}88)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: `0 8px 25px ${selectedColor}44`,
            border: '4px solid rgba(255, 255, 255, 0.3)',
            animation: 'pulse 2s infinite'
          }}>
            👤
          </div>
        </div>

        {/* Name input */}
        <div style={{ marginBottom: '35px' }}>
          <label style={{
            display: 'block',
            fontSize: '1.3rem',
            marginBottom: '15px',
            color: '#ecf0f1',
            fontWeight: 'bold'
          }}>
            ✨ Votre prénom d'aventurier :
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Entrez votre prénom..."
            maxLength={20}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.2rem',
              borderRadius: '15px',
              border: '3px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              textAlign: 'center',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = selectedColor;
              e.target.style.boxShadow = `0 0 20px ${selectedColor}44`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Color selection */}
        <div style={{ marginBottom: '35px' }}>
          <label style={{
            display: 'block',
            fontSize: '1.3rem',
            marginBottom: '20px',
            color: '#ecf0f1',
            fontWeight: 'bold'
          }}>
            🎨 Choisissez votre couleur magique :
          </label>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '15px',
              justifyItems: 'center'
            }}>
              {avatarColors.map((colorOption) => (
                <button
                  key={colorOption.color}
                  onClick={() => setSelectedColor(colorOption.color)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: colorOption.color,
                    border: selectedColor === colorOption.color ? '4px solid white' : '3px solid rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    transform: selectedColor === colorOption.color ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: selectedColor === colorOption.color 
                      ? `0 8px 25px ${colorOption.color}66, 0 0 30px rgba(255, 255, 255, 0.5)` 
                      : `0 4px 15px ${colorOption.color}33`,
                    position: 'relative'
                  }}
                  title={colorOption.name}
                  onMouseEnter={(e) => {
                    if (selectedColor !== colorOption.color) {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedColor !== colorOption.color) {
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {selectedColor === colorOption.color && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '1.5rem',
                      color: 'white',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}>
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <p style={{
            fontSize: '1rem',
            color: '#bdc3c7',
            margin: 0
          }}>
            Couleur sélectionnée: <strong style={{ color: selectedColor }}>{selectedColorName}</strong>
          </p>
        </div>

        {/* Start button */}
        <button
          onClick={handleSubmit}
          disabled={!playerName.trim()}
          style={{
            background: playerName.trim() 
              ? `linear-gradient(135deg, ${selectedColor}, ${selectedColor}CC)` 
              : 'linear-gradient(135deg, #7f8c8d, #95a5a6)',
            border: 'none',
            borderRadius: '20px',
            padding: '18px 45px',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: 'white',
            cursor: playerName.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.4s ease',
            transform: playerName.trim() ? 'scale(1)' : 'scale(0.95)',
            boxShadow: playerName.trim() 
              ? `0 8px 25px ${selectedColor}44, 0 4px 15px rgba(0, 0, 0, 0.3)` 
              : '0 4px 15px rgba(0, 0, 0, 0.2)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            if (playerName.trim()) {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 12px 35px ${selectedColor}66, 0 8px 25px rgba(0, 0, 0, 0.4)`;
            }
          }}
          onMouseLeave={(e) => {
            if (playerName.trim()) {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${selectedColor}44, 0 4px 15px rgba(0, 0, 0, 0.3)`;
            }
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>
            🚀 Commencer l'aventure !
          </span>
        </button>

        {/* Instructions */}
        <div style={{
          marginTop: '25px',
          padding: '20px',
          background: 'rgba(52, 152, 219, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>
          <h4 style={{
            color: '#3498db',
            margin: '0 0 10px 0',
            fontSize: '1.1rem'
          }}>
            🎯 Votre mission
          </h4>
          <p style={{
            fontSize: '0.95rem',
            color: '#ecf0f1',
            lineHeight: '1.5',
            margin: 0
          }}>
            Explorez 7 périodes historiques majeures, répondez aux quiz et déverrouillez votre chemin vers la maîtrise de l'Histoire pour réussir le Brevet !
          </p>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(52, 152, 219, 0.5); }
          50% { text-shadow: 0 0 30px rgba(231, 76, 60, 0.8), 0 0 40px rgba(52, 152, 219, 0.5); }
        }
        
        @keyframes shimmer {
          0% { background: linear-gradient(90deg, #3498db, #e74c3c); }
          50% { background: linear-gradient(90deg, #e74c3c, #f39c12); }
          100% { background: linear-gradient(90deg, #f39c12, #3498db); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default AvatarCustomization;