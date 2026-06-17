import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { dreams } from '../data/exhibits'

function DreamStorage() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dream-paper',
        { y: 120, rotate: -8, opacity: 0 },
        {
          y: 0,
          rotate: (index) => [-5, 3, -2, 5][index],
          opacity: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 62%' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="dream-storage section-shell" id="dream-storage">
      <div className="section-heading">
        <p className="section-kicker">ROOM 01 / DREAM STORAGE</p>
        <h2 data-reveal>Dreams are filed as paper, because paper knows how to yellow.</h2>
      </div>
      <div className="paper-stack">
        {dreams.map((dream) => (
          <article className="dream-paper" key={dream.title} data-cursor="READ">
            <span className="paper-date">{dream.date}</span>
            <h3>{dream.title}</h3>
            <p>{dream.line}</p>
            <small>{dream.emotion}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DreamStorage
