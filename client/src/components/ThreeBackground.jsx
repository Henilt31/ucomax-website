import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef()
  const count = 800

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * 0.03
      mesh.current.rotation.x = clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4a90d9" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function GridLines() {
  const linesRef = useRef()

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.rotation.x = -0.3 + Math.sin(clock.elapsedTime * 0.1) * 0.02
    }
  })

  const lines = useMemo(() => {
    const group = []
    for (let i = -10; i <= 10; i++) {
      group.push({
        points: [new THREE.Vector3(i, 0, -10), new THREE.Vector3(i, 0, 10)],
        key: `v${i}`
      })
      group.push({
        points: [new THREE.Vector3(-10, 0, i), new THREE.Vector3(10, 0, i)],
        key: `h${i}`
      })
    }
    return group
  }, [])

  return (
    <group ref={linesRef} position={[0, -3, 0]}>
      {lines.map(({ points, key }) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={key} geometry={geometry}>
            <lineBasicMaterial color="#1a3a5c" transparent opacity={0.15} />
          </line>
        )
      })}
    </group>
  )
}

function FloatingRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.3
      ref.current.rotation.y = clock.elapsedTime * 0.2
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.3
    }
  })
  return (
    <mesh ref={ref} position={[3, 1, -2]}>
      <torusGeometry args={[1.5, 0.03, 16, 100]} />
      <meshBasicMaterial color="#e8421a" transparent opacity={0.4} />
    </mesh>
  )
}

export default function ThreeBackground() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      camera={{ position: [0, 2, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
      <GridLines />
      <FloatingRing />
    </Canvas>
  )
}
