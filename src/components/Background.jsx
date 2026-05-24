import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Warp-speed starfield — classic space shooter vibe
function Stars() {
  const ref = useRef()
  const count = 1800

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      vel[i]         = 0.01 + Math.random() * 0.03
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame(() => {
    for (let i = 0; i < count; i++) {
      ref.current.geometry.attributes.position.array[i * 3 + 2] += velocities[i]
      if (ref.current.geometry.attributes.position.array[i * 3 + 2] > 10) {
        ref.current.geometry.attributes.position.array[i * 3 + 2] = -10
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C8FF00"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// Pixel grid plane — perspective floor like retro racing games
function Grid() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.z = (state.clock.elapsedTime * 0.8) % 2
  })

  const gridHelper = useMemo(() => {
    const g = new THREE.GridHelper(40, 40, '#00FFFF', '#00FFFF')
    g.material.opacity = 0.06
    g.material.transparent = true
    return g
  }, [])

  return <primitive ref={ref} object={gridHelper} position={[0, -3, 0]} rotation={[0, 0, 0]} />
}

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 70 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <Stars />
        <Grid />
      </Canvas>
    </div>
  )
}
