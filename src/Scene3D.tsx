import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { Mesh } from 'three';
import Avatar from './Avatar';
import HistoricalPeriodComponent from './HistoricalPeriod';
import { HistoricalPeriod } from './types';

interface Scene3DProps {
  periods: HistoricalPeriod[];
  playerName: string;
  avatarColor: string;
  selectedPeriod: string | null;
  onPeriodClick: (periodId: string) => void;
  onShowDashboard: () => void;
}

const TimePortal: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[2, 0.3, 8, 20]} />
      <meshStandardMaterial 
        color="#3498db" 
        emissive="#3498db" 
        emissiveIntensity={0.3}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

const FloatingPlatform: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[3, 3, 0.2, 16]} />
      <meshStandardMaterial color="#34495e" />
    </mesh>
  );
};

const Scene3D: React.FC<Scene3DProps> = ({
  periods,
  playerName,
  avatarColor,
  selectedPeriod,
  onPeriodClick,
  onShowDashboard
}) => {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 8, 12]);

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
              Bienvenue, {playerName} ! Cliquez sur une période pour commencer votre mission.
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
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2980b9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#3498db';
              e.currentTarget.style.transform = 'translateY(0)';
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
          Explorez les périodes historiques en 3D et testez vos connaissances !
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: cameraPosition, fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#3498db" />

        {/* Environment */}
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
        />

        {/* Central platform */}
        <FloatingPlatform position={[0, -0.5, 0]} />

        {/* Time portal */}
        <TimePortal position={[0, 3, 0]} />

        {/* Title in 3D space */}
        <Text
          position={[0, 5, 0]}
          fontSize={0.8}
          color="#3498db"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Arial.woff"
        >
          Centre Temporel
        </Text>

        {/* Historical periods */}
        {periods.map((period) => (
          <HistoricalPeriodComponent
            key={period.id}
            period={period}
            onClick={() => onPeriodClick(period.id)}
            isSelected={selectedPeriod === period.id}
          />
        ))}

        {/* Player avatar */}
        <Avatar 
          color={avatarColor} 
          position={[0, 0.5, 2]} 
          scale={0.8}
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
      </Canvas>
    </div>
  );
};

export default Scene3D;