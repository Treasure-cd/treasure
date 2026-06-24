import { useRef, useEffect } from 'react'
import { scramble } from '../utils/scramble'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace'

const B   = 28
const ARM = B + 16
const PERIMETER = 3130

const BIO = [
  '> COMPUTER SCIENCE UNDERGRADUATE.',
  '> BUILDER HYBRID: ARCHITECTING ROBUST BACKENDS, CRAFTING HIGH-PERFORMANCE UIs.',
  '> FOCUSED ON DATA FLOWS, STATE MACHINES, AND CLEAN SYSTEMS FROM FIRST PRINCIPLES.',
  '> SHIPPED PRODUCTION-READY CODE ACROSS WEB AND MOBILE PIPELINES.',
]

const STACK = [
  'REACT', 'NEXT.JS', 'REACT NATIVE',
  'NODE.JS', 'TYPESCRIPT',
  'VUE 3'
]

export default function About() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const pathRef     = useRef(null)
  const bracketsRef = useRef(null)
  const contentRef  = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return
      hasAnimated.current = true

      // 1. Draw border
      if (pathRef.current) {
        pathRef.current.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)'
        pathRef.current.style.strokeDashoffset = '0'
      }

      // 2. Brackets snap in mid-draw
      setTimeout(() => {
        if (bracketsRef.current) {
          bracketsRef.current.style.transition = 'opacity 0.3s ease'
          bracketsRef.current.style.opacity = '1'
        }
      }, 900)

      // 3. Content fade + heading scramble fire together — scramble is now VISIBLE
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = 'opacity 0.6s ease'
          contentRef.current.style.opacity = '1'
        }
        scramble(headingRef.current, 'ABOUT', 0, 700, '1.5px #e8ffe8')
      }, 1400)

    }, { threshold: 0.25 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen bg-black flex items-center justify-center px-8 py-24">
      <div className="relative w-full max-w-4xl" style={{ minHeight: 520 }}>

        {/* Border + brackets */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* Clipped-corner border path */}
          <path
            ref={pathRef}
            d={`M ${B},1 L ${1000-B},1 L 999,${B} L 999,${600-B} L ${1000-B},599 L ${B},599 L 1,${600-B} L 1,${B} Z`}
            fill="none"
            stroke="#00df00"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ strokeDasharray: PERIMETER, strokeDashoffset: PERIMETER }}
          />

          {/* Calibration brackets — appear mid-draw, sit on top of clipped corners */}
          <g
            ref={bracketsRef}
            fill="none"
            stroke="#00df00"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ opacity: 0 }}
          >
            <polyline points={`1,${ARM} 1,1 ${ARM},1`} />
            <polyline points={`${1000-ARM},1 999,1 999,${ARM}`} />
            <polyline points={`999,${600-ARM} 999,599 ${1000-ARM},599`} />
            <polyline points={`${ARM},599 1,599 1,${600-ARM}`} />
          </g>
        </svg>

        {/* CRT scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 3px,
                rgba(0, 223, 0, 0.1) 3px,
                rgba(0, 223, 0, 0.1) 4px
              )
            `,
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative p-10 md:p-16 flex flex-col gap-10"
          style={{ opacity: 0, zIndex: 1 }}
        >
          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: MONO, color: 'transparent', WebkitTextStroke: '1.5px #e8ffe8' }}
          />
          <div className="flex flex-col gap-2">
            {BIO.map((line, i) => (
              <p key={i} className="text-sm md:text-base" style={{ fontFamily: MONO, color: '#00df00' }}>
                {line}
              </p>
            ))}
          </div>
          <div>
            <p className="text-xs mb-4" style={{ fontFamily: MONO, color: '#00df0066' }}>
              // STACK
            </p>
            <div className="flex flex-wrap gap-3">
              {STACK.map(tech => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5"
                  style={{
                    fontFamily: MONO,
                    color: 'transparent',
                    WebkitTextStroke: '1px #00df00',
                    border: '1px solid #00df0033',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}