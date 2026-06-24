import { useRef, useEffect, useState } from 'react'
import { scramble } from '../utils/scramble'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace'

const B          = 20
const ARM        = B + 14
const CARD_PERIM = 3000

const PROJECTS = [
  {
    num:         '01',
    name:        'Stride',
    featured:    true,
    type:        'web',
    screenshots: [asset('screenshots/stride-1.png'), asset('screenshots/stride-2.png')],
    desc:        'A custom study planner and guidance pipeline tailored for neurodivergent accessibility. Engineered the NoSQL backend data architecture and the recommendation system based on how each individual brain works. Built from scratch for high-integrity assistive tooling.',
    tags:        ['Node.js', 'MongoDB', 'Express', 'State Management', 'Accessibility UX'],
    url:         '#',
  },
  {
    num:         '02',
    name:        'ChainCall',
    featured:    false,
    type:        'web',
    screenshots: [asset('/screenshots/chaincall.png')],
    desc:        'Solana developer tooling designed to fetch, parse, and explore on-chain program IDLs, simulate instruction execution, and build transactions directly from a browser environment. Turning the client layer into a heavy engineering runtime.',
    tags:        ['Solana', 'Web3', 'TypeScript', 'Serialization', 'Dev Tooling'],
    url:         'https://chain-call.vercel.app',
  },
  {
    num:         '03',
    name:        'Kablux',
    featured:    false,
    type:        'mobile',
    screenshots: [asset('/screenshots/kablux-1.jpg'), asset('/screenshots/kablux-2.jpg')],
    desc:        'A high-performance ride-sharing and courier mobile client featuring persistent multi-point location tracking and bi-directional real-time data streams over WebSockets. Engineered to prevent state-desynchronization during fast-moving updates.',
    tags:        ['React Native', 'WebSockets', 'Asynchronous Streams', 'Geolocation API'],
    url:         '#',
  },
  {
    num:         '04',
    name:        'Regexium',
    featured:    false,
    type:        'web',
    screenshots: [asset('/screenshots/regexium.png')],
    desc:        'A real-time Regular Expression compiler, syntax evaluator, and tokenizer. Strips expressions down on the fly to generate detailed interactive breakdowns without relying on external system abstractions.',
    tags:        ['Vue 3', 'TypeScript', 'Tokenization', 'Compiler Logic', 'UI State'],
    url:         'https://regexium.onrender.com',
  },
]

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const SCANLINES = {
  position:      'absolute',
  inset:         0,
  pointerEvents: 'none',
  background:    'repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,223,0,0.05) 3px, rgba(0,223,0,0.05) 4px)',
}


function Shot({ src, style = {} }) {
  return (
    <div 
      className="relative overflow-hidden flex items-center justify-center bg-[#050a05]" 
      style={{ 
        border: '1px solid #00df0022', 
        ...style 
      }}
    >
      <img
        src={src}
        alt=""
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
          display: 'block' 
        }}
      />
      <div style={SCANLINES} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'rgba(0,223,0,0.03)' }} />
    </div>
  )
}

function ViewLink({ url }) {
  const isLive = url !== '#'
  return (
    <a
      href={url}
      target={isLive ? '_blank' : undefined}
      rel="noreferrer"
      style={{
        fontFamily:     MONO,
        color:          isLive ? '#00df00' : '#00df0044',
        fontSize:       11,
        textDecoration: 'none',
        border:         `1px solid ${isLive ? '#00df0033' : '#00df0018'}`,
        padding:        '8px 20px',
        display:        'inline-block',
        letterSpacing:  '0.12em',
        transition:     'border-color 0.2s ease, background 0.2s ease',
        cursor:         isLive ? 'pointer' : 'default',
      }}
      onMouseEnter={e => {
        if (!isLive) return
        e.currentTarget.style.borderColor = '#00df00'
        e.currentTarget.style.background  = '#00df0011'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isLive ? '#00df0033' : '#00df0018'
        e.currentTarget.style.background  = 'transparent'
      }}
    >
      {isLive ? 'VIEW PROJECT →' : '// PRIVATE'}
    </a>
  )
}


