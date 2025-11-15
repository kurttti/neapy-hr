import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  isListening?: boolean;
  isAnalyzing?: boolean;
  matchScore?: number;
}

function FaceGeometry({ isListening, isAnalyzing, matchScore }: Avatar3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [audioFrequency, setAudioFrequency] = useState(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (isListening) {
      setAudioFrequency(Math.sin(state.clock.elapsedTime * 8) * 0.5 + 0.5);
      meshRef.current.scale.y = 1 + audioFrequency * 0.1;
    }

    if (isAnalyzing) {
      meshRef.current.rotation.y += 0.005;
    }

    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05;
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 4]} />
        <meshPhongMaterial
          color="#ffffff"
          emissive={isListening ? '#333333' : '#1a1a1a'}
          shininess={100}
          wireframe={isAnalyzing}
        />
      </mesh>

      <mesh position={[-0.35, 0.2, 0.5]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshPhongMaterial
          color={isListening ? '#e0e0e0' : '#f0f0f0'}
          emissive={matchScore && matchScore > 80 ? '#4a4a4a' : '#2a2a2a'}
        />
      </mesh>

      <mesh position={[0.35, 0.2, 0.5]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshPhongMaterial
          color={isListening ? '#e0e0e0' : '#f0f0f0'}
          emissive={matchScore && matchScore > 80 ? '#4a4a4a' : '#2a2a2a'}
        />
      </mesh>

      <mesh position={[0, -0.3, 0.8]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshPhongMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function BiometricGrid() {
  const gridRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.z += 0.002;
  });

  return (
    <lineSegments ref={gridRef} position={[0, 0, -2]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={24}
          array={new Float32Array([
            -1, -1, 0, 1, -1, 0,
            1, -1, 0, 1, 1, 0,
            1, 1, 0, -1, 1, 0,
            -1, 1, 0, -1, -1, 0,
            -0.5, -0.5, 0, 0.5, -0.5, 0,
            0.5, -0.5, 0, 0.5, 0.5, 0,
            0.5, 0.5, 0, -0.5, 0.5, 0,
            -0.5, 0.5, 0, -0.5, -0.5, 0,
          ])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#666666" transparent opacity={0.3} />
    </lineSegments>
  );
}

function ParticleSystem({ isAnalyzing }: { isAnalyzing?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  // Уменьшаем количество частиц для лучшей производительности
  const [positions] = useState(() => {
    const pos = new Float32Array(150); // Было 300, стало 150
    for (let i = 0; i < 150; i += 3) {
      pos[i] = (Math.random() - 0.5) * 4;
      pos[i + 1] = (Math.random() - 0.5) * 4;
      pos[i + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Оптимизация: обновляем реже
    if (Math.floor(state.clock.elapsedTime * 30) % 2 === 0) {
      pointsRef.current.rotation.x += 0.0005;
      pointsRef.current.rotation.y += 0.0008;
    }

    // Упрощаем анимацию частиц
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < positions.length; i += 9) {
      positions[i] += Math.sin(time + i) * 0.003;
      positions[i + 1] += Math.cos(time + i) * 0.003;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={isAnalyzing ? '#cccccc' : '#888888'}
        size={0.02}
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function Avatar3DScene({ isListening, isAnalyzing, matchScore }: Avatar3DProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!isListening && !isAnalyzing}
        autoRotateSpeed={2}
      />

      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0e0e0" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#a0a0a0" />

      <ParticleSystem isAnalyzing={isAnalyzing} />
      <FaceGeometry isListening={isListening} isAnalyzing={isAnalyzing} matchScore={matchScore} />
      <BiometricGrid />

      <mesh position={[0, 0, -4]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.1} />
      </mesh>
    </>
  );
}

export function Avatar3D({ isListening = false, isAnalyzing = false, matchScore }: Avatar3DProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-black to-gray-900 rounded-2xl overflow-hidden border border-gray-800">
      <Canvas>
        <Avatar3DScene isListening={isListening} isAnalyzing={isAnalyzing} matchScore={matchScore} />
      </Canvas>

      <div className="absolute top-4 left-4 right-4 z-10">
        {isListening && (
          <div className="inline-block px-4 py-2 glass-effect-bw rounded-lg animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-white">Слушаю...</span>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="inline-block px-4 py-2 glass-effect-bw rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <span className="text-sm font-semibold text-white">Анализирую...</span>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
        {matchScore && (
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-gray-300">Совпадение</span>
              <span className="text-sm font-bold text-white">{Math.round(matchScore)}%</span>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white to-gray-400 transition-all duration-500"
                style={{ width: `${matchScore}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
