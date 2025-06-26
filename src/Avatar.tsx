import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface AvatarProps {
  color: string;
  position: [number, number, number];
  scale?: number;
}

const Avatar: React.FC<AvatarProps> = ({ color, position, scale = 1 }) => {
  const meshRef = useRef<Mesh>(null);

  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Head */}
      <mesh ref={meshRef} position={[0, 1.5, 0]} scale={scale}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.8, 0]} scale={scale}>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.4, 0.9, 0]} rotation={[0, 0, 0.3]} scale={scale}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.4, 0.9, 0]} rotation={[0, 0, -0.3]} scale={scale}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, 0.1, 0]} scale={scale}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 0.1, 0]} scale={scale}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.1, 1.55, 0.25]} scale={scale}>
        <sphereGeometry args={[0.05, 4, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.1, 1.55, 0.25]} scale={scale}>
        <sphereGeometry args={[0.05, 4, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[-0.1, 1.55, 0.28]} scale={scale}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.1, 1.55, 0.28]} scale={scale}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
};

export default Avatar;