function TagList({ tags }) {
  return (
    <div>
      <p style={{ fontFamily: MONO, color: '#00df0044', fontSize: 10, marginBottom: 12, letterSpacing: '0.15em' }}>
        // STACK
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="text-xs px-3 py-1.5"
            style={{
              fontFamily:       MONO,
              color:            'transparent',
              WebkitTextStroke: '1px #00df00',
              border:           '1px solid #00df0033',
            }}
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  )
}


function CardChrome({ borderRef, bracketsRef }) {
  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 520"
        preserveAspectRatio="none"
      >
        <path
          ref={borderRef}
          d={`M ${B},1 L ${1000-B},1 L 999,${B} L 999,${520-B} L ${1000-B},519 L ${B},519 L 1,${520-B} L 1,${B} Z`}
          fill="none"
          stroke="#00df00"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: CARD_PERIM, strokeDashoffset: CARD_PERIM }}
        />
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
          <polyline points={`999,${520-ARM} 999,519 ${1000-ARM},519`} />
          <polyline points={`${ARM},519 1,519 1,${520-ARM}`} />
        </g>
      </svg>
      <div className="absolute inset-0 pointer-events-none" style={{ ...SCANLINES, zIndex: 2 }} />
    </>
  )
}


function useCardAnimation(name) {
  const cardRef     = useRef(null)
  const borderRef   = useRef(null)
  const bracketsRef = useRef(null)
  const contentRef  = useRef(null)
  const nameRef     = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return
      hasAnimated.current = true

      if (borderRef.current) {
        borderRef.current.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)'
        borderRef.current.style.strokeDashoffset = '0'
      }
      setTimeout(() => {
        if (bracketsRef.current) {
          bracketsRef.current.style.transition = 'opacity 0.3s ease'
          bracketsRef.current.style.opacity = '1'
        }
      }, 700)
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = 'opacity 0.6s ease'
          contentRef.current.style.opacity = '1'
        }
        if (nameRef.current) {
          scramble(nameRef.current, name, 0, 650, '1.5px #e8ffe8')
        }
      }, 1000)
    }, { threshold: 0.12 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [name])

  return { cardRef, borderRef, bracketsRef, contentRef, nameRef }
}


function FeaturedCard({ project }) {
  const { cardRef, borderRef, bracketsRef, contentRef, nameRef } = useCardAnimation(project.name)

  return (
    <div ref={cardRef} className="relative" style={{ minHeight: 420 }}>
      <CardChrome borderRef={borderRef} bracketsRef={bracketsRef} />

      <div
        ref={contentRef}
        className="relative flex flex-col gap-7 p-8 md:p-12"
        style={{ opacity: 0, zIndex: 1 }}
      >
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: MONO, color: '#00df0055', fontSize: 10, letterSpacing: '0.15em' }}>
            // PROJECT_{project.num}
          </span>
          <div className="flex items-center gap-3">
            {/* Pink featured badge — borrows the accent from Hero's CLR button */}
            <span style={{ fontFamily: MONO, color: '#ff007f', border: '1px solid #ff007f44', fontSize: 10, padding: '2px 8px', letterSpacing: '0.12em' }}>
              // FEATURED
            </span>
            <span style={{ fontFamily: MONO, color: '#00df0033', fontSize: 10, letterSpacing: '0.15em' }}>
              // {project.type.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Name — larger than standard cards */}
        <h3
          ref={nameRef}
          className="text-3xl md:text-5xl font-bold"
          style={{ fontFamily: MONO, color: 'transparent', WebkitTextStroke: '1.5px #e8ffe8' }}
        />

        {/* Dual screenshots — span the full content width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.screenshots.map((src, i) => (
            <Shot key={i} src={src} style={{ aspectRatio: '16 / 10' }} />
          ))}
        </div>

        {/* Info row — description left, stack + link right */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <p className="flex-1" style={{ fontFamily: MONO, color: '#00df00', fontSize: 13, lineHeight: 1.85 }}>
            {'> '}{project.desc}
          </p>
          <div className="md:w-72 flex flex-col gap-5 shrink-0">
            <TagList tags={project.tags} />
            <ViewLink url={project.url} />
          </div>
        </div>
      </div>
    </div>
  )
}


