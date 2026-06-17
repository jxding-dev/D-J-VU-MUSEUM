import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor'
import Intro from './components/Intro'
import Corridor from './components/Corridor'
import DreamStorage from './components/DreamStorage'
import ImageHall from './components/ImageHall'
import TextDrawer from './components/TextDrawer'
import RestrictedRoom from './components/RestrictedRoom'
import { roomSigns } from './data/exhibits'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [entered, setEntered] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 42, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 82%' },
          },
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  const handleEnter = () => {
    setEntered(true)
    window.setTimeout(() => {
      document.getElementById('corridor')?.scrollIntoView({ behavior: 'smooth' })
    }, 460)
  }

  return (
    <main ref={mainRef} className={entered ? 'site has-entered' : 'site'}>
      <CustomCursor />
      <Intro entered={entered} onEnter={handleEnter} />
      <Corridor rooms={roomSigns} />
      <DreamStorage />
      <ImageHall />
      <TextDrawer />
      <RestrictedRoom />
      <section className="ending section-shell" id="ending">
        <p className="section-kicker">EXIT NOTE / 07</p>
        <h2 data-reveal>당신이 본 것은 기억입니까, 꿈입니까?</h2>
        <button className="text-return" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          RETURN TO ENTRANCE
        </button>
      </section>
    </main>
  )
}

export default App
