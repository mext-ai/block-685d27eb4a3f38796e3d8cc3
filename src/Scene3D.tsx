import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh } from 'three';
import { HistoricalPeriod } from './types';

interface Scene3DProps {
  periods: HistoricalPeriod[];
  playerName: string;
  avatarColor: string;
  selectedPeriod: string | null;
  onPeriodClick: (periodId: string) => void;
  onShowDashboard: () => void;
}

// Simple animated avatar component
const SimpleAvatar: React.FC<{ color: string; position: [number, number, number] }> = ({ color, position }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

// Simple historical period component
const SimplePeriod: React.FC<{
  period: HistoricalPeriod;
  onClick: () => void;
  isSelected: boolean;
}> = ({ period, onClick, isSelected }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = period.position[1] + Math.sin(state.clock.elapsedTime + period.position[0]) * 0.2;
      if (isSelected) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      }
    }
  });

  const scale = isSelected ? 1.3 : (hovered ? 1.1 : 1);
  const opacity = period.unlocked ? 1 : 0.5;

  return (
    <group position={period.position}>
      <mesh
        ref={meshRef}
        onClick={period.unlocked ? onClick : undefined}
        onPointerOver={() => period.unlocked && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial 
          color={period.color} 
          transparent
          opacity={opacity}
          emissive={isSelected ? period.color : '#000000'}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>

      {period.completed && (
        <mesh position={[0, 1.2, 0]} scale={0.3}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.3} />
        </mesh>
      )}

      {!period.unlocked && (
        <mesh position={[0, 0, 1]} scale={0.4}>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      )}

      <Text
        position={[0, -1.5, 0]}
        fontSize={0.25}
        color={period.unlocked ? "#ffffff" : "#888888"}
        anchorX="center"
        anchorY="middle"
      >
        {period.name}
      </Text>

      <Text
        position={[0, -1.8, 0]}
        fontSize={0.15}
        color={period.unlocked ? "#cccccc" : "#666666"}
        anchorX="center"
        anchorY="middle"
      >
        {period.period}
      </Text>

      {period.completed && period.score !== undefined && (
        <Text
          position={[0, -2.1, 0]}
          fontSize={0.2}
          color="#00FF00"
          anchorX="center"
          anchorY="middle"
        >
          {period.score}/10
        </Text>
      )}
    </group>
  );
};

// Loading fallback
const LoadingFallback: React.FC = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#3498db" />
  </mesh>
);

const Scene3D: React.FC<Scene3DProps> = ({
  periods,
  playerName,
  avatarColor,
  selectedPeriod,
  onPeriodClick,
  onShowDashboard
}) => {
  const [cameraPosition] = useState<[number, number, number]>([0, 8, 12]);

  return (
    <div style={{ 
      position: 'relative',
      width: '100%', 
      height: '100vh',
      background: 'linear-gradient(to bottom, #000428 0%, #004e92 100%)'
    }}>
      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              background: 'linear-gradient(45deg, #3498db, #e74c3c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Voyage dans l'Histoire
            </h1>
            <p style={{
              margin: '5px 0 0 0',
              fontSize: '1.1rem',
              color: '#bdc3c7'
            }}>
              Bienvenue, {playerName} ! Cliquez sur une période pour commencer.
            </p>
          </div>
          <button
            onClick={onShowDashboard}
            style={{
              backgroundColor: '#3498db',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 20px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            📊 Tableau de Bord
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        padding: '15px 25px',
        color: 'white',
        fontSize: '0.9rem',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <div style={{ marginBottom: '10px' }}>
          🖱️ <strong>Souris:</strong> Cliquez et glissez pour explorer | 
          🔍 <strong>Molette:</strong> Zoom | 
          🎯 <strong>Clic:</strong> Sélectionner une période
        </div>
        <div style={{ fontSize: '0.8rem', color: '#bdc3c7' }}>
          Explorez les 7 périodes historiques du XXe siècle !
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: cameraPosition, fov: 60 }}
        style={{ width: '100%', height: '100%' }}
        onError={(error) => console.error('Canvas error:', error)}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#3498db" />

          {/* Central platform */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[3, 3, 0.2, 16]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>

          {/* Title in 3D space */}
          <Text
            position={[0, 3, 0]}
            fontSize={0.6}
            color="#3498db"
            anchorX="center"
            anchorY="middle"
          >
            Centre Temporel
          </Text>

          {/* Historical periods */}
          {periods.map((period) => (
            <SimplePeriod
              key={period.id}
              period={period}
              onClick={() => onPeriodClick(period.id)}
              isSelected={selectedPeriod === period.id}
            />
          ))}

          {/* Player avatar */}
          <SimpleAvatar 
            color={avatarColor} 
            position={[0, 0, 2]} 
          />

          {/* Ground grid */}
          <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial 
              color="#2c3e50" 
              transparent 
              opacity={0.3}
              wireframe
            />
          </mesh>

          {/* Interactive controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={25}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;