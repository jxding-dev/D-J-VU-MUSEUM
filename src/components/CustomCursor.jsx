import { useEffect, useRef } from 'react'

function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const frameRef = useRef(0)
  const pointRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return undefined

    const draw = () => {
      frameRef.current = 0
      if (!cursorRef.current) return
      cursorRef.current.style.transform = `translate(${pointRef.current.x}px, ${pointRef.current.y}px)`
    }

    const move = (event) => {
      pointRef.current = { x: event.clientX, y: event.clientY }
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
      cursorRef.current?.classList.toggle('is-corridor', Boolean(event.target.closest('#corridor')))
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(draw)
    }

    const over = (event) => {
      const target = event.target.closest('button, a, [data-cursor]')
      cursorRef.current?.classList.toggle('is-active', Boolean(target))
      if (labelRef.current) labelRef.current.textContent = target?.dataset.cursor || ''
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [])

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span ref={labelRef} />
    </div>
  )
}

export default CustomCursor
