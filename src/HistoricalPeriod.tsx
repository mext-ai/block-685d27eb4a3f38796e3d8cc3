import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';
import { HistoricalPeriod as HistoricalPeriodType } from './types';

interface HistoricalPeriodComponentProps {
  period: HistoricalPeriodType;
  onClick: () => void;
  isSelected: boolean;
}

const HistoricalPeriodComponent: React.FC<HistoricalPeriodComponentProps> = ({ 
  period, 
  onClick, 
  isSelected 
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = period.position[1] + Math.sin(state.clock.elapsedTime + period.position[0]) * 0.2;
      if (isSelected) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      }
    }
  });

  const scale = isSelected ? 1.2 : (hovered ? 1.1 : 1);
  const opacity = period.unlocked ? 1 : 0.5;

  return (
    <group position={period.position}>
      {/* Main period sphere */}
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

      {/* Completion indicator */}
      {period.completed && (
        <mesh position={[0, 1.2, 0]} scale={0.3}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.3} />
        </mesh>
      )}

      {/* Lock indicator for locked periods */}
      {!period.unlocked && (
        <mesh position={[0, 0, 1]} scale={0.4}>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      )}

      {/* Period name */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color={period.unlocked ? "#ffffff" : "#888888"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Arial.woff"
      >
        {period.name}
      </Text>

      {/* Period dates */}
      <Text
        position={[0, -1.9, 0]}
        fontSize={0.2}
        color={period.unlocked ? "#cccccc" : "#666666"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Arial.woff"
      >
        {period.period}
      </Text>

      {/* Score display if completed */}
      {period.completed && period.score !== undefined && (
        <Text
          position={[0, -2.3, 0]}
          fontSize={0.25}
          color="#00FF00"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Arial.woff"
        >
          Score: {period.score}/10
        </Text>
      )}
    </group>
  );
};

export default HistoricalPeriodComponent;