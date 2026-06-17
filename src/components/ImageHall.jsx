import { useMemo, useState } from 'react'
import { images } from '../data/exhibits'

const filters = ['ALL', 'DREAM', 'MEMORY', 'GLITCH', 'FORBIDDEN']

function ImageHall() {
  const [active, setActive] = useState('ALL')
  const visible = useMemo(() => (active === 'ALL' ? images : images.filter((image) => image.tag === active)), [active])

  return (
    <section className="image-hall section-shell" id="image-hall">
      <div className="hall-header">
        <div>
          <p className="section-kicker">ROOM 02 / IMAGE HALL</p>
          <h2 data-reveal>Frames tilt when the remembered image refuses to stay flat.</h2>
        </div>
        <div className="filter-rail" aria-label="Image filters">
          {filters.map((filter) => (
            <button
              className={active === filter ? 'is-active' : ''}
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="frame-grid">
        {visible.map((image, index) => (
          <article className={`gallery-frame tone-${index % 4}`} key={image.id} data-cursor="VIEW">
            <div className="image-surface">
              <span>{image.mark}</span>
            </div>
            <p>{image.tag}</p>
            <h3>{image.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ImageHall
