import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Corridor({ rooms }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 760px)').matches
    if (reduceMotion || compact) return undefined

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${trackRef.current.scrollWidth}`,
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="corridor" id="corridor">
      <div className="corridor-track" ref={trackRef}>
        <div className="corridor-title">
          <p>LONG CORRIDOR / WALL INDEX</p>
          <h2>Museum Corridor</h2>
        </div>
        {rooms.map((room) => (
          <article className="wall-sign" key={room.title} data-cursor="ROOM">
            <span>{room.code}</span>
            <h3>{room.title}</h3>
            <p>{room.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Corridor
