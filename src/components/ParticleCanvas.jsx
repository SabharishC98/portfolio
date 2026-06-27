import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 80;
const MAX_DISTANCE = 2.8;

function ParticleNetwork({ mousePos, proMode }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const { viewport } = useThree();

  // Generate random positions
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      );
    }
    return new Float32Array(pos);
  }, []);

  const velocities = useMemo(() => {
    const vel = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      vel.push(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.002,
      );
    }
    return vel;
  }, []);

  const currentPositions = useMemo(() => Float32Array.from(positions), [positions]);

  // Lines geometry
  const lineGeo = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      currentPositions[i * 3] += velocities[i * 3];
      currentPositions[i * 3 + 1] += velocities[i * 3 + 1];
      currentPositions[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce off walls
      if (Math.abs(currentPositions[i * 3]) > 7) velocities[i * 3] *= -1;
      if (Math.abs(currentPositions[i * 3 + 1]) > 4.5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(currentPositions[i * 3 + 2]) > 2.5) velocities[i * 3 + 2] *= -1;
    }

    // Mouse influence
    const mx = (mousePos.current.x / window.innerWidth - 0.5) * 10;
    const my = -(mousePos.current.y / window.innerHeight - 0.5) * 6;

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position;
      attr.array.set(currentPositions);
      attr.needsUpdate = true;
    }

    // Build lines between close particles
    const linePositions = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = currentPositions[i * 3] - currentPositions[j * 3];
        const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
        const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DISTANCE) {
          linePositions.push(
            currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
            currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2],
          );
        }
      }
    }

    if (linesRef.current && linePositions.length > 0) {
      const arr = new Float32Array(linePositions);
      linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={currentPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={proMode ? '#10b981' : '#ffffff'}
          size={proMode ? 0.07 : 0.05}
          sizeAttenuation
          transparent
          opacity={proMode ? 0.55 : 0.3}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color={proMode ? '#047857' : '#333333'} transparent opacity={proMode ? 0.28 : 0.15} />
      </lineSegments>
    </>
  );
}

const ParticleCanvas = ({ proMode }) => {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: true }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
    >
      <ParticleNetwork mousePos={mousePos} proMode={proMode} />
    </Canvas>
  );
};

export default ParticleCanvas;