function StandardCard({ project, index }) {
  const { cardRef, borderRef, bracketsRef, contentRef, nameRef } = useCardAnimation(project.name)
  const flip = index % 2 !== 0

  const ScreenshotArea = () => {
    if (project.type === 'mobile') {
      return (
        <div className="flex gap-3">
          {project.screenshots.map((src, i) => (
            <Shot key={i} src={src} style={{ flex: 1, aspectRatio: '9 / 19.5', maxHeight: 280 }} />
          ))}
        </div>
      )
    }
    return <Shot src={project.screenshots[0]} style={{ aspectRatio: '16 / 10' }} />
  }

  return (
    <div ref={cardRef} className="relative" style={{ minHeight: 300 }}>
      <CardChrome borderRef={borderRef} bracketsRef={bracketsRef} />

      <div
        ref={contentRef}
        className="relative flex flex-col gap-6 p-8 md:p-12"
        style={{ opacity: 0, zIndex: 1 }}
      >
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: MONO, color: '#00df0055', fontSize: 10, letterSpacing: '0.15em' }}>
            // PROJECT_{project.num}
          </span>
          <span style={{ fontFamily: MONO, color: '#00df0033', fontSize: 10, letterSpacing: '0.15em' }}>
            // {project.type.toUpperCase()}
          </span>
        </div>

        {/* Name */}
        <h3
          ref={nameRef}
          className="text-2xl md:text-4xl font-bold"
          style={{ fontFamily: MONO, color: 'transparent', WebkitTextStroke: '1.5px #e8ffe8' }}
        />

        {/* Body: screenshot + info, alternating sides */}
        <div className={`flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-10`}>
          <div className="md:w-1/2">
            <ScreenshotArea />
          </div>
          <div className="md:w-1/2 flex flex-col gap-6 justify-between">
            <p style={{ fontFamily: MONO, color: '#00df00', fontSize: 13, lineHeight: 1.85 }}>
              {'> '}{project.desc}
            </p>
            <TagList tags={project.tags} />
            <ViewLink url={project.url} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Projects() {
  const headingRef = useRef(null)
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)
  
  const [activeFile, setActiveFile] = useState('01')

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return
      hasAnimated.current = true
      scramble(headingRef.current, 'EXPLORER', 0, 800, '1.5px #e8ffe8')
    }, { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Find currently selected data target
  const selectedProject = PROJECTS.find(p => p.num === activeFile)

  return (
    <section ref={sectionRef} className="bg-black px-8 py-6 min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Section Heading Row */}
        <div className="flex items-center gap-4">
          <h2
            ref={headingRef}
            className="text-2xl md:text-4xl font-bold shrink-0"
            style={{ fontFamily: MONO, color: 'transparent', WebkitTextStroke: '1.5px #e8ffe8' }}
          />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #00df0033, transparent)' }} />
          <span style={{ fontFamily: MONO, color: '#00df0033', fontSize: 10, letterSpacing: '0.15em' }}>
            // SYS_VOLUME_01
          </span>
        </div>

        {/* Two-Column Operating System Viewport */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* SIDEBAR: NAVIGATION DIRECTORY */}
          <div className="w-full md:w-64 shrink-0 flex flex-col gap-2 border border-[#00df0015] p-4 bg-black/50 backdrop-blur-sm">
            <div style={{ fontFamily: MONO, color: '#00df0044', fontSize: 10, marginBottom: 8, letterSpacing: '0.1em' }}>
              $ ls -a /root/builds/
            </div>
            
            {/* Project "File" Links */}
            {PROJECTS.map(p => {

            const isActive = activeFile === p.num
            const isUnread = p.num !== '01' && activeFile !== p.num
            return (    
              <button
                key={p.num}
                onClick={() => setActiveFile(p.num)}
                className="w-full text-left font-mono text-xs p-2 transition-all duration-200 flex justify-between items-center"
                style={{
                  fontFamily: MONO,
                  color: activeFile === p.num ? '#e8ffe8' : '#00df0077',
                  backgroundColor: activeFile === p.num ? '#00df0015' : 'transparent',
                  borderLeft: activeFile === p.num ? '2px solid #ff007f' : '2px solid transparent',
                }}
              >
                <span>
                {`> ${p.name.toLowerCase()}${p.type === 'mobile' ? '.app' : '.bin'}`}{"    "}
                {isUnread && (
                <span 
                    className="w-1.5 h-1.5 rounded-full bg-[#ff007f] inline-block animate-pulse" 
                    style={{ boxShadow: '0 0 6px #ff007f' }}
                />
                )}
                </span>
                
                <span className="text-[9px] opacity-40">{p.num}</span>
              </button>
        )})}

            <div className="h-[1px] bg-[#00df0022] my-4" />
            <div style={{ fontFamily: MONO, color: '#00df0044', fontSize: 10, marginBottom: 8, letterSpacing: '0.1em' }}>
              $ ls -a /root/interests/
            </div>

            {/* ART HISTORY TEXT FILE LINK */}
            <button
              onClick={() => setActiveFile('art_history')}
              className="w-full text-left font-mono text-xs p-2 transition-all duration-200 flex justify-between items-center"
              style={{
                fontFamily: MONO,
                color: activeFile === 'art_history' ? '#e8ffe8' : '#00df0077',
                backgroundColor: activeFile === 'art_history' ? '#ff007f15' : 'transparent',
                borderLeft: activeFile === 'art_history' ? '2px solid #ff007f' : '2px solid transparent',
              }}
            >
              <span>{`> art_history.txt`}</span>
              <span className="text-[9px] opacity-40">05</span>
            </button>

            <div className="h-[1px] bg-[#00df0022] my-4" />
            <div style={{ fontFamily: MONO, color: '#00df0044', fontSize: 10, marginBottom: 8, letterSpacing: '0.1em' }}>
            $ ls -a /root/system/
            </div>

            {/* RESUME DOWNLOAD BUTTON */}
            <a
            href={asset('resumetaj.docx')}  // Path to your resume in the public folder
            download="Treasure_Ani-Joseph_Resume.pdf"
            className="w-full text-left font-mono text-xs p-2 transition-all duration-200 flex justify-between items-center group"
            style={{
                fontFamily: MONO,
                color: '#00df0077',
                borderLeft: '2px solid transparent',
                textDecoration: 'none'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.color = '#e8ffe8'
                e.currentTarget.style.backgroundColor = '#00df0015'
                e.currentTarget.style.borderLeft = '2px solid #00df00'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.color = '#00df0077'
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderLeft = '2px solid transparent'
            }}
            >
            <span>{`> fetch_profile.sh`}</span>
            <span className="text-[9px] text-[#00df0066] font-bold tracking-tight group-hover:text-[#ff007f]">
                [EXE]
            </span>
            </a>
            
          </div>

            
          {/* MAIN FRAME: DATA OUTPUT DECODER */}
          <div className="flex-1 w-full min-h-[500px]">
            {activeFile === 'art_history' ? (
              /* Inline Art History Terminal Text Output */
              <div className="relative border border-[#ff007f33] p-8 md:p-12 min-h-[420px] bg-black">
                <div className="absolute top-4 right-4 text-[9px] font-mono text-[#ff007f66]">// CORRUPTED_SECTOR_LOG</div>
                <div className="flex flex-col gap-6" style={{ fontFamily: MONO, color: '#00df00' }}>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                    Humanism and Raw Pixels
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-[#00df00cc]">
                    {`> `}When I'm not designing systems, I study art history. I have a big soft spot for classic aesthetics, specifically how early geometric perspective rules in the Renaissance mirror current spatial compute engines and 3D matrices.
                  </p>
                  <p className="text-xs md:text-sm leading-relaxed text-[#00df00cc]">
                    {`> `}I also read poetry and on occasion, manga.
                  </p>
                  <div className="mt-4 flex gap-3 text-[10px] text-[#ff007f]">
                    <span>[FAVORITE ERA: MODERN / EDO PERIOD]</span>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none" style={{ ...SCANLINES, zIndex: 2 }} />
              </div>
            ) : (
              /* Dynamic Project Card Rendering based on active file index */
              selectedProject && (
                selectedProject.featured 
                  ? <FeaturedCard key={selectedProject.num} project={selectedProject} />
                  : <StandardCard key={selectedProject.num} project={selectedProject} index={parseInt(selectedProject.num)} />
              )
            )}
          </div>

        </div>
      </div>
    </section>
  )
}