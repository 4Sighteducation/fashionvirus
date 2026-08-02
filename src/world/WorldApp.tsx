import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Island } from './Island'

/** Fashion Virus world-builder — Milestone 1: the static island.
 *  12x12 terrain grid, soft lighting, orbit controls, one placeholder building. */
export default function WorldApp() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Canvas shadows camera={{ position: [10, 9, 10], fov: 42 }}>
        <color attach="background" args={['#dfe8ec']} />
        <fog attach="fog" args={['#dfe8ec', 28, 55]} />

        {/* Soft, overcast light — one world, one camera. */}
        <ambientLight intensity={0.65} />
        <directionalLight
          castShadow
          position={[8, 14, 6]}
          intensity={1.1}
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
        />

        <Island seed={20260802} />

        <OrbitControls
          target={[0, 0, 0]}
          minDistance={6}
          maxDistance={26}
          maxPolarAngle={Math.PI / 2.15}
          enableDamping
        />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#3a4750',
          pointerEvents: 'none',
        }}
      >
        Fashion Virus · world-builder lab · milestone 1
      </div>
    </div>
  )
}
