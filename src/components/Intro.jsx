import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'motion/react'
import { useRef } from 'react'

function MemoryObject() {
  const group = useRef(null)

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.65) * 0.18 + pointer.y * 0.15
    group.current.rotation.y = clock.elapsedTime * 0.24 + pointer.x * 0.35
    group.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.08
  })

  return (
    <group ref={group}>
      <mesh castShadow>
        <dodecahedronGeometry args={[1.16, 0]} />
        <meshStandardMaterial color="#b9ad92" roughness={0.88} metalness={0.08} />
      </mesh>
      <mesh rotation={[0.5, 0.1, 0.78]}>
        <torusGeometry args={[1.45, 0.025, 12, 96]} />
        <meshStandardMaterial color="#7e1d1d" roughness={0.55} metalness={0.2} />
      </mesh>
      <mesh rotation={[1.4, -0.4, -0.2]}>
        <torusGeometry args={[1.68, 0.018, 12, 96]} />
        <meshStandardMaterial color="#d8cfb8" roughness={0.7} metalness={0.12} />
      </mesh>
    </group>
  )
}

function Intro({ entered, onEnter }) {
  return (
    <section className="intro" id="entrance">
      <div className="light-field" aria-hidden="true" />
      <div className="intro-grid">
        <div className="intro-copy">
          <p className="museum-label">DÉJÀ VU MUSEUM / 기시감 박물관</p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
            DÉJÀ
            <span className="title-solid">VU</span>
            <span>MUSEUM</span>
          </motion.h1>
          <p className="intro-text">
            꿈, 기억, 이미지, 문장 조각이 잘못 보관된 가상 박물관. 입장 기록은 관람 후에 작성됩니다.
          </p>
          <button data-cursor="ENTER" className="enter-button" type="button" onClick={onEnter}>
            ENTER THE MISFILED ARCHIVE
          </button>
        </div>
        <div className="relic-stage" data-cursor="RELIC">
          <Canvas camera={{ position: [0, 0, 4.3], fov: 42 }} dpr={[1, 1.6]}>
            <ambientLight intensity={1.4} />
            <directionalLight position={[3, 2, 4]} intensity={2.1} />
            <pointLight position={[-3, -1, 2]} intensity={1.4} color="#7e1d1d" />
            <MemoryObject />
          </Canvas>
          <span className="relic-caption">CATALOG / UNSTABLE OBJECT 00</span>
        </div>
      </div>
      <motion.div
        className="black-curtain"
        initial={{ scaleY: 0 }}
        animate={entered ? { scaleY: [0, 1, 0] } : { scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />
    </section>
  )
}

export default Intro
