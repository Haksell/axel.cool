import { useState, useEffect, useRef } from 'react'

type Position = {
  x: number
  y: number
}

const distance = ({ x: x1, y: y1 }: Position, { x: x2, y: y2 }: Position) =>
  Math.hypot(x1 - x2, y1 - y2)

type EyeProps = {
  mouse: Position
}

const Eye: React.FC<EyeProps> = ({ mouse }) => {
  const eyeRef = useRef<HTMLSpanElement>(null)
  const pupilRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!eyeRef.current || !pupilRef.current) return

    const rect = eyeRef.current.getBoundingClientRect()
    const eyeCenter: Position = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }

    const angle = Math.atan2(mouse.y - eyeCenter.y, mouse.x - eyeCenter.x)
    const maxRadius = rect.width / 4 - 3
    const dist = distance(mouse, eyeCenter)
    const radius = Math.min(maxRadius, dist * 0.7)
    const offsetX = Math.cos(angle) * radius
    const offsetY = Math.sin(angle) * radius

    pupilRef.current.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`
  }, [mouse])

  return (
    <span
      ref={eyeRef}
      className="inline-block relative w-8.5 h-8.5 align-middle mx-2 border-3 border-white"
      style={{
        borderRadius: '50%',
      }}
    >
      <span
        ref={pupilRef}
        className="absolute w-2.5 h-2.5 rounded-full bg-red-400"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </span>
  )
}

const HomePage: React.FC = () => {
  const [mouse, setMouse] = useState<Position>({ x: 0, y: 0 })

  return (
    <div
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        setMouse({ x: e.clientX, y: e.clientY })
      }}
      className="flex flex-col items-center justify-center h-screen w-screen bg-[#111] text-white px-4"
    >
      <h1 className="text-6xl font-bold font-mono mb-10">
        <span>axel.c</span>
        <Eye mouse={mouse} />
        <Eye mouse={mouse} />
        <Eye mouse={mouse} />
        <Eye mouse={mouse} />
        <Eye mouse={mouse} />
        <Eye mouse={mouse} />
        <Eye mouse={mouse} />
        <span>l</span>
      </h1>
    </div>
  )
}

export default HomePage
