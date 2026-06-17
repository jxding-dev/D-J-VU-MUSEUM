import { useEffect, useRef } from 'react'

function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return undefined

    const move = (event) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
      cursorRef.current?.animate(
        { transform: `translate(${event.clientX}px, ${event.clientY}px)` },
        { duration: 280, fill: 'forwards', easing: 'cubic-bezier(.2,.8,.2,1)' },
      )
    }

    const over = (event) => {
      const target = event.target.closest('button, a, [data-cursor]')
      cursorRef.current?.classList.toggle('is-active', Boolean(target))
      labelRef.current.textContent = target?.dataset.cursor || ''
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
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
