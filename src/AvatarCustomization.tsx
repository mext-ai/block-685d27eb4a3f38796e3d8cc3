import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from './Avatar';

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
  const [showPreview, setShowPreview] = useState(false);

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
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '10px',
          background: 'linear-gradient(45deg, #3498db, #e74c3c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Voyage dans l'Histoire
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          marginBottom: '30px',
          color: '#bdc3c7',
          lineHeight: '1.5'
        }}>
          Créez votre avatar et explorez les grands événements du XXe siècle !
        </p>

        {/* Name input */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            fontSize: '1.2rem',
            marginBottom: '10px',
            color: '#ecf0f1'
          }}>
            Votre prénom :
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
              padding: '15px',
              fontSize: '1.1rem',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#34495e',
              color: 'white',
              textAlign: 'center',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Color selection */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            fontSize: '1.2rem',
            marginBottom: '15px',
            color: '#ecf0f1'
          }}>
            Choisissez la couleur de votre avatar :
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            justifyItems: 'center'
          }}>
            {avatarColors.map((colorOption) => (
              <button
                key={colorOption.color}
                onClick={() => {
                  setSelectedColor(colorOption.color);
                  setShowPreview(true);
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: colorOption.color,
                  border: selectedColor === colorOption.color ? '4px solid white' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedColor === colorOption.color ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: selectedColor === colorOption.color ? '0 0 20px rgba(255, 255, 255, 0.5)' : 'none'
                }}
                title={colorOption.name}
              />
            ))}
          </div>
        </div>

        {/* Avatar preview */}
        {showPreview && (
          <div style={{
            marginBottom: '30px',
            height: '200px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Avatar color={selectedColor} position={[0, 0, 0]} />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={2}
              />
            </Canvas>
          </div>
        )}

        {/* Start button */}
        <button
          onClick={handleSubmit}
          disabled={!playerName.trim()}
          style={{
            backgroundColor: playerName.trim() ? '#27ae60' : '#7f8c8d',
            border: 'none',
            borderRadius: '12px',
            padding: '15px 40px',
            fontSize: '1.2rem',
            color: 'white',
            cursor: playerName.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            transform: playerName.trim() ? 'scale(1)' : 'scale(0.95)',
            boxShadow: playerName.trim() ? '0 5px 15px rgba(39, 174, 96, 0.4)' : 'none'
          }}
        >
          🚀 Commencer l'aventure !
        </button>

        <p style={{
          fontSize: '0.9rem',
          color: '#95a5a6',
          marginTop: '20px',
          lineHeight: '1.4'
        }}>
          Explorez 7 périodes historiques majeures et testez vos connaissances pour réussir le Brevet !
        </p>
      </div>
    </div>
  );
};

export default AvatarCustomization;