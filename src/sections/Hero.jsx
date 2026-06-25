import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Road from '../components/Road'
import Mountains from '../components/Mountains'
import Trees from '../components/Trees'
import Tractors from '../components/Tractors'
import Sprite from '../components/Sprite'
import { scramble } from '../utils/scramble'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace'

// Helper function to generate a well-bounded random position near the screen
const generateRandomPosition = () => {
  const x = (Math.random() - 0.5) * 1.2 // Keeps them within the viewport width aspect
  const y = 0.05 + Math.random() * 0.15  // Hovering slightly above the road plane
  const z = 9.1 + Math.random() * 0.4    // Safely in front of the camera lens (Z=10)
  const delay = Math.random() * 10       // Destroys synchronous animation patterns
  return { id: Math.random(), pos: [x, y, z], delay }
}

export default function Hero() {
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)

  // Initialize page with 2 pre-populated random sprites
  const [sprites, setSprites] = useState(() => [
    generateRandomPosition(),
    generateRandomPosition()
  ])

  useEffect(() => {
    const id1 = scramble(nameRef.current, 'TREASURE ANI-JOSEPH', 500, 500, '1.5px #e8ffe8')
    const id2 = scramble(subtitleRef.current, 'SOFTWARE DEVELOPER',  1000, 1000, '1px #00df00')
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2) }
  }, [])

  const addSprite = () => {
    if (sprites.length >= 5) return
    setSprites(prev => [...prev, generateRandomPosition()])
  }

  const clearSprites = () => {
    setSprites([]) // Quality of life reset feature
  }

  return (
    <section className="w-screen h-screen bg-black relative overflow-hidden">
      
      {/* 3D Viewport */}
      <Canvas camera={{ position: [0, 0.5, 10], fov: 75 }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[5, -2, 10]} angle={Math.PI / 2} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[10, 10, 0]} decay={0} intensity={Math.PI} />
        <Road />
        <Trees />
        <Mountains />
        <Tractors />
        
        {/* Render our dynamic array of active sprites */}
        {sprites.map(sprite => (
          <Sprite key={sprite.id} position={sprite.pos} initialDelay={sprite.delay} />
        ))}
      </Canvas>

      {/* Main Center Headings */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-start pt-[15vh]">
        <h1
          ref={nameRef}
          className="font-bold whitespace-nowrap text-[clamp(1.8rem,7vw,4rem)]"
          style={{ fontFamily: MONO, color: 'transparent', WebkitTextStroke: '1.5px #e8ffe8' }}
        />
        <p
          ref={subtitleRef}
          className="text-sm md:text-base mt-1.5 tracking-[0.3em]"
          style={{ fontFamily: MONO, color: 'transparent', WebkitTextStroke: '1px #00df00' }}
        />
      </div>


      <div 
        className="hidden md:flex absolute bottom-10 right-10 flex-col gap-4 p-5 bg-black/80 border border-[#00df0033] backdrop-blur-sm z-10 select-none min-w-55"
        style={{ fontFamily: MONO }}
      >
        <div className="text-[10px] text-[#00df0066] tracking-wider">// SYSTEM CAPACITOR</div>
        
        {/* Retro Terminal Battery Bar Container */}
        <div className="flex items-center justify-between border border-[#00df0044] p-2 bg-black">
          <div className="flex gap-1 w-full h-4">
            {[...Array(5)].map((_, idx) => (
              <div 
                key={idx}
                className="flex-1 transition-all duration-300"
                style={{
                  backgroundColor: idx < sprites.length ? (sprites.length === 5 ? '#ff007f' : '#00df00') : 'transparent',
                  border: idx >= sprites.length ? '1px dashed #00df0022' : 'none'
                }}
              />
            ))}
          </div>
          <span className="text-xs text-[#00df00] ml-3 font-bold min-w-6 text-right">
            {sprites.length}/5
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={addSprite}
            disabled={sprites.length >= 5}
            className="flex-1 text-xs py-2 px-3 border transition-all duration-200 uppercase tracking-tight disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: sprites.length >= 5 ? '#00df0033' : '#00df00',
              color: sprites.length >= 5 ? '#00df0044' : '#00df00',
              backgroundColor: 'transparent'
            }}
          >
            {sprites.length >= 5 ? 'MAXED' : '+ Add Sprite'}
          </button>
          
          {sprites.length > 0 && (
            <button
              onClick={clearSprites}
              className="text-[10px] px-2 border border-[#ff007f44] text-[#ff007f] hover:bg-[#ff007f11]"
            >
              CLR
            </button>
          )}
        </div>
      </div>

    </section>
  )
}